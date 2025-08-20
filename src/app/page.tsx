"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, getSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "admin">("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const s = getSession();
    if (s) {
      router.replace(s.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(role, username, password);
    if (res.ok) {
      router.push(role === "admin" ? "/admin" : "/dashboard");
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
       <div className="text-center space-y-1 mb-6">
          <div className="text-3xl md:text-6xl font-bold  tracking-tight">Wheels Web</div>
         
        </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-6">
      <h1 className="text-xl font-semibold">Sign in</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={role === "user" ? "default" : "outline"}
                onClick={() => setRole("user")}
                size="sm"
              >
                User
              </Button>
              <Button
                type="button"
                variant={role === "admin" ? "default" : "outline"}
                onClick={() => setRole("admin")}
                size="sm"
              >
                Admin
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={role === "admin" ? "admin@example.com" : "user@example.com"}
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={role === "admin" ? "admin123" : "user123"}
              autoComplete="current-password"
            />
          </div>

          {error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : null}

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="text-xs text-muted-foreground">
          For demo:
          <div>Admin: admin@example.com / admin123</div>
          <div>User: user@example.com / user123</div>
        </div>
      </div>
    </div>
  );
}
