"use client";
import { useActionState } from "react";
import { signIn } from "@/app/316nas/login/actions";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined);
  return <form action={action} className="form-grid">
    <div className="form-field">
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required autoComplete="username" />
    </div>
    <div className="form-field">
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required autoComplete="current-password" />
    </div>
    {state?.error && <p className="form-error">{state.error}</p>}
    <button className="button primary" type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
  </form>;
}
