import React, { useState, useEffect } from "react";

function Home() {
  const [text, setText] = useState(""); 
  const textArray = [
    "당신의 식물을\n공유하고 식물의 정보를 얻어가세요",
    "🍀식구하자를 통해서🍀",
  ]; 

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setText(textArray[currentIndex]);
      currentIndex = (currentIndex + 1) % textArray.length;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [textArray]);

  const parentStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh", 
  };

  const textStyle = {
    fontSize: "80px",
    color: "rgba(128, 128, 128, 1.0)"
  };

  return (
    <div style={parentStyle}>
      <div className="page-contents">
        <div className="search-box">
          <div className="aos-init aos-animate">
            <p
              data-aos="fade-up"
              data-aos-duration="800"
              className="aos-init aos-animate"
              style={textStyle}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
