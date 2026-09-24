"use client";
export function DeleteProductButton({ name, action }: { name: string; action: () => Promise<void> }) {
  return <form action={action} onSubmit={e => { if (!window.confirm("Delete “" + name + "”? This can’t be undone.")) e.preventDefault(); }}>
    <button className="button secondary" type="submit">Delete product</button>
  </form>;
}
