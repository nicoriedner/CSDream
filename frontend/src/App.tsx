import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './screens/Homepage.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Login from "./screens/Login.tsx";
import Register from "./screens/Register.tsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <main className="MainContent">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;