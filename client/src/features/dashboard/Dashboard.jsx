import { useOutletContext } from "react-router-dom";
import CircleScore from "../../components/CircleScore.jsx";
import StatCard from "../../components/StatCard.jsx";
import { sharedStyles, theme } from "../../styles/theme.js";
import { scoreColor } from "../../utils/helpers.js";

function Dashboard() {
  const { today, todayLog, todayScore, streaks, aiText, aiLoading, aiError, onGetCoach, weeklySummary, logs } = useOutletContext();
  const ringColor = todayScore !== null ? scoreColor(todayScore) : "#222";

  return (
    <div>
      <div style={{ ...sharedStyles.card, textAlign: "center", background: "linear-gradient(160deg, #0a0a1a 60%, #0d0520 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: `${ringColor}08`, filter: "blur(40px)" }} />
        <div style={{ ...sharedStyles.tinyMeta, marginBottom: 16 }}>LIFE SCORE - {today}</div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <CircleScore value={todayScore ?? 0} color={ringColor} size={160} />
        </div>
        {!todayLog ? (
          <div style={{ fontSize: 10, color: "#333", fontFamily: "monospace", letterSpacing: 2 }}>NO DATA YET - LOG YOUR DAY</div>
        ) : (
          <div style={{ fontSize: 10, color: "#555", fontFamily: "monospace", letterSpacing: 2 }}>
            {todayLog.gym ? "✓ GYM" : "✗ GYM"} - {todayLog.diet ? "✓ DIET" : "✗ DIET"} - {todayLog.phone_hrs}HR PHONE
          </div>
        )}
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>STREAKS</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <StatCard label="GYM" value={streaks.gym} color={theme.colors.green} fire />
          <StatCard label="CLEAN DIET" value={streaks.diet} color={theme.colors.cyan} fire />
          <StatCard label="PHONE ≤2H" value={streaks.phone} color={theme.colors.orange} fire />
          <StatCard label="NO SPIRAL" value={streaks.emotion} color={theme.colors.violet} fire />
        </div>
      </div>

      <div style={{ ...sharedStyles.card, border: `1px solid ${theme.colors.cyan}22` }}>
        <div style={sharedStyles.sectionTitle}>AI COACH</div>
        {aiError ? (
          <div style={{ fontFamily: "monospace", fontSize: 12, color: theme.colors.red, lineHeight: 1.6, background: "#060610", borderRadius: 8, padding: 14, borderLeft: `3px solid ${theme.colors.red}` }}>{aiError}</div>
        ) : aiText ? (
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", lineHeight: 1.8, whiteSpace: "pre-wrap", background: "#060610", borderRadius: 8, padding: 14, borderLeft: `3px solid ${theme.colors.cyan}` }}>{aiText}</div>
        ) : (
          <div style={{ fontSize: 11, color: "#333", fontFamily: "monospace", textAlign: "center", padding: "10px 0" }}>Log your day first, then get coached.</div>
        )}
        <button type="button" onClick={onGetCoach} disabled={aiLoading} style={{ marginTop: 14, width: "100%", padding: "12px", background: aiLoading ? "#111" : "#00f5ff12", border: `1px solid ${aiLoading ? "#1a1a3e" : theme.colors.cyan}`, borderRadius: 8, color: aiLoading ? "#333" : theme.colors.cyan, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, cursor: aiLoading ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
          {aiLoading ? "ANALYZING..." : "⚡ GET COACHED"}
        </button>
      </div>

      {logs.length > 0 ? (
        <div style={sharedStyles.card}>
          <div style={sharedStyles.sectionTitle}>THIS WEEK</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <StatCard label="DAYS LOGGED" value={weeklySummary.daysLogged} color={theme.colors.cyan} />
            <StatCard label="AVG SCORE" value={weeklySummary.avgScore} color={theme.colors.green} />
            <StatCard label="GYM DAYS" value={weeklySummary.gymDays} color={theme.colors.orange} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;