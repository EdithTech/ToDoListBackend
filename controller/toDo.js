import Todo from "../model/toDoModel.js";

export const addToDo = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      data: req.body.data,
    });

    await newTodo.save();

    res.status(200).json(newTodo);
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

    await toggledToDo.save();

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
    await updatedToDo.save(); 

    res.status(200).json(updatedToDo);

  } catch (error) {
    console.log(error.message);
  }
};

export const deleteToDo = async (req, res) => {
  try {
    // const toDoRef = await Todo.findById(req.params.id);

    const deletedToDo = await Todo.deleteOne(
      {_id: req.params.id},
    )
    // console.log("update", updatedToDo);
    // await deletedToDo.save(); 

    res.status(200).json(deletedToDo);

  } catch (error) {
    console.log(error.message);
  }
};


