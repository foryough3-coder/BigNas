"use client";
import { useActionState } from "react";
import type { Category, Product } from "@/lib/products";
import type { ProductFormState } from "@/app/316nas/(protected)/products/actions";

export function ProductEditForm({ product, categories, action }: {
  product?: Product; categories: Category[];
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return <form action={formAction} className="form-grid">
    {!product && <div className="form-field">
      <label htmlFor="id">URL name</label>
      <input id="id" name="id" required pattern="[a-z0-9]+(-[a-z0-9]+)*" placeholder="square-glass-clamp" />
      <p className="form-note">Becomes /products/square-glass-clamp. Lowercase letters, numbers and dashes. Can’t be changed later.</p>
    </div>}
    <div className="form-field"><label htmlFor="name">Name</label><input id="name" name="name" defaultValue={product?.name} required /></div>
    <div className="form-field"><label htmlFor="category">Category</label>
      <select id="category" name="category" defaultValue={product?.category ?? categories[0]?.id}>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
    </div>
    <div className="form-field"><label htmlFor="finishLabel">Finish</label><input id="finishLabel" name="finishLabel" defaultValue={product?.finishLabel} required placeholder="Polished silver" /></div>
    <div className="form-field"><label htmlFor="description">Description</label><textarea id="description" name="description" rows={4} defaultValue={product?.description} required /></div>
    <div className="form-field"><label htmlFor="price">Price</label><input id="price" name="price" type="number" step="0.01" min="0" defaultValue={product?.price ?? ""} /></div>
    <div className="form-field"><label htmlFor="currency">Currency</label><input id="currency" name="currency" defaultValue={product?.currency ?? ""} placeholder="BOB" /></div>
    <div className="form-field"><label htmlFor="priceStatus">Price status</label>
      <select id="priceStatus" name="priceStatus" defaultValue={product?.priceStatus ?? "not-provided"}>
        <option value="not-provided">Not provided</option>
        <option value="estimate">Estimate</option>
        <option value="confirmed">Confirmed</option>
      </select>
    </div>
    <div className="form-field"><label htmlFor="stock">Stock</label><input id="stock" name="stock" type="number" step="1" defaultValue={product?.stock ?? ""} /></div>
    <div className="form-field"><label htmlFor="sku">SKU</label><input id="sku" name="sku" defaultValue={product?.sku ?? ""} /></div>
    <div className="form-field"><label htmlFor="materialGrade">Material grade</label><input id="materialGrade" name="materialGrade" defaultValue={product?.materialGrade ?? ""} placeholder="304 stainless steel" /></div>
    <div className="form-field"><label htmlFor="includedItems">Included items (comma separated)</label><input id="includedItems" name="includedItems" defaultValue={product?.includedItems?.join(", ") ?? ""} /></div>
    <div className="form-field"><label htmlFor="dimensions">Dimensions (JSON, optional)</label><textarea id="dimensions" name="dimensions" rows={3} defaultValue={product?.dimensions ? JSON.stringify(product.dimensions) : ""} placeholder='{"heightMm": 80, "baseMm": 50}' /></div>
    <div className="form-field"><label htmlFor="thumbnailKey">Image path (card)</label><input id="thumbnailKey" name="thumbnailKey" defaultValue={product?.thumbnailKey} required placeholder="three16craft/products/v1/name-480.webp" /></div>
    <div className="form-field"><label htmlFor="imageKey">Image path (product page, optional)</label><input id="imageKey" name="imageKey" defaultValue={product?.imageKey} placeholder="three16craft/products/v1/name-1000.webp" />
      <p className="form-note">Paths of images already in public/ or on R2. Leave empty to reuse the card image.</p>
    </div>
    <div className="form-field"><label htmlFor="alt">Image description (for screen readers)</label><input id="alt" name="alt" defaultValue={product?.alt} /></div>
    <div className="form-field"><label htmlFor="dataStatus">Data status</label>
      <select id="dataStatus" name="dataStatus" defaultValue={product?.dataStatus ?? "draft-needs-owner-confirmation"}>
        <option value="draft-needs-owner-confirmation">Draft — needs confirmation</option>
        <option value="confirmed">Confirmed</option>
      </select>
    </div>
    {state?.error && <p className="form-error">{state.error}</p>}
    {state?.saved && <p className="form-note">Saved — the storefront is updated.</p>}
    <button className="button primary" type="submit" disabled={pending}>{pending ? "Saving…" : product ? "Save changes" : "Create product"}</button>
  </form>;
}
