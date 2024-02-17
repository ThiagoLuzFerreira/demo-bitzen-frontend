import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Artists from "./pages/Artists/index.tsx";
import Home from "./pages/Home/index.tsx";
import NewArtist from "./pages/NewArtist/index.tsx";

const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/artists" element={<Artists/>}></Route>
            <Route path="/artists/new/:artistId" element={<NewArtist/>}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default AppRoutes