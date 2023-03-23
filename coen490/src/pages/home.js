import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import '../style/home.css';
import logo from '../style/490LogoWhite.png';


export default function Home() {
  const { user } = useContext(UserContext);
  
  return (
    <main className="hero-section">
    <div className="hero-content">
      <nav className="navbar" style={{marginLeft: "20px", width: "1740px" }}>
        <img className="nav-logo" src={logo}/>
        <ul className="nav-links">
          <a href="/sign-up">Sign Up</a>
          <a href="/sign-in">Sign In</a>
        </ul>
      </nav>
      <div className="hero-text">
        <h2 className="hero-welcome-text">Welcome To</h2>
        <h1 className="hero-country">EasySante</h1>
        <p className="hero-text-description">We at EasySante believe that support, exercise, and a good night's sleep are the three pillars to improving your mental health. Luckily for you, we provide all three. EasySante provides simple and effective access to healthcare professionals which are tailored to your needs, while also providing you with useful insights on your sleep quality and stress levels.</p>
        <a href="/sign-up">
          <button className="explore-btn">Get Started!</button>
          </a>
      </div>
    </div>
</main>
  )
}
