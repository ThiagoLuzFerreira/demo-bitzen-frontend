import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Artists from "./pages/Artists/index.tsx";
import Home from "./pages/Home/index.tsx";
import NewArtist from "./pages/NewArtist/index.tsx";
import Albums from "./pages/Albums/index.tsx";
import NewAlbum from "./pages/NewAlbum/index.tsx";

const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/artists" element={<Artists/>}></Route>
            <Route path="/artists/new/:artistId" element={<NewArtist/>}></Route>
            <Route path="/albums" element={<Albums/>}></Route>
            <Route path="/albums/new/:albumId" element={<NewAlbum/>}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default AppRoutes