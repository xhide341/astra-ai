# ASTRA AI - Observational learning with AI.

Drawing inspiration from the Latin word "astra" meaning "stars" or "to the stars," ASTRA AI embodies the pursuit of knowledge and exploration. Just as ancient astronomers learned by observing celestial bodies, this platform enables users to learn through observation of AI-driven discourse.

ASTRA AI is a platform that facilitates dynamic learning through dual AI minds. Users can enter a topic and watch as AI agents—a knowledgeable professor and a curious student engage and explore ideas from multiple angles. The design reflects its namesake's philosophy: reaching for understanding through guided observation and interactive exploration.

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- Auth.js (NextAuth)

### Backend

- Next.js API Routes
- Prisma ORM
- LangChain
- HuggingFace Inference / TogetherAI API

## 🏗️ Architecture

The project follows a modern Next.js app router structure:

```
astra-ai/
├── app/              # Next.js app router
├── components/       # UI components
├── lib/              # Core utilities
├── prisma/           # Database schema
├── actions/          # Server actions
├── hooks/            # Custom React hooks
├── schemas/          # Validation schemas
├── types/            # TypeScript definitions
```

## 💡 Learning Outcomes

This project serves as a practice ground for:

- Learning how SSE works.
- Learning about how RSC works.
- Learning about NextJS in general.
- Implementing authentication with Auth.js together with Prisma.
- Working with AI models and LangChain (LangGraph).
- Type-safe development with TypeScript and Prisma.

## 📝 Development Notes

- Package management with pnpm.
- Implemented neonpgsql for the database, prisma/authjs for auth, llama 3.1b for the llm, and langgraph for the ai framework.
- Uses React Server Components.
- Implemented two custom APIs, one for SSE connection (/chat/stream) and another for message processing (/chat/trigger).
- Features a simple UI with dark-mode feature.

## 🚀 Deployment

- **Web App** [astra-ai-iota.vercel.app](https://astra-ai-iota.vercel.app/)
