import dayjs from "dayjs";

// Get the date in the format "MMM DD, YYYY - HH:mm"
export const getDate = (startDate: string, endDate: string) => {
  const start = dayjs(startDate).format("DD MMM YYYY");
  const end = dayjs(endDate).format("DD MMM YYYY");

  return `[${start} - ${end}]`;
};
