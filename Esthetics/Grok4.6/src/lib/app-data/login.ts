import type { CallToolResult } from "./types.ts";

export function isLoginRequired(result: CallToolResult): boolean {
  return result.ok === false && result.loginRequired === true;
}

export function redirectToLoginIfRequired(result: CallToolResult): boolean {
  if (!isLoginRequired(result)) return false;
  const url = result.loginUrl;
  if (!url) return false;
  if (typeof window === "undefined") return false;
  window.location.assign(url);
  return true;
}
