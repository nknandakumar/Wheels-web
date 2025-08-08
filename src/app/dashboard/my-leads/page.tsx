"use client";

import { useEffect, useState, useMemo } from "react";
import { getLeads, getLeadsCount } from "@/lib/data";
import type { Lead } from "@/lib/schemas";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { Input } from "@/components/ui/input";

export default function MyLeadsPage() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const pageSize = 50;
	const [totalLeads, setTotalLeads] = useState(0);

	useEffect(() => {
		const fetchLeads = async () => {
			try {
				setLoading(true);
				const [leadsData, totalCount] = await Promise.all([
					getLeads(page * pageSize, pageSize),
					getLeadsCount(),
				]);
				setLeads(leadsData);
				setTotalLeads(totalCount);
			} catch (error) {
				console.error("Error fetching leads:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchLeads();
	}, [page]);

	const filteredLeads = useMemo(() => {
		if (!searchTerm) {
			return leads;
		}
		return leads.filter((lead) =>
			Object.values(lead).some((value) =>
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
					<>
						<LeadsTable leads={filteredLeads} />
						<div className="flex justify-between items-center mt-4">
							<button
								onClick={() => setPage((p) => Math.max(0, p - 1))}
								disabled={page === 0}
							>
								Previous
							</button>
							<span>
								Page {page + 1} of {Math.ceil(totalLeads / pageSize)}
							</span>
							<button
								onClick={() =>
									setPage((p) =>
										p + 1 < Math.ceil(totalLeads / pageSize) ? p + 1 : p
									)
								}
								disabled={page + 1 >= Math.ceil(totalLeads / pageSize)}
							>
								Next
							</button>
						</div>
					</>
				)}
			</main>
		</div>
	);
}
