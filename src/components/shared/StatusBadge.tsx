import { cn } from "@/lib/utils";

type Status = "OPEN" | "ONGOING" | "COMPLETED" | "PENDING" | "APPROVED" | "REJECTED" | "DRAFT" | "ACTIVE" | "BANNED";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles: Record<Status, string> = {
    OPEN: "bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]",
    ONGOING: "bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]",
    COMPLETED: "bg-[#888888]/20 text-[#888888] border border-[#888888]",
    PENDING: "bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]",
    APPROVED: "bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]",
    REJECTED: "bg-[#FF3B3B]/20 text-[#FF3B3B] border border-[#FF3B3B]",
    DRAFT: "bg-muted text-muted-foreground border border-border",
    ACTIVE: "bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]",
    BANNED: "bg-[#FF3B3B]/20 text-[#FF3B3B] border border-[#FF3B3B]"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[4px] px-[10px] py-[6px]",
        "font-sans font-semibold text-[12px] leading-none uppercase",
        styles[status],
        className
      )}
    >
      {status}
    </span>
  );
}
