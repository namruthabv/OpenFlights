import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Airlines from './Airlines/Airlines'
import Airline from './Airline/Airline'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Airlines /> } />
                <Route path="/airlines/:slug" element={ <Airline /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App