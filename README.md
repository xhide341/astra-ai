# ASTRA AI

🧠 Explore discussions with dual AI minds that observe, reflect, and teach together.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎯 Project Overview

ASTRA AI is a platform that facilitates dynamic learning through dual AI minds. Users can enter a topic and watch as AI agents debate and explore ideas, providing new perspectives through AI dialogue.

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
- HuggingFace Inference

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
- Uses React Server Components.
- Implemented two custom APIs, one for SSE connection (/chat/stream) and another for message processing (/chat/trigger).
- Features a simple UI with dark-mode feature.

## 🚀 Deployment

The application can be deployed on Vercel for optimal performance.
