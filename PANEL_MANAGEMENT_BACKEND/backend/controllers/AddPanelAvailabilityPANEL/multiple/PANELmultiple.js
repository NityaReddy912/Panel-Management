// const Panel = require('../../../models/PanelAvailability');

const Panel = require("../../../models/Panel");
const PanelAvailability = require("../../../models/panels_availabilities");

async function getsingle(req, res) {
    const associate_name = req.body.associate_name;
    const array = associate_name.split('-', 2);
    const user_id = array[1]
    const result = await Panel.find({ user_id: user_id });
    const panel_id=result[0].id
    const grade=result[0].grade;

    return res.status(200).send({ user_id: user_id,grade:grade, panel_id:panel_id})
}

function panelNames(req, res, next) {
    Panel.aggregate([
        {
            $project: { user_id: 1, grade: 1, _id: 0 }
        },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "user_id",
                as: "user"
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"] } }
        },
        {
            $project: { user_id: 1, name: 1, email: 1, grade: 1 }
        }
    ], (error, result) => {
        if (error) {
            res.status(500).send({ err: error });
            return;
        }
        res.status(200).send({ data: result });
    });
}

async function addPanelAvailability(request, response) {
    console.log(request.body)
   

     try {

       const res= await PanelAvailability.insertMany(request.body);
        response.status(200).json({
            message: "Successfully Added",
            res
        })

        //return response.json(await User.find());
    } catch (err) {
        response.status(500).json({ err: err.message })
    } 
}


module.exports = { addPanelAvailability, panelNames, getsingle }