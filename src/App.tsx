import { Container } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";

const check = () => {};
function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vote" element={<Home />} />
                <Route path="/breeds" element={<Home />} />
                <Route path="/gallery" element={<Home />} />
                
            </Routes>
    );
}

export default App;
