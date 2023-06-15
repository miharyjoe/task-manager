import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/

//To calculate the diff of the server time and client Time
const calculateTimeDifference = (server: Date, client: Date): string => {
  const diff = Math.abs(server.getTime() - client.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

interface HomeProps {
  serverTime: string;
}

export default function Home({ serverTime }: HomeProps) {
  const router = useRouter();
  // By initializing clientTime with new Date(serverTime),
  // the client-side timer starts with the same value as the server time.
  // This helps to avoid the mismatch in the initial rendered HTML
  // and resolves the warning.
  const [clientTime, setClientTime] = useState(new Date(serverTime));

  //we add setInterval to the useEffect to update the clientTime every second.
  //The client time is updated every second.
  useEffect(() => {
    const timer = setInterval(() => {
      setClientTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const moveToTaskManager = () => {
    router.push("/tasks");
  };
  const formattedServerTime = new Date(serverTime).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeDiff = calculateTimeDifference(new Date(serverTime), clientTime);

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{formattedServerTime}</span>
          </p>{" "}
          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff: <span className="serverTime">{timeDiff}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // Get the current server time
  const serverTime = new Date().toISOString();
  return {
    props: {
      serverTime,
    },
  };
}
