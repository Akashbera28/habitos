import { useOutletContext } from "react-router-dom";
import Slider from "../../components/Slider.jsx";
import Toggle from "../../components/Toggle.jsx";
import { sharedStyles, theme } from "../../styles/theme.js";
import { scoreColor, scoreLabel } from "../../utils/helpers.js";

function Tracker() {
  const { form, setForm, saveStatus, onSaveLog, validationMessage } = useOutletContext();
  const previewScore = form.previewScore;
  const previewColor = scoreColor(previewScore);

  return (
    <div>
      <div style={{ ...sharedStyles.card, textAlign: "center" }}>
        <div style={{ ...sharedStyles.tinyMeta, marginBottom: 10 }}>LIVE PREVIEW</div>
        <div style={{ fontFamily: theme.fonts.display, fontSize: 56, color: previewColor, textShadow: `0 0 30px ${previewColor}55`, lineHeight: 1 }}>{previewScore}</div>
        <div style={{ fontSize: 9, color: "#444", fontFamily: "monospace", letterSpacing: 3, marginTop: 4 }}>{scoreLabel(previewScore)}</div>
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>HABITS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
          <Toggle value={form.gym} onChange={(value) => setForm((current) => ({ ...current, gym: value }))} label="GYM DONE" color={theme.colors.green} />
          <Toggle value={form.diet} onChange={(value) => setForm((current) => ({ ...current, diet: value }))} label="CLEAN DIET" color={theme.colors.cyan} />
        </div>
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>NUMBERS</div>
        <Slider label="STUDY / DEEP WORK (HRS)" value={form.study_hours} onChange={(value) => setForm((current) => ({ ...current, study_hours: value }))} min={0} max={12} unit="h" color={theme.colors.cyan} />
        <Slider label="SLEEP (HRS)" value={form.sleep_hours} onChange={(value) => setForm((current) => ({ ...current, sleep_hours: value }))} min={3} max={12} unit="h" color={theme.colors.green} />
        <Slider label="📱 PHONE SCREEN TIME (HRS)" value={form.phone_hrs} onChange={(value) => setForm((current) => ({ ...current, phone_hrs: value }))} min={0} max={12} unit="h" color={theme.colors.red} />
        <Slider label="ENERGY AT 3PM" value={form.energy_3pm} onChange={(value) => setForm((current) => ({ ...current, energy_3pm: value }))} min={1} max={10} step={1} unit="/10" color={theme.colors.orange} />
        <Slider label="MOOD" value={form.mood} onChange={(value) => setForm((current) => ({ ...current, mood: value }))} min={1} max={5} step={1} unit="/5" color={theme.colors.violet} />
      </div>

      <div style={{ ...sharedStyles.card, border: `1px solid ${theme.colors.red}22` }}>
        <div style={{ ...sharedStyles.sectionTitle, color: theme.colors.red }}>HONESTY ZONE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 }}>
          <Toggle value={form.emotional_trigger} onChange={(value) => setForm((current) => ({ ...current, emotional_trigger: value }))} label="EMOTIONAL SPIRAL" color={theme.colors.red} />
          <Toggle value={form.thought_about_her} onChange={(value) => setForm((current) => ({ ...current, thought_about_her: value }))} label="THOUGHT ABOUT HER" color={theme.colors.red} />
        </div>
        <div style={{ fontSize: 9, color: "#333", fontFamily: "monospace", textAlign: "center", marginTop: 8, letterSpacing: 2 }}>FAKE DATA = FAKE GROWTH</div>
      </div>

      <div style={sharedStyles.card}>
        <div style={sharedStyles.sectionTitle}>WIN OF THE DAY</div>
        <textarea value={form.win} onChange={(event) => setForm((current) => ({ ...current, win: event.target.value }))} placeholder="What did you do right today? Even one small thing..." style={{ width: "100%", background: "#060610", border: `1px solid ${theme.colors.border}`, borderRadius: 8, color: "#ccc", padding: 12, fontSize: 13, fontFamily: "monospace", resize: "vertical", minHeight: 80, outline: "none" }} />
      </div>

      {validationMessage ? (
        <div style={{ ...sharedStyles.card, border: `1px solid ${theme.colors.red}22`, color: theme.colors.red, fontFamily: "monospace", fontSize: 12 }}>{validationMessage}</div>
      ) : null}

      <button type="button" onClick={onSaveLog} style={{ width: "100%", padding: 16, background: saveStatus === "saved" ? `${theme.colors.green}20` : `${theme.colors.cyan}15`, border: `2px solid ${saveStatus === "saved" ? theme.colors.green : theme.colors.cyan}`, borderRadius: 12, color: saveStatus === "saved" ? theme.colors.green : theme.colors.cyan, fontFamily: theme.fonts.display, fontSize: 18, letterSpacing: 6, cursor: "pointer", transition: "all 0.3s", marginBottom: 8 }}>
        {saveStatus === "updated" ? "UPDATED TODAY" : saveStatus === "saved" ? "✓ SAVED" : "LOCK IN TODAY"}
      </button>
      <div style={{ fontSize: 9, color: "#222", fontFamily: "monospace", textAlign: "center", letterSpacing: 2 }}>DATA SAVES TO YOUR DEVICE</div>
    </div>
  );
}

export default Tracker;