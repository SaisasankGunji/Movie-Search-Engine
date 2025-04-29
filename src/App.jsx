import "./css/App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Favourites from "./pages/Favourites";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <MovieProvider>
        <NavBar></NavBar>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Favourites" element={<Favourites />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
