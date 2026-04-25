import { useState, useRef } from "react";

export default function SpeechToText() {
  const recognitionRef = useRef(null);
  const [finalText, setFinalText] = useState("");

  const start = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = async (event) => {
      let current = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }

      await fetch("http://localhost:3000/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: current }),
      });
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stop = async () => {
    recognitionRef.current?.stop();

    const res = await fetch("http://localhost:3000/final");
    const data = await res.json();

    setFinalText(data.text);

    await fetch("http://localhost:3000/reset", { method: "POST" });
  };

  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>

      <h3>Final Paragraph:</h3>
      <p>{finalText}</p>
    </div>
  );
}