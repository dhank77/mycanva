"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();
  const alert = params.get("error");

  const onProvider = (provider: "google" | "github") => {
    signIn(provider);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
  };

  return (
    <Card className="w-full p-8">
      <CardHeader className="p-0">
        <CardTitle>Login to Continune</CardTitle>
        <CardDescription>
          Use your email or another service to Continune
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4 p-2">
        {alert && (
          <div className="p-2 bg-destructive/20 mb-4 flex justify-center items-center rounded-md">
            <AlertTriangle className="size-4 text-destructive mr-2" />
            <p className="text-sm font-medium text-destructive">
              User and password not found!
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <Separator className="my-6" />
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProvider("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-4 absolute top-3 left-8" />
            <p>Continue with Google</p>
          </Button>
          <Button
            onClick={() => onProvider("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-4 absolute top-3 left-8" />
            <p>Continue with Github</p>
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Dont have an account?&nbsp;
            <span className="text-sky-700 hover:underline">
              <Link href="/register">Register</Link>
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
