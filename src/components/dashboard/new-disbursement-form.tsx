"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DisbursementSchema, type Disbursement } from "@/lib/schemas";
import { getNextLoanId, saveDisbursement, updateDisbursement } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import * as Constants from "@/lib/constants";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { FormSelect, FormInput } from "./form-helpers";

interface NewDisbursementFormProps {
  disbursement?: Disbursement;
}

export function NewDisbursementForm({ disbursement }: NewDisbursementFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<Disbursement>({
    resolver: zodResolver(DisbursementSchema),
    defaultValues: disbursement || {
      id: crypto.randomUUID(),
      loanId: "",
      dateTime: "",
      source: "",
      stage: "",
      profileType: "",
      name: "",
      gender: "",
      customerProfile: "",
      panNo: "",
      mobileNo: "",
      altMobileNo: "",
      email: "",
      dsa: "",
      bankFinance: "",
      bankFinanceBranch: "",
      loginExecutiveName: "",
      rcNo: "",
      vehicleVerient: "",
      mfgYear: "",
      osNo: "",
      kilometreReading: "",
      vehicleOwnerContactNo: "",
      totalLoanAmount: 0,
      pfCharges: 0,
      documentationCharges: 0,
      loanInsuranceCharges: 0,
      otherCharges: 0,
      rtoCharges: 0,
      netLoanAmount: 0,
      tenure: "",
      irr: "",
      emiAmount: "",
      emiDate: "",
      transaction1: 0,
      transaction2: 0,
      remarksForHold: "",
      utr: "",
      caseDealer: "",
      dealerMob: "",
      rcCardStatus: "",
      remarks: "",
    },
  });

  const { watch, setValue } = form;

  const totalLoanAmount = watch("totalLoanAmount");
  const pfCharges = watch("pfCharges");
  const documentationCharges = watch("documentationCharges");
  const loanInsuranceCharges = watch("loanInsuranceCharges");
  const otherCharges = watch("otherCharges");
  const rtoCharges = watch("rtoCharges");

  useEffect(() => {
    if (!disbursement) {
      setValue("loanId", getNextLoanId());
      setValue("dateTime", new Date().toLocaleString());
    }
  }, [disbursement, setValue]);

  useEffect(() => {
    const net = (totalLoanAmount || 0) - (pfCharges || 0) - (documentationCharges || 0) - (loanInsuranceCharges || 0) - (otherCharges || 0) - (rtoCharges || 0);
    setValue("netLoanAmount", net);
  }, [totalLoanAmount, pfCharges, documentationCharges, loanInsuranceCharges, otherCharges, rtoCharges, setValue]);

  const onSubmit = (data: Disbursement) => {
    setLoading(true);
    try {
      if (disbursement) {
        updateDisbursement(data);
        toast({ title: "Success", description: "Disbursement updated successfully." });
      } else {
        saveDisbursement(data);
        toast({ title: "Success", description: "New disbursement created." });
      }
      router.push("/dashboard/my-disbursements");
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save disbursement." });
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField control={form.control} name="loanId" render={({ field }) => <FormItem><FormLabel>LOAN ID</FormLabel><FormControl><Input {...field} readOnly className="bg-muted" /></FormControl></FormItem>} />
            <FormField control={form.control} name="dateTime" render={({ field }) => <FormItem><FormLabel>DATE & TIME</FormLabel><FormControl><Input {...field} readOnly className="bg-muted" /></FormControl></FormItem>} />
            <FormSelect control={form.control} name="source" label="SOURCE" placeholder="Select source" options={Constants.SOURCES} />
            <FormSelect control={form.control} name="stage" label="STAGE" placeholder="Select stage" options={Constants.DISBURSEMENT_STAGES} />
        </div>

        <Card>
            <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormSelect control={form.control} name="profileType" label="TYPE" placeholder="Select type" options={Constants.PROFILE_TYPES} />
                <FormInput control={form.control} name="name" label="NAME" placeholder="Full Name" onChange={(e) => e.target.value = e.target.value.toUpperCase()} />
                <FormSelect control={form.control} name="gender" label="GENDER" placeholder="Select gender" options={Constants.GENDERS} />
                <FormSelect control={form.control} name="customerProfile" label="CUSTOMER PROFILE" placeholder="Select profile" options={Constants.CUSTOMER_PROFILES} />
                <FormInput control={form.control} name="panNo" label="PAN NO" placeholder="ABCDE1234F" onChange={(e) => e.target.value = e.target.value.toUpperCase()} />
                <FormInput control={form.control} name="mobileNo" label="MOBILE NO" placeholder="10-digit number" type="tel" />
                <FormInput control={form.control} name="altMobileNo" label="ALT MOBILE NO" placeholder="10-digit number" type="tel" />
                <FormInput control={form.control} name="email" label="EMAIL ID" placeholder="example@mail.com" type="email" onChange={(e) => e.target.value = e.target.value.toLowerCase()} />
                <FormSelect control={form.control} name="dsa" label="DSA" placeholder="Select DSA" options={Constants.DSAS} />
                <FormSelect control={form.control} name="bankFinance" label="BANK / FINANCE" placeholder="Select Bank" options={Constants.BANKS} />
                <FormInput control={form.control} name="bankFinanceBranch" label="BANK / FINANCE BRANCH" placeholder="Branch name" />
                <FormInput control={form.control} name="loginExecutiveName" label="LOGIN EXECUTIVE NAME" placeholder="Executive's name" />
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle>Vehicle Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormInput control={form.control} name="rcNo" label="RC NO" placeholder="Vehicle RC No." />
                    <FormInput control={form.control} name="vehicleVerient" label="VEHICLE / VERIENT" placeholder="e.g., Maruti Suzuki Swift VXi" />
                    <FormSelect control={form.control} name="mfgYear" label="MFG YEAR" placeholder="Select year" options={Constants.MFG_YEARS} />
                    <FormSelect control={form.control} name="osNo" label="O. S NO" placeholder="Select O.S No" options={Constants.OS_NOS} />
                    <FormInput control={form.control} name="kilometreReading" label="KILOMETRE READING" placeholder="e.g., 50000" type="number"/>
                    <FormInput control={form.control} name="vehicleOwnerContactNo" label="VEHICLE OWNER CONTACT NO" placeholder="10-digit number" type="tel"/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Loan Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormInput control={form.control} name="totalLoanAmount" label="TOTAL LOAN AMOUNT" placeholder="0.00" type="number" />
                    <FormInput control={form.control} name="pfCharges" label="PF CHARGES" placeholder="0.00" type="number" />
                    <FormInput control={form.control} name="documentationCharges" label="DOCUMENTATION CHARGES" placeholder="0.00" type="number" />
                    <FormInput control={form.control} name="loanInsuranceCharges" label="LOAN INSURANCE CHARGES" placeholder="0.00" type="number" />
                    <FormInput control={form.control} name="otherCharges" label="OTHER CHARGES" placeholder="0.00" type="number" />
                    <FormInput control={form.control} name="rtoCharges" label="RTO CHARGES" placeholder="0.00" type="number" />
                    <FormField control={form.control} name="netLoanAmount" render={({ field }) => <FormItem><FormLabel>NET LOAN AMOUNT</FormLabel><FormControl><Input {...field} readOnly className="bg-muted" /></FormControl></FormItem>} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Break-up Information</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <FormSelect control={form.control} name="tenure" label="TENURE" placeholder="Months" options={Constants.TENURES} />
                    <FormInput control={form.control} name="irr" label="IRR" placeholder="e.g., 12.5%" />
                    <FormInput control={form.control} name="emiAmount" label="EMI AMOUNT" placeholder="0.00" type="number"/>
                    <FormSelect control={form.control} name="emiDate" label="EMI DATE" placeholder="Select Date" options={Constants.EMI_DATES} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Payment Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormInput control={form.control} name="transaction1" label="TRANSACTION 1" placeholder="0.00" type="number"/>
                    <FormInput control={form.control} name="transaction2" label="TRANSACTION 2" placeholder="0.00" type="number"/>
                    <FormInput control={form.control} name="remarksForHold" label="REMARKS FOR HOLD" placeholder="Reason for hold"/>
                    <FormField control={form.control} name="utr" render={({ field }) => (
                       <FormItem><FormLabel>UTR</FormLabel><FormControl><Textarea placeholder="UTR details..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Dealer Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormInput control={form.control} name="caseDealer" label="CASE DEALER" placeholder="Dealer Name"/>
                    <FormInput control={form.control} name="dealerMob" label="DEALER MOB" placeholder="10-digit number" type="tel"/>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader><CardTitle>Final Details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect control={form.control} name="rcCardStatus" label="RC CARD STATUS" placeholder="Select status" options={Constants.RC_CARD_STATUSES}/>
                <FormField control={form.control} name="remarks" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>REMARKS</FormLabel><FormControl><Textarea placeholder="Add any additional remarks here..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button type="submit" disabled={loading} style={{ backgroundColor: '#90EE90', color: '#006400' }}>
                {loading ? (disbursement ? "Updating..." : "Submitting...") : (disbursement ? "Update Disbursement" : "Submit Disbursement")}
            </Button>
        </div>
      </form>
    </Form>
  );
}
