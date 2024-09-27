import React, { useState, useEffect } from "react";
import "../../../styles/css/pages/Home/Clock/index.css";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const [timeWithoutAmPm, amPm] = formattedTime.split(" ");
  const [hour, minutes] = timeWithoutAmPm.split(":");

  const calendar = new Date();

  const formattedDay = calendar.toLocaleTimeString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [ weekday, day, month, year] = formattedDay.split(" ");

  return (
    <>
      <section className="clock">
        <h1 className="clockTime hour">{hour}</h1>
        <h1 className="clockTime min">
          {minutes}
          <span className="amPm">{amPm}</span>
        </h1>
      </section>
      <section className="day">
        <p>{weekday} {day} {month} {year}</p>
      </section>
    </>
  );
}

export default Clock;
