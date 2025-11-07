import { parsePluData } from "../helpers/mapper";
import { getPeriod } from "../helpers/time";
import type { ApiResponse, PluData, WeekType } from "../types";

const getPeriodeData = async (kv: KVNamespace, kode_toko: string, weekType: WeekType = "now"): Promise<ApiResponse> => {
  let pluDatas: PluData[][] | null = await kv.get("periode", "json");
  if (pluDatas) return { success: true, code: 200, data: pluDatas };

  const result: string[] = [];
  const code_prefix = getPeriod(weekType);

  for (let i = 1; i <= 20; i++) {
    const url = `https://intranet.sat.co.id/pdmstore/public/file/plu/${weekType}/${code_prefix}${i}_${kode_toko}.csv`;
    try {
      const res = await fetch(url);
      if (res.status === 200) result.push(await res.text());
    } catch (error) {
      continue;
    }

    if (result.length >= 8) break;
  }

  if (!result.length) return { success: false, code: 404, message: "no data provided from the server" };

  const data = result.map((r) => parsePluData(r));
  await kv.put("periode", JSON.stringify(data));
  console.log(JSON.stringify(data, null, 2));

  return { success: true, code: 200, data };
};

export default { getPeriodeData };
