"use client";

import React, { useState, useRef } from "react";

function Input() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completion, setCompletion] = useState("");
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const complete = async (e) => {
    e.preventDefault();
    setCompletion("");
    setError("");
    setLoading(true);
    setPrompt("");
    try {
      const res = await fetch("/api/badvice", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-type": "application/json" },
      });

      if (res.ok) {
        setLoading(false);
        let data = await res.json();
        setCompletion(data.result);
      } else {
        setLoading(false);
        let data = await res.json();
        console.log(data.error);
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={complete} className="flex flex-col gap-3">
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
              className="bg-primary rounded-sm text-background py-1.5 px-4 w-max cursor-pointer"
              type="submit"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
        <div className="sm:flex flex sm:flex-row flex-col gap-3">
          <p
            className="cursor-pointer sm:w-[50%] w-[100%] border-accent border-2 text-center p-1 text-sm text-text"
            onClick={() => setPrompt("How to swim in the waterpark")}
          >
            How to swim in the waterpark
          </p>
          <p
            className="cursor-pointer sm:w-[50%] w-[100%] border-accent border-2 text-center p-1 text-sm text-text"
            onClick={() => setPrompt("How to solve every math question")}
          >
            How to solve every math question
          </p>
        </div>
      </form>
      <div className="border-2 p-3 w-full min-h-40 border-secondary rounded-md">
        {completion ? (
          <p className="text-text text-lg">{completion}</p>
        ) : error ? (
          <p className="text-red-500 text-lg flex items-center justify-center min-h-33 text-center">{error}</p>
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
