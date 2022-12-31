import enUS from "date-fns/locale/en-US";
import { parse, startOfWeek, getDay, format } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
  "en-US": enUS,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
