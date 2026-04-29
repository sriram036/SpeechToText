import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SpeechToText from "./components/SpeechToText";



function App() {
  return (
    <div>
      <h1>Speech To Text App</h1>
      <SpeechToText />
    </div>
  );
}

export default App
