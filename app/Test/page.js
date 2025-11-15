"use client";

import React, { useEffect, useState } from "react";
import testStyles from "./test.css";
import Header from "@/components/header/header";
import Link from "next/link";

const Test = () => {
  const [phase, setPhase] = useState("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleInput = (event) => {
    if (phase === "name") {
      setName(event.target.value);
    } else {
      setLocation(event.target.value);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key !== "Enter") return;

    if (phase === "name") {
      if (name.trim().length === 0) return;
      setPhase("location");
      return;
    }

    if (phase === "location") {
      if (location.trim().length === 0) return;

      setLoading(true);
      setFinished(false);

      try {
        await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, location }),
          }
        );

        await new Promise((res) => setTimeout(res, 700));

        setLoading(false);
        setFinished(true);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleLoading = () => {
    setLoading(true);
  };

  return (
    <div id="testPage">
      <Header />
      <div className="testContainer">
        <p className="testTitle uppercase">To Start Analysis</p>
        <div className="testMiddle">
          <img className="rombuses" src="/rombuses.png" />
          <div className="middleText">
            {loading ? (
              <p className="loadingText uppercase">Processing</p>
            ) : finished ? (
              <p className="thankYouText">
                Thank you!
                <br/>
                 Proceed to the next step!
              </p>
            ) : (
              <>
                <p className="uppercase">
                  <span className="gray">Click to type</span>
                </p>
                <input
                  className="nameInput"
                  type="text"
                  value={phase === "name" ? name : location}
                  placeholder={
                    phase === "name"
                      ? "Introduce Yourself"
                      : "Where are you from?"
                  }
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                />
              </>
            )}
          </div>
        </div>
        <div className="buttons">
          <Link href="/" className="startButton uppercase">
            <img className="arrowIcon" src="/button-icon-shrunk.png" />
            Back
          </Link>
          {finished && (
            <Link href="/Results" className="startButton uppercase">
              Proceed
              <img
                className="arrowIcon"
                style={{ rotate: "180deg" }}
                src="/button-icon-shrunk.png"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
