export function isValidPagesUrl(url: string): boolean {
  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    return false;
  }

  return parsed.protocol === "https:" && parsed.hostname.endsWith(".github.io");
}
