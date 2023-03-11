import { useContext } from "react";
import { UserContext } from "../contexts/user.context";

export default function Home() {
  const { user } = useContext(UserContext);
  return(
    <div>
      {!user && (
        <div style={{ backgroundColor: "#f8d7da", color: "#721c24", padding: "0.75rem 1.25rem", marginBottom: "1rem", border: "1px solid #f5c6cb" }}>
          You are not currently signed-in. Please log in.
        </div>
      )}
    </div>
  )
}
