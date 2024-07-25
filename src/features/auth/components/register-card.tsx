"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useRegister } from "../api/use-register";
import { AlertTriangle } from "lucide-react";

export const RegisterCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [alert, setAlert] = useState(false);

  const { mutate, isPending } = useRegister();

  const onProvider = (provider: "google" | "github") => {
    signIn(provider);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { email, password, name },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          });
        },
        onError: (data) => {
          setAlert(true)
        },
      }
    );
  };

  return (
    <Card className="w-full p-8">
      <CardHeader className="p-0">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Create your account here or login to OAuth below!
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4 p-2">
        {alert && (
          <div className="p-2 bg-destructive/20 mb-4 flex justify-center items-center rounded-md">
            <AlertTriangle className="size-4 text-destructive mr-2" />
            <p className="text-sm font-medium text-destructive">
              Something went wrong!
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <Input
            disabled={isPending}
            type="text"
            placeholder="Fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            disabled={isPending}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            disabled={isPending}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={isPending} className="w-full" type="submit">
            Register
          </Button>
        </form>
        <Separator className="my-6" />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={isPending}
            onClick={() => onProvider("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-4 absolute top-3 left-8" />
            <p>Continue with Google</p>
          </Button>
          <Button
            disabled={isPending}
            onClick={() => onProvider("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-4 absolute top-3 left-8" />
            <p>Continue with Github</p>
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Already have an account?&nbsp;
            <span className="text-sky-700 hover:underline">
              <Link href="/login">Login</Link>
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};