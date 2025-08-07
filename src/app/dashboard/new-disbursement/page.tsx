import { NewDisbursementForm } from "@/components/dashboard/new-disbursement-form";

export default function NewDisbursementPage() {
  return (
    <div className="flex flex-col h-full p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">New Disbursement</h1>
      </header>
      <main className="flex-1">
        <NewDisbursementForm />
      </main>
    </div>
  );
}
