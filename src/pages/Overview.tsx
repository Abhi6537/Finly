import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SummaryCard from "@/features/dashboard/components/SummaryCard";
import BalanceTrendChart from "@/features/dashboard/components/BalanceTrendChart";
import SpendingDonutChart from "@/features/dashboard/components/SpendingDonutChart";
import { useTransactions } from "@/features/transactions/context/TransactionContext";
import { formatINR } from "@/lib/formatCurrency";
import { formatDateShort } from "@/lib/dateUtils";
import { categoryColors } from "@/features/transactions/data/mockTransactions";

const Overview = () => {
  const { transactions } = useTransactions();
  const recent = transactions.slice(0, 5);

  // Compute summary values from actual transaction data
  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  // Get the latest month's transactions
  const latestMonth = transactions.length > 0 ? transactions[0].date.substring(0, 7) : "";
  const monthlyTxns = transactions.filter(t => t.date.startsWith(latestMonth));
  const monthlyIncome = monthlyTxns.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = monthlyTxns.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;

  const summaryCards = [
    { icon: Wallet, iconColor: "#C8F557", label: "Total Balance", value: totalBalance, trend: "+12% this month", trendUp: true },
    { icon: TrendingUp, iconColor: "#30D990", label: "Monthly Income", value: monthlyIncome, trend: "+8.2%", trendUp: true },
    { icon: TrendingDown, iconColor: "#FF5C5C", label: "Monthly Expenses", value: monthlyExpenses, trend: "-5.1%", trendUp: false },
    { icon: PiggyBank, iconColor: "#7B61FF", label: "Savings Rate", value: Math.round(savingsRate * 10) / 10, trend: "+2.3%", trendUp: true, isCurrency: false, isPercent: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4 md:space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {summaryCards.map((card, i) => (
          <SummaryCard key={card.label} {...card} index={i} isCurrency={card.isCurrency !== false} isPercent={card.isPercent || false} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4">
        <div className="col-span-1 lg:col-span-3">
          <BalanceTrendChart />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <SpendingDonutChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card rounded-xl p-3.5 md:p-5">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="font-heading text-xs md:text-sm font-semibold text-foreground">Recent Transactions</h3>
          <Link
            to="/transactions"
            className="text-xs md:text-sm text-primary font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-1">
          {recent.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors"
            >
              <div className="flex items-center gap-2.5 md:gap-3">
                <div
                  className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex shrink-0 items-center justify-center text-[11px] md:text-xs"
                  style={{ backgroundColor: `${categoryColors[t.category] || "#6B7280"}15`, color: categoryColors[t.category] || "#6B7280" }}
                >
                  {t.category.charAt(0)}
                </div>
                <div className="min-w-0 pr-2">
                  <p className="text-xs md:text-sm text-foreground truncate">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDateShort(t.date)}</p>
                </div>
              </div>
              <span
                className={`font-mono text-sm font-medium ${
                  t.type === "income" ? "text-[#30D990]" : "text-[#FF5C5C]"
                }`}
              >
                {t.type === "income" ? "+" : "-"}{formatINR(t.amount)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insight Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="rounded-2xl px-6 py-4 bg-gradient-to-r from-[#7B61FF] to-[#534AB7]"
      >
        <p className="text-sm font-medium text-foreground">
          🔥 You spent 22% more on Shopping this month compared to last month
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
