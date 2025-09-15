import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Customer from "./pages/Customer";
import About from "./pages/About";

function App() {
  return (
    <div className="App">

      <main >
        <Router>
          <Header />
          <main>
            <header className="App-header">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/films" element={<Films />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </header>
          </main>
        </Router>

      </main>
    </div>
  );
}

export default App;
