import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import AnimePage from "./pages/AnimePage";
import MangaPage from "./pages/MangaPage";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimeProvider from "./components/AnimeContext";
import GenrePage from "./pages/GenrePage";
import ScrollTop from "./components/ScrollTop";

function App() {
  return (
    <Router>
      <AnimeProvider >
        <div className=" max-w-full min-h-screen bg-gray-900 text-white flex flex-col w-full">
          <Navbar />
          <ScrollTop />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/Anime" element={<AnimePage />} />
              <Route path="/Manga" element={<MangaPage />} />
              <Route path="/genre/:genreName" element={<GenrePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AnimeProvider>
    </Router>
  );
}

export default App;
