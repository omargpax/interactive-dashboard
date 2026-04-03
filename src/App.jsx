import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hub from './pages/Hub'
import BubbleObservatory from './pages/BubbleObservatory'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<Hub />} />
        <Route path="/bubble-observatory"  element={<BubbleObservatory />} />
        {/* Add new dashboard routes here:
            <Route path="/my-new-dashboard" element={<MyNewDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
