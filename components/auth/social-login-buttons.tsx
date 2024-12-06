"use client";

import { Button } from "@/components/ui/button";
import { GitHubLogo } from "@/components/icons/github-logo";
import { GoogleLogo } from "@/components/icons/google-logo";

export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="w-full">
        <GoogleLogo className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" className="w-full">
        <GitHubLogo className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  )
} 