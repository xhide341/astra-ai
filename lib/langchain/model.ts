import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";

// Create two distinct models with different temperatures for different conversation styles
const teacherModel = new ChatTogetherAI({
  model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  temperature: 0.7,
  maxTokens: 1000,
  streaming: true,
  stop: ["<end>", "</answer>", "<script>"],
  togetherAIApiKey: process.env.TOGETHER_AI_API_KEY,
});

const facilitatorModel = new ChatTogetherAI({
  model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  temperature: 0.85, // Slightly higher for more engaging dialogue
  maxTokens: 1000,
  streaming: true,
  stop: ["<end>", "</answer>", "<script>"],
  togetherAIApiKey: process.env.TOGETHER_AI_API_KEY,
});

export { teacherModel, facilitatorModel };
