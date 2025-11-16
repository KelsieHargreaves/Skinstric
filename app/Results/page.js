"use client";

import Header from "@/components/header/header";
import Link from "next/link";
import React, { useRef, useState } from "react";
import resultsStyle from "./results.css";
import { useRouter } from "next/navigation";

const Results = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please upload an Image");
      return;
    }

    setLoading(true);

    try {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = (error) => reject(error);
        });

      const base64String = await toBase64(file);

      const payload = {
        image: base64String,
      };

      const res = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      localStorage.setItem("analysisResults", JSON.stringify(data));
      alert("Image analyzed successfully");
      router.push("/AI.Analysis");
      console.log("API response:", data);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="results">
      <Header section="Intro" />
      <div className="resultsContainer">
        <p className="resultsTitle uppercase">To start analysis</p>
        {!loading ? (
          <>
            <div className="resultsMiddle">
              <Link href="/camera/capture" className="cameraButton">
                <img src="/camera.png" />
              </Link>
              <button className="galleryButton" onClick={handleClick}>
                <img src="/gallery.png" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </>
        ) : (
          <div className="resultsLoadingState">
            <img className="rombuses" src="/rombuses.png" />
            <h3>Preparing Your Analysis</h3>
          </div>
        )}
        <Link href="/Test" className="startButton uppercase">
          <img className="arrowIcon" src="/button-icon-shrunk.png" />
          Back
        </Link>
      </div>
    </div>
  );
};

export default Results;
