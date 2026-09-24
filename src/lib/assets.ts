const baseUrl = (process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "").trim().replace(/\/+$/, "");
/** Empty configuration serves the images bundled in public/. */
export const assetUrl = (key: string) => baseUrl + "/" + key.replace(/^\/+/, "");
export const brandAssets = { animated: "three16craft/brand/v1/logo-animated.gif", static: "three16craft/brand/v1/logo-static.png" };
