import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { Typography, Paper, Grid, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

import customer1Image from "./download-1.jpg";
import customer2Image from "./download-2.jpg";
import customer3Image from "./download-3.jpg";
import customer4Image from "./minionbrah.jpg";
import customer5Image from "./Sad-Minion.jpg";

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
  },
  {
    name: "Kevin",
    quote: "Fuck",
    image: customer5Image,
  }
];

export default function Home() {
  const { user } = useContext(UserContext);
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h1" align="center" gutterBottom>
        Welcome to EasySante!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        We at EasySante believe that support, exercise, and a good night's sleep are the three pillars to improving your mental health. Luckily for you, we provide all three. EasySante provides simple and effective access to healthcare professionals which are tailored to your needs, while also providing you with useful insights on your sleep quality and stress levels.
      </Typography>
      <Typography variant="h2" align="center" gutterBottom>
        What our customers are saying
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '100%', height: '200px', marginBottom: '16px' }}>
                  <img src={review.image} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="h5">{review.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" align="center">{review.quote}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
