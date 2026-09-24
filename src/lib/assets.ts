const baseUrl = (process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "").trim().replace(/\/+$/, "");
/** Empty configuration serves bundled images. Set the R2 custom domain later. */
export const assetUrl = (key: string) => baseUrl + "/" + key.replace(/^\/+/, "");
export const brandAssets = { animated: "three16craft/brand/v1/logo-animated.gif", static: "three16craft/brand/v1/logo-static.png" };
