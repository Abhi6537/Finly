import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Download, ChevronDown, Search } from "lucide-react";
import { useTransactions } from "@/features/transactions/context/TransactionContext";
import { useRole } from "@/context/RoleContext";
import { formatINR } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/dateUtils";
import { categoryColors, categories } from "@/features/transactions/data/mockTransactions";
import { exportCSV, exportJSON } from "@/lib/exportUtils";
import EmptyState from "@/components/shared/EmptyState";
import AddTransactionModal from "@/features/transactions/components/AddTransactionModal";
import EditTransactionDrawer from "@/features/transactions/components/EditTransactionDrawer";
import type { Transaction } from "@/features/transactions/data/mockTransactions";
import { toast } from "sonner";

const Transactions = () => {
  const { transactions, dispatch } = useTransactions();
  const { isAdmin } = useRole();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (searchQuery) {
      result = result.filter((t) =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((t) => t.category === categoryFilter);
    }
    if (typeFilter !== "All") {
      result = result.filter((t) => t.type === typeFilter.toLowerCase());
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "date-asc": return a.date.localeCompare(b.date);
        case "amount-high": return b.amount - a.amount;
        case "amount-low": return a.amount - b.amount;
        default: return b.date.localeCompare(a.date);
      }
    });

    return result;
  }, [transactions, searchQuery, categoryFilter, typeFilter, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setTypeFilter("All");
    setSortBy("date-desc");
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
    setDeleteConfirm(null);
    toast.success("Transaction deleted");
  };

  const selectClass = "bg-muted/50 border border-[rgba(255,255,255,0.07)] rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 text-[11px] md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 md:space-y-5"
    >
      <h1 className="font-heading font-bold text-xl md:text-2xl">Transactions</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-muted/50 border border-[rgba(255,255,255,0.07)] rounded-lg pl-8 pr-3 py-1.5 md:pl-9 md:pr-4 md:py-2 text-[11px] md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-[140px] md:w-[200px]"
          />
        </div>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={selectClass}>
          <option value="All">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={selectClass}>
          <option value="All">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-high">Amount: High → Low</option>
          <option value="amount-low">Amount: Low → High</option>
        </select>

        {/* Export */}
        {isAdmin && (
          <div className="relative">
            <button
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-1.5 bg-muted/50 border border-[rgba(255,255,255,0.07)] rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 text-[11px] md:text-sm text-foreground hover:bg-muted/70 transition-colors"
            >
              <Download className="w-3.5 h-3.5 md:w-4 md:h-4" /> Export <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {showExport && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute top-full mt-1 right-0 glass-card rounded-lg p-1 z-20 min-w-[150px]"
                >
                  <button
                    onClick={() => { exportCSV(filtered); setShowExport(false); }}
                    className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted/50 transition-colors"
                  >
                    📄 Export CSV
                  </button>
                  <button
                    onClick={() => { exportJSON(filtered); setShowExport(false); }}
                    className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted/50 transition-colors"
                  >
                    📦 Export JSON
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* View Switcher: Mobile List vs Desktop Table */}
      {filtered.length === 0 ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <>
          {/* Mobile List View */}
          <div className="md:hidden flex flex-col gap-1.5">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.5), duration: 0.3 }}
                className="glass-card rounded-xl p-2.5 px-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center text-xs md:text-sm font-bold"
                      style={{
                        backgroundColor: `${categoryColors[t.category] || "#6B7280"}20`,
                        color: categoryColors[t.category] || "#6B7280",
                      }}
                    >
                      {t.category.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground text-xs md:text-sm truncate w-[130px] sm:w-[200px]">{t.description}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{formatDate(t.date)}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-mono text-xs md:text-[13px] font-bold ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                      {t.type === "income" ? "+" : "-"}{formatINR(t.amount)}
                    </p>
                    <span className={`inline-block mt-0.5 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0 rounded-full ${
                      t.status === "completed"
                        ? "bg-success/15 text-success"
                        : "bg-warning/15 text-warning"
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </div>

                {/* Category & Actions */}
                <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.05)] pt-2 mt-1">
                  <span
                    className="text-[9px] font-medium px-2 py-0.5 rounded-full border border-[rgba(255,255,255,0.05)] text-ellipsis whitespace-nowrap overflow-hidden max-w-[120px]"
                    style={{
                      backgroundColor: `${categoryColors[t.category] || "#6B7280"}15`,
                      color: categoryColors[t.category] || "#6B7280",
                    }}
                  >
                    {t.category}
                  </span>
                  
                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditTransaction(t)} className="p-1 rounded bg-muted/40 text-muted-foreground hover:text-primary transition-colors">
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button onClick={() => setDeleteConfirm(t.id)} className="p-1 rounded bg-muted/40 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Delete mobile confirm inline */}
                {deleteConfirm === t.id && (
                  <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-xs text-destructive mb-2 font-medium">Delete this transaction?</p>
                    <div className="flex gap-2">
                       <button onClick={() => setDeleteConfirm(null)} className="flex-1 text-xs py-1.5 rounded bg-muted/50 text-foreground">Cancel</button>
                       <button onClick={() => handleDelete(t.id)} className="flex-1 text-xs py-1.5 rounded bg-destructive text-destructive-foreground">Delete</button>
                    </div>
                  </div>
                )}
                
                {/* Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${t.type === "income" ? "bg-success" : "bg-destructive"}`} />
              </motion.div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block glass-card rounded-xl overflow-x-auto">
            <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.07)]">
                <th className="text-left text-xs text-muted-foreground font-medium py-3 px-4">#</th>
                <th className="text-left text-xs text-muted-foreground font-medium py-3 px-4">Date</th>
                <th className="text-left text-xs text-muted-foreground font-medium py-3 px-4">Description</th>
                <th className="text-left text-xs text-muted-foreground font-medium py-3 px-4">Category</th>
                <th className="text-left text-xs text-muted-foreground font-medium py-3 px-4">Type</th>
                <th className="text-right text-xs text-muted-foreground font-medium py-3 px-4">Amount</th>
                <th className="text-left text-xs text-muted-foreground font-medium py-3 px-4">Status</th>
                {isAdmin && <th className="text-right text-xs text-muted-foreground font-medium py-3 px-4">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.5), duration: 0.3 }}
                  className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] group relative transition-colors"
                >
                  <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{t.id}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{formatDate(t.date)}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{t.description}</td>
                  <td className="py-3 px-4">
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${categoryColors[t.category] || "#6B7280"}15`,
                        color: categoryColors[t.category] || "#6B7280",
                      }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-mono uppercase ${t.type === "income" ? "text-[#30D990]" : "text-[#FF5C5C]"}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-right font-mono text-sm font-medium ${t.type === "income" ? "text-[#30D990]" : "text-[#FF5C5C]"}`}>
                    {t.type === "income" ? "+" : "-"}{formatINR(t.amount)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      t.status === "completed"
                        ? "bg-[#30D990]/10 text-[#30D990]"
                        : "bg-[#FF8C42]/10 text-[#FF8C42]"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditTransaction(t)}
                          className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setDeleteConfirm(deleteConfirm === t.id ? null : t.id)}
                            className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          {deleteConfirm === t.id && (
                            <div className="absolute right-0 top-full mt-1 glass-card rounded-lg p-3 z-20 min-w-[180px]">
                              <p className="text-xs text-muted-foreground mb-2">Delete this transaction?</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="flex-1 text-xs py-1.5 rounded-md border border-[rgba(255,255,255,0.07)] text-muted-foreground"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDelete(t.id)}
                                  className="flex-1 text-xs py-1.5 rounded-md bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  )}
                  {/* Hover lime border */}
                  <td className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] bg-primary transition-all duration-150 rounded-r-full" />
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}

      {/* Admin FAB */}
      <AnimatePresence>
        {isAdmin && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-[80px] md:bottom-8 right-6 md:right-8 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-30"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AddTransactionModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(t) => {
          dispatch({ type: "ADD", payload: t });
          toast.success("Transaction added");
        }}
      />

      <EditTransactionDrawer
        open={!!editTransaction}
        transaction={editTransaction}
        onClose={() => setEditTransaction(null)}
        onSave={(t) => {
          dispatch({ type: "EDIT", payload: t });
          toast.success("Transaction updated");
        }}
      />
    </motion.div>
  );
};

export default Transactions;
