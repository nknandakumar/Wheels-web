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
import type { Lead } from "@/lib/schemas";
import { Badge } from "@/components/ui/badge";

interface LeadsTableProps {
	leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
	const router = useRouter();

	if (leads.length === 0) {
		return (
			<div className="text-center p-8 border rounded-lg bg-card">
				<h3 className="text-xl font-semibold">No Leads Found</h3>
				<p className="text-muted-foreground">
					Get started by creating a new lead.
				</p>
			</div>
		);
	}

	const getBadgeVariant = (stage: string | undefined | null) => {
		if (!stage) return "outline";

		switch (stage.toLowerCase()) {
			case "disbursed":
				return "default"; // primary color
			case "sanction":
				return "secondary";
			case "rejected":
				return "destructive";
			default:
				return "outline";
		}
	};

	return (
		<div className="border rounded-lg">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Date & Time</TableHead>
						<TableHead>Loan ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Mobile No</TableHead>
						<TableHead>Loan Amount</TableHead>
						<TableHead>Stage</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{leads.map((lead) => (
						<TableRow key={lead.id}>
							<TableCell>{lead.dateTime || "N/A"}</TableCell>
							<TableCell>{lead.loanId || "N/A"}</TableCell>
							<TableCell className="font-medium">
								{lead.name || "N/A"}
							</TableCell>
							<TableCell>{lead.mobileNo || "N/A"}</TableCell>
							<TableCell>
								{lead.loanAmount
									? new Intl.NumberFormat("en-IN", {
											style: "currency",
											currency: "INR",
									  }).format(lead.loanAmount)
									: "N/A"}
							</TableCell>
							<TableCell>
								<Badge variant={getBadgeVariant(lead.stage)}>
									{lead.stage || "Pending"}
								</Badge>
							</TableCell>
							<TableCell className="text-right">
								<Button
									variant="outline"
									size="sm"
									onClick={() => router.push(`/dashboard/my-leads/${lead.id}`)}
								>
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
