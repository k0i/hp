export const diffDates = (from: Date, to: Date) => {
  const day = Math.floor(
    (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
  );
  const month = day / 30;
  const year = month / 12;
  return { day, month, year };
};

export const getPastDate = (howManyDaysPast: number): string => {
  const target = new Date();
  target.setDate(target.getDate() - howManyDaysPast);

  const padDigits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date: Date) =>
    [
      date.getFullYear(),
      padDigits(date.getMonth() + 1),
      padDigits(date.getDate()),
    ].join("-");

  return formatDate(target);
};
