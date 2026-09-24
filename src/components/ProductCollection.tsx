"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/Icon";
import { products, categories, categoryName } from "@/lib/products";
export function ProductCollection({ query = "", category = "all" }: { query?: string; category?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [limit, setLimit] = useState(query || category !== "all" ? products.length : 8);
  const [sort, setSort] = useState("curated");
  const results = products.filter(p => (category === "all" || category === p.category) &&
    (p.name + " " + p.finishLabel + " " + categoryName(p.category)).toLowerCase().includes(query.toLowerCase()));
  if (sort === "name") results.sort((a,b) => a.name.localeCompare(b.name));
  function filter(next: string, reset = false) {
    const params = new URLSearchParams();
    if (next !== "all") params.set("category", next);
    if (!reset && query) params.set("q", query);
    startTransition(() => router.replace("/" + (params.size ? "?" + params : "") + "#collection", { scroll: false }));
  }
  return <section className="collection" id="collection" aria-labelledby="collection-title"><div className="wrap">
    <div className="section-heading"><div><p className="eyebrow">The collection</p><h2 id="collection-title">Explore the details.</h2></div><p>Build your selection.<br />We’ll help you find the right fit.</p></div>
    <div className="collection-tools">
      <div className="filter-tabs" aria-label="Filter products">{[{ id: "all", name: "All products" }, ...categories].map(c =>
        <button key={c.id} className={"filter-tab" + (category === c.id ? " active" : "")} aria-pressed={category === c.id} disabled={pending} onClick={() => filter(c.id)}>{c.name}</button>)}</div>
      <label className="sort">Sort by <select value={sort} aria-label="Sort products" onChange={e => setSort(e.target.value)}><option value="curated">Collection order</option><option value="name">Name, A–Z</option></select></label>
    </div>
    <div className="results-row"><span aria-live="polite">Showing {Math.min(limit, results.length)} of {results.length} products{query ? " for “" + query + "”" : ""}</span>{(category !== "all" || query) && <button className="clear-search" onClick={() => filter("all", true)}>Clear filters</button>}</div>
    <div className="product-grid" aria-busy={pending}>{results.slice(0, limit).map(p => <ProductCard key={p.id} product={p} />)}
      {!results.length && <div className="empty-results"><h3>No matching products</h3><p>Try a different search or clear your filters.</p></div>}
    </div>
    {results.length > limit && <div className="show-more-wrap"><button className="button secondary" onClick={() => setLimit(products.length)}>View all products <Icon name="arrow-right" size={18} /></button></div>}
  </div></section>;
}
