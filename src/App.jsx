import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Category from "./components/category/category";
import HomePage from "./components/system/HomePage";
import LoginForm from "./components/system/LoginForm";
import User from "./components/users/Users";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {<Route exact path="/login" element={<LoginForm />} />}
        <Route exact path="/" element={<HomePage />}>
          {<Route path="/users" element={<User />} />}
          {<Route path="/category" element={<Category />} />}

          <Route path="*" element={<div> </div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
