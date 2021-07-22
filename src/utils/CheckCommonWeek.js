export const checkCommonWeekToRemove = (beforeMonth, afterMonth) => {
  const lastWeekDateInBeforeMonth = beforeMonth[beforeMonth.length - 1][0];
  const firstWeekDateInAfterMonth = afterMonth[0][0];

  if (
    lastWeekDateInBeforeMonth.getDate() ===
      firstWeekDateInAfterMonth.getDate() &&
    lastWeekDateInBeforeMonth.getMonth() ===
      firstWeekDateInAfterMonth.getMonth() &&
    lastWeekDateInBeforeMonth.getFullYear() ===
      firstWeekDateInAfterMonth.getFullYear()
  ) {
    return beforeMonth.slice(0, beforeMonth.length - 1);
  } else {
    return beforeMonth;
  }
};
