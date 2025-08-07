"use client";

import { useEffect, useState } from "react";
import { getLeadById } from "@/lib/data";
import { type Lead } from "@/lib/schemas";
import { NewLeadForm } from "@/components/dashboard/new-lead-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditLeadPage({ params }: { params: { id: string } }) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const leadData = getLeadById(params.id);
    if (leadData) {
      setLead(leadData);
    } else {
      setError("Lead not found.");
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
        <div className="space-y-4 p-6">
            <Skeleton className="h-10 w-1/4" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    );
  }

  if (error) {
    return <div className="p-6 text-destructive">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4">
        <h1 className="text-2xl font-bold">Edit Lead</h1>
        <p className="text-muted-foreground">Editing lead for: {lead?.name}</p>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        {lead && <NewLeadForm lead={lead} />}
      </main>
    </div>
  );
}
