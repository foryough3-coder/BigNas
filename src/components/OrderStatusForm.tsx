"use client";
import { useActionState } from "react";
import type { UpdateOrderStatusState } from "@/app/316nas/(protected)/orders/actions";

const STATUSES = ["pending_quote", "quoted", "confirmed", "fulfilled", "cancelled"];

export function OrderStatusForm({ status, action }: {
  status: string;
  action: (state: UpdateOrderStatusState, formData: FormData) => Promise<UpdateOrderStatusState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return <form action={formAction} className="form-grid">
    <div className="form-field">
      <label htmlFor="status">Status</label>
      <select id="status" name="status" defaultValue={status}>
        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
    {state?.error && <p className="form-error">{state.error}</p>}
    {state?.saved && <p className="form-note">Saved.</p>}
    <button className="button primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Update status"}</button>
  </form>;
}
