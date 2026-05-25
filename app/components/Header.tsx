type Props = {
  email: string;
  logout: () => Promise<void>;
};

export default function Header({
  email,
  logout,
}: Props) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "36px",
            margin: 0,
          }}
        >
          AI Dashboard
        </h1>

        <p
          style={{
            color:
              "#94a3b8",
          }}
        >
          {email}
        </p>
      </div>

      <button
        onClick={
          logout
        }
        style={{
          background:
            "#dc2626",
          border: "none",
          color: "white",
          padding:
            "12px 18px",
          borderRadius:
            "12px",
          cursor:
            "pointer",
        }}
      >
        Logout
      </button>
    </header>
  );
}