// import React from "react";
// import "./timer.css";
// import { useState } from "react";

// const Timer = () => {
//   return (
//     <>
//       <div className="content">
//         <h1>
//           Count Down <span className="span">Timer</span>
//         </h1>
//         <form>
//           <input type="datetime-local" required />
//           <div>
//             <button className="button">Start timer</button>
//           </div>
//         </form>
//         <div className="time">
//           <div className="display">0 days</div>
//           <div className="display">0 hours</div>
//           <div className="display">0 minutes</div>
//           <div className="display">0 seconds</div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Timer;

import React, { useState, useRef } from "react";
import "./timer.css";

const Timer = () => {
  const [targetTime, setTargetTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countdownComplete, setCountdownComplete] = useState(false);

  const [limit, setLimit] = useState("");

  const intervalRef = useRef(null);

  const handleStartTimer = (e) => {
    e.preventDefault();

    const selectedTime = new Date(targetTime).getTime();

    const currentTime = new Date().getTime();

    const timeDifference = selectedTime - currentTime;

    const maxTimeDifference = 100 * 24 * 60 * 60 * 1000;

    if (timeDifference > 0 && timeDifference <= maxTimeDifference) {
      const interval = setInterval(() => {
        const updatedTime = selectedTime - new Date().getTime();

        if (updatedTime > 0) {
          const days = Math.floor(updatedTime / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (updatedTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          clearInterval(intervalRef.current);
          setCountdownComplete(true);
        }
      }, 1000);
      intervalRef.current = interval;
    } else {
      setLimit("Selected time is more than 100 days");
    }
  };

  const handleStopTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setCountdownComplete(false);
    setLimit("");
  };

  const handleInputChange = (e) => {
    setTargetTime(e.target.value);
    setCountdownComplete(false);
    setLimit("");
  };

  return (
    <>
      <div className="content">
        <h1>
          Count Down <span className="span">Timer</span>
        </h1>
        <div className="inner-content">
          <form>
            <input
              type="datetime-local"
              onChange={handleInputChange}
              value={targetTime}
              required
            />
            <div>
              <button className="button" onClick={handleStartTimer}>
                Start timer
              </button>
              <button className="button" onClick={handleStopTimer}>
                Stop timer
              </button>
            </div>
          </form>
        </div>
        <div className="time">
          <div className="display">{timeLeft.days} days</div>
          <div className="display">{timeLeft.hours} hours</div>
          <div className="display">{timeLeft.minutes} minutes</div>
          <div className="display">{timeLeft.seconds} seconds</div>
        </div>
        {countdownComplete && (
          <div className="msg">
            The count down is over... What's next on your adventure?
          </div>
        )}
        {limit && <div className="msg">{limit}</div>}
      </div>
    </>
  );
};

export default Timer;
