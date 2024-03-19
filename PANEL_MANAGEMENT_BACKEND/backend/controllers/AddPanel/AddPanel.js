const Panel=require("../../models/Panel")
const User=require("../../models/User")
const Candidate_roles=require("../../models/candidateroles")
const Grades=require("../../models/Grade")
const Interview_types = require("../../models/InterviewType");
const Panel_skills=require("../../models/PanelSkills")
const Skills=require("../../models/Skills")



async function addpanel(req,res)
{   
    
    const user_id=req.body.current.associate_id;
    const associate_name=req.body.current.associate_name;
    const email=req.body.current.email;
    const contact=req.body.current.contact;
    const grade=req.body.current.grade;
    const is_active=req.body.current.activate ||true;    
    const roles_array=req.body.current.roles_array;  
    const currentdate = new Date().toISOString();
    const created_by=req.body.current.created_by || "admin";
    const deleted_by=req.body.deleted_by || "none";
    const deleted_on=req.body.deleted_on || "1970-01-01T00:00:00.000+00:00";
    const is_deleted=req.body.is_deleted || false;
    const remarks =req.body.remarks || "none";
    const updated_by=req.body.updated_by || created_by;
    const updated_on=req.body.updated_on || currentdate;
    //const interview_type=req.body.current.Table[0].interview_type;
    //const candidate_role=req.body.current.Table[0].role;
    //const interview_type=req.body.current.interview_type;
   //console.log(req.body.current.roles_array)
    
    try{
               
        if(contact>=1000000000 && contact <=9999999999)
        {
            
        }
        else{
            return res.status(500).json({err:"Please enter correct 10 digit contact number"})
        }
        //console.log(req.body);
        const does_panel_exist=await Panel.exists({user_id})    
        //console.log(does_panel_exist)    
        const does_panel_exist_email=await User.exists({email})

        
        if(does_panel_exist)
        {
            return res.status(500).json({err:"User is already a Panelist!"})
        }

        // const does_user_exist=await User.exists({user_id});
        // //console.log(does_user_exist);
        // if(!does_user_exist)
        // {
        //     const new_user=new User({
        //         user_id,
        //         name:associate_name,
        //         email,
        //         is_active,
        //         password:"zensar1",
        //         created_by,
        //         created_on:currentdate,
        //         updated_by,
        //         updated_on:currentdate,
        //         is_deleted:false,
        //         deleted_by:"none",
        //         deleted_on
        //     })
        //     await new_user.save();
        // }
       
        
        
        const panel_id=Math.ceil(Math.random()*(100000000));
        
        const newPanel=new Panel({
            id:panel_id,
            user_id,
            contact,
            created_by,
            created_on:currentdate,
            grade,
            is_active,
            deleted_by,
            deleted_on,
            is_deleted,
            panel_level:"expert",
            remarks:"",
            updated_on,
            updated_by,
            
        });
        for(x of roles_array)
        {
            const panel_skill_id=await Panel_skills.find().count()+1;

            const skill_role_obj=await Skills.find({skill_name:x.role})
            const skill_role_id= skill_role_obj[0].skill_id
            const interview_type_obj= await Interview_types.find({type:x.interviewType})
            
            const Type_id=interview_type_obj[0].type_id
            
            const newPanelSkills=new Panel_skills({
                id:panel_skill_id,
                panel_id,
                skill_id:skill_role_id,
                type_id:Type_id,
                duration_id:"0",
                created_by,
                created_on:currentdate,
                updated_by,
                updated_on,
                is_deleted:false,
                deleted_by:"none",
                deleted_on,
                is_active:x.isActive
            })
            
            
            try{
                await newPanelSkills.save();
            }
            catch(err)
            {
                console.log(err)
            }
            
        }

        

        await newPanel.save();
        res.status(200).json({message:"Panel added successfully",Panel:newPanel})
    }catch(err)
    {
        res.status(400).json(err)
        console.log(err);
    }  
} 
module.exports.addpanel=addpanel;



async function get_roles_and_type(req,res) //get candidate role and type for the dropdown menu
{ 
   

//     const all_skills=await Skills.find();
//        const all_inttypes=await Interview_types.find();
//        const all_grades=await Grades.find();
//        let roles_array=[];
//        let grades_array=[];
//        let types_array=[];
//        for(x of all_skills)
//     {
//         roles_array.push(x.skill_name);
//     }
//     for(y of all_inttypes)
//     {
//         types_array.push(y.type);
//     }
//     for(z of all_grades)
//     {
//         grades_array.push(z.grade);
//     }
//     let response_obj={roles:roles_array.sort(),types:types_array.sort(),grades:grades_array.sort()}
//    
//     res.status(200).send(response_obj);



    
    
    const all_roles= await Skills.find();   
    const all_types=await Interview_types.find();
    const all_grades=await Grades.find();
    
    let roles_array =[];
    let types_array=[];
    let grades_array=[];
    
    for(x of all_roles)
    {
        roles_array.push(x.skill_name);
    }
    for(y of all_types)
    {
        types_array.push(y.type);
    }
    for(z of all_grades)
    {
        grades_array.push(z.grade);
    }
    
    
    let response_obj={roles:roles_array.sort(),types:types_array.sort(),grades:grades_array.sort()}
    
   res.status(200).send(response_obj);
    
}
module.exports.getrolesandtype=get_roles_and_type;


async function getUser(req,res)
{
    const user_id=req.params.id;
    //const panels_doc=await Panel.find({user_id});
    //console.log(panels_doc)
    const user_doc=await User.find({user_id});

   
    
    if(user_doc.length==0)
    {
        return res.status(400).json({});
    }
    else{
        return res.status(200).json(user_doc)
    }

    
}

module.exports.getUser=getUser;