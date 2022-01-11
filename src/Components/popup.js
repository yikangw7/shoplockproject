import render from "htmlparser2/node_modules/dom-serializer";
import React from "react";
import "../html/style.css";

const Popup = props => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    );
  };
   
  export default Popup;