import React from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import HomePage from "./components/system/HomePage"
import LoginForm from "./components/system/LoginForm"
import Guides from "./pages/Guides"
import Languages from "./pages/Languages"

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/" element={<HomePage />}>
          <Route path="/languages" element={<Languages />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="*" element={<div> </div>} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
