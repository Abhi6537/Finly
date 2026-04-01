import { Wallet } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  onReset?: () => void;
}

const EmptyState = ({
  message = "No transactions found. Try adjusting your filters.",
  onReset,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
      <Wallet className="w-12 h-12 text-muted-foreground" />
    </div>
    <p className="text-muted-foreground text-lg mb-4">{message}</p>
    {onReset && (
      <button
        onClick={onReset}
        className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Reset Filters
      </button>
    )}
  </div>
);

export default EmptyState;
