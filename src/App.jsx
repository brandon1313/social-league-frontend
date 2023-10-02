import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Category from "./components/category/category";
import TeamPlayers from "./components/players/Player";
import HomePage from "./components/system/HomePage";
import LoginForm from "./components/system/LoginForm";
import Team from "./components/team/Team";
import User from "./components/users/Users";
import TournamentCRUD from "./components/tournament/Tournament";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {<Route exact path="/login" element={<LoginForm />} />}
        <Route exact path="/" element={<HomePage />}>
          {<Route path="/users" element={<User />} />}
          {<Route path="/category" element={<Category />} />}
          {<Route path="/team" element={<Team />} />}
          {<Route path="/player" element={<TeamPlayers />} />}
          {<Route path="/tournament" element={<TournamentCRUD />} />}
          <Route path="*" element={<div> </div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
