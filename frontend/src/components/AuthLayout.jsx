export default function AuthLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",

        background:
          "linear-gradient(135deg,#3b0f8f,#6d28d9,#9333ea)",

        padding: "20px",
      }}
    >
      <div
        style={{
          width: "420px",
          maxWidth: "100%",

          padding: "30px",

          borderRadius: "24px",

          background: "rgba(255,255,255,0.12)",

          backdropFilter: "blur(20px)",

          border:
            "1px solid rgba(255,255,255,0.15)",

          color: "white",

          boxShadow:
            "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        {children}
      </div>
    </div>
  );
}