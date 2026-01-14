export function truncate(s?: string, n = 100) {
  if (!s) return "";
  if (s.length <= n) return s;
  const truncated = s.slice(0, n);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
}
