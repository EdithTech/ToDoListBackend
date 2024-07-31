import Todo from "../model/toDoModel.js";

export const addToDo = async (req, res) => {
  try {
    const data = req.body;
    const newTodo = new Todo(data);
    const response = await newTodo.save();

    res.status(200).json(response);
  } catch (error) {
    console.log('Add To do' ,error.message);
  }
};

export const getToDos = async (req, res) => {
  try {
    const allToDos = await Todo.find({isDeleted: false}).sort({"createdAt" : -1})
    const pinnedTodos = await Todo.find({isPinned: true});
    const unPinnedTodos = await Todo.find({isPinned: false});

    res.status(200).json({
      allToDos, pinnedTodos, unPinnedTodos
    });
    
  } catch (error) {
    console.log(error.message);
  }
};

export const toggleToDoDone = async (req, res) => {
  try {

    const toggledToDo = await Todo.findOneAndUpdate(
      {_id: req.params.id },
      [{ $set: { done: { $not: "$done" } } }],
      { new: true }
    )

    res.status(200).json(toggledToDo);

  } catch (error) {
    console.log(error.message);
  }
};

export const updateToDo = async (req, res) => {
  try {
    // const toDoRef = await Todo.findById(req.params.id);

    const updatedToDo = await Todo.findOneAndUpdate(
      {_id: req.params.id},
      {data: req.body.data},
      { new: true }
    )
    console.log("update", updatedToDo);

    res.status(200).json(updatedToDo);

  } catch (error) {
    console.log(error.message);
  }
};

export const deleteToDo = async (req, res) => {
  try {
    // const toDoRef = await Todo.findById(req.params.id);
    const id = req.params.id;
    const deletedToDo = await Todo.findOneAndUpdate(
      {_id: id},
      [{ $set: { isDeleted: { $not: "$isDeleted" } } }],
      {new: true}
    )

    res.status(200).json(deletedToDo);

  } catch (error) {
    console.log(error.message);
  }
};

export const restoreToDo = async (req, res) => {
  try {
    // const toDoRef = await Todo.findById(req.params.id);
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if(todo.isDeleted){
      const restoredToDo = await Todo.findOneAndUpdate(
        {_id: id},
        [{ $set: { isDeleted: { $not: "$isDeleted" } } }],
        {new: true}
      )
      res.status(200).json(restoredToDo);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const pinUnpinToDo = async (req, res) => {
  try{
    const id = req.params.id;
    const pinUnpinUpdated = await Todo.findOneAndUpdate(
      {_id: id},
      [{ $set: { isPinned: { $not: "$isPinned" } } }],
      {new: true}
    )
    res.status(200).json(pinUnpinUpdated);
  }catch(error){
    console.log(error);
  }
}



