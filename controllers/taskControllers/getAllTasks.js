// const { HttpError } = require("../../helpers");
const { Task } = require("../../models");

const getAllTasks = async (req, res) => {
 const owner = req.user?._id;
 
//   const { year, month, day } = req.query;

//   console.log(year, month, day)

//   if (month > 12 || month <= 1) {
//     throw HttpError(400, 'Wrong month. Min - 1, max - 12');
//   }

//   if (!owner) {
//     throw HttpError(400, 'Missing owner');
//   }

//   if (!year || !month) {
//     throw HttpError(400, 'Missing year or month');
//   }

//   const currentMonth = `${year}-${month.toString().padStart(2, '0')}`;
//   const currentDay = `${year}-${month.toString().padStart(2, '0')}-${day
//     ?.toString()
//     .padStart(2, '0')}`;

//   // console.log(currentMonth);
//   // console.log(currentDay);
//   // console.log(year);
//   // console.log(month);
//   // console.log(day);

//   const tasks = await Task.find({
//     owner,
//     date: { $regex: currentMonth, $options: 'i' },
//   });

//   const tasksByDay = await Task.find({
//     owner,
//     date: { $regex: currentDay, $options: 'i' },
//   }).populate('owner', '_id name avatarUrl');

//   if (!tasks) {
//     throw HttpError(500, 'Failed to fetch tasks');
//   }

//   res.json({
//     message: `Get all tasks for the month ${month} ${year}`,
//     tasks,
//     tasksByDay,
//   });
// };

  const tasks = await Task.find(
    {owner},
    {
      title: 1,
      start: 1,
      end: 1,
      date: 1,
      status: 1,
      priority: 1,
      category: 1,
      _id: 1,
    }
  ).populate("owner", "-_id username email");

  res.status(200).json({
    tasks,
    total: tasks.length,
  });
};

module.exports = getAllTasks;
