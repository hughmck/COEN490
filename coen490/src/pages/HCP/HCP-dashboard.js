import axios from 'axios';
import { useContext, useState, useEffect } from "react";

export default function HCPDashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchData() {
      let databody = {
        "name": "Suor",
      };
      const response = await fetch('http://localhost:4444/HCP/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(databody),
      });

      try {
        const data = await response.json();
        console.log(data[0].date);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  console.log(email);
  return <h1>HCP : {email}</h1>;
}
