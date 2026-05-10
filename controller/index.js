import { addNewUserToDB, deleteUserFromDB, getAllUsersFromDB, updateUserInDB } from "../service/index.js";

export const getAllUsers = async (req, res) => {
    const users = await getAllUsersFromDB();
    res.json(users);
}

export const addUser = async (req, res) => {
    const { Id, first_name, last_name } = req.body;

    try {

        await addNewUserToDB(Id, first_name, last_name);
        res.status(201).json({ message: 'User added successfully!' });

    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ message: 'Failed to add user.' });
        return;
    }

}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name } = req.body;

    try{

        await updateUserInDB(id, first_name, last_name);
        res.status(200).json({ message: 'User updated successfully!' });

    }catch(err){
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Failed to update user.' });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try{

        await deleteUserFromDB(id);
        res.status(200).json({ message: 'User deleted successfully!' });
    }catch(err){
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Failed to delete user.' });
    }
}