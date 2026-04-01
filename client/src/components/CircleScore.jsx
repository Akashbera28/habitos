import { scoreLabel } from "../utils/helpers.js";

function CircleScore({ value, color, size = 140 }) {
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const strokeLength = (value / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", position: "absolute" }}
      >
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#111122" strokeWidth="10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${strokeLength} ${circumference}`}
          strokeLinecap="round"
          style={{
            transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)",
            filter: `drop-shadow(0 0 10px ${color})`,
          }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: size === 140 ? 42 : 26, color, lineHeight: 1, textShadow: `0 0 20px ${color}88` }}>
          {value}
        </span>
        <span style={{ fontSize: 9, letterSpacing: 3, color: "#555", fontFamily: "monospace", marginTop: 2 }}>
          {scoreLabel(value)}
        </span>
      </div>
    </div>
  );
}

export default CircleScore;