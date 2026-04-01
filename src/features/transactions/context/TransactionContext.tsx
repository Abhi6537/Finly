import React, { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from "react";
import { mockTransactions, type Transaction } from "@/features/transactions/data/mockTransactions";
import { fetchTransactions } from "@/lib/mockApi";

type Action =
  | { type: "ADD"; payload: Omit<Transaction, "id"> }
  | { type: "EDIT"; payload: Transaction }
  | { type: "DELETE"; payload: number }
  | { type: "RESET" }
  | { type: "CLEAR" }
  | { type: "LOAD"; payload: Transaction[] };

interface TransactionState {
  transactions: Transaction[];
}

const reducer = (state: TransactionState, action: Action): TransactionState => {
  switch (action.type) {
    case "ADD": {
      const maxId = state.transactions.reduce((max, t) => Math.max(max, t.id), 0);
      return { transactions: [{ ...action.payload, id: maxId + 1 }, ...state.transactions] };
    }
    case "EDIT":
      return {
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE":
      return { transactions: state.transactions.filter((t) => t.id !== action.payload) };
    case "RESET":
      return { transactions: [...mockTransactions] };
    case "CLEAR":
      return { transactions: [] };
    case "LOAD":
      return { transactions: action.payload };
    default:
      return state;
  }
};

interface ContextValue extends TransactionState {
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
}

const TransactionContext = createContext<ContextValue | null>(null);

const DATA_VERSION = "v2-2026"; // bump this to force refresh of cached data

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Start with empty state — data will be loaded from mock API
  const [state, dispatch] = useReducer(reducer, { transactions: [] });

  // Fetch initial data from mock API (simulates real API call)
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTransactions();
        dispatch({ type: "LOAD", payload: data });
      } catch {
        // Fallback to static mock data if API fails
        dispatch({ type: "LOAD", payload: [...mockTransactions] });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Persist to localStorage after every state change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("finly-transactions", JSON.stringify(state.transactions));
      localStorage.setItem("finly-data-version", DATA_VERSION);
    }
  }, [state.transactions, isLoading]);

  return (
    <TransactionContext.Provider value={{ ...state, dispatch, isLoading }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
};
