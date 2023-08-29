const { HttpError } = require("../../helpers");
const { Task } = require("../../models");

const addTask = async (req, res, next) => {
  const body = req.body;
  const owner = req.user?._id;
  const {start, end}= req.body;

  if (!owner) {
    throw HttpError(400, "Missing owner");
  }

  if (!body) {
    throw HttpError(400, "Missing body of request");
  }
  
 if (start>=end) {
    throw HttpError(400, "End should be greater then Start");
  }


  const result = await Task.create({ ...body, owner });

 if (!result) {
    throw HttpError(500, "Failed creating task");
  }

  res.status(201).json(result);
};

module.exports = addTask;
