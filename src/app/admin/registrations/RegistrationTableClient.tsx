"use client";

import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { updateRegistrationStatus } from "./actions";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { useState } from "react";

export function RegistrationTableClient({ registrations }: { registrations: any[] }) {
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("PENDING");

  const filteredData = filter === "ALL" 
    ? registrations 
    : registrations.filter(r => r.paymentStatus === filter);

  const columns = [
    { key: "team", label: "Team Name" },
    { key: "tournament", label: "Tournament" },
    { key: "captain", label: "Captain" },
    { key: "proof", label: "Payment Proof" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">Registrations</h1>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-2.5 text-sm font-sans font-medium text-white focus:border-primary outline-none transition-colors appearance-none min-w-[180px]"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending Only</option>
          <option value="APPROVED">Approved Only</option>
          <option value="REJECTED">Rejected Only</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        renderRow={(reg) => (
          <>
            <td className="px-4 py-4 font-sans text-white font-medium max-w-[180px] truncate" title={reg.teamName}>{reg.teamName}</td>
            <td className="px-4 py-4 font-sans text-muted-foreground max-w-[200px] truncate" title={reg.tournament.name}>{reg.tournament.name}</td>
            <td className="px-4 py-4 font-sans text-muted-foreground whitespace-nowrap">
               <span className="text-white">{reg.user.name}</span> <br/> <span className="text-[11px] opacity-70">{reg.user.email}</span>
            </td>
            <td className="px-4 py-4 font-sans">
              <a href={reg.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#5fa1f9] text-sm flex items-center transition-colors font-medium">
                View Receipt <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </td>
            <td className="px-4 py-4">
              <StatusBadge status={reg.paymentStatus} />
            </td>
            <td className="px-4 py-4 font-sans flex items-center space-x-2">
              {reg.paymentStatus === "PENDING" && (
                <>
                  <button
                    onClick={async () => {
                      if (confirm("Approve this registration? The team will be admitted to the tournament.")) {
                        await updateRegistrationStatus(reg.id, "APPROVED");
                      }
                    }}
                    className="p-2 bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] text-[#00FF87] hover:border-[#00FF87] hover:bg-[#00FF87]/10 rounded-[8px] transition-all flex items-center justify-center w-9 h-9"
                    title="Approve"
                  >
                    <CheckCircle className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Reject this registration?")) {
                        await updateRegistrationStatus(reg.id, "REJECTED");
                      }
                    }}
                    className="p-2 bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] text-[#FF3B3B] hover:border-[#FF3B3B] hover:bg-[#FF3B3B]/10 rounded-[8px] transition-all flex items-center justify-center w-9 h-9"
                    title="Reject"
                  >
                    <XCircle className="w-4.5 h-4.5" />
                  </button>
                </>
              )}
              {reg.paymentStatus !== "PENDING" && (
                <span className="text-xs font-semibold text-muted-foreground italic px-2">PROCESSED</span>
              )}
            </td>
          </>
        )}
      />
    </>
  );
}
