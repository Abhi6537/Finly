import type { Transaction } from "@/features/transactions/data/mockTransactions";

export const exportCSV = (transactions: Transaction[], filename = "finly-transactions") => {
  const headers = ["ID", "Date", "Description", "Category", "Type", "Amount", "Status"];
  const rows = transactions.map((t) => [
    t.id, t.date, t.description, t.category, t.type, t.amount, t.status,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  downloadFile(csv, `${filename}.csv`, "text/csv");
};

export const exportJSON = (transactions: Transaction[], filename = "finly-transactions") => {
  const json = JSON.stringify(transactions, null, 2);
  downloadFile(json, `${filename}.json`, "application/json");
};

const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
