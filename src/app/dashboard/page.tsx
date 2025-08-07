import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FilePlus, Files, FileText, FileBarChart2 } from "lucide-react";

export default function DashboardPage() {
  const features = [
    {
      title: "New Lead",
      description: "Start capturing a new lead with our comprehensive form.",
      href: "/dashboard/new-lead",
      icon: FilePlus,
    },
    {
      title: "My Leads",
      description: "View, manage, and edit all your existing leads.",
      href: "/dashboard/my-leads",
      icon: Files,
    },
    {
      title: "New Disbursement",
      description: "Enter the details for a new vehicle disbursement.",
      href: "/dashboard/new-disbursement",
      icon: FileText,
    },
    {
      title: "My Disbursements",
      description: "Track and manage all completed disbursements.",
      href: "/dashboard/my-disbursements",
      icon: FileBarChart2,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to Wheels Web!</h2>
          <p className="text-muted-foreground">Your central hub for managing leads and disbursements efficiently.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{feature.title}</CardTitle>
                <feature.icon className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <Link href={feature.href} passHref>
                  <Button className="w-full" style={{ backgroundColor: '#90EE90', color: '#006400' }}>
                    Go to {feature.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Use the navigation on the left to move between sections. You can start by creating a <Link href="/dashboard/new-lead" className="text-primary hover:underline">New Lead</Link> or a <Link href="/dashboard/new-disbursement" className="text-primary hover:underline">New Disbursement</Link>. All your saved entries will appear in the 'My Leads' and 'My Disbursements' sections respectively.
                </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
