import { useState, useRef, useEffect } from "react";
import SvgButton from "./SvgButton";
import "./Wrapper.css";
import Minimize from "../assets/minmize.svg";
import Maximize from "../assets/maximize.svg";
import Close from "../assets/close.svg";
import Right from "../assets/Right.svg";
import Left from "../assets/Left.svg";
import Lock from "../assets/lock.svg";

import Plus from "../assets/Plus.svg";
import Tab from "../assets/Tab.svg";

export default function Wrapper({ title, children }) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const isLoadingScreen =
    children && children.type && children.type.name === "LoadingScreen";
  const isNotFoundScreen =
    children && children.type && children.type.name === "NotFoundScreen";
  const isPopupDisabled = isLoadingScreen || isNotFoundScreen;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, buttonRef]);

  const togglePopup = () => {
    if (!isPopupDisabled) {
      setShowPopup(!showPopup);
    }
  };

  return (
    <main className="wrapper">
      <section className="upper-nav">
        <div className="tab">
          <img src={Tab} alt="IEEE VIT TAB" />
          <img src={Plus} alt="Plus" />
        </div>
        <div className="window-controls">
          <SvgButton svgLabel={Minimize} />
          <SvgButton svgLabel={Maximize} />
          <SvgButton svgLabel={Close} />
        </div>
      </section>
      <section className="lower-nav">
        <div className="nav-controls">
          <SvgButton svgLabel={Left} />
          <SvgButton svgLabel={Right} />
        </div>
        <div className="address-bar">
          <img src={Lock} />
          <h3 className="text">{title}</h3>
        </div>

        <div className="nav-ham">
          <div className="profile-container">
            <button
              onClick={togglePopup}
              className={`btn profile-btn ${
                isPopupDisabled ? "disabled" : ""
              } ${showPopup ? "active" : ""}`}
              ref={buttonRef}
              disabled={isPopupDisabled}
            >
              <img src="ljdlk" alt="Profile" className="profile-icon" />
            </button>

            {showPopup && !isPopupDisabled && (
              <div className="profile-popup" ref={popupRef}>
                <div className="profile-header">
                  <h3>Candidate</h3>
                </div>
                <div className="profile-content">
                  <div className="profile-image">
                    <img
                      src="lkl"
                      alt="Candidate's Profile Picture"
                      className="my-image"
                    />
                  </div>
                  <div className="profile-name">Gopal Yadav</div>
                  <p className="profile-email">
                    gobiananth.g2023@vitstudent.ac.in
                  </p>
                  <div className="profile-Info">
                    <span>Current Round: 0</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container">{children}</section>
    </main>
  );
}
