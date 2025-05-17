"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dispatch,SetStateAction } from "react";

interface PublicNavbarProps {
  darkmode: boolean;
  setDarkmode: Dispatch<SetStateAction<boolean>>;
}

export default function PublicNavbar({darkmode, setDarkmode}: PublicNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          MyApp
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link href="/features">
            <Button variant="ghost">Features</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Sign Up</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}