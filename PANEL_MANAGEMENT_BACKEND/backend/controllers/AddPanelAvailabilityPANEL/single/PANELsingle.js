const panelAvailability = require("../../../models/panels_availabilities");
const panels = require("../../../models/Panel");

async function getsingle(req, res) {
  const associate_name = req.body.associate_name;
  const array = associate_name.split("-", 2);
  const user_id = array[1];
  const result = await panels.find({ user_id: user_id });
  const panel_id = result[0].id;
  const grade = result[0].grade;

  return res
    .status(200)
    .send({ user_id: user_id, grade: grade, panel_id: panel_id });
}
function panelNames(req, res, next) {
  panels.aggregate(
    [
      {
        $project: { user_id: 1, grade: 1, _id: 0 },
      },

      {
        $lookup: {
          from: "users",

          localField: "user_id",

          foreignField: "user_id",

          as: "user",
        },
      },

      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"],
          },
        },
      },

      {
        $project: { user_id: 1, name: 1, email: 1, grade: 1 },
      },
    ],
    (error, result) => {
      if (error) {
        res.status(500).send({ err: error });

        return;
      }

      res.status(200).send({ data: result });
    }
  );
}

async function postsingle(req, res) {
  console.log(req.body);

  try {
    const result = await panelAvailability.insertMany(req.body);
    res.status(200).json({
      message: "Successfully Added",
      result,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

module.exports = { postsingle, panelNames, getsingle };
