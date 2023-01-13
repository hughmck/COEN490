import { useContext } from "react";
import { UserContext } from "../contexts/user.context";

export default function Home() {

 const { user } = useContext(UserContext);
  if (!user) {
    console.log('Not Logged In');
  }
  return(
 <h1>Home Page (No User Logged In)</h1>
)
}
