import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./views/Homepage.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Homepage/>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
