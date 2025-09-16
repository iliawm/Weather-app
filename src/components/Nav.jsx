import { useState } from "react";

function Nav({uniti,setuniti}) {
  
    
  return (
    <div className="nav">
      <div className="left">
        <img src="logo.svg" alt="" className="logo" />
      </div>
      <div className="right">
        <button
          className="units"
          onClick={() => {
            document.querySelector(".openback").classList.toggle("open");
            document.querySelector(".unitsdropdown").classList.toggle("rotate");
          }}
        >
          <img src="icon-units.svg" alt="" className="unitsicon" />
          <div>Units</div>
          <img src="icon-dropdown.svg" alt="" className="unitsdropdown" />
        </button>
        <div className="openback">
          <button
            className="celsius"
            onClick={() => {
                setuniti(true)
            document.querySelector(".openback").classList.toggle("open");

            }}
          >
            celsius
          </button>
          <button
            className="fahrenheit"
            onClick={() => {
                setuniti(false)
            document.querySelector(".openback").classList.toggle("open");

            }}
          >
            fahrenheit{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Nav;
