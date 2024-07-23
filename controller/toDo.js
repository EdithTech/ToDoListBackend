import Todo from "../model/toDoModel.js";

export const addToDo = async (req, res) => {
  try {
    const data = req.body;
    const newTodo = new Todo(data);
    const response = await newTodo.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllToDos = async (req, res) => {
  try {
    const allToDos = await Todo.find().sort({"createdAt" : -1})

    res.status(200).json(allToDos);
    
  } catch (error) {
    console.log(error.message);
  }
};

export const toggleToDoDone = async (req, res) => {
  try {
    const toDoRef = await Todo.findById(req.params.id);

    const toggledToDo = await Todo.findOneAndUpdate(
      {_id: toDoRef._id },
      {done: !toDoRef.done},
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
    const todo = await Todo.findById(id);
    const deletedToDo = await Todo.findOneAndUpdate(
      {_id: id},
      {isDeleted: !todo.isDeleted},
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
        {isDeleted: !todo.isDeleted},
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
    const todo = await Todo.findById(id);
    const pinUnpinUpdated = await Todo.findOneAndUpdate(
      {_id: id},
      {pinToggle: !todo.pinToggle},
      {new: true}
    )
    res.status(200).json(pinUnpinUpdated);
  }catch(error){
    console.log(error);
  }
}



