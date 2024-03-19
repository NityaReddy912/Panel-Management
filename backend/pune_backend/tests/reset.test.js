let mongoose = require('mongoose')
let User = require('../models/User');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe("/PUT ",()=>{
    it('Password reset successful',(done)=>{
        let user =
        {
            Email : "n.rondla@zensar.com",
            Password:"eeEYh045BEE"
        }

            chai.request(server)
            .put('/reset_password')
            //.set('content-type', 'application/json')
            .send({...user})
            .end((err,res)=>{
            if(err){
                    console.log(err)
                    done();
                }
                // console.log(res.body)
                res.should.have.status(201)
                res.body.should.have.property("msg").eql('Password reset successful');
                done();
            })

        });

       it('User not found',(done)=>{
            let user =
            {
                Email : "j.thurupunuri@zensar.com"
            }

            chai.request(server)
                .put('/reset_password')
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