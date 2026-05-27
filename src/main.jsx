import React from "react"
import ReactDOM from "react-dom/client"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import {

  BrowserRouter,
  Routes,
  Route

} from "react-router-dom"

import App from "./App"
import Admin from "./pages/Admin"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<App />} />

        <Route

  path="/admin"

  element={

    <ProtectedRoute>

      <Admin />

    </ProtectedRoute>

  }

/>

      </Routes>

    </BrowserRouter>

  </React.StrictMode>

)