import { google } from "googleapis";
import { Router } from "express";
import multer from "multer";
import Dealer from "../../models/Dealer.js";
// Updated to use Cloudinary instead of Google Cloud Storage
import uploadFileToGCS from '../../utils/googleCloud.js';
import Campaign from "../../models/Campaign.js";
import moment from "moment";  
import axios from "axios";
import { 
  ImageAssetData, 
  ClientAccountDetails, 
  SearchAdData,
  DisplayAdData,
  CampaignOperationData,
  AdGroupOperationData
} from '../../types/campaign.js';
const API_VERSION = 'v17'; // Specify your desired Google Ads API version

// Removed unused schemas

// Removed unused schemas

// --- End of Yup Schemas ---


const upload = multer();
const campaignRouter = Router();


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.WEBSITE_LINK
);
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
function formatDateForApi(dateObject: Date) {
  if (!(dateObject instanceof Date) || isNaN(dateObject.valueOf())) {
    
    const d = new Date(dateObject); // Attempt to parse if it's a string
    if (isNaN(d.valueOf())) {
      
        // Fallback or throw error
        const today = new Date();
        return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    }
    dateObject = d;
  }
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function getAccessToken() {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      });
      return response.data.access_token;
    } catch {
      throw new Error('Could not obtain access token.');
    }
  }
  
 
  async function makeGoogleAdsApiRequest(accessToken: string, customerIdForUrlPath: string, loginCustomerIdForHeader: string, method: string, endpoint: string, data: unknown = null) {
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'developer-token': process.env.GOOGLE_DEVELOPER_TOKEN,
      'login-customer-id': loginCustomerIdForHeader,
      'Content-Type': 'application/json',
    };
    const url = `https://googleads.googleapis.com/${API_VERSION}/customers/${customerIdForUrlPath}/${endpoint}`;
    try {
      let response;
      if (method.toUpperCase() === 'POST') {
        response = await axios.post(url, data, { headers });
      } else if (method.toUpperCase() === 'GET') {
        response = await axios.get(url, { headers, params: data });
      } else { throw new Error(`Unsupported HTTP method: ${method}`); }
      return response.data;
    } catch (error: unknown) {
      const errorResponse = error as { response?: { data?: { error?: { details?: unknown[]; message?: string; code?: string } }; status?: number } };
      
      const adsError = errorResponse.response?.data?.error;
      if (adsError) {
        const failure = {
          errors: (adsError.details as unknown[])?.flatMap((d: unknown) => (d as { errors?: unknown[] }).errors || []) || [{ message: adsError.message, errorCode: adsError.code }],
          requestId: 'N/A',
        };
        const err = new Error(adsError.message || 'Google Ads API request failed.');
        (err as { googleAdsFailure?: unknown; statusCode?: number }).googleAdsFailure = failure;
        (err as { googleAdsFailure?: unknown; statusCode?: number }).statusCode = errorResponse.response?.status;
        throw err;
      }
      throw error;
    }
  }
  
  // --- Asset Creation Helpers with Axios ---
  
  async function createImageAssetWithAxios(accessToken: string, customerId: string, loginCustomerId: string, imageFile: ImageAssetData | null, gcsUrl: string, assetNamePrefix = "ImageAsset") {
    let imageDataB64;
    if (imageFile) {
      imageDataB64 = imageFile.buffer.toString("base64");
    } else if (gcsUrl) {
      try {
        const imageBuffer = await (await fetch(gcsUrl)).arrayBuffer(); // Ensure fetch is available or use axios for this too
        imageDataB64 = Buffer.from(imageBuffer).toString("base64");
      } catch (fetchError: unknown) {
        const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown fetch error';
        throw new Error(`Failed to process image from URL: ${gcsUrl} - ${errorMessage}`);
      }
    } else {
      return null;
    }
    const assetOperation = {
      create: {
        name: `${assetNamePrefix}-${Date.now()}`.substring(0,120),
        type: "IMAGE", // String enum
        imageAsset: { data: imageDataB64 } // REST uses 'data' not 'imageData'
      }
    };
    try {
      const response = await makeGoogleAdsApiRequest(accessToken, customerId, loginCustomerId, 'POST', 'assets:mutate', { operations: [assetOperation] } as unknown);
      if (response.results?.[0]?.resourceName) {
       
        return response.results[0].resourceName;
      }
     
      return null;
    } catch {
      
      return null; // Or rethrow if critical
    }
  }
  
  // --- Create New Client Account under MCC with Axios ---
  async function createClientAccountWithAxios(accessToken: string, managerId: string, newAccountDetails: ClientAccountDetails) {
    // ... (Function defined in previous response, using makeGoogleAdsApiRequest) ...
    // This function structure is already suitable for Axios.
   
    const endpoint = ':createCustomerClient';
    const requestBody = {
      customerClient: {
        descriptiveName: newAccountDetails.descriptiveName || `Axios API Client ${Date.now()}`.substring(0,100),
        currencyCode: newAccountDetails.currencyCode || "USD",
        timeZone: newAccountDetails.timeZone || "America/New_York",
      },
    };
    const response = await makeGoogleAdsApiRequest(accessToken, managerId, managerId, 'POST', endpoint, requestBody);
    if (response && response.resourceName) {
      const newClientAccountId = response.resourceName.replace("customers/", "");
     
      return newClientAccountId;
    } else {
      throw new Error("Axios: Client account creation failed to return resourceName.");
    }
  }
  
  campaignRouter.post("/create-ads", upload.fields([
    { name: 'displayAdAImageFile', maxCount: 1 },
    { name: 'displayAdBImageFile', maxCount: 1 },
    { name: 'searchAdAImageFile', maxCount: 1 },
    { name: 'searchAdBImageFile', maxCount: 1 }
]), async (req, res) => {
    let accessToken: string;
    try {
        accessToken = await getAccessToken();
      
        const rawBody = req.body;
        
        const parsedDataForValidation = {
            title: rawBody.title,
            campaignLevelDescription: rawBody.description,
            campaignObjective: rawBody.campaignObjective,
            networks: rawBody.networksString ? JSON.parse(rawBody.networksString) : [],
            adType: rawBody.adType,
            dailyBudget: rawBody.dailyBudget ? parseFloat(rawBody.dailyBudget) : undefined,
            biddingStrategy: rawBody.biddingStrategy, // This will be a string like "MANUAL_CPC", "MAXIMIZE_CLICKS"
            targetLocations: rawBody.targetLocations,
            isABTesting: rawBody.isABTestingString === 'true',
            startDate: rawBody.startDate,
            endDate: rawBody.endDate,
            totalBudget: rawBody.totalBudgetString ? parseFloat(rawBody.totalBudgetString) : undefined,
            searchAdA: rawBody.searchAdAString ? JSON.parse(rawBody.searchAdAString) : null,
            searchAdB: rawBody.searchAdBString ? JSON.parse(rawBody.searchAdBString) : null,
            displayAdA: rawBody.displayAdAString ? JSON.parse(rawBody.displayAdAString) : null,
            displayAdB: rawBody.displayAdBString ? JSON.parse(rawBody.displayAdBString) : null,
        };
        

        const {
            title, campaignLevelDescription, campaignObjective, networks, adType,
            dailyBudget, biddingStrategy, targetLocations, isABTesting,
            searchAdA, searchAdB, displayAdA, displayAdB,
            startDate, endDate, totalBudget
        } = parsedDataForValidation;

        const currentDealerId = (req as { user?: { _id: { toString: () => string } } }).user?._id.toString();
        if (!currentDealerId) { return res.status(401).json({ message: "User not authenticated." }); }
        const dealer = await Dealer.findById(currentDealerId);
       
        if (!dealer) { return res.status(404).json({ message: "Dealer not found." }); }

        const managerId = process.env.GOOGLE_ADS_MANAGER_ID?.replace(/-/g, "");
        if (!managerId) { throw new Error("MCC ID not configured."); }

        let dealerSpecificCustomerId = dealer.googleAdsCustomerId;
        if (!dealerSpecificCustomerId) {
            const newAccountDetails = {
                descriptiveName: `${dealer.fullName || `Dealer_${dealer._id}`} Ads ${Date.now()}`.substring(0, 100),
                currencyCode: dealer.googleAdsAccountCurrencyCode || 'USD',
                timeZone: dealer.googleAdsAccountTimeZone || 'America/New_York',
            };
            dealerSpecificCustomerId = await createClientAccountWithAxios(accessToken, managerId, newAccountDetails);
            if (dealerSpecificCustomerId) {
                dealer.googleAdsCustomerId = dealerSpecificCustomerId;
                await dealer.save();
            } else {
                throw new Error("Failed to establish dealer's Google Ads Customer ID.");
            }
        }
        
        const customerIdToOperateOn = dealerSpecificCustomerId;

        // --- 1. Create Campaign Budget ---
        const budgetOperation = { create: { name: `${title.substring(0, 120)} Budget ${Date.now()}`, amountMicros: String(dailyBudget ? dailyBudget * 1000000 : 0), deliveryMethod: "STANDARD" } };
        const budgetResponse = await makeGoogleAdsApiRequest(accessToken, customerIdToOperateOn, managerId, 'POST', 'campaignBudgets:mutate', { operations: [budgetOperation] } as unknown);
        if (!budgetResponse.results || budgetResponse.results.length === 0 || !budgetResponse.results[0].resourceName) {
            throw new Error("Budget creation failed or did not return a resource name.");
        }
        const campaignBudgetResourceName = budgetResponse.results[0].resourceName;
        

        // --- 2. Determine Advertising Channel Type & Network Settings ---
        let advertisingChannelType;
        const networkSettings = { targetGoogleSearch: false, targetSearchNetwork: false, targetContentNetwork: false };
        if (adType === 'Search') {
            advertisingChannelType = 'SEARCH';
            if (networks.includes('Search Network')) { networkSettings.targetGoogleSearch = true; networkSettings.targetSearchNetwork = true; }
            if (networks.includes('Display Network')) networkSettings.targetContentNetwork = true;
        } else if (adType === 'Display') {
            advertisingChannelType = 'DISPLAY';
            if (networks.includes('Display Network')) networkSettings.targetContentNetwork = true;
        }

        // --- 3. Create Campaign ---
        const campaignOpData: CampaignOperationData = {
            name: title,
            advertisingChannelType: advertisingChannelType || 'SEARCH',
            status: "PAUSED",
            campaignBudget: campaignBudgetResourceName,
            networkSettings: networkSettings,
            startDate: formatDateForApi(new Date(startDate)),
            endDate: formatDateForApi(new Date(endDate)),
        };

        // Correctly set bidding strategy for REST API
        const strategy = biddingStrategy?.toUpperCase();
        if (strategy === 'MANUAL_CPC') {
            campaignOpData.manualCpc = {}; // Empty object indicates Manual CPC
        } else if (strategy === 'MAXIMIZE_CLICKS') {
            campaignOpData.targetSpend = {}; // TargetSpend is used for Maximize Clicks at campaign level
        } else if (strategy === 'MAXIMIZE_CONVERSIONS') {
            campaignOpData.maximizeConversions = {}; // For Maximize Conversions
            // Optionally, you can add targetCpaMicros: "YOUR_TARGET_CPA_IN_MICROS"
        } else {
            // Fallback or handle other specific strategies if needed
           
            campaignOpData.manualCpc = {};
        }
        
        const campaignResponse = await makeGoogleAdsApiRequest(accessToken, customerIdToOperateOn, managerId, 'POST', 'campaigns:mutate', { operations: [{ create: campaignOpData }] } as unknown);
        if (!campaignResponse.results || campaignResponse.results.length === 0 || !campaignResponse.results[0].resourceName) {
            throw new Error("Campaign creation failed or did not return a resource name.");
        }
        const campaignResourceName = campaignResponse.results[0].resourceName;
       

        // --- 4. Create Ad Group ---
        const adGroupOpData: AdGroupOperationData = {
            name: `${title.substring(0, 100)} Ad Group 1`, campaign: campaignResourceName, status: "ENABLED",
            type: adType === 'Search' ? "SEARCH_STANDARD" : "DISPLAY_STANDARD",
        };
        if (adType === 'Search' && campaignOpData.manualCpc) { // Check if manualCpc was set
            adGroupOpData.cpcBidMicros = "1000000"; // Example if ad group level bid needed for Manual CPC
        }
        const adGroupResponse = await makeGoogleAdsApiRequest(accessToken, customerIdToOperateOn, managerId, 'POST', 'adGroups:mutate', { operations: [{ create: adGroupOpData }] } as unknown);
        if (!adGroupResponse.results || adGroupResponse.results.length === 0 || !adGroupResponse.results[0].resourceName) {
            throw new Error("Ad Group creation failed or did not return a resource name.");
        }
        const adGroupResourceName = adGroupResponse.results[0].resourceName;
        

        // --- 5. Process Ad Creatives & Link Assets ---
        const adGroupAdOperations = [];
        const campaignAssetLinkOperations = [];
        let processedAdAResults = null;
        let processedAdBResults = null;

        const processCreativeDataWithAxios = async (adContent: SearchAdData | DisplayAdData, imageFileFromReq: Express.Multer.File | null, adSuffix: string, currentAdType: string) => {
            if (!adContent) throw new Error(`Ad creative data for ${adSuffix} is missing.`);
            let gcsUrl = (adContent as DisplayAdData).imgUrl || null;
            let adsImageAssetResourceName = null;

            if (imageFileFromReq) { 
              // Check if Cloudinary is configured by looking for path property
              const isCloudinaryUpload = (imageFileFromReq as any).path;
              
              if (isCloudinaryUpload) {
                // With Cloudinary storage, file is already uploaded and URL is available
                gcsUrl = (imageFileFromReq as any).path; // Cloudinary provides the URL in the path property
              } else {
                // With memory storage, upload to Cloudinary manually
                gcsUrl = await uploadFileToGCS(imageFileFromReq);
              }
            }
          
            const isImageAssetNeeded = (currentAdType === 'Display') || (currentAdType === 'Search' && gcsUrl);
            if (gcsUrl && isImageAssetNeeded) {
                adsImageAssetResourceName = await createImageAssetWithAxios(accessToken, customerIdToOperateOn, managerId, null, gcsUrl, `${currentAdType}Img-${adSuffix}`);
                if (!adsImageAssetResourceName && currentAdType === 'Display') throw new Error(`Critical image asset failed for Display Ad ${adSuffix}.`);
                if (!adsImageAssetResourceName && currentAdType === 'Search') throw new Error(`Search Ad ${adSuffix} image asset creation failed.`);
            }
            
            let adOperation;
            
            if (currentAdType === 'Search') {
                const searchAd = adContent as SearchAdData;
                if (!searchAd.finalUrl || !searchAd.headlines || !searchAd.descriptions) throw new Error(`Missing components for Search Ad ${adSuffix}`);
                adOperation = { create: { adGroup: adGroupResourceName, status: 'PAUSED', ad: { name: `Search Ad ${adSuffix} ${Date.now()}`.substring(0,100), responsiveSearchAd: { headlines: searchAd.headlines.map((h: { text: string }) => ({ text: h.text })), descriptions: searchAd.descriptions.map((d: { text: string }) => ({ text: d.text })), path1: searchAd.path1, path2: searchAd.path2 }, finalUrls: [searchAd.finalUrl] }}};
            } else if (currentAdType === 'Display') {
              if (!adsImageAssetResourceName) throw new Error(`Image asset required for Display Ad ${adSuffix}.`);
              const displayAd = adContent as DisplayAdData;
              if (!displayAd.finalUrl || !displayAd.headline || !displayAd.descriptionText) throw new Error(`Missing components for Display Ad ${adSuffix}`);
              
              // For REST API with ResponsiveDisplayAd, embed text directly
              adOperation = {
                  create: {
                      adGroup: adGroupResourceName, // This should be available in the scope
                      status: 'PAUSED',
                      ad: {
                          name: `Display Ad ${adSuffix} ${Date.now()}`.substring(0,100),
                          responsiveDisplayAd: {
                            marketingImages: [{ asset: adsImageAssetResourceName }],
                            headlines: [{ text: (adContent as DisplayAdData).headline.substring(0, 30) }], // Truncate or validate length on frontend
                            longHeadline: { text: ((adContent as DisplayAdData).longHeadline || (adContent as DisplayAdData).headline).substring(0, 90) }, // Truncate
                            descriptions: [{ text: (adContent as DisplayAdData).descriptionText.substring(0, 90) }], // Truncate
                            businessName: process.env.GOOGLE_ADS_BUSINESS_NAME || dealer.fullName || "Your Business Name",
                            // ... add squareMarketingImages and logoImages
                        },
                          finalUrls: [adContent.finalUrl]
                      }
                  }
              };
          }
            return { adOperation, imageAssetResourceName: adsImageAssetResourceName, finalGcsUrl: gcsUrl };
        };
        
        const adAFile = adType === 'Search' ? (req as { files?: { searchAdAImageFile?: Express.Multer.File[] } }).files?.searchAdAImageFile?.[0] || null : (req as { files?: { displayAdAImageFile?: Express.Multer.File[] } }).files?.displayAdAImageFile?.[0] || null;
        processedAdAResults = await processCreativeDataWithAxios(adType === 'Search' ? searchAdA : displayAdA, adAFile, "A", adType);
        if (processedAdAResults.adOperation) adGroupAdOperations.push(processedAdAResults.adOperation);

        if (isABTesting) {
            const adBFile = adType === 'Search' ? (req as { files?: { searchAdBImageFile?: Express.Multer.File[] } }).files?.searchAdBImageFile?.[0] || null : (req as { files?: { displayAdBImageFile?: Express.Multer.File[] } }).files?.displayAdBImageFile?.[0] || null;
            processedAdBResults = await processCreativeDataWithAxios(adType === 'Search' ? searchAdB : displayAdB, adBFile, "B", adType);
            if (processedAdBResults.adOperation) adGroupAdOperations.push(processedAdBResults.adOperation);
        }

        if (adGroupAdOperations.length > 0) {
            await makeGoogleAdsApiRequest(accessToken, customerIdToOperateOn, managerId, 'POST', 'adGroupAds:mutate', { operations: adGroupAdOperations } as unknown);
        }

        if (adType === 'Search') {
            if (processedAdAResults?.imageAssetResourceName) {
                campaignAssetLinkOperations.push({ create: { asset: processedAdAResults.imageAssetResourceName, campaign: campaignResourceName, fieldType: 'AD_IMAGE' }});
            }
            if (isABTesting && processedAdBResults?.imageAssetResourceName && processedAdBResults.imageAssetResourceName !== processedAdAResults?.imageAssetResourceName) {
                campaignAssetLinkOperations.push({ create: { asset: processedAdBResults.imageAssetResourceName, campaign: campaignResourceName, fieldType: 'AD_IMAGE' }});
            }
        }
        if (campaignAssetLinkOperations.length > 0) {
            await makeGoogleAdsApiRequest(accessToken, customerIdToOperateOn, managerId, 'POST', 'campaignAssets:mutate', { operations: campaignAssetLinkOperations } as unknown);
           
        }
        
 
        const newCampaignData = {
            title, description: campaignLevelDescription, campaignObjective, networks, adType,
            dailyBudget, biddingStrategy, targetLocations, startDate, endDate, isABTesting,
            googleAdsCampaignId: campaignResourceName,
            googleAdsAdGroupId: adGroupResourceName,
            googleAdsClientCustomerId: customerIdToOperateOn,
            primaryAdCreative: { 
                ...(adType === 'Search' ? searchAdA : displayAdA), 
                imageUrl: processedAdAResults?.finalGcsUrl || null 
            },
            abTestAdCreative: isABTesting && processedAdBResults ? { 
                ...(adType === 'Search' ? searchAdB : displayAdB), 
                imageUrl: processedAdBResults.finalGcsUrl || null 
            } : null,
            totalBudget, 
            dealerId: currentDealerId, 
            status: 'paused',
        };
        const newCampaign = await Campaign.create(newCampaignData);

        res.status(201).json({ message: "Campaign created successfully using Axios...", campaign: newCampaign });

    } catch (error: unknown) {
        const errorObj = error as Error & { 
            statusCode?: number; 
            name?: string; 
            googleAdsFailure?: { errors?: unknown[] }; 
            errors?: unknown; 
            response?: { data?: { error?: { details?: unknown } } } 
        };
        res.status(errorObj.statusCode || (errorObj.name === 'ValidationError' ? 400 : 500)).json({
            message: errorObj.message || "Failed to create campaign.",
            errors: errorObj.googleAdsFailure?.errors || errorObj.errors || (errorObj.response?.data?.error?.details) || errorObj.toString(),
        });
    }
});

function getStatusMessage(campaign: {
  startDate: string;
  endDate: string;
  status?: string;
  payment?: {
    status?: string;
  };
}) {
  const now = moment();
  const startDate = moment(campaign.startDate);
  const endDate = moment(campaign.endDate);

  if (campaign.payment?.status === 'pending') {
      return "Pending Payment";
  }
  if (campaign.payment?.status === 'failed') {
      return "Payment Failed";
  }
  if (now.isBefore(startDate)) {
      return "Scheduled";
  }
  if (now.isAfter(endDate)) {
      return "Ended";
  }
  if (now.isBetween(startDate, endDate, undefined, '[]')) { // '[]' includes start and end dates
      if (campaign.status === 'paused') return "Paused"; // Assuming your DB has a campaign status
      return "Running";
  }
  return campaign.status || "Unknown"; // Fallback to DB status or a default
}

 
 
campaignRouter.get('/dealer/:dealerId/with-stats', async (req, res) => {
try {
  const { dealerId } = req.params;
 

  if (!dealerId) {
    return res.status(400).json({ message: 'Dealer ID is required.' });
  }

  const dealer = await Dealer.findById(dealerId);
  if (!dealer) {
    return res.status(404).json({ message: 'Dealer not found.' });
  }
 
  const managerId = process.env.GOOGLE_ADS_MANAGER_ID?.replace(/-/g, "");
  if (!managerId) {
     
      return res.status(500).json({ message: "Server configuration error: MCC ID missing." });
  }

  const campaignsFromDb = await Campaign.find({ dealerId: dealerId })
    .sort({ createdAt: -1 }); 
//  console.log(campaignsFromDb);
  if (!campaignsFromDb || campaignsFromDb.length === 0) {
    return res.json({ campaigns: [] });  
  }

  
  const accessToken = await getAccessToken();
  
  
  const campaignsWithStats = [];

  for (const campaign of campaignsFromDb) {
    let impressionsData = [{ totalImpressions: 0, totalClicks: 0 }];  

    if (campaign.googleAdsCampaignId && dealer.googleAdsCustomerId) {
      const clientAccountId = dealer.googleAdsCustomerId;
      const campaignAdsId = campaign.googleAdsCampaignId.split('/').pop();  
      
      const gaqlQuery = `
        SELECT
          metrics.impressions,
          metrics.clicks
        FROM campaign
        WHERE campaign.id = ${campaignAdsId}
        -- You can add date segmentation here if needed, e.g.,
        -- AND segments.date DURING LAST_30_DAYS
      `;
      try {
         const statsResponse = await makeGoogleAdsApiRequest(
          accessToken,
          clientAccountId,  
          managerId,      
          'POST',
          'googleAds:search',
          { query: gaqlQuery } as unknown
        );
        

        if (statsResponse.results && statsResponse.results.length > 0) {
          // Assuming the query returns one row for the campaign totals without date segmentation
          const metrics = statsResponse.results[0].metrics;
          impressionsData = [{
            totalImpressions: parseInt(metrics.impressions || "0"),
            totalClicks: parseInt(metrics.clicks || "0"),
          }];
          
        } 
      } catch (statsError: unknown) {
        throw new Error(`❌ Error fetching stats for Campaign ID ${campaign.googleAdsCampaignId}: ${(statsError as Error).message}`);
        // Keep default impressionsData if stats fetching fails
      }
    } 
    // Construct the object similar to DUMMY_CAMPAIGNS_DATA
    campaignsWithStats.push({
      _id: campaign._id.toString(),
      name: campaign.title, // Assuming 'title' in your DB maps to 'name' in dummy data
      startDate: moment(campaign.startDate).format("YYYY-MM-DD"),
      endDate: campaign.endDate ? moment(campaign.endDate).format("YYYY-MM-DD") : null,
      impressions: impressionsData, // Array with one object for totals, or more if segmented
      payment: { // Assuming these fields exist on your Campaign model
        price: campaign.payment?.amountPaid || campaign.totalBudget || 0, // Fallback
        status: campaign.payment?.status || "unknown",
        invoiceLink: campaign.payment?.transactionId || null,
      },
      // These fields seem specific to your application's needs, map them from your Campaign model
      advertiser: dealer.companyName || dealer.fullName || "N/A", // Example
      imageUrl: campaign.primaryAdCreative?.imageUrl || campaign.abTestAdCreative?.imageUrl || "https://via.placeholder.com/300x250.png?text=Ad+Preview", // Example
      headline: campaign.primaryAdCreative?.headline || campaign.primaryAdCreative?.headlines?.[0]?.text || "Campaign Headline", // Example
      bodyText: campaign.description || "Campaign description.", // Example
      callToActionText: "Learn More", // Example, or from ad creative data
      destinationUrl: campaign.primaryAdCreative?.finalUrl || "#", // Example
      budget: campaign.dailyBudget, // Or totalBudget, depending on what 'budget' means in dummy data
      targetAudience: campaign.targetLocations || "General", // Example
      statusMessage: getStatusMessage({
        startDate: campaign.startDate?.toISOString() || new Date().toISOString(),
        endDate: campaign.endDate?.toISOString() || new Date().toISOString(),
        status: campaign.status,
        payment: campaign.payment ? { status: campaign.payment.status } : undefined
      }), // Derived status
      // Add any other fields from your Campaign model that match the dummy structure
      googleAdsCampaignId: campaign.googleAdsCampaignId,
      googleAdsClientCustomerId: dealer.googleAdsCustomerId,
      adType: campaign.adType,
      networks: campaign.networks,
    });
  }

  res.json({ campaigns: campaignsWithStats });

} catch(err: unknown) {
 // console.log(err);
  
  res.status(500).json({ message: 'Server error while fetching campaigns with stats.' });
}
});

campaignRouter.post('/exchange-code', async (req, res) => {
  //console.log('req.body',req.body);
      const code = req.body.code.dealerId;
  //    console.log('code',code);
      if (!code) {
        return res.status(400).json({ message: 'Authorization code is required.' });
      }
      try {
        const { tokens } = await oauth2Client.getToken(code);
        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token; // THIS WILL BE PRESENT HERE
        
        if (refreshToken) {
          // TODO: Securely store the refreshToken on your server, associated with the user
          
        }
    
        // You can verify the id_token to get user info or use accessToken for API calls
        // For now, just send back the access token
        res.json({ accessToken });
    
      } catch(err: unknown) {
      //  console.log('error',err);
        
        res.status(500).json({ message: 'Failed to exchange authorization code.' });
      }
    });

export default campaignRouter;