import { NewDisbursementForm } from "@/components/dashboard/new-disbursement-form";

export default function NewDisbursementPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4">
        <h1 className="text-2xl font-bold">New Disbursement</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <NewDisbursementForm />
      </main>
    </div>
  );
}
