import { getPeriod } from "@/helpers/time";
import type { WeekType } from "@/types";
import psmService, { fetchProgramData, getTargetData } from "@/services/psm.service";

// (async () => {
//   const kode_toko = "J007";
//   const week_type: WeekType = "now";
//   const kode_periode = getPeriod(week_type);

//   const result = await fetchProgramData(week_type, kode_periode);

//   console.log(result);
// })();

// (async () => {
//   const result = await getTargetData("J007", "25123001");
//   console.log(result);
// })();
