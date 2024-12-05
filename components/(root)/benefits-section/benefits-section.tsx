'use client';

import { BenefitCard } from '@/components/(root)/benefits-section/benefit-card';
import { 
  IconContext,
  GraduationCap, 
  BookOpen, 
  PencilSimple, 
  ChatCircleDots, 
  DeviceMobile, 
  ChartBar 
} from '@phosphor-icons/react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Personalized Learning",
      description: "Tailor your learning journey with content that adapts to your needs."
    },
    {
      icon: BookOpen,
      title: "Effortless Summaries",
      description: "Get concise and clear summaries of complex topics for efficient learning."
    },
    {
      icon: PencilSimple,
      title: "Interactive Study Notes",
      description: "Break down topics into bite-sized notes, perfect for quick revisions."
    },
    {
      icon: ChatCircleDots,
      title: "Smart Suggestions",
      description: "Stay on track with AI-generated questions that reinforce key concepts."
    },
    {
      icon: DeviceMobile,
      title: "Always Accessible",
      description: "Learn anytime and anywhere, with AURA's cloud-based platform."
    },
    {
      icon: ChartBar,
      title: "Instant Feedback & Insights",
      description: "Receive real-time feedback and insights to track progress."
    }
  ]

  return (
    <IconContext.Provider
      value={{
        size: 24,
        weight: "duotone",
        color: "var(--primary-foreground)",
      }}
    >
      <div className="py-8 px-4 flex flex-col gap-6 max-w-screen-xl mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={`benefit-${index}`}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              className={`benefit-${index}`}
            />
          ))}
        </div>
      </div>
    </IconContext.Provider>
  )
}

