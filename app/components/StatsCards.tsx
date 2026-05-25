type Props = {
  total: number;
  completed: number;
  pending: number;
};

export default function StatsCards({
  total,
  completed,
  pending,
}: Props) {
  const cards = [
    {
      label: "Total",
      value: total,
    },
    {
      label:
        "Completed",
      value:
        completed,
    },
    {
      label:
        "Pending",
      value:
        pending,
    },
  ];

  return (
    <div
      style={{
        display:
          "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(180px,1fr))",
        gap: "15px",
        marginBottom:
          "25px",
      }}
    >
      {cards.map(
        (card) => (
          <div
            key={
              card.label
            }
            style={{
              background:
                "#111827",
              padding:
                "25px",
              borderRadius:
                "18px",
            }}
          >
            <p
              style={{
                color:
                  "#94a3b8",
              }}
            >
              {
                card.label
              }
            </p>

            <h2>
              {
                card.value
              }
            </h2>
          </div>
        )
      )}
    </div>
  );
}