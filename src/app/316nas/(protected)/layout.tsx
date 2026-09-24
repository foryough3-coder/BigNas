import Link from "next/link";
import { verifyAdmin } from "@/lib/admin";
import { signOut } from "@/app/316nas/login/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { email } = await verifyAdmin();
  return <main id="main" className="wrap admin-shell">
    <div className="admin-bar">
      <nav className="admin-nav" aria-label="Admin navigation">
        <Link href="/316nas">Dashboard</Link>
        <Link href="/316nas/products">Products</Link>
        <Link href="/316nas/orders">Orders</Link>
        <Link href="/316nas/settings">Settings</Link>
      </nav>
      <form action={signOut} className="admin-nav">
        <span className="form-note">{email}</span>
        <button className="button secondary" type="submit">Sign out</button>
      </form>
    </div>
    {children}
  </main>;
}
