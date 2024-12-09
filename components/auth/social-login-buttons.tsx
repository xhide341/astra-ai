"use client";

import { Button } from "@/components/ui/button";
import { GitHubLogo } from "@/components/icons/github-logo";
import { GoogleLogo } from "@/components/icons/google-logo";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const SocialLoginButtons = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    });
  }
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="w-full" onClick={() => onClick("google")}>
        <GoogleLogo className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" className="w-full" onClick={() => onClick("github")}>
        <GitHubLogo className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  )
} 

export default SocialLoginButtons;
