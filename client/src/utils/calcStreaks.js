import { getTodayDate } from "./helpers.js";

export function calcStreaks(logs = []) {
  const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));
  const streaks = { gym: 0, diet: 0, phone: 0, emotion: 0 };

  for (let index = 0; index < sortedLogs.length; index += 1) {
    const expectedDate = new Date(getTodayDate());
    expectedDate.setDate(expectedDate.getDate() - index);
    const dateString = expectedDate.toISOString().split("T")[0];

    if (sortedLogs[index]?.date !== dateString) {
      break;
    }

    const currentLog = sortedLogs[index];

    if (currentLog.gym) streaks.gym += 1;
    if (currentLog.diet) streaks.diet += 1;
    if ((currentLog.phone_hrs ?? 3) <= 2) streaks.phone += 1;
    if (!currentLog.emotional_trigger) streaks.emotion += 1;
  }

  return streaks;
}

export default calcStreaks;