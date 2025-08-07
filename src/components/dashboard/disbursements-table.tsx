"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Disbursement } from "@/lib/schemas";
import { Badge } from "@/components/ui/badge";

interface DisbursementsTableProps {
  disbursements: Disbursement[];
}

export function DisbursementsTable({ disbursements }: DisbursementsTableProps) {
  const router = useRouter();

  if (disbursements.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-card">
        <h3 className="text-xl font-semibold">No Disbursements Found</h3>
        <p className="text-muted-foreground">Get started by creating a new disbursement.</p>
      </div>
    );
  }
  
  const getBadgeVariant = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'disbursed':
        return 'default';
      case 'cancellation':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Loan ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Bank / Finance</TableHead>
            <TableHead>Total Loan</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disbursements.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.dateTime}</TableCell>
              <TableCell>{d.loanId}</TableCell>
              <TableCell className="font-medium">{d.name}</TableCell>
              <TableCell>{d.bankFinance}</TableCell>
              <TableCell>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(d.totalLoanAmount)}</TableCell>
               <TableCell>
                <Badge variant={getBadgeVariant(d.stage)}>{d.stage}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/my-disbursements/${d.id}`)}>
                  View/Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
