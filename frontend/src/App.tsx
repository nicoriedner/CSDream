import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './screens/Homepage.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <main className="MainContent">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;