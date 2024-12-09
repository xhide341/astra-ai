'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  label?: string;
}

export const BackButton = ({ label }: BackButtonProps) => {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm font-md"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  )
}
