import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackButton } from "@/components/ui/buttons/back-button";

interface ErrorCardProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

export function ErrorCard({ title, message, children }: ErrorCardProps) {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        <p className="text-center text-muted-foreground mt-2">
          {message}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <div className="flex justify-center">
          <BackButton label="Back to previous page" />
        </div>
      </CardContent>
    </Card>
  );
}
