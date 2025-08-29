"use client";

import React, { useState, useRef } from "react";

function Input() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [completion, setCompletion] = useState("");
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const complete = async (e) => {
    setLoading(true);
    e.preventDefault();
    setPrompt("");
    try {
      const res = await fetch("/api/badvice", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-type": "application/json" },
      });

      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        setCompletion(data.result);
      }
    } finally {
      console.log("HI");
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={complete}>
        <div
          className="border-2 border-primary p-2 flex flex-col gap-4 rounded-md cursor-text"
          onClick={handleFocus}
        >
          <input
            ref={inputRef}
            placeholder="Tell me about your problem..."
            className="outline-none px-1 w-full placeholder-text text-text rounded-md text-lg"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <button
              className="bg-primary rounded-sm text-background py-1.5 px-4 w-max curosr-pointer"
              type="submit"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </form>
      <div className="border-2 p-3 w-full h-40 border-secondary rounded-md">
        {completion ? (
          <p className="text-text text-lg">{completion}</p>
        ) : (
          <p className="flex items-center justify-center min-h-33 text-center text-text text-lg">
            Your brutally honest advice will appear here...
          </p>
        )}
      </div>
    </div>
  );
}

export default Input;
