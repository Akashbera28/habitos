function StatCard({ label, value, sub, color = "#00f5ff", fire = false }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 80,
        background: "#0a0a18",
        border: `1px solid ${color}22`,
        borderRadius: 10,
        padding: "14px 10px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 32,
          color,
          lineHeight: 1,
          textShadow: `0 0 12px ${color}66`,
        }}
      >
        {fire && Number(value) > 0 ? "🔥" : ""}
        {value}
      </div>
      <div
        style={{
          fontSize: 9,
          letterSpacing: 2,
          color: "#555",
          fontFamily: "monospace",
          marginTop: 4,
        }}
      >
        {label}
      </div>
      {sub ? (
        <div
          style={{
            fontSize: 8,
            color: "#333",
            fontFamily: "monospace",
            marginTop: 2,
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
}

export default StatCard;
