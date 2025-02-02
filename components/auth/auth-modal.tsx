import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'register'>(initialView);

  const modalContent = {
    login: {
      title: "Welcome back",
      description: "Enter your credentials to access your account",
      component: <LoginForm onToggleView={() => setView('register')} />
    },
    register: {
      title: "Create an account",
      description: "Enter your details to create your account",
      component: <RegisterForm onToggleView={() => setView('login')} />
    }
  };

  const currentView = modalContent[view];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-background z-50">
            <DialogHeader>
            <DialogTitle className="text-2xl text-center">
                {currentView.title}
            </DialogTitle>
            <DialogDescription className="text-center">
                {currentView.description}
            </DialogDescription>
            </DialogHeader>
            {currentView.component}
        </DialogContent>
    </Dialog>
  );
}
