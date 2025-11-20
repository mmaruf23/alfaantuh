import psmHandler from "../handlers/psm.handler";
import { factory } from "./factory";

export const psm = factory.createApp().get("/:kode_toko", ...psmHandler.getPeriode);

export const env = factory.createApp().get("/", async (c) => {
  const { DEV } = c.env;
  return c.text(DEV);
});
