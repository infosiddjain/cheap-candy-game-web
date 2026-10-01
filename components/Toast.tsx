"use client";

import { mdiAlertCircle, mdiCheckCircle, mdiClose } from "@mdi/js";
import { useEffect } from "react";
import { Icon } from "./Icon";

export interface ToastData {
  id: number;
  type: "success" | "error";
  title: string;
  message: string;
}

/** Bottom-centre toast that slides in and dismisses itself. */
export function Toast({ toast, onClose }: { toast: ToastData | null; onClose: () => void }) {
  useEffect(() => {
    if (!toast) {
      return;
    }
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {toast && (
        <div
          key={toast.id}
          role={toast.type === "error" ? "alert" : "status"}
          className={`toast-in pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${
            toast.type === "success"
              ? "border-success/40 bg-[#123528]/95"
              : "border-[#FF5A6E]/40 bg-[#3a1424]/95"
          }`}
        >
          <Icon
            path={toast.type === "success" ? mdiCheckCircle : mdiAlertCircle}
            size={26}
            className={`shrink-0 ${toast.type === "success" ? "text-success" : "text-[#FF5A6E]"}`}
          />
          <div className="flex-1">
            <p className="font-extrabold">{toast.title}</p>
            <p className="mt-0.5 text-sm text-dim">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            className="grid size-8 shrink-0 place-items-center rounded-xl text-dim hover:bg-surface-strong hover:text-white"
          >
            <Icon path={mdiClose} size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
