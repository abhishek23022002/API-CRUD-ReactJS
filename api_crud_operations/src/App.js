import "./App.css";
import { useState, useEffect } from "react";
import { Button, EditableText, InputGroup } from "@blueprintjs/core";

function App() {
  const [users, setusers] = useState([]);
  const [newname, setnewname] = useState("");
  const [newemail, setnewemail] = useState("");
  const [newwebsite, setnewwebsite] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json(); // Return the parsed JSON
      })
      .then((json) => {
        console.log("Data", json);
        setusers(json); // This will now receive the parsed JSON
      })
      .catch((error) => console.error("Error fetching users:", error)); // Optional error handling
  }, []); // The empty array denotes that it should call only once
  
  function onchangehandler(id,key,value) {
    setusers((prevVal)=>{
      return users.map((user)=>{
       return user.id === id ? {...user , [key]:value} : user;
      })
    })
  }
  function updateuser(id) {
    const user = users.find((user)=>user.id === id)
     fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
      });
    
  }

  function funccall(params) {
    const name1 = newname.trim();
    const email1 = newemail.trim();
    const website1 = newwebsite.trim();
    if (name1 && email1 && website1) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name1,
          email1,
          website1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setusers([...users, json]);
        });
    }
  }
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
                <td>
                  {
                    <EditableText
                      onChange={(value1) => {
                        return onchangehandler(user.id, "email", value1);
                      }}
                      value={user.email}
                    />
                  }
                </td>
                <td>{<EditableText onChange={(value1)=>{
                        return onchangehandler(user.id, "website", value1);
                }} value={user.website} />}</td>
                <td>
                  <Button intent="primary" onClick={()=>{ return updateuser(user.id)}}>Update</Button>
                  <Button intent="danger" onClick={()=>{return `deleteuser(user.id)`}}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                onChange={(e) => {
                  return setnewname(e.target.value);
                }}
              />
            </td>
            <td>
              <InputGroup
                onChange={(e) => {
                  setnewemail(e.target.value);
                }}
              />
            </td>
            <td>
              <InputGroup
                onChange={(e) => {
                  setnewwebsite(e.target.value);
                }}
              />
            </td>
            <td>
              <Button intent="success" onClick={funccall}>
                {" "}
                Add user
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
