'use client'

import React from 'react'
import { IconProps } from '@phosphor-icons/react'

interface BenefitCardProps {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
  title: string
  description: string
}

export function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
  return (
    <div className="group relative">
      
      <div className="relative overflow-hidden rounded-lg p-4 backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-tertiary/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.07)] shadow-[0_0_10px_rgba(255,255,255,0.03)]">
        <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center rounded-md bg-accent">
          <Icon />
        </div>
        <h3 className="mt-18 mb-2 text-lg font-regular text-highlight">{title}</h3>
        <p className="text-sm font-thin text-gray-300 line-clamp-2">{description}</p>
      </div>
    </div>
  )
}

