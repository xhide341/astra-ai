import { AlertCircle } from 'lucide-react'

interface FormErrorProps {
  message: string | undefined;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-start gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md animate-in fade-in duration-300" role="alert">
      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}

