let mongoose = require('mongoose')
let User = require('../models/User');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe("/POST ",()=>{

    // it('User not found',(done)=>{
    //     let user =
    //     {
    //         Email : "j.thurupunuri@zensar.com"
    //     }

    //     chai.request(server)
    //         .post('/forgot_password')
    //         .set('content-type', 'application/json')
    //         .send({...user})
    //         .end((err,res)=>{
    //             if(err){
    //                     console.log(err)
    //                     done();
    //                 }
    //             res.should.have.status(200);
    //             res.body.should.have.property("msg").eql('Reset Link sent to mail');
    //             done();
    //         })

    //     })
        

       it('User not found',(done)=>{
        let user =
        {
            Email : "j.thurupunuri@zensar.com"
        }

        chai.request(server)
            .post('/forgot_password')
            .set('content-type', 'application/json')
            .send({...user})
            .end((err,res)=>{
                if(err){
                        console.log(err)
                        done();
                    }
                res.should.have.status(404);
                res.body.should.have.property("err").eql('User not found');
                done();
            })

        });

})