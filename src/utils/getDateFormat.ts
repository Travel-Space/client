import WEEKDAY from "@/constants/weekDay";

export default function getDateFormat(value: Date) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export const getDateFormatWithDay = (value: Date) => {
  const localDate = new Date(value);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const date = String(localDate.getDate()).padStart(2, "0");
  const day = WEEKDAY[localDate.getDay()];
  return `${year}.${month}.${date} ${day}`;
};
