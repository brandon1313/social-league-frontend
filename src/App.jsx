import React from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import Category from "./components/category/category";
import TeamPlayers from "./components/players/Player";
import HomePage from "./components/system/HomePage";
import LoginForm from "./components/system/LoginForm";
import Team from "./components/team/Team";
import User from "./components/users/Users";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<HomePage />}>
          <Route path="/home" element={<div></div>} />
          <Route path="/users" element={<User />} />
          <Route path="/category" element={<Category />} />
          <Route path="/team" element={<Team />} />
          <Route path="/player" element={<TeamPlayers />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
