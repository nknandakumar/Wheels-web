"use client";

import { useEffect, useState, useMemo } from "react";
import { getLeads } from "@/lib/data";
import type { Lead } from "@/lib/schemas";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { Input } from "@/components/ui/input";

export default function MyLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLeads(getLeads());
    setLoading(false);
  }, []);

  const filteredLeads = useMemo(() => {
    if (!searchTerm) {
      return leads;
    }
    return leads.filter(lead =>
      Object.values(lead).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [leads, searchTerm]);

  return (
    <div className="flex flex-col h-full p-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Leads</h1>
        <div className="w-full max-w-sm">
          <Input
            placeholder="Find Case details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      <main className="flex-1">
        {loading ? (
          <p>Loading leads...</p>
        ) : (
          <LeadsTable leads={filteredLeads} />
        )}
      </main>
    </div>
  );
}
