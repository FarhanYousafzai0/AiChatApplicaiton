"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Home = () => {
  const { theme, setTheme } = useTheme();

 
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [streams, setStreams] = useState([]);
 

  // your function (kept)
  const handleChat = async () => {
    if (!message.trim()) return; // Don't send empty messages
    
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
      });
      
      const data = await res.json();
      if (data.error) {
        setResponse("Error: " + data.error);
      } else {
        setResponse(data.response);
        // Add the conversation to streams
        setStreams(prev => [
          ...prev,
          { sender: "user", text: message },
          { sender: "bot", text: data.response }
        ]);
        setMessage(""); // Clear input after sending
      }
    } catch (error) {
      setResponse("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md bg-white/40 dark:bg-black/40 backdrop-blur-md">
        <h1 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">
          Chat-Bot
        </h1>
       
      </header>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example streams */}
        {streams.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-md ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Show response if exists */}
        {response && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 rounded-2xl text-sm shadow-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                AI Response
              </div>
              {response}
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t dark:border-gray-700">
        <div className="relative flex items-center">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="2"
            placeholder="Type your message..."
            className="w-full p-3 pr-16 rounded-2xl resize-none bg-white dark:bg-gray-900 dark:text-gray-100 text-gray-800 shadow-inner outline-none border-2 border-transparent focus:border-transparent focus:ring-2 focus:ring-indigo-500"
          />

          {/* Glowing Beam Border Animation */}
          <div className="absolute inset-0 rounded-2xl p-[2px] pointer-events-none animate-borderGlow bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500"></div>

          {/* Send Button */}
          <button
            onClick={handleChat}
            disabled={loading}
            className="absolute right-3 bottom-3 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow-md disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>

          <style jsx>{`
            @keyframes borderGlow {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .animate-borderGlow {
              background-size: 200% 200%;
              animation: borderGlow 3s linear infinite;
              -webkit-mask: linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Home;
