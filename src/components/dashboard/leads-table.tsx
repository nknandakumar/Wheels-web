"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { deleteLead } from "@/lib/data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface LeadsTableProps {
	leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
	const router = useRouter();
    const { toast } = useToast();
    const [toDeleteId, setToDeleteId] = useState<string | null>(null);

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
				<TableHeader className="bg-green-100" >
					<TableRow>
						<TableHead>LOAN ID</TableHead>
						<TableHead>NAME</TableHead>
						<TableHead>MOBILE NO</TableHead>
						<TableHead>STAGE</TableHead>
						<TableHead>DATE</TableHead>
						<TableHead className="text-right">ACTIONS</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{leads.map((lead) => (
						<TableRow key={lead.id}>
							<TableCell className="font-semibold">{lead.loanId || "N/A"}</TableCell>
							<TableCell className="font-medium">{lead.name || "N/A"}</TableCell>
							<TableCell>{lead.mobileNo || "N/A"}</TableCell>
							<TableCell>
								<Badge variant={getBadgeVariant(lead.stage)}>
									{lead.stage || "Pending"}
								</Badge>
							</TableCell>
							<TableCell>{lead.dateTime || "N/A"}</TableCell>
							<TableCell className="text-right space-x-2">
								<Button
									variant="ghost"
									size="sm"
									className="text-blue-600"
									onClick={() => router.push(`/dashboard/my-leads/${lead.id}/view`)}
								>
									View
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => router.push(`/dashboard/my-leads/${lead.id}`)}
								>
									Update
								</Button>
								<AlertDialog>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" aria-label="More">
												⋯
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<AlertDialogTrigger asChild>
												<DropdownMenuItem
													onClick={() => {
														setToDeleteId(lead.id);
														toast({ variant: "destructive", title: "Delete Lead?", description: "This action cannot be undone." });
													}}
												>
													Delete
												</DropdownMenuItem>
											</AlertDialogTrigger>
										</DropdownMenuContent>
									</DropdownMenu>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Are you sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This will permanently delete this lead.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={async () => {
													if (!toDeleteId) return;
													try {
														await deleteLead(toDeleteId);
														toast({ title: "Deleted", description: "Lead removed." });
														router.refresh?.();
													} catch (e) {
														toast({ variant: "destructive", title: "Error", description: "Failed to delete lead." });
													} finally {
														setToDeleteId(null);
													}
												}}
											>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
