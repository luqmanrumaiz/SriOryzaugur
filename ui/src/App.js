import './App.css'
import React from "react";
import Navbar from './components/navigation/navbar.js'
import AppRouter from './AppRouter';

export default function App()
{
  return (
   <div className="App">
      <Navbar />
      <AppRouter/>
    </div>
  )
}