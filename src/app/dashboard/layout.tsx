"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Only check localStorage on the client side
		const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
		if (!isAuthenticated) {
			router.replace("/");
		} else {
			setIsAuthenticating(false);
		}
	}, [router]);

	// Don't render anything until mounted to prevent hydration mismatch
	if (!mounted) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-background">
				<div className="w-full max-w-md space-y-4 p-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-32 w-full" />
				</div>
			</div>
		);
	}

	if (isAuthenticating) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-background">
				<div className="w-full max-w-md space-y-4 p-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-32 w-full" />
				</div>
			</div>
		);
	}

	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset>
				<DashboardHeader />
				<main className="flex-1 overflow-y-auto pt-16">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
