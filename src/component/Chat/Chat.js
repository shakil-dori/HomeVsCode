import React, { useState } from "react";
import style from "./Chat.module.css";

export default function Chat() {
  const [val, setval] = useState("");
  const [task, settask] = useState([]);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          onChange={(e) => {
            setval(e.target.value);
          }}
          value={val}
        ></input>
        <button
          type="submit"
          onClick={() => {
            settask((t) => [...t, val]);
            setval("");
            console.log("val", val);
          }}
        >
          add
        </button>
      </form>

      {task.map((item) => (
        <p>{item}</p>
      ))}
    </div>
  );
}
