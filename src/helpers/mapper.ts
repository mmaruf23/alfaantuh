import type { PluData, ProgramData } from "../types";

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

export const parsePeriodeData = (raw: string[]) => {
  const res: PluData[][] = [];
  raw.forEach((r) => {
    const row = r.trim().replace(" ", "_").replace(/["\r]/g, "").split("\n");
    const header = row.shift()!.toLowerCase().split("|");
    const data = row.map((d) => {
      return d.split("|").reduce((a, c, i) => {
        a[header[i]] = c;
        return a;
      }, {} as Record<string, string>);
    });

    res.push(data as unknown as PluData[]);
  });

  const listProgramData: ProgramData[] = [];

  res.map((mr) => {
    mr.forEach(({ kode_program, nama_program, plu, descp }) => {
      let programData: ProgramData | undefined;
      programData = listProgramData.find((p) => p.kode_program === kode_program);
      if (!programData) {
        programData = { kode_program, nama_program, items: [] };
        listProgramData.push(programData);
      }
      programData.items.push({ plu, descp });
    });
  });

  return listProgramData;
};
