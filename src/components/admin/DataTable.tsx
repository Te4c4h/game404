import { ReactNode } from "react";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T) => ReactNode;
}

export function DataTable<T>({ columns, data, renderRow }: DataTableProps<T>) {
  if (data.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto rounded-[8px] border border-border bg-[#111111]">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#1A1A1A] border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-sans font-medium text-muted-foreground whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item, index) => {
            const key = (item as any).id || index;
            return (
              <tr key={key} className="hover:bg-white/5 transition-colors">
                {renderRow(item)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
