import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <table
      className={`w-full border-collapse border border-gray-300 ${className}`}
    >
      {children}
    </table>
  );
}

export function TableHead({ children }: TableProps) {
  return <thead className="bg-gray-200">{children}</thead>;
}

export function TableRow({ children }: TableProps) {
  return <tr className="border">{children}</tr>;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className }: TableCellProps) {
  return <td className={`p-2 border ${className}`}>{children}</td>;
}

export function TableBody({ children }: TableProps) {
  return <tbody>{children}</tbody>;
}
