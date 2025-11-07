import type { PluData } from "../types";

export const parsePluData = (rawData: string) => {
  const rowData = rawData.trim().replace(" ", "_").replace(/["\r]/g, "").split("\n");
  const header = rowData.shift()!.toLowerCase().split("|");
  const data = rowData.map((r) => r.split("|"));

  const parsed = data.map((d) => {
    return d.reduce((a, c, i) => {
      a[header[i]] = c;
      return a;
    }, {} as Record<string, string>);
  });

  return parsed as PluData[];
};
