"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/schemas";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import ErrorCard from "./ui/error-card";
import { Spinner } from "./ui/spinner";
import loginUser from "@/actions/login";
import { ILogin } from "@/types/Auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: ILogin) => {
    try {
      setIsPending(true);
      await loginUser(data)
    } catch (error) {
      form.setError("root", {
        message: (error as Error).message,
      });
    } finally {
      setIsPending(false);
    }
  };

  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          {errors.root && <ErrorCard>{errors.root.message}</ErrorCard>}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="pe-9"
                      value={field.value ?? ""}
                      type={isVisible ? "text" : "password"}
                      aria-invalid={errors.password !== undefined}
                    />
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={handleVisibility}
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
                        <Eye size={16} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner variant="circle" color="white" /> : "Login"}
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="underline underline-offset-4">
            Register
          </a>
        </div>
      </form>
    </Form>
  );
}
