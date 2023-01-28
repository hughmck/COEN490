import axios from 'axios';
import { useContext, useState, useEffect } from "react";

export default function UserBookApt(){
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [data, setData] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [localReset, setLocalReset] = useState([]);


   useEffect(() => {
    const fetchData = async () => {
    const response = await fetch('http://localhost:4444/user/bookapt/all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: null,
    });
    try {
      const data = await response.json();
      setSearchResults(data);
      setLocalReset(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);

    const handleSearch = async (event) => {
      event.preventDefault();
      let databody = {
       "reason": reason,
       "type": type
      }

           const response = await fetch('http://localhost:4444/user/bookapt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(databody),
          });
          try {
              const data = await response.json();
              setSearchResults(data);
            } catch (error) {
              console.log(error);
            }

      };

      const handleReset = async (event) => {
              event.preventDefault();
              setSearchResults(localReset);
        };

  return (
    <>
    <form>
      <select value={reason} onChange={e => setReason(e.target.value)}>
        <option value="">Reason</option>
        <option value="Addictions">Addictions</option>
        <option value="ADHD">ADHD</option>
        <option value="Mental Issues">Mental Issues</option>
        <option value="PTSD">PTSD</option>
        <option value="Disorders">Disorders</option>
      </select>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="">Meeting</option>
        <option value="chat">chat</option>
        <option value="audiocall">Audio Call</option>
          <option value="videocall">Video Call</option>
      </select>
      <button type="submit" onClick={handleSearch}>Search</button>
      <button type="reset" onClick={handleReset}>Reset</button>
    </form>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
     {searchResults && searchResults.length > 0 ? (
       searchResults.map(user => (
         <div key={user.email} style={{ padding: "5px" }}>
         <div>Name: {user.name}</div>
         <div>Lastname: {user.lastname}</div>
         <div>Type: {user.type}</div>
         <div>Certificate: {user.Certificate}</div>
         </div>
       ))
     ) : (
       <p>No search results</p>
     )}
   </div>
    </>
  );
};
