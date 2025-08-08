"use client";

import type { Lead, Disbursement } from "./schemas";

const LEADS_SCRIPT_URL =
	"https://script.google.com/macros/s/AKfycbxjI6yQZ6bTZIcZN7WCwQyf1mHlgxCXcdYCQQD9zsp7FdHc9ycXEfbWxpI16jmhVdBGNg/exec";
const DISBURSEMENTS_SCRIPT_URL =
	"https://script.google.com/macros/s/AKfycbzikdCPoavnrfXXuzQuQUGCA1iN3UodBsXQBeP78K3-LCEfFhRrHGqVOfLob3kx0ge9Cg/exec";

// --- Loan ID ---
export const getNextLoanId = (): string => {
	// You may want to generate this on the client only, or use a different approach
	return Date.now().toString();
};

// --- Leads ---
export const getLeads = async (offset = 0, limit = 50): Promise<Lead[]> => {
	const response = await fetch(LEADS_SCRIPT_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch leads");
	}
	const allLeads = await response.json();
	return allLeads.slice(offset, offset + limit);
};

export const getLeadsCount = async (): Promise<number> => {
	const response = await fetch(LEADS_SCRIPT_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch leads count");
	}
	const allLeads = await response.json();
	return allLeads.length || 0;
};

export const getLeadById = async (id: string): Promise<Lead | undefined> => {
	const leads = await getLeads(0, Number.MAX_SAFE_INTEGER);
	return leads.find((lead) => lead.id === id);
};

export const saveLead = async (lead: Lead): Promise<void> => {
	const response = await fetch(LEADS_SCRIPT_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(lead),
	});
	if (!response.ok) {
		throw new Error("Failed to save lead");
	}
};

export const updateLead = async (updatedLead: Lead): Promise<void> => {
	// Not supported with Apps Script; implement if you add update logic to your script
	throw new Error(
		"Update lead is not supported with current Apps Script setup."
	);
};

// --- Disbursements ---
export const getDisbursements = async (
	offset = 0,
	limit = 50
): Promise<Disbursement[]> => {
	const response = await fetch(DISBURSEMENTS_SCRIPT_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch disbursements");
	}
	const allDisbursements = await response.json();
	return allDisbursements.slice(offset, offset + limit);
};

export const getDisbursementsCount = async (): Promise<number> => {
	const response = await fetch(DISBURSEMENTS_SCRIPT_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch disbursements count");
	}
	const allDisbursements = await response.json();
	return allDisbursements.length || 0;
};

export const getDisbursementById = async (
	id: string
): Promise<Disbursement | undefined> => {
	const disbursements = await getDisbursements(0, Number.MAX_SAFE_INTEGER);
	return disbursements.find((d) => d.id === id);
};

export const saveDisbursement = async (
	disbursement: Disbursement
): Promise<void> => {
	const response = await fetch(DISBURSEMENTS_SCRIPT_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(disbursement),
	});
	if (!response.ok) {
		throw new Error("Failed to save disbursement");
	}
};

export const updateDisbursement = async (
	updatedDisbursement: Disbursement
): Promise<void> => {
	// Not supported with Apps Script; implement if you add update logic to your script
	throw new Error(
		"Update disbursement is not supported with current Apps Script setup."
	);
};
