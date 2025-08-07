import { NewLeadForm } from "@/components/dashboard/new-lead-form";

export default function NewLeadPage() {
  return (
    <div className="flex flex-col h-full p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">New Lead</h1>
      </header>
      <main className="flex-1">
        <NewLeadForm />
      </main>
    </div>
  );
}
