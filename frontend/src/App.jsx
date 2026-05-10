import { useState } from "react";

function App() {

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    Id: "",
    first_name: "",
    last_name: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    last_name: ""
  });

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setNewUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateInputChange = (e) => {

    const { name, value } = e.target;

    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const loadUser = async () => {

    const response = await fetch("http://localhost:3000/user/get-all");

    const data = await response.json();

    setUsers(data);
  };

  const addUser = async () => {

    const response = await fetch("http://localhost:3000/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    if (response.ok) {

      alert("User added successfully!");

      loadUser();

      setNewUser({
        Id: "",
        first_name: "",
        last_name: ""
      });
    }
  };

  const startEdit = (user) => {

    setEditingId(user.Id);

    setUpdatedUser({
      first_name: user.first_name,
      last_name: user.last_name
    });
  };

  const saveUpdate = async (id) => {

    const response = await fetch(
      `http://localhost:3000/user/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
      }
    );

    if (response.ok) {

      alert("User updated successfully!");

      setEditingId(null);

      loadUser();
    }
  };

  const deleteUser = async (id) => {

    const response = await fetch(
      `http://localhost:3000/user/delete/${id}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {

      alert("User deleted successfully!");

      loadUser();
    }
  };

  return (
    <>

      <button onClick={loadUser}>Load Data</button>

      <table>

        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.Id}>
              <td>{user.Id}</td>
              <td>
                {editingId === user.Id ? (
                  <input
                    type="text"
                    name="first_name"
                    value={updatedUser.first_name}
                    onChange={handleUpdateInputChange}
                  />
                ) : (
                  user.first_name
                )}
              </td>
              <td>
                {editingId === user.Id ? (
                  <input
                    type="text"
                    name="last_name"
                    value={updatedUser.last_name}
                    onChange={handleUpdateInputChange}
                  />
                ) : (
                  user.last_name
                )}
              </td>
              <td>
                {editingId === user.Id ? (

                  <button onClick={() => saveUpdate(user.Id)}>
                    Save
                  </button>

                ) : (

                  <button onClick={() => startEdit(user)}>
                    Update
                  </button>

                )}

                <button onClick={() => deleteUser(user.Id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      <h3>Add User</h3>

      <input
        type="number"
        name="Id"
        placeholder="Id"
        value={newUser.Id}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={newUser.first_name}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={newUser.last_name}
        onChange={handleInputChange}
      />

      <button onClick={addUser}>Add</button>

    </>
  );
}

export default App;