import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";

const model = new ChatTogetherAI({
  model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  temperature: 0.7,
  maxTokens: 1000,
  stop: ["<end>", "</answer>", "<script>"],
  togetherAIApiKey: process.env.TOGETHER_AI_API_KEY,
  callbacks: [{
    handleLLMEnd: async (output) => {
      console.log("Tokens Used:", {
        prompt_tokens: output.llmOutput?.tokenUsage.promptTokens,
        completion_tokens: output.llmOutput?.tokenUsage.completionTokens,
        total_tokens: output.llmOutput?.tokenUsage.totalTokens
      });
    }
  }]
});

export { model };