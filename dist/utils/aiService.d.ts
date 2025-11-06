interface Message {
    sender: string;
    content: string;
}
/**
 * Gets a response from the AI model.
 * @param {string} instructions - The system prompt for the AI.
 * @param {Array} history - The previous messages in the chat.
 * @param {string} newMessage - The new message from the dealer.
 * @returns {Promise<string>} The AI's response content.
 */
declare function getAIResponse(instructions: string, history: Message[], newMessage: string): Promise<string>;
export default getAIResponse;
