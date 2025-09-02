"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";

function Input() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completion, setCompletion] = useState("");
  const [showContent, setShowContent] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const complete = async (e) => {
    e.preventDefault();
    setCompletion("");
    setError("");
    setLoading(true);
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

  const handleView = () => {
    setShowContent(true);
  };
  const handleDownload = () => {
    console.log("img done");
    const node = document.getElementById("my-node");
    htmlToImage.toPng(node).then((dataUrl) => {
      var link = document.createElement("a");
      link.download = "badvice.png";
      link.href = dataUrl;
      link.click();
    });
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
              className="bg-primary hover:bg-accent hover:text-background rounded-sm text-background py-1.5 px-4 w-max cursor-pointer"
              type="submit"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
        <div className="sm:flex flex sm:flex-row flex-col gap-3">
          <p
            className="cursor-pointer sm:w-[50%] w-[100%] border-secondary border-2 text-center p-1 text-sm text-text hover:scale-102 transition-transform duration-200"
            onClick={() => setPrompt("How to swim in the waterpark")}
          >
           What is 2+2?
          </p>
          <p
            className="cursor-pointer sm:w-[50%] w-[100%] border-secondary border-2 text-center p-1 text-sm text-text hover:scale-102 transition-transform duration-200"
            onClick={() => setPrompt("How to solve every math question")}
          >
            How to speak with confidence? 
          </p>
        </div>
      </form>
      <div className="flex flex-col gap-1">
        <div className="border-2 p-3 w-full min-h-40 border-accent rounded-md">
          {completion ? (
            <p className="text-text text-lg">{completion}</p>
          ) : error ? (
            <p className="text-red-500 text-lg flex items-center justify-center min-h-33 text-center">
              {error}
            </p>
          ) : (
            <p className="flex items-center justify-center min-h-33 text-center text-text text-lg">
              Your brutally honest advice will appear here...
            </p>
          )}
        </div>
        {completion && (
          <button
            onClick={handleView}
            className="bg-accent w-max py-1 px-5 rounded-md text-background text-sm m-auto"
          >
            Download/Share
          </button>
        )}
      </div>

      {showContent && (
        <div
          class="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div
            class="w-full max-w-sm sm:max-w-md rounded-lg bg-[#020a04] border-2 border-[#93eaa7] min-w-60 p-4 shadow-lg"
            id="my-node"
          >
            <div class="flex items-start justify-between">
              <p
                id="modalTitle"
                class="text-sm font-semibold text-[#198077] flex flex-col"
              >
                Problem:
                <span className="text-2xl text-[#93eaa7]">{prompt}</span>
              </p>

              <button
                type="button"
                class="-me-2 -mt-2 rounded p-2 transition-colors hover:bg-[#198077] focus:outline-none cursor-pointer"
                aria-label="Close"
                onClick={() => setShowContent(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-2">
              <p className="text-sm font-semibold flex text-[#198077] flex-col">
                Solution:
                <span className="text-lg font-normal text-[#e8faec]">
                  {completion}
                </span>
              </p>
            </div>
            <div className="mt-4 text-xs text-[#93eaa7] text-center">
              <p>generated using badviceAI</p>
            </div>
          </div>
          <div className="border-2 border-[#93eaa7] mt-2 rounded-lg p-2 bg-background">
            <button
              onClick={handleDownload}
              className="cursor-pointer w-[50%] text-text hover:text-accent"
            >
              Download png
            </button>
            <a
              href={`https://x.com/intent/tweet?text=I%20just%20got%20some%20bad%20advice%20from%20this%20AI%20😂&url=https://badvice.appwrite.network`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="cursor-pointer w-[50%] hover:text-accent">
                Share on X
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Input;
