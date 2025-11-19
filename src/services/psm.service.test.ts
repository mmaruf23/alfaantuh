import { fetchProgramData } from "./psm.service";

(async () => {
  const result = await fetchProgramData("J007", "now");

  console.log(result);
})();
