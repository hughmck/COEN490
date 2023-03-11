import { UserContext } from "../../contexts/user.context";
import { App, Credentials } from "realm-web";
import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import '../../style/user/user-dashboard.css';

export default function UserDashboard() {

  
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupSeen = localStorage.getItem("popsupSeen");

    if (!popupSeen) {
      setShowPopup(true);
      localStorage.setItem("popupSeen", true);
    }
  }, []);


  const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:4444/user/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Welcome!</h2>
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Upload</button>
            </form>
            <button className="close-button" onClick={() => setShowPopup(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
