import Lead from "../../models/Lead.js";
import { Router } from "express";
import { google } from 'googleapis';
import mongoose from "mongoose";
import { sendEmailNotify } from "../../services/transport.js";
import yup from 'yup';
const leadsRoute = Router();
leadsRoute.get('/getleads', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        const userId = req.user?._id;
        const baseFilter = search
            ? {
                $or: [
                    { fullName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } },
                    { source: { $regex: search, $options: 'i' } },
                ]
            }
            : {};
        const combinedFilter = userId
            ? {
                $and: [
                    baseFilter,
                    { assignedTo: userId }
                ]
            }
            : baseFilter;
        const leads = await Lead.find(combinedFilter)
            .populate("assignedTo", "name email")
            .populate("sharedWith", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const total = await Lead.countDocuments(combinedFilter);
        res.status(200).json({
            success: true,
            data: leads,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
leadsRoute.get('/getleads-exclude-assigned', async (req, res) => {
    try {
        const userId = req.user?._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        const searchFilter = {
            ...(search && {
                $or: [
                    { fullName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } },
                    { source: { $regex: search, $options: 'i' } },
                ]
            }),
            ...(userId && {
                assignedTo: { $ne: userId }
            })
        };
        const leads = await Lead.find(searchFilter)
            .populate("assignedTo", "name email")
            .populate("sharedWith", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const total = await Lead.countDocuments(searchFilter);
        res.status(200).json({
            success: true,
            data: leads,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
leadsRoute.post('/assign-dealer', async (req, res) => {
    try {
        const userId = req.body?.userId;
        const leadIds = req.body.ids;
        if (!Array.isArray(leadIds) || leadIds.length === 0) {
            return res.status(400).json({ success: false, message: "No lead IDs provided" });
        }
        const updateResults = await Promise.all(leadIds.map((leadId) => Lead.findByIdAndUpdate(leadId, { $addToSet: { assignedTo: userId } }, { new: true }).populate("assignedTo", "name email")));
        const updatedLeads = updateResults.filter(Boolean);
        if (updatedLeads.length === 0) {
            return res.status(404).json({ success: false, message: "No leads were found or updated" });
        }
        res.status(200).json({
            success: true,
            message: "User assigned to selected leads successfully",
            data: updatedLeads,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
leadsRoute.get('/calendar/events', async (req, res) => {
    const accessToken = req.headers.authorization?.split('Bearer ')[1];
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    try {
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });
        res.json(response.data.items);
    }
    catch {
        res.status(500).send('Failed to fetch events');
    }
});
leadsRoute.post("/sync-reminder", async (req, res) => {
    try {
        const { status, leadId, task, reminder, googleCalendarEventId, } = req.body;
        const access_token = req.cookies?.['google_calender_accessToken'];
        if (!access_token) {
            return res.status(400).json({ success: false, message: "Missing access_token." });
        }
        if (!access_token || !leadId || !reminder) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token });
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });
        const event = {
            summary: task || "Lead Reminder",
            start: {
                dateTime: new Date(reminder).toISOString(),
                timeZone: "Asia/Dhaka",
            },
            end: {
                dateTime: new Date(new Date(reminder).getTime() + 30 * 60 * 1000).toISOString(),
                timeZone: "Asia/Dhaka",
            },
            reminders: {
                useDefault: false,
                overrides: [{ method: "popup", minutes: 10 }],
            },
        };
        let calendarResponse;
        if (googleCalendarEventId) {
            calendarResponse = await calendar.events.update({
                calendarId: "primary",
                eventId: googleCalendarEventId,
                requestBody: event,
            });
        }
        else {
            calendarResponse = await calendar.events.insert({
                calendarId: "primary",
                requestBody: event,
            });
        }
        const updatedLead = await Lead.findByIdAndUpdate(leadId, { status,
            reminder: new Date(reminder),
            googleCalendarEventId: calendarResponse.data.id,
            googleCalendarEventLink: calendarResponse.data.htmlLink,
            googleCalendarSyncStatus: "Synced",
            task
        }, { new: true });
        res.status(200).json({
            success: true,
            message: googleCalendarEventId ? "Event updated" : "Event created",
            eventId: calendarResponse.data.id,
            htmlLink: calendarResponse.data.htmlLink,
            lead: updatedLead,
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Failed to sync calendar event.",
        });
    }
});
leadsRoute.get("/calendar/events", async (req, res) => {
    try {
        const access_token = req.cookies?.['google_calender_accessToken'];
        const maxResults = '10';
        if (!access_token) {
            return res.status(400).json({ success: false, message: "Missing access_token." });
        }
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token });
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });
        const now = new Date().toISOString();
        const response = await calendar.events.list({
            calendarId: "primary",
            timeMin: now,
            maxResults: parseInt(maxResults),
            singleEvents: true,
            orderBy: "startTime",
        });
        res.status(200).json({
            success: true,
            events: response.data.items,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch calendar events.",
            error: error.message,
        });
    }
});
leadsRoute.post('/send-notify-email', async (req, res) => {
    try {
        const schema = yup.object().shape({
            leadsIds: yup.array().of(yup.string()).required(),
            subject: yup.string().required(),
            content: yup.string().required()
        });
        const { leadsIds, subject, content } = await schema.validate(req.body.data);
        const leads = await Lead.find({
            _id: { $in: leadsIds.map(id => new mongoose.Types.ObjectId(id)) }
        });
        for (const lead of leads) {
            try {
                const response = await sendEmailNotify({
                    to: lead.email,
                    fullName: lead.fullName,
                    subject,
                    content
                });
                lead.emailLogs.push({
                    sentAt: new Date(),
                    subject,
                    status: "Sent",
                    response: response?.messageId || "Sent successfully",
                    sentBy: req.user?._id,
                    content
                });
                await lead.save();
            }
            catch (emailError) {
                lead.emailLogs.push({
                    sentAt: new Date(),
                    subject,
                    status: "Failed",
                    response: emailError.message,
                    sentBy: req.user?._id,
                    content
                });
                await lead.save();
            }
        }
        res.json({ message: req.t('emails-sent-successfully') });
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});
leadsRoute.post('/ai-analyze', async (req, res) => {
    try {
        // Fetch top 100 leads (most recent)
        const leads = await Lead.find({})
            .sort({ createdAt: -1 })
            .limit(100)
            .populate('assignedTo', 'name email')
            .populate('sharedWith', 'name email');
        if (!leads || leads.length === 0) {
            return res.status(404).json({ success: false, message: 'No leads found.' });
        }
        // Prepare data for AI
        const aiLeads = leads.map(lead => ({
            id: lead._id.toString(),
            name: lead.fullName,
            email: lead.email,
            phone: lead.phone,
            source: lead.source || '',
            status: lead.status,
            interestedIn: lead.interestedIn || '',
            budget: lead.budget || '',
            reminder: lead.reminder ? new Date(lead.reminder).toISOString() : '',
            task: lead.task || '',
            assignedTo: lead.assignedTo ? lead.assignedTo.name : '',
            createdAt: lead.createdAt ? new Date(lead.createdAt).toISOString() : '',
        }));
        // AI prompt
        const instructions = `You are a sales lead analyst. Given a list of leads, analyze and select the top 10 most promising leads for conversion. Consider fields like status, interestedIn, budget, reminder, and recency. For each selected lead, provide a short reasoning for why it was chosen. Return ONLY a JSON array of objects: [{ "id": "...", "reason": "..." }, ...]. Example: [{ "id": "abc123", "reason": "High budget and recent interest" }, ...]`;
        const newMessage = `Leads: ${JSON.stringify(aiLeads)}`;
        const getAIResponse = (await import('../../utils/aiService.js')).default;
        const aiResult = await getAIResponse(instructions, [], newMessage);
        // Try to parse the AI's response as a JSON array of objects
        let topLeadsWithReason = [];
        try {
            const match = aiResult.match(/\[.*\]/s);
            if (match) {
                topLeadsWithReason = JSON.parse(match[0]);
            }
        }
        catch {
            return res.status(500).json({ success: false, message: 'AI response could not be parsed.', aiResult });
        }
        // Map the original leads to include the reasoning
        const topLeads = topLeadsWithReason.map((obj) => {
            const lead = leads.find(l => l._id.toString() === obj.id);
            if (lead) {
                return { ...lead.toObject(), aiReason: obj.reason };
            }
            return null;
        }).filter(Boolean);
        res.status(200).json({ success: true, data: topLeads, aiResult });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
const createLeadSchema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    source: yup.string(),
    status: yup.string(),
    interestedIn: yup.string(),
    budget: yup.string(),
    reminder: yup.date(),
    task: yup.string(),
    assignedTo: yup.array().of(yup.string()),
    notes: yup.string(),
});
leadsRoute.post('/create', async (req, res) => {
    try {
        const data = await createLeadSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        const lead = new Lead(data);
        await lead.save();
        res.status(201).json({ success: true, data: lead });
    }
    catch (error) {
        // console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, errors: error.errors });
        }
        res.status(500).json({ success: false, message: error.message });
    }
});
leadsRoute.put('/update-exclusive-lead', async () => {
});
leadsRoute.post('/delete', async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.body.id);
        if (!lead)
            return res.status(404).json({ message: "Lead not found" });
        res.status(200).json({ message: "Lead deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
leadsRoute.post('/delete-exclusive-lead', async (req, res) => {
    const { id } = req.body;
    try {
        const lead = await Lead.findByIdAndDelete(id);
        if (!lead)
            return res.status(404).json({ message: "Lead not found" });
        res.status(200).json({ message: "Lead deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default leadsRoute;
//# sourceMappingURL=leads.js.map