import { useQuery } from "@tanstack/react-query";

const SHEET_ID = "1vua7p2ZyalTauwantE9zSt8WD1OqEdX7Ul7t0DdiuHQ";

const GIDS: Record<string, string> = {
  unsc: "451919134",
  unhrc: "1810407013",
  aippm: "0",
};

export const normalizeName = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "");

// Minimal CSV parser handling quoted fields, escaped quotes, and embedded newlines.
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

async function fetchAllocations(committeeSlug: string): Promise<Set<string>> {
  const gid = GIDS[committeeSlug];
  if (!gid) return new Set();
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}&_=${Math.floor(Date.now() / 60000)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const text = await res.text();
  const rows = parseCSV(text);
  const allocated = new Set<string>();
  for (const row of rows) {
    if (row.length < 2) continue;
    const name = (row[1] ?? "").trim();
    const availability = (row[row.length - 1] ?? "").trim().toLowerCase();
    if (!name || !availability) continue;
    // Anything not explicitly "available" is treated as taken.
    if (availability !== "available") {
      allocated.add(normalizeName(name));
    }
  }
  return allocated;
}

export function useAllocations(committeeSlug: string) {
  return useQuery({
    queryKey: ["allocations", committeeSlug],
    queryFn: () => fetchAllocations(committeeSlug),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: true,
    retry: 1,
    enabled: committeeSlug in GIDS,
  });
}