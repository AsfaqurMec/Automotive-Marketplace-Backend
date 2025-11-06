import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
/**
 * Gets a response from the AI model.
 * @param {string} instructions - The system prompt for the AI.
 * @param {Array} history - The previous messages in the chat.
 * @param {string} newMessage - The new message from the dealer.
 * @returns {Promise<string>} The AI's response content.
 */
async function getAIResponse(instructions, history, newMessage) {
    try {
        const messages = [
            { role: 'system', content: instructions },
            ...history.map(msg => ({
                role: msg.sender === 'dealer' ? 'user' : 'assistant',
                content: msg.content
            })),
            { role: 'user', content: newMessage }
        ];
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages,
        });
        return completion.choices[0].message.content || 'No response from AI';
    }
    catch {
        return 'Sorry, I encountered an error and cannot respond right now.';
    }
}
export default getAIResponse;
//# sourceMappingURL=aiService.js.map