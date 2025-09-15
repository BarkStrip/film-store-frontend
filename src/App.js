import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend Hello</h1>
        <p>Backend says: {backendMessage}</p>
        <div>
          <h1>Displaying an image from public folder</h1>
          <img src="/logo2.png" alt="Example" width="300" />
        </div>

      </header>
    </div>
  );
}

export default App;
