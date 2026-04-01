function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.5,
  unit = "",
  color = "#00f5ff",
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span
          style={{
            fontSize: 10,
            letterSpacing: 2,
            color: "#666",
            fontFamily: "monospace",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 13,
            color,
            fontFamily: "'Bebas Neue', cursive",
            letterSpacing: 2,
          }}
        >
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ width: "100%", accentColor: color, height: 4, cursor: "pointer" }}
      />
    </div>
  );
}

export default Slider;
