import { format, parseISO } from "date-fns";

export const formatDate = (dateStr: string): string =>
  format(parseISO(dateStr), "dd MMM yyyy");

export const formatDateShort = (dateStr: string): string =>
  format(parseISO(dateStr), "dd MMM");

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};
