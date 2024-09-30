import { useState } from "react";
import { teams } from "./assets/teams.json";
console.log(teams);

function App() {
  const [sortBy, setSortBy] = useState("last_win");
  const [sortOrder, setSortOrder] = useState("asc");

  teams.sort((a, b) => {
    if (sortBy === "last_win" && sortOrder === "desc") return a.last_win - b.last_win;
    if (sortBy === "last_win" && sortOrder === "asc") return b.last_win - a.last_win;
    if (sortBy === "last_appearance" && sortOrder === "desc") return a.last_appearance - b.last_appearance;
    if (sortBy === "last_appearance" && sortOrder === "asc") return b.last_appearance - a.last_appearance;
  });

  return (
    <>
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Team</th>
              <th>Last Won</th>
              <th>Last Appeared</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{team.team}</td>
                  <td>{team.last_win}</td>
                  <td>{team.last_appearance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
