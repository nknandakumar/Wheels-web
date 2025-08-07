"use client";

import { useEffect, useState } from "react";
import { getDisbursementById } from "@/lib/data";
import { type Disbursement } from "@/lib/schemas";
import { NewDisbursementForm } from "@/components/dashboard/new-disbursement-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditDisbursementPage({ params }: { params: { id: string } }) {
  const [disbursement, setDisbursement] = useState<Disbursement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = getDisbursementById(params.id);
    if (data) {
      setDisbursement(data);
    } else {
      setError("Disbursement not found.");
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
        <h1 className="text-2xl font-bold">Edit Disbursement</h1>
        <p className="text-muted-foreground">Editing disbursement for: {disbursement?.name}</p>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        {disbursement && <NewDisbursementForm disbursement={disbursement} />}
      </main>
    </div>
  );
}
