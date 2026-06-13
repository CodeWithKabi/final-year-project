export default function Loader() {

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right,#1e1b4b,#6d28d9)"
      }}
    >

      <div
        style={{
          width: "70px",
          height: "70px",
          border: "8px solid rgba(255,255,255,0.2)",
          borderTop:
            "8px solid #22d3ee",
          borderRadius: "50%",
          animation:
            "spin 1s linear infinite"
        }}
      />

      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>

  );

}