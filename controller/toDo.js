import Todo from "../model/toDoModel.js";

export const addToDo = async (req, res) => {
  try {
    const data = req.body;
    const newTodo = new Todo(data);
    const response = await newTodo.save();

    res.status(200).json(response);
  } catch (error) {
    console.error('Error adding ToDo:', error.message);
    res.status(500).json({ message: 'Failed to add ToDo', error: error.message });
  }
};

export const getToDos = async (req, res) => {
  try {
    
    const userId = req.user.userId;
    const allToDos = await Todo.find({ isDeleted: false, userId }).sort({ "createdAt": -1 });
    const pinnedTodos = await Todo.find({ isPinned: true, isDeleted: false, userId }).sort({ "createdAt": -1 });
    const unPinnedTodos = await Todo.find({ isPinned: false, isDeleted: false, userId }).sort({ "createdAt": -1 });

    res.status(200).json({
      allToDos, pinnedTodos, unPinnedTodos
    });
  } catch (error) {
    console.error('Error fetching ToDos:', error.message);
    res.status(500).json({ message: 'Failed to fetch ToDos', error: error.message });
  }
};

export const toggleToDoDone = async (req, res) => {
  try {
    const toggledToDo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      [{ $set: { done: { $not: "$done" } } }],
      { new: true }
    );

    res.status(200).json(toggledToDo);
  } catch (error) {
    console.error('Error toggling ToDo done status:', error.message);
    res.status(500).json({ message: 'Failed to toggle ToDo done status', error: error.message });
  }
};

export const updateToDo = async (req, res) => {
  try {
    const updatedToDo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { data: req.body.data },
      { new: true }
    );

    console.log("Updated ToDo:", updatedToDo);
    res.status(200).json(updatedToDo);
  } catch (error) {
    console.error('Error updating ToDo:', error.message);
    res.status(500).json({ message: 'Failed to update ToDo', error: error.message });
  }
};

export const deleteToDo = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedToDo = await Todo.findOneAndUpdate(
      { _id: id },
      [{ $set: { isDeleted: { $not: "$isDeleted" } } }],
      { new: true }
    );

    res.status(200).json(deletedToDo);
  } catch (error) {
    console.error('Error deleting ToDo:', error.message);
    res.status(500).json({ message: 'Failed to delete ToDo', error: error.message });
  }
};

export const restoreToDo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);

    if (todo.isDeleted) {
      const restoredToDo = await Todo.findOneAndUpdate(
        { _id: id },
        [{ $set: { isDeleted: { $not: "$isDeleted" } } }],
        { new: true }
      );

      res.status(200).json(restoredToDo);
    } else {
      res.status(400).json({ message: 'ToDo is not deleted' });
    }
  } catch (error) {
    console.error('Error restoring ToDo:', error.message);
    res.status(500).json({ message: 'Failed to restore ToDo', error: error.message });
  }
};

export const pinUnpinToDo = async (req, res) => {
  try {
    const id = req.params.id;
    const pinUnpinUpdated = await Todo.findOneAndUpdate(
      { _id: id },
      [{ $set: { isPinned: { $not: "$isPinned" } } }],
      { new: true }
    );

    res.status(200).json(pinUnpinUpdated);
  } catch (error) {
    console.error('Error pinning/unpinning ToDo:', error.message);
    res.status(500).json({ message: 'Failed to pin/unpin ToDo', error: error.message });
  }
};
