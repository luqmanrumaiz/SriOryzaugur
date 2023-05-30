import './App.css'
import React, {Suspense} from "react";

import Navbar from './components/navigation/navbar.js'
import AppRouter from './AppRouter';
import Loading from "./components/loader/loader";
import LanguageSelector from "./components/navigation/languageSelector";

export default function App() {

    return (
        <Suspense fallback={<Loading />}>
            <div className="App">
                <Navbar/>
                <AppRouter/>
            </div>
        </Suspense>
    )
}