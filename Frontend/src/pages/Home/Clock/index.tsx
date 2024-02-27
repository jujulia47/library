import React, { useContext, useEffect, useState } from "react";
import '../../../styles/css/pages/Home/Clock/index.css'

function Clock() {
  const [hour, setHour] = useState(new Date().getHours())
    const [minuts, setMinets] = useState(new Date().getMinutes())
    console.log(hour);
    console.log(minuts);

    setInterval( () => {
      setHour(new Date().getHours())
      setMinets(new Date().getMinutes())
    }, 1000)
    
  return (
    <>
      <section className="clock">
        <h1 className="clockTime">{hour} <span className="line"></span></h1>
        {/* <h1 className="separator">:</h1> */}
        <h1 className="clockTime">{minuts}</h1>
      </section>
    </>
  );
}

export default Clock;
