import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/AdminLoginForm";
export const metadata: Metadata = { title: "Admin sign in" };
export default function AdminLoginPage() {
  return <main id="main" className="wrap cart-page">
    <p className="eyebrow">three16craft admin</p><h1>Sign in</h1>
    <AdminLoginForm />
  </main>;
}
