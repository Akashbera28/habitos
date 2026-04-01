import { useOutletContext } from "react-router-dom";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "../../components/CustomTooltip.jsx";
import StatCard from "../../components/StatCard.jsx";
import { sharedStyles, theme } from "../../styles/theme.js";
import calcScore from "../../utils/calcScore.js";
import { scoreColor } from "../../utils/helpers.js";

function Analytics() {
  const { logs, chartData } = useOutletContext();

  if (logs.length < 2) {
    return (
      <div style={{ ...sharedStyles.card, textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
        <div style={{ fontFamily: theme.fonts.display, fontSize: 20, color: "#333", letterSpacing: 4 }}>LOG AT LEAST 2 DAYS</div>
        <div style={{ fontSize: 10, color: "#222", fontFamily: "monospace", marginTop: 8 }}>COME BACK TOMORROW</div>
      </div>
    );
  }

  const bestScore = Math.max(...logs.map(calcScore));
  const averageScore = Math.round(logs.reduce((sum, log) => sum + calcScore(log), 0) / logs.length);
  const gymRate = Math.round((logs.filter((log) => log.gym).length / logs.length) * 100);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <StatCard label="BEST SCORE" value={bestScore} color={theme.colors.green} />
        <StatCard label="AVG SCORE" value={averageScore} color={theme.colors.cyan} />
        <StatCard label="GYM RATE" value={`${gymRate}%`} color={theme.colors.orange} />
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>LIFE SCORE - LAST 14 DAYS</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <XAxis dataKey="date" tick={{ fill: "#333", fontSize: 9, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#333", fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="score" stroke={theme.colors.cyan} strokeWidth={2} dot={{ fill: theme.colors.cyan, r: 3 }} name="Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>PHONE VS STUDY (HRS)</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <XAxis dataKey="date" tick={{ fill: "#333", fontSize: 9, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#333", fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="phone" fill={theme.colors.red} name="Phone" radius={[3, 3, 0, 0]} opacity={0.8} />
            <Bar dataKey="study" fill={theme.colors.green} name="Study" radius={[3, 3, 0, 0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
          <span style={{ fontSize: 9, color: theme.colors.red, fontFamily: "monospace", letterSpacing: 2 }}>■ PHONE</span>
          <span style={{ fontSize: 9, color: theme.colors.green, fontFamily: "monospace", letterSpacing: 2 }}>■ STUDY</span>
        </div>
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>HABIT LOG</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10, fontFamily: "monospace" }}>
            <thead>
              <tr style={{ color: "#333" }}>
                {["DATE", "SCORE", "GYM", "DIET", "PHONE", "STUDY"].map((heading) => (
                  <th key={heading} style={{ padding: "6px 8px", textAlign: "center", letterSpacing: 1, fontSize: 8 }}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...logs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10).map((log) => {
                const score = calcScore(log);
                const color = scoreColor(score);

                return (
                  <tr key={log.date} style={{ borderTop: `1px solid ${theme.colors.border}` }}>
                    <td style={{ padding: "8px", color: "#555", textAlign: "center" }}>{log.date.slice(5)}</td>
                    <td style={{ padding: "8px", color, fontWeight: "bold", textAlign: "center" }}>{score}</td>
                    <td style={{ padding: "8px", textAlign: "center", color: log.gym ? theme.colors.green : "#222" }}>{log.gym ? "✓" : "✗"}</td>
                    <td style={{ padding: "8px", textAlign: "center", color: log.diet ? theme.colors.cyan : "#222" }}>{log.diet ? "✓" : "✗"}</td>
                    <td style={{ padding: "8px", textAlign: "center", color: (log.phone_hrs ?? 0) <= 2 ? theme.colors.green : theme.colors.red }}>{log.phone_hrs ?? 0}h</td>
                    <td style={{ padding: "8px", textAlign: "center", color: "#666" }}>{log.study_hours ?? 0}h</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;