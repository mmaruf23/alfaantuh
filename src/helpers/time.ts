import type { WeekType } from "../types";

export const getPeriod = (weekType: WeekType = "now"): string => {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth();
  let week: number;

  week = (() => {
    if (date > 23) return 4;
    if (date > 15) return 3;
    if (date > 7) return 2;
    return 1;
  })();

  if (weekType === "before") {
    week = week == 1 ? 4 : week - 1;
    if (week == 4) now.setMonth(month - 1);
  }

  if (weekType === "next") {
    week = week == 4 ? 1 : week + 1;
    if (week == 1) now.setMonth(month + 1);
  }

  return now.getFullYear().toString().substring(2) + (now.getMonth() + 1).toString().padStart(2, "0") + week.toString();
};
