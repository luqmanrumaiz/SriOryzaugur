import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import HomePage from "./pages/homePage.js";
import GuideAndInfoPage from "./pages/guideAndInfoPage.js";
import ForecastPage from "./pages/forecastPage.js";
import HistoricalFiguresPage from "./pages/historicalFiguresPage.js";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/historical" element={<HistoricalFiguresPage/>}/>
                <Route path="/forecast" element={<ForecastPage/>}/>
                <Route path="/guide" element={<GuideAndInfoPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}