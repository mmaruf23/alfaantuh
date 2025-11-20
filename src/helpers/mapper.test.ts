import { dummyRaw } from "../sample/dummy";
import { parsePeriodeData } from "./mapper";

const result = parsePeriodeData(dummyRaw);

console.log(JSON.stringify(result, null, 2));
