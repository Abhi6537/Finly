/**
 * Mock API service — simulates async REST API calls with network latency.
 * Demonstrates async data fetching patterns without a real backend.
 */

import { mockTransactions, type Transaction } from "@/features/transactions/data/mockTransactions";

const SIMULATED_DELAY_MS = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate fetching all transactions from an API
export const fetchTransactions = async (): Promise<Transaction[]> => {
  await delay(SIMULATED_DELAY_MS);
  const stored = localStorage.getItem("finly-transactions");
  const version = localStorage.getItem("finly-data-version");
  if (version === "v2-2026" && stored) {
    return JSON.parse(stored);
  }
  return [...mockTransactions];
};

// Simulate creating a transaction
export const createTransaction = async (
  data: Omit<Transaction, "id">
): Promise<Transaction> => {
  await delay(SIMULATED_DELAY_MS);
  const stored = localStorage.getItem("finly-transactions");
  const existing: Transaction[] = stored ? JSON.parse(stored) : [...mockTransactions];
  const maxId = existing.reduce((max, t) => Math.max(max, t.id), 0);
  const newTransaction: Transaction = { ...data, id: maxId + 1 };
  return newTransaction;
};

// Simulate updating a transaction
export const updateTransaction = async (
  data: Transaction
): Promise<Transaction> => {
  await delay(SIMULATED_DELAY_MS);
  return { ...data };
};

// Simulate deleting a transaction
export const deleteTransaction = async (id: number): Promise<{ success: boolean }> => {
  await delay(SIMULATED_DELAY_MS);
  return { success: true };
};

// Simulate fetching summary stats
export const fetchSummary = async (): Promise<{
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}> => {
  await delay(SIMULATED_DELAY_MS);
  const transactions = await fetchTransactions();
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const latestMonth = transactions.length > 0 ? transactions[0].date.substring(0, 7) : "";
  const monthlyTxns = transactions.filter((t) => t.date.startsWith(latestMonth));
  const monthlyIncome = monthlyTxns.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const monthlyExpenses = monthlyTxns.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;
  return {
    totalBalance: totalIncome - totalExpenses,
    monthlyIncome,
    monthlyExpenses,
    savingsRate: Math.round(savingsRate * 10) / 10,
  };
};
