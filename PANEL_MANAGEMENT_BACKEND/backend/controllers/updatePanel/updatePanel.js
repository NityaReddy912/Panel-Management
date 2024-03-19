// const Panelavailability = require("../../models/panels_availabilities");
// const panel = require("../../models/Panel");
// const panelstatus = require("../../models/panels_availability_status");

// async function updatePanel(req, res, next) {
//        panelstatus.findOne({ panel_status: req.body.status }, (err, result1) => {
//         let status;
//         if (err) 
//         {
//             console.log("status not found")
//             res.send({ error: err });
//             return;
//         }
//         else 
//         {
//             status_id = result1.availability_status_id;
//         }
//        panel.findOne({ user_id: req.body.user_id }, (err, result2) => {
//         console.log(result2)
//         if (err) 
//         {
//             console.log("user id not found")
//             res.send({ error: err });
//             return;
//         }
//         pid = result2.id;
//         console.log(pid);
//         Panelavailability.findOneAndUpdate({ panel_id: pid },
//                 { $set: { availability_status_id: status_id ,start_time: req.body.fromtime, end_time: req.body.totime} },
//                 (err, result3) => {

//                     if (err) {
//                         res.send({ error: err, msg: "while updating panel avail" });
//                         return;
//                     }
//                     console.log()
//                     result3.save();
            //             (err, resultt) => {
            //             if (err) {
            //                 res.send({ error: err, msg: "while updating panel avail" });
            //             }
            //             console.log("result", result)
            //             res.send({ msg: "successfully updated", data: result });
            // });
//            }
//         );
//        }
//         )
// }
//  )
// }


// module.exports = {updatePanel};

const Panelavailability = require("../../models/panels_availabilities");
const panel = require("../../models/Panel");
const panelstatus = require("../../models/panels_availability_status");

async function updatePanel(req, res, next) {
    console.log("req.body");
    console.log(req.body);
        // console.log("try");
    console.log(req.body.fromtime);
    const p = req.body.status;
    console.log("p");
    console.log(p);
    var pid = "";
    try{
    panel.findOne({ user_id: req.body.user_id }, (err, result) => {
        console.log(1);
        console.log(result)
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        if( result==null)
        {
            // throw new Error('yo failed')

            res.status(500).send({ error: err });
            return;
            
        }
        console.log("This is result")
        console.log(result)
       
        pid = result.id;
  
        Panelavailability.findOne({ panel_id: pid }, (err, result) => {
            console.log(2);
            if (err) {
                res.send({ error: err });
                return;
            }
            // console.log(result);
            Panelavailability.findOneAndUpdate(
                { panel_id: pid },
                { $set: { start_time: req.body.fromtime, end_time: req.body.totime } },
                (err, result) => {
                    console.log(3);
                    if (err) {
                        res.send({ error: err });
                        return;
                    }

                    panelstatus.findOne(
                        { availability_status: req.body.status },
                        (err, result) => {
                            console.log(444)

                            if (err || result==null) {
                                res.status(500).send({ error: err });
                                return;
                            }
                            console.log(result);
                            const status_id = result.availability_status_id;
                            console.log(status_id)
                            console.log(pid)

                            Panelavailability.findOneAndUpdate({ panel_id: pid },
                                { $set: { availability_status_id: status_id } },
                                (err, result) => {
                                    console.log(4)
                                    if (err) {
                                        res.send({ error: err, msg: "while updating panel avail" });
                                        return;
                                    }
                                    result.save((err, resultt) => {
                                        if (err) {
                                            res.send({ error: err, msg: "while updating panel avail" });
                                        }
                                        console.log(resultt)
                                        // result.availability_status_id = status_id;
                                        // result.save();
                                        // console.log(result)
                                        res.send({ msg: "successfully updated", data: resultt });

                                    });


                                }
                            );
                        }
                    );
                });
        });

       
    });
}catch(err)
{
    console.log("err")
    res.status(500).send({ error: err });
}

}
module.exports = { updatePanel };
