import { Container } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import Breeds from "./Pages/Breed";
import BreedCurrent from "./Pages/BreedCurrent";
import DisLikes from "./Pages/DisLikes";
import Favourites from "./Pages/Favourites";
import Gallery from "./Pages/Gallery";

import Home from "./Pages/Home";
import Likes from "./Pages/Likes";
import Search from "./Pages/Search";
import Voting from "./Pages/Voting";

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
              <Route
                path="/likes"
                element={
                    <MainLayout>
                        <Likes />
                    </MainLayout>
                }
            />
              <Route
                path="/favourites"
                element={
                    <MainLayout>
                        <Favourites />
                    </MainLayout>
                }
            />
              <Route
                path="/dislikes"
                element={
                    <MainLayout>
                        <DisLikes />
                    </MainLayout>
                }
            />
              <Route
                path="/search"
                element={
                    <MainLayout>
                        <Search />
                    </MainLayout>
                }
            />
        </Routes>
    );
}

export default App;
