import Home from "../pages/Home";
import Login from "../pages/login";
import Register from "../pages/Register";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';

import "./style.scss"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

const {currentUser} = useContext(AuthContext);

const ProtectedRoute = ({children}) =>{
  if(!currentUser){
    return <Navigate to="/login"/>;
  }
  return children;
};


  return (
    <Router>
   
      <Routes>
        <Route path="/"  element={
          <ProtectedRoute><Home/></ProtectedRoute>
        
          }/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
    
    </Router>
  );
}

export default App;
