import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";

const check = () => {};
function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home width="200px" height="300px" onClick={check} />}
            />
        </Routes>
    );
}

export default App;
