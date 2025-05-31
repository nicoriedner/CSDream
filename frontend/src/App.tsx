import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./screens/Homepage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Header/>
          <Routes>
            <Route path={"/"} element={<Homepage/>}></Route>
          </Routes>
            <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
