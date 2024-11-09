import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [users, setusers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json(); // Return the parsed JSON
      })
      .then((json) => {
        console.log("ASDF", json);
        setusers(json); // This will now receive the parsed JSON
      })
      .catch((error) => console.error("Error fetching users:", error)); // Optional error handling
  }, []); // The empty array denotes that it should call only once
  return (
    <div className="App">
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {users.map((user) => {
            // Using explicit curly braces and return
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
                <td>
                  <button>Delete</button> <button>Update</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
