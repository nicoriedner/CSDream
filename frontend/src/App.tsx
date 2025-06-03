import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './screens/Homepage.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Login from "./screens/Login.tsx";
import Register from "./screens/Register.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import Inventory from "./screens/Inventory.tsx";
import Market from "./screens/Market.tsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                <Header />
                <main className="MainContent">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/market" element={<Market />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
                <Footer />
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;