export default function StatCard({ title, value, color }) {
  return (
    <div
      className="card"
      style={{
        borderLeft: `8px solid ${color}`
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}