const PanelAvail = require('../../models/panels_availabilities');

// const Panel = require('../../models/Panel');

const Role = require('../../models/Role')

const InterviewType = require('../../models/InterviewType')

const PanelAvailStat = require('../../models/panels_availability_status')

async function panelavailability(req, res) {



    let dbConstraints1 = []

    if (req.query.panelId) {

        dbConstraints1["user_id"] = { '$regex': `${req.query.panelId}`, '$options': 'i' }

    }

    if (req.query.panelName) {

        dbConstraints1["name"] = { '$regex': `${req.query.panelName}`, '$options': 'i' };

    }

    if (req.query.availabilityStatus) {

        dbConstraints1["availability_status"] = req.query.availabilityStatus;

    }

    if (req.query.email) {

        dbConstraints1["email"] = { '$regex': req.query.email || "-", '$options': 'i' };

    }

    if (req.query.role) {

        dbConstraints1["role_name"] = req.query.role;

    }

    if (req.query.interviewType) {

        dbConstraints1["type"] = req.query.interviewType;

    }

    let dbConstraints2 = {}

    if (req.query.toDate) {

        dbConstraints2["$gte"] = new Date(req.query.fromDate)

        dbConstraints2["$lte"] = new Date(req.query.toDate);

        console.log(dbConstraints2)

    } else {

        dbConstraints2["$gte"] = new Date(req.query.fromDate)

    }


    if (req.query.panelName || req.query.panelId || req.query.role || req.query.email || req.query.availabilityStatus || req.query.interviewType) {

        PanelAvail.aggregate([

            {

                $lookup: {

                    from: "panels",

                    localField: "panel_id",

                    foreignField: "id",

                    as: "panel_data"

                },

            },

            {

                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$panel_data", 0] }, "$$ROOT"] } }

            },

            {

                $project: { "panel_data": 0, "deleted_by": 0, "deleted_on": 0, "updated_by": 0, "updated_on": 0, "created_by": 0, "created_on": 0 }

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



                $lookup: {



                    from: "user_roles",



                    localField: "user_id",



                    foreignField: "user_id",



                    as: "roleid"



                }



            },



            {

                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$roleid", 0] }, "$$ROOT"] } }

            },



            {



                $project: { "roleid": 0 }



            },



            {



                $lookup: {



                    from: "roles",



                    localField: "role_id",



                    foreignField: "role_id",



                    as: "role"



                }



            },



            {



                $lookup: {



                    from: "interview_types",



                    localField: "type_id",



                    foreignField: "type_id",



                    as: "int_type"



                }



            },



            {



                $project: { "user.is_active": 0 }



            },



            {

                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, { $arrayElemAt: ["$int_type", 0] }, { $arrayElemAt: ["$role", 0] }, "$$ROOT"] } }

            },

            {

                $lookup: {

                    from: "panels_availability_statuses",

                    localField: "availability_status_id",

                    foreignField: "availability_status_id",

                    as: "availability_statuses"

                },



            },



            {

                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$availability_statuses", 0] }, "$$ROOT"] } }

            },

            {

                $project: { "availability_statuses": 0, "deleted_by": 0, "deleted_on": 0, "updated_by": 0, "updated_on": 0, "created_by": 0, "created_on": 0 }

            },

            {

                $project: { user: 0, created_by: 0, created_on: 0, updated_by: 0, updated_on: 0, created_by: 0, created_on: 0, deleted_by: 0, deleted_on: 0, password: 0, remarks: 0, type_id: 0, candidate_role_id: 0, id: 0, int_type: 0, role: 0 }

            },

            {

                $match: {
                    //...dbConstraints1
                    $or: [{ name: { '$regex': req.query.panelName || "-", '$options': 'i' } },
                    { email: { '$regex': req.query.email || "-", '$options': 'i' } },
                    { user_id: { '$regex': req.query.panelId || "-", '$options': 'i' } },
                    { availability_status: req.query.availabilityStatus },
                    { role_name: req.query.role },
                    { type: req.query.interviewType }],

                    available_date: dbConstraints2,



                    is_deleted: false

                }

            },

            { $sort: { available_date: 1 } }

            //is_active:    true,

        ], (err, result) => {

            if (err) {

                return res.status(500).send({ err: err });

            }

            console.log(result);

            res.status(200).send({ totalItems: result.length, data: result });

        });
    }else{
        PanelAvail.aggregate([

            {

                $lookup: {

                    from: "panels",

                    localField: "panel_id",

                    foreignField: "id",

                    as: "panel_data"

                },

            },

            {

                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$panel_data", 0] }, "$$ROOT"] } }

            },

            {

                $project: { "panel_data": 0, "deleted_by": 0, "deleted_on": 0, "updated_by": 0, "updated_on": 0, "created_by": 0, "created_on": 0 }

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



                $lookup: {



                    from: "user_roles",



                    localField: "user_id",



                    foreignField: "user_id",



                    as: "roleid"



                }



            },



            {

                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$roleid", 0] }, "$$ROOT"] } }

            },



            {



                $project: { "roleid": 0 }



            },



            {



                $lookup: {



                    from: "roles",



                    localField: "role_id",



                    foreignField: "role_id",



                    as: "role"



                }



            },



            {



                $lookup: {



                    from: "interview_types",



                    localField: "type_id",



                    foreignField: "type_id",



                    as: "int_type"



                }



            },



            {



                $project: { "user.is_active": 0 }



            },



            {

                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, { $arrayElemAt: ["$int_type", 0] }, { $arrayElemAt: ["$role", 0] }, "$$ROOT"] } }

            },

            {

                $lookup: {

                    from: "panels_availability_statuses",

                    localField: "availability_status_id",

                    foreignField: "availability_status_id",

                    as: "availability_statuses"

                },



            },



            {

                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$availability_statuses", 0] }, "$$ROOT"] } }

            },

            {

                $project: { "availability_statuses": 0, "deleted_by": 0, "deleted_on": 0, "updated_by": 0, "updated_on": 0, "created_by": 0, "created_on": 0 }

            },

            {

                $project: { user: 0, created_by: 0, created_on: 0, updated_by: 0, updated_on: 0, created_by: 0, created_on: 0, deleted_by: 0, deleted_on: 0, password: 0, remarks: 0, type_id: 0, candidate_role_id: 0, id: 0, int_type: 0, role: 0 }

            },

            {

                $match: {

                    available_date: dbConstraints2,



                    is_deleted: false

                }

            },

            { $sort: { available_date: 1 } }

            //is_active:    true,

        ], (err, result) => {

            if (err) {

                return res.status(500).send({ err: err });

            }

            console.log(result);

            res.status(200).send({ totalItems: result.length, data: result });

        });
    }

}



function changeActiveStatus(req, res, next) {

    console.log(req.params.id);

    var status = req.body.isActive ? 'ASI6' : 'ASI1'

    PanelAvail.findOneAndUpdate({ panel_availability_id: req.params.id }, { is_active: !req.body.isActive, availability_status_id: status }, (err, result) => {

        if (err) {

            res.status(500).send({ err: err });

            return;

        }

        res.status(200).send({ data: result });

        return;

    });

}



async function getrolesdrop(req, res, next) {



    const response = await Role.find({})

    const roles = response.map((data, ind) => {

        return data.role_name

    })

    res.send({ data: roles })

}



async function getinttypedrop(req, res, next) {

    const response = await InterviewType.find({})

    const interview_types = response.map((data, ind) => {

        return data.type

    })

    res.send({ data: interview_types })

}

async function getavailstatdrop(req, res, next) {

    const response = await PanelAvailStat.find({})

    const interview_stat = response.map((data, ind) => {

        return data.availability_status

    })

    res.send({ data: interview_stat })



}



module.exports = { changeActiveStatus, panelavailability, getrolesdrop, getinttypedrop, getavailstatdrop };