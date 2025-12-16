import psmHandler from "../handlers/psm.handler";
import storeHandler from "../handlers/store.handler";
import { factory } from "./factory";

export const psm = factory
  .createApp()
  .get("/", ...psmHandler.getPeriode)
  .get("/:kode_toko/:kode_program", ...psmHandler.getArchive);

export const store = factory
  .createApp()
  .get("/:kode_toko/:kode_program", ...storeHandler.getStoreInfo)
  .delete("/:kode_toko", ...storeHandler.deleteStoreInfo);
