import React, { useState } from "react";
import "./scrollbutton.css";
const TopButton = (props) => {
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", checkScrollTop);
  return (
    <button
      onClick={topFunction}
      id="scrollTop"
      title="Перейти к началу"
      style={{ display: showScroll ? "block" : "none" }}
    >
      Top
    </button>
  );
};
export default TopButton;
