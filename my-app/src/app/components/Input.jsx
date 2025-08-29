"use client";

import React, { useState } from "react";

function Input() {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");

  const complete = async (e) => {
    e.preventDefault();
    setPrompt("");
    try {
      const res = await fetch("https://jrgm4n-3000.csb.app/api/badvice", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();
      console.log(data.result);
      setCompletion(data.result);
    } finally {
      console.log("HI");
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={complete}>
        <div className="border-2 p-2 flex flex-col gap-2 rounded-md">
          <input
            placeholder="Tell me about your problem..."
            className="outline-none px-1 w-full placeholder-gray-200 rounded-md text-lg"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-white rounded-sm text-black py-1.5 px-4 w-max"
              type="submit"
            >
              Generate
            </button>
          </div>
        </div>
      </form>
      <div className="border-2 p-3 w-full h-40 rounded-md">
        {completion ? (
          <p>{completion}</p>
        ) : (
          <p className="flex items-center justify-center h-33 text-center text-gray-200">
            Your brutally honest advice will appear here...
          </p>
        )}
      </div>
    </div>
  );
}

export default Input;
