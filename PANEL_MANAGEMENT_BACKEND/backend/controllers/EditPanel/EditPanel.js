const Panel = require("../../models/Panel");
const User = require("../../models/User");
const PanelSkills = require("../../models/PanelSkills");
const InterviewType = require("../../models/InterviewType");
// const CandidateRoles = require("../../models/candidate_roles");
const Grade = require("../../models/Grade");
const Skills = require("../../models/Skills");

async function getpanel(req, res, next){
    console.log(req.body)
    var responseData = {};
    try{
        let user = await User.findOne({user_id: req.body.user_id}, {name: 1, email: 1});
        responseData.name = user.name;
        responseData.email = user.email;
        let panel = await Panel.findOne({user_id: req.body.user_id}, {contact: 1, id: 1, grade: 1, is_active: 1});
        responseData.contact = panel.contact;
        responseData.grade = panel.grade;
        responseData.is_active = panel.is_active;
        let skills = await PanelSkills.aggregate([
            {
                $match: {
                    panel_id : panel.id,
                    is_deleted: false
                }
            },
            {
                $project: {is_deleted: 1, skill_id: 1, type_id: 1, panel_id: 1 , is_active: 1}
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "skill_id",
                    foreignField: "skill_id",
                    as : "skill"
                }
            },
            {
                $lookup: {
                    from: "interview_types",
                    localField: "type_id",
                    foreignField: "type_id",
                    as : "type_name"
                }
            },
            {
                $replaceRoot: { newRoot : {$mergeObjects: [ { $arrayElemAt: ["$skill", 0] }, { $arrayElemAt: ["$type_name", 0] } , "$$ROOT" ] } }
            },
            {
                $project: {skill_id: 1, skill_name: 1, type_id: 1, type: 1 , is_active : 1, _id: 0}
            }
        ]);
        responseData.skill = skills;
        const skillsArray = await Skills.find({}, {skill_id: 1, skill_name: 1, _id: 0});
        responseData.skills = skillsArray;
        const interviewTypes = await InterviewType.find({}, {type_id: 1, type: 1, _id: 0});
        responseData.intType = interviewTypes;
        const grades = await Grade.find({}, {grade: 1, _id: 0});
        responseData.grades = grades;
        console.log(responseData);
        res.status(200).send({data: responseData});
    }
    catch(err){
        res.status(500).send({err: err});
    }
    return;
}

async function editpanel(req,res){
    console.log(req.body.bodyObject);
    const body = req.body.bodyObject;
    try{
        const updatedPanel = await Panel.updateMany({user_id: body.user_id}, {$set: {contact: body.contact, grade: body.grade, is_active: body.is_active}});
        const panel = await Panel.findOne({user_id: body.user_id});
        const panelID = panel.id;
        let deleted = await PanelSkills.updateMany({panel_id: panelID}, {$set:{is_deleted: true}});
        console.log(deleted)
        for(let i in body.skills){
            const p = await PanelSkills.findOne({panel_id: panelID, skill_id: body.skills[i].role});
            if(p){
                const updatedPanelSkills = await PanelSkills.updateOne({panel_id: panelID, skill_id: body.skills[i].role}, {$set:{type_id: body.skills[i].interviewType, is_active: body.skills[i].isActive, is_deleted: false}});
                console.log(updatedPanelSkills);
            }
            else{
                if(body.skills[0].role.length && body.skills[0].interviewType.length){
                    const doc = new PanelSkills({
                        panel_id: panelID,
                        skill_id: body.skills[i].role,
                        type_id: body.skills[i].interviewType,
                        is_active: body.skills[0].isActive,
                        is_deleted: false
                    });
                    const added = await PanelSkills.insertMany([doc]);
                    console.log(added)
                }
            }
        }
        res.status(200).send({msg: "Panel updated Successfully"});
        return ;
    }
    catch(e){
        console.log(e)
        return res.status(500).send({err: e});
    }
    
}


module.exports = {getpanel, editpanel};
