import React from "react";
import landingPageStyles from "./landingPage.css";
import Header from "../../components/header/header";

const LandingPage = () => {
  return (
    <div id="landingPage">
      <Header />
      <div className="landingContainer">
        <div className="landingMain">
          <div className="landingLeft">
            <button className="option leftOption uppercase">
              <img className="arrowIcon" src="/button-icon-shrunk.png" />
              Discover A.I.
            </button>
            <img className="rectangle" src="/RectangleLeft.png" />
          </div>
          <div className="landingMiddle">
            <h1 className="title">Sophisticated skincare</h1>
          </div>
          <div className="landingRight">
            <img className="rectangle" src="/RectangleRight.png" />
            <button className="option rightOption uppercase">Take Test
              <img className="arrowIcon rightArrow" src="/button-icon-shrunk.png" />
            </button>
          </div>
        </div>
        <div className="landingBottom">
          <p className="landingPara uppercase">
            Skinstric developed an A.I. that creates a highly-personalised
            routine tailored to what your skin needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
