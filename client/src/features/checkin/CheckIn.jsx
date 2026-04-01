import { useOutletContext } from "react-router-dom";
import Slider from "../../components/Slider.jsx";
import { sharedStyles, theme } from "../../styles/theme.js";

function CheckIn() {
  const { checkIn, setCheckIn, checkInDone, setCheckInDone } = useOutletContext();

  if (checkInDone) {
    return (
      <div>
        <div style={{ ...sharedStyles.card, textAlign: "center", paddingTop: 30, paddingBottom: 30 }}>
          <div style={{ fontFamily: theme.fonts.display, fontSize: 28, color: theme.colors.violet, letterSpacing: 6, marginBottom: 4 }}>NIGHT CHECK-IN</div>
          <div style={{ fontSize: 9, color: "#333", fontFamily: "monospace", letterSpacing: 3 }}>10 SECONDS - DO IT EVERY NIGHT</div>
        </div>

        <div style={{ ...sharedStyles.card, textAlign: "center", padding: 40 }}>
          <div style={{ fontFamily: theme.fonts.display, fontSize: 36, color: theme.colors.green, letterSpacing: 4 }}>LOCKED IN</div>
          <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", marginTop: 8, letterSpacing: 2 }}>SEE YOU TOMORROW. SAME TIME.</div>
          <div style={{ marginTop: 20, fontFamily: theme.fonts.display, fontSize: 20, color: "#333", letterSpacing: 3 }}>
            "{checkIn.word.toUpperCase()}"
          </div>
        </div>
      </div>
    );
  }

  const canSubmit = checkIn.on_track !== null && checkIn.word.trim();

  return (
    <div>
      <div style={{ ...sharedStyles.card, textAlign: "center", paddingTop: 30, paddingBottom: 30 }}>
        <div style={{ fontFamily: theme.fonts.display, fontSize: 28, color: theme.colors.violet, letterSpacing: 6, marginBottom: 4 }}>NIGHT CHECK-IN</div>
        <div style={{ fontSize: 9, color: "#333", fontFamily: "monospace", letterSpacing: 3 }}>10 SECONDS - DO IT EVERY NIGHT</div>
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>Q1 - PHONE TODAY</div>
        <Slider label="TOTAL SCREEN TIME" value={checkIn.phone} onChange={(value) => setCheckIn((current) => ({ ...current, phone: value }))} min={0} max={12} unit="h" color={theme.colors.red} />
        {checkIn.phone > 3 ? <div style={{ fontSize: 10, color: theme.colors.red, fontFamily: "monospace", letterSpacing: 2, marginTop: -8 }}>⚠ HIGH. FIX TOMORROW.</div> : null}
        {checkIn.phone <= 1 ? <div style={{ fontSize: 10, color: theme.colors.green, fontFamily: "monospace", letterSpacing: 2, marginTop: -8 }}>✓ DISCIPLINED.</div> : null}
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>Q2 - DID YOU STAY ON TRACK?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button type="button" onClick={() => setCheckIn((current) => ({ ...current, on_track: true }))} style={{ padding: 16, borderRadius: 10, border: `2px solid ${checkIn.on_track === true ? theme.colors.green : theme.colors.border}`, background: checkIn.on_track === true ? `${theme.colors.green}15` : "#060610", color: checkIn.on_track === true ? theme.colors.green : "#333", fontFamily: theme.fonts.display, fontSize: 18, letterSpacing: 3, cursor: "pointer" }}>YES</button>
          <button type="button" onClick={() => setCheckIn((current) => ({ ...current, on_track: false }))} style={{ padding: 16, borderRadius: 10, border: `2px solid ${checkIn.on_track === false ? theme.colors.red : theme.colors.border}`, background: checkIn.on_track === false ? `${theme.colors.red}15` : "#060610", color: checkIn.on_track === false ? theme.colors.red : "#333", fontFamily: theme.fonts.display, fontSize: 18, letterSpacing: 3, cursor: "pointer" }}>NO</button>
        </div>
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>Q3 - ONE WORD FOR TODAY</div>
        <input value={checkIn.word} onChange={(event) => setCheckIn((current) => ({ ...current, word: event.target.value }))} placeholder="disciplined / weak / distracted / focused..." style={{ width: "100%", background: "#060610", border: `1px solid ${theme.colors.border}`, borderRadius: 8, color: "#ccc", padding: "14px 16px", fontSize: 14, fontFamily: "monospace", outline: "none", letterSpacing: 2 }} />
      </div>

      <button type="button" onClick={() => { if (canSubmit) { setCheckInDone(true); } }} style={{ width: "100%", padding: 16, background: "#bf00ff15", border: "2px solid #bf00ff", borderRadius: 12, color: "#bf00ff", fontFamily: theme.fonts.display, fontSize: 18, letterSpacing: 6, cursor: "pointer", opacity: canSubmit ? 1 : 0.3, transition: "all 0.2s" }}>
        SUBMIT NIGHT LOG
      </button>
    </div>
  );
}

export default CheckIn;