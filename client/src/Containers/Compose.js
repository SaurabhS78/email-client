import React from "react";
import "../App.css";
import TextEditor from "../Components/TextEditor";

function Compose() {
  return (
    <div className="compose">
      <div className="editor">
        <TextEditor />
      </div>
    </div>
  );
}

export default Compose;
