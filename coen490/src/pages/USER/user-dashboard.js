import React, { useState, useEffect } from 'react';
import { Tweet } from 'react-twitter-widgets';

export default function UserDashboard() {
  const [tweetId, setTweetId] = useState('');

  useEffect(() => {
    const getLatestTweetId = async () => {
      const latestTweetId = await fetchLatestTweetId();
      setTweetId(latestTweetId);
    }

    const fetchLatestTweetId = async () => {
      /*const response = await fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=<screen_name>&count=1', {
        headers: {
          'Authorization': 'Bearer <bearer_token>'
        }
      });
      const data = await response.json();
      */
      return "1626232503534256131";
    };

    const getMsUntilNextHour = () => {
      const now = new Date();
      const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0);
      console.log(nextHour.getTime() - now.getTime())
      return nextHour.getTime() - now.getTime();
    }

    const interval = setInterval(() => {
      getLatestTweetId();
    }, getMsUntilNextHour());

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {tweetId && <Tweet tweetId={tweetId} />}
      <h1>USER</h1>
    </>
  );
}
