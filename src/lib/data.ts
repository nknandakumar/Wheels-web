"use client";

import type { Lead, Disbursement } from "./schemas";

const LEADS_KEY = "wheels-web-leads";
const DISBURSEMENTS_KEY = "wheels-web-disbursements";
const LOAN_ID_KEY = "wheels-web-loan-id-counter";

// --- Loan ID ---
export const getNextLoanId = (): string => {
  if (typeof window === "undefined") return "202500001";
  const currentCounter = parseInt(localStorage.getItem(LOAN_ID_KEY) || "202500000", 10);
  const nextCounter = currentCounter + 1;
  localStorage.setItem(LOAN_ID_KEY, nextCounter.toString());
  return nextCounter.toString();
};

// --- Leads ---
export const getLeads = (): Lead[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(LEADS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getLeadById = (id: string): Lead | undefined => {
  const leads = getLeads();
  return leads.find((lead) => lead.id === id);
};

export const saveLead = (lead: Lead): void => {
  const leads = getLeads();
  leads.unshift(lead); // Add new lead to the top
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
};

export const updateLead = (updatedLead: Lead): void => {
  let leads = getLeads();
  leads = leads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead));
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
};

// --- Disbursements ---
export const getDisbursements = (): Disbursement[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(DISBURSEMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getDisbursementById = (id: string): Disbursement | undefined => {
  const disbursements = getDisbursements();
  return disbursements.find((d) => d.id === id);
};

export const saveDisbursement = (disbursement: Disbursement): void => {
  const disbursements = getDisbursements();
  disbursements.unshift(disbursement);
  localStorage.setItem(DISBURSEMENTS_KEY, JSON.stringify(disbursements));
};

export const updateDisbursement = (updatedDisbursement: Disbursement): void => {
  let disbursements = getDisbursements();
  disbursements = disbursements.map((d) => (d.id === updatedDisbursement.id ? updatedDisbursement : d));
  localStorage.setItem(DISBURSEMENTS_KEY, JSON.stringify(disbursements));
};
