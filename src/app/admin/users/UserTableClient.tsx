"use client";

import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { toggleUserStatus } from "./actions";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  registrations: { id: string }[];
  status: "ACTIVE" | "BANNED";
}

export function UserTableClient({ users }: { users: UserData[] }) {
  const columns = [
    { key: "name", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "joined", label: "Joined" },
    { key: "registrations", label: "Registrations" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      renderRow={(user) => {
        const isBanned = user.status === "BANNED";
        return (
          <>
            <td className="px-4 py-3 font-sans text-white">{user.name}</td>
            <td className="px-4 py-3 font-sans text-muted-foreground">{user.email}</td>
            <td className="px-4 py-3 font-sans text-muted-foreground">
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className="px-4 py-3 font-sans text-white text-center sm:text-left">{user.registrations.length}</td>
            <td className="px-4 py-3">
              <StatusBadge status={user.status} />
            </td>
            <td className="px-4 py-3 font-sans">
              <button
                onClick={() => {
                  const msg = isBanned 
                    ? "Restore access for this user?" 
                    : "Ban this user? They will no longer be able to log in.";
                  if (confirm(msg)) {
                    toggleUserStatus({ userId: user.id, currentStatus: user.status }).catch(console.error);
                  }
                }}
                className={`text-sm font-semibold transition-colors ${
                  isBanned ? "text-primary hover:text-[#00CC6A]" : "text-destructive hover:text-[#CC2E2E]"
                }`}
              >
                {isBanned ? "Unban" : "Ban"}
              </button>
            </td>
          </>
        );
      }}
    />
  );
}
