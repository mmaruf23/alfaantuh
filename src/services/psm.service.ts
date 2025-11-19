import { parsePeriodeData } from "../helpers/mapper";
import { getPeriod } from "../helpers/time";
import { isValidStoreCode } from "../helpers/validator";
import type { ApiResponse, ProgramData, WeekType } from "../types";

const getProgramData = async (kv: KVNamespace, kode_toko: string, week_type: WeekType): Promise<ApiResponse> => {
  if (!isValidStoreCode(kode_toko)) return { success: false, code: 400, message: "invalid kd_toko format" };

  const kode_periode = getPeriod(week_type);
  let listProgramData: ProgramData[] | null = await kv.get(kode_periode, "json");
  if (listProgramData) return { success: true, code: 200, data: listProgramData };

  listProgramData = await fetchProgramData(kode_toko, week_type, kode_periode);
  if (!listProgramData.length) return { success: false, code: 404, message: "no data provided from the server" };

  await kv.put(kode_periode, JSON.stringify(listProgramData));
  console.log(JSON.stringify(listProgramData, null, 2));

  return { success: true, code: 200, data: listProgramData };
};

export const fetchProgramData = async (kode_toko: string, week_type: WeekType, kode_periode: string) => {
  const result: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const url = `https://intranet.sat.co.id/pdmstore/public/file/plu/${week_type}/${kode_periode}${i
      .toString()
      .padStart(3, "0")}_${kode_toko}.csv`;
    console.log(url);
    try {
      const res = await fetch(url);

      if (res.status === 200) result.push(await res.text());
    } catch (error) {
      continue;
    }
  }

  return parsePeriodeData(result);
};

export default { getProgramData };
