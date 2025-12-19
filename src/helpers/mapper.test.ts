import { dummyAcv, dummyRaw } from "@/sample/dummy";
import { parseArchiveData, parseCSVtoObject, parsePeriodeData } from "@/helpers/mapper";

// const periode_data = parsePeriodeData(dummyRaw);
// console.log(JSON.stringify(periode_data, null, 2));

// const res = parseArchiveData(dummyAcv);
// console.log(res);

const result = parseCSVtoObject(dummyRaw[0]);

console.log(result);
