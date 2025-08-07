import { NewLeadForm } from "@/components/dashboard/new-lead-form";

export default function NewLeadPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4">
        <h1 className="text-2xl font-bold">New Lead</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <NewLeadForm />
      </main>
    </div>
  );
}
