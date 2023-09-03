const { HttpError } = require("../../helpers");
const { Task } = require("../../models");

const getAllTasks = async (req, res) => {
 const owner = req.user?._id;
 
  let { year, month, day } = req.query;

  const serverTime = new Date();
  const currentMonthIndex = serverTime.getMonth();
  const currentYear = serverTime.getFullYear();
  
  if (!month) {
    month = currentMonthIndex + 1;
  }
  if (!year) {
    year = currentYear
  }

  console.log(year, month, day)

  if (month > 12 || month <= 1) {
    throw HttpError(400, 'Wrong month. Min - 1, max - 12');
  }

  if (!owner) {
    throw HttpError(400, 'Missing owner');
  }

  

  const currentMonth = `${year}-${month.toString().padStart(2, '0')}`;
  const currentDay = `${year}-${month.toString().padStart(2, '0')}-${day
    ?.toString()
    .padStart(2, '0')}`;

  // console.log(currentMonth);
  // console.log(currentDay);
  // console.log(year);
  // console.log(month);
  // console.log(day);

  

  const tasks = await Task.find({
    owner,
    date: { $regex: currentMonth, $options: 'i' },
  });

  const tasksByDay = await Task.find({
    owner,
    date: { $regex: currentDay, $options: 'i' },
  }).populate('owner', '_id name avatarUrl');

  if (!tasks) {
    throw HttpError(500, 'Failed to fetch tasks');
  }

  res.json({
    message: `Get all tasks for the month ${month} ${year}`,
    tasks,
    tasksByDay,
  });
};

module.exports = getAllTasks;
