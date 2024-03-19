const Panel = require('../../models/Panel');
const User = require('../../models/User');
const Grade = require('../../models/Grade');
const PanelLevel = require('../../models/Panelevel');
const UserRoles = require('../../models/UserRoles');
const InterviewType = require('../../models/InterviewType');

function panelList(req,res,next){
    console.log(req.body);

    // InterviewType.find({}, (err, result)=>{
    //     res.send({data: result});
    // });
    // return;

    // let dbConstraints1 = {}
    // if(req.body.user_id){
    //     dbConstraints1.user_id = {'$regex' : req.body.user_id, '$options' : 'i'};
    // }
    // if(req.body.name){
    //     dbConstraints1["name"] = {'$regex' : req.body.name, '$options' : 'i'}//req.body.name//{'$regex' : 'string', '$options' : 'i'}//req.body.name;
    // }
    // if(req.body.email){
    //     dbConstraints1["email"] = {'$regex' : req.body.email, '$options' : 'i'}//req.body.email;
    // }
    // if(req.body.role){
    //     dbConstraints1["role_name"] = req.body.role;
    // }
    // if(req.body.interviewType){
    //     dbConstraints1["type"] = req.body.interviewType;
    // }

    // let dbConstraints2 = {};
    // if(req.body.grade){
    //     dbConstraints2.grade = req.body.grade;
    // }
    // if(req.body.is_active){
    //     dbConstraints2.is_active = req.body.is_active;
    // }
    // console.log({...dbConstraints1, ...dbConstraints2})
    if(req.body.name || req.body.user_id || req.body.grade || req.body.email || req.body.role){
        Panel.aggregate([
            {
                $lookup:{
                    from: "users",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "user"
                }
            },
            {
                $lookup:{
                    from: "user_roles",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "roleid"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$roleid", 0 ] }, "$$ROOT" ] } }
            },
            {
                $project: {"roleid" : 0}
            },
            {
                $lookup:{
                    from: "roles",
                    localField: "role_id",
                    foreignField: "role_id",
                    as: "role"
                }
            },
            {
                $lookup:{
                    from: "interview_types",
                    localField: "type_id",
                    foreignField: "type_id",
                    as: "int_type"
                }
            },
            {
                $project : {"user.is_active": 0}
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$user", 0 ] }, {$arrayElemAt: ["$int_type", 0]} , "$$ROOT" ] } }
            },
            {
                $project : {"int_type" : 0}
            },
            {
                $replaceRoot: { newRoot : {$mergeObjects: [ { $arrayElemAt: ["$role", 0] }, "$$ROOT" ] } }
            },
            {
                $project : {user : 0, role: 0,created_by: 0, created_on: 0, updated_by: 0, updated_on: 0,Token: 0, created_by: 0, created_on: 0, deleted_by: 0, deleted_on: 0, role_id: 0, password: 0, remarks: 0, type_id: 0, candidate_role_id: 0, id: 0}
            },
            {
                $match: {   
                    $or: [
                        {name: {'$regex': req.body.name || "-", '$options': 'i'}},
                        {email: {'$regex': req.body.email || "-", '$options': 'i'}},
                        {user_id: {'$regex': req.body.user_id || "-" , "$options": "i"}},
                        {grade: req.body.grade},
                        {role_name: req.body.role},
                        // {type: req.body.interviewType}
                    ],
                    is_active: req.body.isActive,
                    is_deleted: false
                }
            },
        ], (err, result)=>{
            if(err){
                return res.status(500).send({err: err});
            }
            res.status(200).send({totalItems: result.length,data: result});
        });
    }
    else{
        Panel.aggregate([
            {
                $lookup:{
                    from: "users",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "user"
                }
            },
            {
                $lookup:{
                    from: "user_roles",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "roleid"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$roleid", 0 ] }, "$$ROOT" ] } }
            },
            {
                $project: {"roleid" : 0}
            },
            {
                $lookup:{
                    from: "roles",
                    localField: "role_id",
                    foreignField: "role_id",
                    as: "role"
                }
            },
            {
                $lookup:{
                    from: "interview_types",
                    localField: "type_id",
                    foreignField: "type_id",
                    as: "int_type"
                }
            },
            {
                $project : {"user.is_active": 0}
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$user", 0 ] }, {$arrayElemAt: ["$int_type", 0]} , "$$ROOT" ] } }
            },
            {
                $project : {"int_type" : 0}
            },
            {
                $replaceRoot: { newRoot : {$mergeObjects: [ { $arrayElemAt: ["$role", 0] }, "$$ROOT" ] } }
            },
            {
                $project : {user : 0, role: 0,created_by: 0, created_on: 0, updated_by: 0, updated_on: 0,Token: 0, created_by: 0, created_on: 0, deleted_by: 0, deleted_on: 0, role_id: 0, password: 0, remarks: 0, type_id: 0, candidate_role_id: 0, id: 0}
            },
            {
                $match: {   
                    is_active: req.body.isActive,
                    is_deleted: false
                }
            },
        ], (err, result)=>{
            if(err){
                return res.status(500).send({err: err});
            }
            // console.log(result)    
            res.status(200).send({totalItems: result.length,data: result});
        });
    }
    
    return;
}

function changeActiveStatus(req,res,next){
    console.log(req.params.id);
    Panel.findOneAndUpdate({user_id: req.params.id}, {$set: {is_active: !req.body.isActive}}, (err,result)=>{
        if(err){
            res.status(500).send({err: err});
            return ;
        }
        res.status(201).send({data: result});
        return;
    });
}

module.exports = {panelList, changeActiveStatus};