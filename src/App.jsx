import React from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import Category from "./components/category/category";
import TeamPlayers from "./components/players/Player";
import HomePage from "./components/system/HomePage";
import LoginForm from "./components/system/LoginForm";
import Team from "./components/team/Team";
import User from "./components/users/Users";
import TournamentCRUD from "./components/tournament/Tournament";
import General from "./components/general/General";
function App() {
  return (
    <HashRouter>
      <Routes>
        {<Route exact path="/login" element={<LoginForm />} />}
        <Route exact path="/" element={<HomePage />}>
          {<Route path="/users" element={<User />} />}
          {<Route path="/category" element={<Category />} />}
          {<Route path="/team" element={<Team />} />}
          {<Route path="/player" element={<TeamPlayers />} />}
          {<Route path="/tournament" element={<TournamentCRUD />} />}
          {<Route path="/general" element={<General />} />}
          <Route path="*" element={<div> </div>} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
