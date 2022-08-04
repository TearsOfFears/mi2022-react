import { Container } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import Breeds from "./Pages/Breed";
import BreedCurrent from "./Pages/BreedCurrent";
import Gallery from "./Pages/Gallery";

import Home from "./Pages/Home";
import Voting from "./Pages/Voting";

const check = () => {};
function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                }
            />
            <Route
                path="/vote"
                element={
                    <MainLayout>
                        <Voting />
                    </MainLayout>
                }
            />
            <Route
                path="/breeds"
                element={
                    <MainLayout>
                        <Breeds />
                    </MainLayout>
                }
            />
            <Route
                path="/breeds/:id"
                element={
                    <MainLayout>
                        <BreedCurrent />
                    </MainLayout>
                }
            />
            <Route
                path="/gallery"
                element={
                    <MainLayout>
                        <Gallery />
                    </MainLayout>
                }
            />
        </Routes>
    );
}

export default App;
