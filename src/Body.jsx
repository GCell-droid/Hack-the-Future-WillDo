import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://2f37-34-58-104-126.ngrok-free.app/"; // Replace with your Ngrok URL

const Body = () => {
  const [mode, setMode] = useState("1");
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/translate`, { text }, {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });
      setResponse(res.data.sign_translation);
      setError("");
    } catch (error) {
      setError("Translation error. Please try again.");
      console.error("Translation error:", error);
    }
  };

  const handleSignToText = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/sign-to-text`);
      setResponse(res.data.message);
      setError("");
    } catch (error) {
      setError("Sign to text error. Please check your connection.");
      console.error("Sign to text error:", error);
    }
  };

  const handleLearningModules = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/learning`);
      setResponse(res.data.message);
      setError("");
    } catch (error) {
      setError("Learning modules error. Try again later.");
      console.error("Learning modules error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-4">Sign Language Translator</h1>
      
      <select
        className="border p-2 mb-4"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="1">Text to Sign</option>
        <option value="2">Sign to Text (Real-time)</option>
        <option value="3">Interactive Learning Modules</option>
      </select>

      {mode === "1" && (
        <>
          <input
            className="border p-2 mb-4"
            type="text"
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2" onClick={handleTranslate}>
            Convert to Sign
          </button>
        </>
      )}

      {mode === "2" && (
        <button className="bg-green-500 text-white p-2" onClick={handleSignToText}>
          Start Real-time Sign Detection
        </button>
      )}

      {mode === "3" && (
        <button className="bg-yellow-500 text-white p-2" onClick={handleLearningModules}>
          Start Learning Modules
        </button>
      )}

      {error && <div className="mt-4 p-4 text-red-500">{error}</div>}
      {response && <div className="mt-4 p-4 border">{response}</div>}
    </div>
  );
};

export default Body;
