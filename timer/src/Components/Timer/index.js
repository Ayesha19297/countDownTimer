import React from "react";
import "./timer.css";
import { useState } from "react";

const Timer = () => {
  return (
    <>
      <div className="content">
        <h1>
          Count Down <span className="span">Timer</span>
        </h1>
        <form>
          <input type="datetime-local" required />
          <div>
            <button className="button">Start timer</button>
          </div>
        </form>
        <div className="time">
          <div className="display">0 days</div>
          <div className="display">0 hours</div>
          <div className="display">0 minutes</div>
          <div className="display">0 seconds</div>
        </div>
      </div>
    </>
  );
};
export default Timer;
