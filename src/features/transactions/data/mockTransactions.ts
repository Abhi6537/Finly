export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  status: "completed" | "pending";
}

export const mockTransactions: Transaction[] = [
  { id: 1, date: "2026-06-14", description: "Salary Credit", category: "Income", type: "income", amount: 95000, status: "completed" },
  { id: 2, date: "2026-06-13", description: "Zomato Order", category: "Food & Dining", type: "expense", amount: 840, status: "completed" },
  { id: 3, date: "2026-06-12", description: "Ola Cab", category: "Transport", type: "expense", amount: 320, status: "completed" },
  { id: 4, date: "2026-06-11", description: "Amazon Shopping", category: "Shopping", type: "expense", amount: 3200, status: "completed" },
  { id: 5, date: "2026-06-10", description: "Gym Membership", category: "Health", type: "expense", amount: 2000, status: "completed" },
  { id: 6, date: "2026-06-09", description: "Netflix Subscription", category: "Entertainment", type: "expense", amount: 649, status: "completed" },
  { id: 7, date: "2026-06-08", description: "Udemy Course", category: "Education", type: "expense", amount: 1299, status: "completed" },
  { id: 8, date: "2026-06-07", description: "Electricity Bill", category: "Rent & Utilities", type: "expense", amount: 2100, status: "completed" },
  { id: 9, date: "2026-06-06", description: "Swiggy Order", category: "Food & Dining", type: "expense", amount: 560, status: "completed" },
  { id: 10, date: "2026-06-05", description: "Myntra Shopping", category: "Shopping", type: "expense", amount: 4200, status: "completed" },
  { id: 11, date: "2026-06-04", description: "Metro Card Recharge", category: "Transport", type: "expense", amount: 500, status: "completed" },
  { id: 12, date: "2026-06-03", description: "PharmEasy Order", category: "Health", type: "expense", amount: 890, status: "completed" },
  { id: 13, date: "2026-06-02", description: "Hotstar Premium", category: "Entertainment", type: "expense", amount: 299, status: "completed" },
  { id: 14, date: "2026-06-01", description: "House Rent", category: "Rent & Utilities", type: "expense", amount: 18000, status: "completed" },
  { id: 15, date: "2026-05-31", description: "Freelance Payment", category: "Income", type: "income", amount: 25000, status: "completed" },
  { id: 16, date: "2026-05-28", description: "BigBasket Groceries", category: "Food & Dining", type: "expense", amount: 2800, status: "completed" },
  { id: 17, date: "2026-05-25", description: "IRCTC Train Ticket", category: "Transport", type: "expense", amount: 1450, status: "completed" },
  { id: 18, date: "2026-05-22", description: "Ajio Shopping", category: "Shopping", type: "expense", amount: 3200, status: "completed" },
  { id: 19, date: "2026-05-20", description: "Doctor Visit", category: "Health", type: "expense", amount: 800, status: "completed" },
  { id: 20, date: "2026-05-18", description: "BookMyShow Movies", category: "Entertainment", type: "expense", amount: 760, status: "completed" },
  { id: 21, date: "2026-05-15", description: "Coursera Subscription", category: "Education", type: "expense", amount: 2499, status: "completed" },
  { id: 22, date: "2026-05-14", description: "Salary Credit", category: "Income", type: "income", amount: 95000, status: "completed" },
  { id: 23, date: "2026-05-10", description: "PhonePe Transfer", category: "Shopping", type: "expense", amount: 2400, status: "completed" },
  { id: 24, date: "2026-05-07", description: "SIP Investment", category: "Income", type: "income", amount: 10000, status: "completed" },
  { id: 25, date: "2026-04-30", description: "Water & Gas Bill", category: "Rent & Utilities", type: "expense", amount: 1200, status: "completed" },
  { id: 26, date: "2026-04-25", description: "Nykaa Order", category: "Shopping", type: "expense", amount: 1890, status: "completed" },
  { id: 27, date: "2026-04-14", description: "Salary Credit", category: "Income", type: "income", amount: 95000, status: "completed" },
  { id: 28, date: "2026-03-14", description: "Salary Credit", category: "Income", type: "income", amount: 95000, status: "completed" },
  { id: 29, date: "2026-02-14", description: "Salary Credit", category: "Income", type: "income", amount: 95000, status: "completed" },
  { id: 30, date: "2026-01-14", description: "Salary Credit", category: "Income", type: "income", amount: 95000, status: "completed" },
];

export const categories = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Health",
  "Entertainment",
  "Education",
  "Rent & Utilities",
  "Income",
] as const;

export const categoryColors: Record<string, string> = {
  "Food & Dining": "#FF8C42",
  Transport: "#7B61FF",
  Shopping: "#C8F557",
  Health: "#30D990",
  Entertainment: "#FF5C5C",
  Education: "#00C2FF",
  "Rent & Utilities": "#A0AEC0",
  Income: "#30D990",
};
