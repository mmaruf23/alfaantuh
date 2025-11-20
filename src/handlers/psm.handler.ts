import { factory } from "../app/factory";
import { parseWeekType } from "../helpers/validator";
import psmService from "../services/psm.service";

const getPeriode = factory.createHandlers(async (c) => {
  const kode_toko = c.req.param("kode_toko")!;
  const week_type = parseWeekType(c.req.query("periode"));
  const dev = c.env.DEV === "development";

  const result = await psmService.getProgramData(c.env.KV, kode_toko, week_type, dev);
  return c.json(result, result.code);
});

export default { getPeriode };
