import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";

const model = new ChatTogetherAI({
  model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  temperature: 0,
});

export { model };