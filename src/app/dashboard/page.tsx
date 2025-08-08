"use client";

import { useEffect, useState } from "react";
import { getLeads, getDisbursements } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
	const [leadsCount, setLeadsCount] = useState(0);
	const [disbursementsCount, setDisbursementsCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [leads, disbursements] = await Promise.all([
					getLeads(0, 1), // Just get count
					getDisbursements(0, 1), // Just get count
				]);

				// Get total counts
				const [leadsData, disbursementsData] = await Promise.all([
					fetch(
						"https://script.google.com/macros/s/AKfycbxjI6yQZ6bTZIcZN7WCwQyf1mHlgxCXcdYCQQD9zsp7FdHc9ycXEfbWxpI16jmhVdBGNg/exec"
					),
					fetch(
						"https://script.google.com/macros/s/AKfycbzikdCPoavnrfXXuzQuQUGCA1iN3UodBsXQBeP78K3-LCEfFhRrHGqVOfLob3kx0ge9Cg/exec"
					),
				]);

				const leadsJson = await leadsData.json();
				const disbursementsJson = await disbursementsData.json();

				setLeadsCount(leadsJson.length || 0);
				setDisbursementsCount(disbursementsJson.length || 0);
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col h-full p-6">
				<h1 className="text-2xl font-bold mb-6">Dashboard</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Loading...</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Fetching data from Google Sheets...</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full p-6">
			<h1 className="text-2xl font-bold mb-6">Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Total Leads</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-primary">{leadsCount}</div>
						<p className="text-muted-foreground">
							Total leads in Google Sheets
						</p>
						<Button
							className="mt-4"
							onClick={() => router.push("/dashboard/my-leads")}
						>
							View All Leads
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Total Disbursements</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-primary">
							{disbursementsCount}
						</div>
						<p className="text-muted-foreground">
							Total disbursements in Google Sheets
						</p>
						<Button
							className="mt-4"
							onClick={() => router.push("/dashboard/my-disbursements")}
						>
							View All Disbursements
						</Button>
					</CardContent>
				</Card>
			</div>

			<div className="mt-6">
				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
					</CardHeader>
					<CardContent className="flex gap-4">
						<Button onClick={() => router.push("/dashboard/new-lead")}>
							Add New Lead
						</Button>
						<Button onClick={() => router.push("/dashboard/new-disbursement")}>
							Add New Disbursement
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
