const { Task } = require("../../models");

const getAllTasks = async (req, res) => {
  const owner = req.user?._id;


  const tasks = await Task.find(
    {owner},
    {
      title: 1,
      start: 1,
      end: 1,
      date: 1,
      status: 1,
      priority: 1,
      _id: 1,
    }
  ).populate("owner", "-_id username email");

  res.status(200).json({
    tasks,
    total: tasks.length,
  });
};

module.exports = getAllTasks;
