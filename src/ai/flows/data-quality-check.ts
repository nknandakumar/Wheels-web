'use server';

/**
 * @fileOverview Implements a data quality check flow to identify potential data entry errors.
 *
 * - dataQualityCheck - Checks for inconsistencies in loan data based on historical entries.
 * - DataQualityCheckInput - The input type for the dataQualityCheck function.
 * - DataQualityCheckOutput - The return type for the dataQualityCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DataQualityCheckInputSchema = z.object({
  loanAmount: z.number().describe('The loan amount entered by the user.'),
  address: z.string().describe('The address entered by the user.'),
  historicalLoanAmounts: z
    .array(z.number())
    .describe('Historical loan amounts for similar profiles.'),
  historicalAddresses: z
    .array(z.string())
    .describe('Historical addresses for similar profiles.'),
});
export type DataQualityCheckInput = z.infer<typeof DataQualityCheckInputSchema>;

const DataQualityCheckOutputSchema = z.object({
  loanAmountIssue: z
    .string()
    .optional()
    .describe(
      'A message indicating a potential issue with the loan amount, if any.'
    ),
  addressIssue: z
    .string()
    .optional()
    .describe('A message indicating a potential issue with the address, if any.'),
});
export type DataQualityCheckOutput = z.infer<typeof DataQualityCheckOutputSchema>;

export async function dataQualityCheck(
  input: DataQualityCheckInput
): Promise<DataQualityCheckOutput> {
  return dataQualityCheckFlow(input);
}

const dataQualityCheckPrompt = ai.definePrompt({
  name: 'dataQualityCheckPrompt',
  input: {schema: DataQualityCheckInputSchema},
  output: {schema: DataQualityCheckOutputSchema},
  prompt: `You are an AI assistant designed to identify potential data entry errors in loan applications.

  You are given the loan amount and address entered by the user, as well as historical loan amounts and addresses for similar profiles.

  Determine if there are any inconsistencies or potential errors in the entered data based on the historical data.

  Specifically, check if the entered loan amount is significantly different from the historical loan amounts.
  Also, check if the entered address is significantly different from the historical addresses.

  Return messages indicating potential issues with the loan amount and address, if any.

  Entered Loan Amount: {{{loanAmount}}}
  Entered Address: {{{address}}}
  Historical Loan Amounts: {{#each historicalLoanAmounts}}{{{this}}} {{/each}}
  Historical Addresses: {{#each historicalAddresses}}{{{this}}} {{/each}}
  `,
});

const dataQualityCheckFlow = ai.defineFlow(
  {
    name: 'dataQualityCheckFlow',
    inputSchema: DataQualityCheckInputSchema,
    outputSchema: DataQualityCheckOutputSchema,
  },
  async input => {
    const {output} = await dataQualityCheckPrompt(input);
    return output!;
  }
);
