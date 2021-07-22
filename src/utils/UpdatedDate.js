export const getUpdatedDate = (date, offset) => {
  const newDate = new Date(date);
  if (offset === 0) return newDate;

  newDate.setMonth(date.getMonth() + offset);
  return newDate;
};
