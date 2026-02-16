const { WorksheetTask, TaskOption } = require("../models");

const helper = async (id, transaction) =>
  await WorksheetTask.findAll({
    where: { id },
    include: [
      {
        model: TaskOption,
        as: "options",
        attributes: ["id", "text", "is_correct"],
      },
    ],
    order: [
      ["id", "ASC"],
      [{ model: TaskOption, as: "options" }, "id", "ASC"],
    ],
    transaction,
  });

const helperChecker = (json) => {
 if (!json.instruction || !json.options || json.options.length !== 4 || json.instruction.length < 3) {
  return false;
 }
 let foundCorrect = false;
 for (const option of json.options) { 
  if (!option.text || typeof option.isCorrect !== "boolean" || option.text.length < 3) {
    return false;
  }
  if (foundCorrect && option.isCorrect) {
    return false;
  } else {
    foundCorrect = foundCorrect || option.isCorrect;
  }
 };
 return foundCorrect;
}

module.exports = {
  getTasks: async (req, res, next) => {
    try {
      const tasks = await WorksheetTask.findAll({
        include: [
          {
            model: TaskOption,
            as: "options",
            attributes: ["id", "text", "is_correct"],
          },
        ],
        order: [
          ["id", "ASC"],
          [{ model: TaskOption, as: "options" }, "id", "ASC"],
        ],
      });
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  },

  postTasks: async (req, res, next) => {
    try {
      const task = req.body;
      const taskCreated = await WorksheetTask.create({
        instruction: task.instruction,
      });
      const options = task.options;
      options.map((option) => {
        option.task_id = taskCreated.id;
        option.is_correct = option.isCorrect;
        delete option.isCorrect;
      });
      const createdOptions = await TaskOption.bulkCreate(options);
      const response = taskCreated;
      response.options = createdOptions;
      res.json(response);
    } catch (err) {
      next(err);
    }
  },

  putTasks: async (req, res, next) => {
    try {
      const task = req.body;
      const existing = await helper(task.params.taskId);
      task.options.map((option) => {
        option.task_id = taskCreated.id;
        option.is_correct = option.isCorrect;
        delete option.isCorrect;
      });
      existing.options = task.options;
      existing.instruction = task.instruction;
      await existing.save();
      res.json(existing);
    } catch (err) {
      next(err);
    }
  },

  deleteTasks: async (req, res, next) => {
    try {
      const task = req.body;
      await WorksheetTask.destroy({ where: { id: task.params.taskId } });
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },
};
