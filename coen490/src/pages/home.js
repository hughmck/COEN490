import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { Typography, Paper, Grid, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBBtn
} from 'mdb-react-ui-kit';

import customer1Image from "./download-7.jpg";
import customer2Image from "./download-8.jpg";
import customer3Image from "./download-9.jpg";
import customer4Image from "./download-10.jpg";
import customer5Image from "./download-12.avif";

const reviews = [
  {
    name: "Jane",
    quote: "I am so grateful to have found this community. The support and understanding I have received here has helped me to feel less alone and more empowered in my mental health journey.",
    image: customer1Image,
  },
  {
    name: "John",
    quote: "The resources provided by this community have been invaluable in helping me to better understand and manage my mental health. Thank you!",
    image: customer2Image,
  },
  {
    name: "Sarah",
    quote: "I appreciate the non-judgmental and supportive environment that this community provides. It has been a lifeline for me during a difficult time.",
    image: customer3Image,
  },
  {
    name: "Michael",
    quote: "EasySante has been a game-changer for my mental health. The app has helped me to track my sleep and stress levels and provided me with tailored recommendations for how to improve them.",
    image: customer4Image,
  },
  {
    name: "Emily",
    quote: "The therapists I have worked with through EasySante have been incredibly knowledgeable and supportive. I have felt heard and understood throughout the entire process.",
    image: customer5Image,
  }
];

export default function Home() {
  const { user } = useContext(UserContext);
  
  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <Typography variant="h1" align="center" gutterBottom sx={{ fontSize: '3rem', fontWeight: 'bold', color: '#0D47A1', my: 1 }}>
    Join over 1500 registered users who trust EasySante
  </Typography>
  <Typography variant="body1" align="center" gutterBottom sx={{ fontSize: '1rem', color: '#333', my: 4 }}>
    We at EasySante believe that support, exercise, and a good night's sleep are the three pillars to improving your mental health. Luckily for you, we provide all three. EasySante provides simple and effective access to healthcare professionals which are tailored to your needs, while also providing you with useful insights on your sleep quality and stress levels.
  </Typography>
  <a href="/sign-up">
    <MDBBtn className='me-1' align="center" color='success'>
      Get Started!
    </MDBBtn>
  </a>
  <Typography variant="h2" align="center" gutterBottom sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0D47A1', my: 4 }}>
    What our customers are saying
  </Typography>
  <MDBCarousel showControls showIndicators style={{ width: '75%', height: '200px', margin: '0 auto' }}>
    {reviews.map((review, index) => (
      <MDBCarouselItem
        key={index}
        className='w-100 dock'
        src={review.image}
        alt={review.name}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', mb: 4 }}>
          <Typography variant="h5" sx={{ color: 'white', fontSize: '2rem' }} fontWeight="bold">{review.name}</Typography>
          <Typography variant="body1" align="center" sx={{ color: 'white', fontSize: '1rem' }}>{review.quote}</Typography>
        </Box>
      </MDBCarouselItem>
    ))}
  </MDBCarousel>
</Box>

  )
}
