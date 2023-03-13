import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { Typography, Paper, Grid, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

export default function Home() {
  const { user } = useContext(UserContext);
  const reviews = [
    {
      name: "Jane",
      quote: "I am so grateful to have found this community. The support and understanding I have received here has helped me to feel less alone and more empowered in my mental health journey."
    },
    {
      name: "John",
      quote: "The resources provided by this community have been invaluable in helping me to better understand and manage my mental health. Thank you!"
    },
    {
      name: "Sarah",
      quote: "I appreciate the non-judgmental and supportive environment that this community provides. It has been a lifeline for me during a difficult time."
    },
    {
      name: "Michael",
      quote: "EasySante has been a game-changer for my mental health. The app has helped me to track my sleep and stress levels and provided me with tailored recommendations for how to improve them."
    },
    {
      name: "Emily",
      quote: "The therapists I have worked with through EasySante have been incredibly knowledgeable and supportive. I have felt heard and understood throughout the entire process."
    }
  ];
  
  return (
    <Box sx={{ p: 2 }}>
      {/* {!user && (
        <Paper elevation={3} sx={{ backgroundColor: "#f8d7da", color: "#721c24", padding: "0.75rem 1.25rem", marginBottom: "1rem", border: "1px solid #f5c6cb" }}>
          You are not currently signed-in. Please log in.
        </Paper>
      )} */}
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
            <Accordion>
              <AccordionDetails>
                <Typography variant="body1" align="center">{review.quote}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
