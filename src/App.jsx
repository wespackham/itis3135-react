import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Introduction from './pages/Introduction'
import Contract from './pages/Contract'
import Jsonintro from './pages/Jsonintro'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/Introduction" element={<Introduction />} />
                <Route path="/Contract" element={<Contract />} />
                <Route path="/jsonintro" element={<Jsonintro />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App