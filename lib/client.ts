export async function sendEnquiry(d: Record<string, unknown>): Promise<boolean> {
  try {
    const r = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
    return r.ok;
  } catch {
    return false;
  }
}
export function toast(m: string) {
  window.dispatchEvent(new CustomEvent("toast", { detail: m }));
}
export const validEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);
