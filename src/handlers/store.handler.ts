import { factory } from "../app/factory";
import storeService from "../services/store.service";

const getStoreInfo = factory.createHandlers(async (c) => {
  const kode_toko = c.req.param("kode_toko")!;
  const kode_program = c.req.param("kode_program")!;
  const store_kv = c.env.STORE;

  const result = await storeService.getStoreInfo(kode_toko, kode_program, store_kv);

  return c.json(result, result.code);
});

const deleteStoreInfo = factory.createHandlers(async (c) => {
  const kode_toko = c.req.param("kode_toko")!;

  const result = await storeService.deleteStoreInfo(kode_toko, c.env.STORE);

  return c.json(result, result.code);
});

export default { getStoreInfo, deleteStoreInfo };
