"use server";

import { dataQualityCheck, DataQualityCheckInput } from "@/ai/flows/data-quality-check";

export async function handleDataQualityCheck(input: DataQualityCheckInput) {
    try {
        const result = await dataQualityCheck(input);
        return result;
    } catch (error) {
        console.error("Error in data quality check:", error);
        return { error: "Failed to perform data quality check." };
    }
}
