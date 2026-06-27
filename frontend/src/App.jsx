import { useState } from "react";

function App() {

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
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
    <main className="app-shell">
      <section className="app-header">
        <div>
          <p className="eyebrow">Azure SQL sample</p>
          <h1>User Directory</h1>
          <p className="intro">
            View, update, and add user records from your connected database.
          </p>
        </div>

        <button className="button button-primary" onClick={loadUser}>
          Load Data
        </button>
      </section>

      <section className="content-grid">
        <section className="panel table-panel" aria-labelledby="users-heading">
          <div className="panel-header">
            <div>
              <p className="section-kicker">Records</p>
              <h2 id="users-heading">Users</h2>
            </div>

            <span className="record-count">{users.length} users</span>
          </div>

          <div className="table-wrap">
            <table className="user-table">
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
                    <td className="id-cell">{user.Id}</td>
                    <td>
                      {editingId === user.Id ? (
                        <input
                          className="field table-field"
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
                          className="field table-field"
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
                      <div className="button-group">
                        {editingId === user.Id ? (
                          <button
                            className="button button-success"
                            onClick={() => saveUpdate(user.Id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="button button-secondary"
                            onClick={() => startEdit(user)}
                          >
                            Update
                          </button>
                        )}

                        <button
                          className="button button-danger"
                          onClick={() => deleteUser(user.Id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="empty-state">
                No users loaded yet. Load data to view database records.
              </div>
            )}
          </div>
        </section>

        <section className="panel form-panel" aria-labelledby="add-user-heading">
          <p className="section-kicker">Create</p>
          <h2 id="add-user-heading">Add User</h2>

          <form
            className="user-form"
            onSubmit={(event) => {
              event.preventDefault();
              addUser();
            }}
          >
            <label className="field-group">
              <span>First name</span>
              <input
                className="field"
                type="text"
                name="first_name"
                placeholder="First Name"
                value={newUser.first_name}
                onChange={handleInputChange}
              />
            </label>

            <label className="field-group">
              <span>Last name</span>
              <input
                className="field"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={newUser.last_name}
                onChange={handleInputChange}
              />
            </label>

            <button className="button button-primary button-block" type="submit">
              Add User
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default App;
