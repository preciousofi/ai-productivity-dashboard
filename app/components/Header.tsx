type Props = {
  email: string;
  logout: () => void;
};

export default function Header({
  email,
  logout,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        marginBottom:
          "30px",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "34px",
            marginBottom:
              "5px",
          }}
        >
          AI Dashboard 🚀
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
          color:
            "white",
          border:
            "none",
          padding:
            "12px 18px",
          borderRadius:
            "10px",
          cursor:
            "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}