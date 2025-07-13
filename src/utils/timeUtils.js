export const groupTimestampsByHour = (timestamps = {}) => {
  const hourMap = {};

  Object.keys(timestamps).forEach((ts) => {
    const date = new Date(Number(ts));
    const hourLabel = `${date.getHours().toString().padStart(2, "0")}:00`;
    hourMap[hourLabel] = (hourMap[hourLabel] || 0) + 1;
  });

  return Object.entries(hourMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([hour, count]) => ({ hour, count }));
};
