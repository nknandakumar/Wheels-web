"use client";

import { useEffect, useState, useMemo } from "react";
import { getDisbursements } from "@/lib/data";
import type { Disbursement } from "@/lib/schemas";
import { DisbursementsTable } from "@/components/dashboard/disbursements-table";
import { Input } from "@/components/ui/input";

export default function MyDisbursementsPage() {
  const [disbursements, setDisbursements] = useState<Disbursement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDisbursements(getDisbursements());
    setLoading(false);
  }, []);

  const filteredDisbursements = useMemo(() => {
    if (!searchTerm) {
      return disbursements;
    }
    return disbursements.filter(d =>
      Object.values(d).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [disbursements, searchTerm]);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Disbursements</h1>
        <div className="w-full max-w-sm">
          <Input
            placeholder="Find Case details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <p>Loading disbursements...</p>
        ) : (
          <DisbursementsTable disbursements={filteredDisbursements} />
        )}
      </main>
    </div>
  );
}
