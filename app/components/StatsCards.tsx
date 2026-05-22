type StatsProps = {
  total: number;
  completed: number;
  pending: number;
};

export default function StatsCards({
  total,
  completed,
  pending,
}: StatsProps) {
  const cards = [
    {
      label: "Total Tasks",
      value: total,
    },
    {
      label: "Completed",
      value: completed,
    },
    {
      label: "Pending",
      value: pending,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "15px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: "#1e293b",
            padding: "22px",
            borderRadius: "16px",
          }}
        >
          <h3>{card.label}</h3>

          <p
            style={{
              fontSize: "34px",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}