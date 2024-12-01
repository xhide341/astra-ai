'use client'

import { BenefitCard } from '../components/cards/benefit-card'
import { 
  IconContext,
  GraduationCap, 
  BookOpen, 
  PencilSimple, 
  ChatCircleDots, 
  DeviceMobile, 
  ChartBar 
} from '@phosphor-icons/react'

export default function BenefitsSection() {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Personalized Learning Paths",
      description: "Tailor your learning journey with content that adapts to your needs and goals."
    },
    {
      icon: BookOpen,
      title: "Effortless Knowledge Summaries",
      description: "Get concise and clear summaries of complex topics, making learning more efficient."
    },
    {
      icon: PencilSimple,
      title: "Interactive Study Notes",
      description: "Break down topics into bite-sized notes, perfect for quick revision and deeper understanding."
    },
    {
      icon: ChatCircleDots,
      title: "Smart Question Suggestions",
      description: "Stay on track with AI-generated questions that guide your learning and reinforce key concepts."
    },
    {
      icon: DeviceMobile,
      title: "Always Accessible",
      description: "Learn anytime, anywhere, with AURA's cloud-based platform, ensuring notes are available."
    },
    {
      icon: ChartBar,
      title: "Instant Feedback & Insights",
      description: "Receive real-time feedback and insights to track progress and improve learning experience."
    }
  ]

  return (
    <IconContext.Provider
      value={{
        size: 24,
        weight: "duotone",
        color: "white",
      }}
    >
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </section>
      </main>
    </IconContext.Provider>
  )
}

