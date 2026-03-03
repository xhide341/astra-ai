import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";

const teacherModel = new ChatTogetherAI({
  model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  temperature: 0.8,
  maxTokens: 1000,
  streaming: true,
  stop: ["<end>", "</answer>", "<script>"],
  togetherAIApiKey: process.env.TOGETHER_AI_API_KEY,
});

const facilitatorModel = new ChatTogetherAI({
  model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  temperature: 0.9,
  maxTokens: 1000,
  streaming: true,
  stop: ["<end>", "</answer>", "<script>"],
  togetherAIApiKey: process.env.TOGETHER_AI_API_KEY,
});

export { teacherModel, facilitatorModel };
