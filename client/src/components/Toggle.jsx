function Toggle({ value, onChange, label, color = "#00f5ff" }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      style={{
        padding: "10px 0",
        borderRadius: 8,
        border: `1px solid ${value ? color : "#1e1e3a"}`,
        cursor: "pointer",
        fontFamily: "monospace",
        fontSize: 11,
        letterSpacing: 2,
        background: value ? `${color}18` : "#0a0a18",
        color: value ? color : "#444",
        transition: "all 0.25s",
        width: "100%",
      }}
    >
      {value ? "✓ " : "○ "}
      {label}
    </button>
  );
}

export default Toggle;
