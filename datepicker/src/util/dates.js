export const getMDY = (date) => [date.getMonth(), date.getDate(), date.getFullYear()];

export const getDaysInMonth = (date) => {
  const [year, month] = [date.getFullYear(), date.getMonth()];
  switch (month + 1) {
    case 1: // January
    case 3: // March
    case 5: // May
    case 7: // July
    case 8: // August
    case 10: // October
    case 12: // December
      return 31;
    case 4: // April
    case 6: // June
    case 9: // September
    case 11: // November
      return 30;
    case 2: // February
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
    default:
      return -1; // Invalid month
  }
};
