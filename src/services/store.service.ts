import { dev_mode } from "../app/factory";
import { parseCSVtoObject, parsePluDataToStoreInfo } from "../helpers/mapper";
import { getPeriod } from "../helpers/time";
import { isValidProgramCode, isValidStoreCode, programCodeToPeriode } from "../helpers/validator";
import { dummyAcv, dummyRaw } from "../sample/dummy";
import type { ApiResponse, PluData, StoreInfo } from "../types";

async function getStoreInfo(kode_toko: string, kode_program: string, store: KVNamespace): Promise<ApiResponse> {
  if (!isValidStoreCode(kode_toko)) {
    return { success: false, code: 400, message: "format kode toko tidak valid" };
  }

  const store_info = await store.get(kode_toko);
  if (store_info) {
    console.log("data dari kv");
    return JSON.parse(store_info) as ApiResponse<StoreInfo>;
  }

  if (!isValidProgramCode(kode_program)) {
    return { success: false, code: 400, message: "input referrence tidak valid" };
  }

  const periode = programCodeToPeriode(kode_program);

  let response: string;
  try {
    const res = dev_mode
      ? new Response(dummyRaw[0], { status: 200 })
      : await fetch(
          `https://intranet.sat.co.id/pdmstore/public/file/plu/${periode}/${kode_program}_${kode_toko.toUpperCase()}.csv`
        );

    response = await res.text();
  } catch (error) {
    return { success: false, code: 500, message: "failed to fetch store info" };
  }

  const resultJson = parseCSVtoObject(response) as PluData[];
  const storeInfo = parsePluDataToStoreInfo(resultJson[0]);

  const result = { success: true, code: 200, data: storeInfo } as ApiResponse;

  console.log("save ke kv");
  await store.put(storeInfo.kd_store, JSON.stringify(result));
  return result;
}

async function deleteStoreInfo(kode_toko: string, store: KVNamespace): Promise<ApiResponse> {
  if (!isValidStoreCode(kode_toko)) {
    return { success: false, code: 400, message: "format kode toko tidak valid" };
  }

  await store.delete(kode_toko);
  return { success: true, code: 200 };
}

export default { getStoreInfo, deleteStoreInfo };
