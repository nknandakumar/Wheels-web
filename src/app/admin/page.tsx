"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCreds, isAdmin, setUserCreds } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const [editing, setEditing] = useState<null | "username" | "password">(null);
  const creds = useMemo(() => getCreds(), []);
  const [username, setUsername] = useState(creds.user.username);
  const [password, setPassword] = useState(creds.user.password);
  const [copied, setCopied] = useState<null | "username" | "password">(null);

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/");
    }
  }, [router]);

  const copyText = async (value: string, key: "username" | "password") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  const saveChange = () => {
    if (editing === "username") {
      setUserCreds({ username });
    } else if (editing === "password") {
      setUserCreds({ password });
    }
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage user credentials (demo)</p>
        </div>

        <div className="space-y-6">
          {/* User credentials section */}
          <div className="space-y-4">
            <h2 className="font-medium">User Credentials</h2>

            {/* Username row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div className="space-y-1 md:col-span-2">
                <Label>Username</Label>
                {editing === "username" ? (
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                ) : (
                  <Input value={username} readOnly />
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => copyText(username, "username")}>Copy</Button>
                {editing === "username" ? (
                  <>
                    <Button onClick={saveChange}>Save</Button>
                    <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button onClick={() => setEditing("username")}>Change</Button>
                )}
              </div>
            </div>
            {copied === "username" ? (
              <div className="text-xs text-green-600">Username copied</div>
            ) : null}

            {/* Password row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div className="space-y-1 md:col-span-2">
                <Label>Password</Label>
                {editing === "password" ? (
                  <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                ) : (
                  <Input type="password" value={password} readOnly />
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => copyText(password, "password")}>Copy</Button>
                {editing === "password" ? (
                  <>
                    <Button onClick={saveChange}>Save</Button>
                    <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button onClick={() => setEditing("password")}>Change</Button>
                )}
              </div>
            </div>
            {copied === "password" ? (
              <div className="text-xs text-green-600">Password copied</div>
            ) : null}
          </div>

          <div className="border-t pt-4">
            <h2 className="font-medium mb-2">Admin Credentials (read-only)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Admin Username</Label>
                <Input value="admin@example.com" readOnly />
              </div>
              <div>
                <Label>Admin Password</Label>
                <Input value="admin123" readOnly type="password" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
