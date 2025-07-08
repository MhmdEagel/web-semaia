interface PropTypes {
  token: string;
}

export default function VerificationEmail(props: PropTypes) {
  const { token } = props;
  return (
    <html lang="en">
      <body
        style={{
          padding: 0,
          margin: 0,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "#2e7d32",
            padding: "10px 0",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontWeight: "bold", color: "white" }}>
            Welcome to Semaia
          </h1>
          <p style={{ fontWeight: "bold", color: "white" }}>
            When every products you buy worth a tree to save the world
          </p>
        </div>
        <p style={{ textAlign: "center" }}>
         Press button below to verify your email
        </p>
        <a
          style={{
            padding: "10px 20px",
            textDecoration: "none",
            margin: "0 auto",
            display: "block",
            backgroundColor: "#2e7d32",
            width: "fit-content",
            color: "white",
            borderRadius: "10px",
          }}
          href={`http://localhost:3000/auth/new-verification?token=${token}`}
        >
          Verify Email
        </a>
      </body>
    </html>
  );
}
