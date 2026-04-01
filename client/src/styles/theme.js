export const theme = {
  colors: {
    bg: "#05050f",
    card: "#0a0a1a",
    border: "#151530",
    cyan: "#00f5ff",
    green: "#00ff88",
    orange: "#ff8c00",
    red: "#ff3355",
    violet: "#bf00ff",
    text: "#d0d0e8",
    muted: "#555",
    dim: "#333",
    soft: "#222",
  },
  fonts: {
    display: "'Bebas Neue', cursive",
    mono: "monospace",
  },
};

export const sharedStyles = {
  pageShell: {
    minHeight: "100vh",
    background: theme.colors.bg,
    color: theme.colors.text,
  },
  content: {
    padding: "20px 16px",
    maxWidth: 600,
    margin: "0 auto",
  },
  card: {
    background: theme.colors.card,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.22)",
  },
  sectionTitle: {
    fontFamily: theme.fonts.display,
    fontSize: 18,
    letterSpacing: 5,
    color: theme.colors.cyan,
    margin: "0 0 16px",
    borderBottom: `1px solid ${theme.colors.border}`,
    paddingBottom: 8,
  },
  tinyMeta: {
    fontSize: 9,
    letterSpacing: 3,
    color: theme.colors.muted,
    fontFamily: theme.fonts.mono,
  },
};
