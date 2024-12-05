'use client'

import React from 'react'
import { IconProps } from '@phosphor-icons/react'

interface BenefitCardProps {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
  title: string
  description: string
  className?: string
}

export function BenefitCard({ icon: Icon, title, description, className }: BenefitCardProps) {
  return (
    <div className={className}>
      <div className="w-full min-h-[200px] flex flex-col rounded-lg p-4 border border-white/10 bg-white/5 hover:bg-tertiary/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.07)] shadow-[0_0_10px_rgba(255,255,255,0.03)]">
        <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-md bg-primary">
          <Icon />
        </div>
        <div className="flex flex-col gap-1 mt-auto">
          <h3 className="text-base sm:text-lg font-regular text-highlight">{title}</h3>
          <p className="text-xs sm:text-sm font-thin text-gray-300 text-wrap">{description}</p>
        </div>
      </div>
    </div>
  )
}

