import { DEFAULT_FORM } from "../constants/config.js";
import calcScore from "./calcScore.js";

export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function scoreColor(score) {
  if (score >= 80) return "#00ff88";
  if (score >= 60) return "#00f5ff";
  if (score >= 40) return "#ffaa00";
  return "#ff4466";
}

export function scoreLabel(score) {
  if (score >= 80) return "ELITE";
  if (score >= 60) return "SOLID";
  if (score >= 40) return "WEAK";
  return "FAILING";
}

export function sanitizeLogInput(log = {}) {
  return {
    ...DEFAULT_FORM,
    ...log,
    study_hours: Number(log.study_hours ?? DEFAULT_FORM.study_hours),
    sleep_hours: Number(log.sleep_hours ?? DEFAULT_FORM.sleep_hours),
    phone_hrs: Number(log.phone_hrs ?? DEFAULT_FORM.phone_hrs),
    energy_3pm: Number(log.energy_3pm ?? DEFAULT_FORM.energy_3pm),
    mood: Number(log.mood ?? DEFAULT_FORM.mood),
    win: String(log.win ?? DEFAULT_FORM.win),
  };
}

export function validateLog(log = {}) {
  if (Number.isNaN(Number(log.study_hours)) || Number(log.study_hours) < 0) {
    return "Study hours must be 0 or more.";
  }

  if (Number.isNaN(Number(log.phone_hrs)) || Number(log.phone_hrs) < 0) {
    return "Phone hours must be 0 or more.";
  }

  return "";
}

export function upsertLog(logs = [], incomingLog) {
  return [...logs.filter((log) => log.date !== incomingLog.date), incomingLog].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}

export function buildChartData(logs = []) {
  return [...logs]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14)
    .map((log) => ({
      date: log.date.slice(5),
      score: calcScore(log),
      phone: log.phone_hrs ?? 0,
      study: log.study_hours ?? 0,
    }));
}

export function getWeeklySummary(logs = []) {
  const now = new Date();
  const recentLogs = logs.filter((log) => (now - new Date(log.date)) / 86400000 <= 7);

  return {
    daysLogged: recentLogs.length,
    avgScore: recentLogs.length
      ? Math.round(recentLogs.reduce((sum, log) => sum + calcScore(log), 0) / recentLogs.length)
      : 0,
    gymDays: recentLogs.filter((log) => log.gym).length,
  };
}

export function getCoachPayload(logs = [], currentLog) {
  const lastSevenLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7);
  const avgPhone = lastSevenLogs.length
    ? (
        lastSevenLogs.reduce((sum, log) => sum + (Number(log.phone_hrs) || 0), 0) /
        lastSevenLogs.length
      ).toFixed(1)
    : "?";

  return {
    log: currentLog,
    avgPhone,
    gymDays: lastSevenLogs.filter((log) => log.gym).length,
    score: calcScore(currentLog),
  };
}