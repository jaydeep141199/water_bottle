import React, { useEffect, useState } from "react";
import Smallb from "./Smallb";

const Waterbottle = () => {
  const [value, setValue] = useState("");
  const [bottlevalue, setBottlevalue] = useState("");
  const [extrashow, setExtrashow] = useState(false);
  const [show, setShow] = useState(false);
  const [per, setPer] = useState("");
  const [count, setCount] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [flag, setFlag] = useState(0);


  useEffect(() => {
    
    const promptValue = () => {
      if(flag===0){
      const input = prompt("Welcome buddy, please enter your today's goal.\n(your goal above 2 Liters)");
      const numericValue = parseFloat(input);
      if (!isNaN(numericValue) && numericValue >2) {
        setValue(numericValue);
      } else {
        alert("Please enter a valid number greater than  2.");
        promptValue();
      }
    };
    setFlag(1)
  }

    promptValue();
  }, []);

  useEffect(() => {
    if (value !== "") {
      setShow(true);
      const bvalue = value * 1000 - 2000;
      setBottlevalue(bvalue);
    }
  }, [value]);

  useEffect(() => {
    if (bottlevalue > 0) {
      setExtrashow(true);
    }
  }, [bottlevalue]);


  useEffect(() => {
    const smallcups = document.querySelectorAll(".cup-small");
    const liters = document.getElementById("liters");
    const percentage = document.getElementById("percentage");
    const remainder = document.getElementById("remainder");

    function highlightcup(idx) {
      if (idx === smallcups.length-1 && smallcups[idx].classList.contains("full")) idx--;
      else if (
        smallcups[idx].classList.contains("full") &&
        smallcups[idx].nextElementSibling &&
        !smallcups[idx].nextElementSibling.classList.contains("full")
      ) {
        idx--;
      }

      smallcups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
          cup.classList.add("full");
        } else {
          cup.classList.remove("full");
        }
      });

      updateBigcup();
    }

    function updateBigcup() {
      const fullcups = document.querySelectorAll(".cup-small.full").length;
      const totalcups = smallcups.length;

      if (percentage) {
        if (fullcups === 0) {
          percentage.style.visibility = "hidden";
          percentage.style.height = 0;
        } else {
          percentage.style.visibility = "visible";
          percentage.style.height = `${(fullcups / totalcups) * 330}px`;
          setPer(`${((fullcups / totalcups) * 100).toFixed(0)}%`);
          setCount((count) => count + 1);
          if(per==="100%"){
            setShowContinueButton(true)
          }
        }

        if (fullcups === totalcups) {
          remainder.style.visibility = "hidden";
          remainder.style.height = 0;
          // When all cups are full, show the continue button and update the count
          setShowContinueButton(true);
        } else {
          setShowContinueButton(false);
          const remainingLiters = (value - 0.25 * fullcups).toFixed(2);
          liters.innerText = `${remainingLiters}L`;
        }
      }
    }

    smallcups.forEach((cup, idx) => {
      cup.addEventListener("click", () => highlightcup(idx));
    });

    return () => {
      smallcups.forEach((cup, idx) => {
        cup.removeEventListener("click", () => highlightcup(idx));
      });
    };
  }, [extrashow, value]);

  // Function to handle the continue button click
  function handleContinueClick() {
    alert(`you have achieved your goal in ${count} steps`);
    setShowContinueButton(false);
    const smallcups = document.querySelectorAll(".cup-small");
    smallcups.forEach((cup) => cup.classList.remove("full"));
    const percentage = document.getElementById("percentage");
    const remainder = document.getElementById("remainder");
    const fullcups = document.querySelectorAll(".cup-small.full").length;
      const totalcups = smallcups.length;
      const liters = document.getElementById("liters");
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
    remainder.style.visibility = "hidden";
    remainder.style.height = 0; 
    if (fullcups === totalcups) {
      remainder.style.visibility = "hidden";
      remainder.style.height = 0;
      // When all cups are full, show the continue button and update the count
      setShowContinueButton(true);
    } else {
      setShowContinueButton(false);
      const remainingLiters = (value - 0.25 * fullcups).toFixed(2);
      liters.innerText = `${remainingLiters}L`;
    }
  }

  return (
    <>
    
      {show && (
        <>
        <button className="btn-marquee">Count:-{count}</button>
          <h1>Drink water</h1>
          <h3>Goal: {value} Liter</h3>

          <div className="cup">
            <div className="remainder" id="remainder">
              <span id="liters"></span>
              <small>Remainder</small>
            </div>
            <div className="percentage" id="percentage">
              {per}
            </div>
            
          </div>
          <p className="text">
            Select how many glasses of water you have drunk
          </p>

          <div className="cups">
            <Smallb />
            <Smallb />
            <Smallb />
            <Smallb />
            <Smallb />
            <Smallb />
            <Smallb />
            <Smallb />
          </div>
          {extrashow && (
            <div className="cups">
              <h1>Extra bottle</h1>
              <div className="cup cup-small">{bottlevalue}ml</div>
            </div>
            
          )}
          {showContinueButton && (
            <button onClick={handleContinueClick}>Continue</button>
          )}

        </>
      )}
    </>
  );
};

export default Waterbottle;
