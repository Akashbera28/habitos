function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      style={{
        background: "#0d0d1e",
        border: "1px solid #1a1a3e",
        borderRadius: 8,
        padding: "8px 14px",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "#555",
          fontFamily: "monospace",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      {payload.map((item) => (
        <div
          key={item.dataKey}
          style={{
            fontSize: 13,
            color: item.color,
            fontFamily: "'Bebas Neue', cursive",
            letterSpacing: 1,
          }}
        >
          {item.name}: {Math.round(item.value)}
        </div>
      ))}
    </div>
  );
}

export default CustomTooltip;
