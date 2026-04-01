import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { DEFAULT_CHECKIN, DEFAULT_FORM, STORAGE_KEY, TABS } from "../constants/config.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { getCoach } from "../services/api.js";
import { sharedStyles, theme } from "../styles/theme.js";
import calcScore from "../utils/calcScore.js";
import calcStreaks from "../utils/calcStreaks.js";
import {
  buildChartData,
  getCoachPayload,
  getTodayDate,
  getWeeklySummary,
  sanitizeLogInput,
  scoreColor,
  upsertLog,
  validateLog,
} from "../utils/helpers.js";

function App() {
  const [logs, setLogs] = useLocalStorage(STORAGE_KEY, []);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [validationMessage, setValidationMessage] = useState("");
  const [aiText, setAiText] = useState("");
  const [aiError, setAiError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [checkIn, setCheckIn] = useState(DEFAULT_CHECKIN);
  const [checkInDone, setCheckInDone] = useState(false);

  const today = getTodayDate();
  const todayLog = logs.find((log) => log.date === today) ?? null;
  const todayScore = todayLog ? calcScore(todayLog) : null;
  const streaks = calcStreaks(logs);
  const chartData = buildChartData(logs);
  const weeklySummary = getWeeklySummary(logs);

  useEffect(() => {
    if (todayLog) {
      setForm((current) => ({
        ...current,
        ...sanitizeLogInput(todayLog),
      }));
      setSaveStatus("updated");
    }
  }, [todayLog]);

  const handleSaveLog = () => {
    const sanitizedForm = sanitizeLogInput(form);
    const errorMessage = validateLog(sanitizedForm);

    if (errorMessage) {
      setValidationMessage(errorMessage);
      return;
    }

    const incomingLog = { ...sanitizedForm, date: today };
    const alreadyLoggedToday = logs.some((log) => log.date === today);
    setLogs((currentLogs) => upsertLog(currentLogs, incomingLog));
    setSaveStatus(alreadyLoggedToday ? "updated" : "saved");
    setValidationMessage("");

    window.setTimeout(() => {
      setSaveStatus((currentStatus) => (currentStatus === "saved" ? "updated" : currentStatus));
    }, 2500);
  };

  const handleGetCoach = async () => {
    const selectedLog = todayLog ?? sanitizeLogInput(form);
    const errorMessage = validateLog(selectedLog);

    if (errorMessage) {
      setAiError(errorMessage);
      setAiText("");
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiText("");

    try {
      const response = await getCoach(getCoachPayload(logs, selectedLog));
      setAiText(response.text || "Log your full day first.");
    } catch (error) {
      setAiError(error.message || "Network error. Stay disciplined anyway.");
    } finally {
      setAiLoading(false);
    }
  };

  const outletContext = {
    today,
    logs,
    form: { ...form, previewScore: calcScore(form) },
    setForm,
    todayLog,
    todayScore,
    streaks,
    chartData,
    saveStatus,
    validationMessage,
    aiText,
    aiError,
    aiLoading,
    checkIn,
    setCheckIn,
    checkInDone,
    setCheckInDone,
    weeklySummary,
    onSaveLog: handleSaveLog,
    onGetCoach: handleGetCoach,
  };

  return (
    <div style={sharedStyles.pageShell}>
      <div
        style={{
          background: "#08080f",
          borderBottom: `1px solid ${theme.colors.border}`,
          padding: "16px 20px 0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
          <span
            style={{
              fontFamily: theme.fonts.display,
              fontSize: 28,
              letterSpacing: 8,
              background: "linear-gradient(90deg, #00f5ff, #bf00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HABITOS
          </span>
          {todayScore !== null ? (
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: scoreColor(todayScore),
                letterSpacing: 2,
              }}
            >
              {todayScore}/100
            </span>
          ) : null}
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "monospace",
              fontSize: 9,
              color: "#222",
              letterSpacing: 2,
            }}
          >
            {today}
          </span>
        </div>
        <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
          {TABS.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === "/"}
              style={({ isActive }) => ({
                padding: "8px 14px",
                fontSize: 10,
                letterSpacing: 2,
                fontFamily: "monospace",
                cursor: "pointer",
                border: "none",
                background: "none",
                color: isActive ? theme.colors.cyan : "#333",
                borderBottom: `2px solid ${isActive ? theme.colors.cyan : "transparent"}`,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              })}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div style={sharedStyles.content}>
        <Outlet context={outletContext} />
      </div>
    </div>
  );
}

export default App;