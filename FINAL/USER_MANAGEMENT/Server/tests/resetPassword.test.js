const User = require('../models/User');

let chai = require('chai');
let server = require('../app');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe("/PUT Update Password",()=>{
    it('It should Update a password',(done) => {
        let user ={
            Email:"r.password@zensar.com",
            Password:"ResetPassword0000",
        }
        chai.request(server)
            .put('/reset_password')
            .set('content-type', 'application/json')
            .send({...user})
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(201);
                res.body.should.have.property('msg').eql('Password reset successfully');

            done();
        })
        
    });

    // it('User Not Found',(done) => {
    //     let user ={
    //         Email:"b.sdcgshcgv@zensar.com",
    //         Password:"abcd"
    //     }
    //     chai.request(server)
    //         .put('/reset_password')
    //         .set('content-type', 'application/json')
    //         .send({...user})
    //         .end((err,res)=>{
    //             if(err){
    //                 console.log(err)
    //                 done()
    //             }
    //             res.should.have.status(404);
    //             res.body.should.have.property('err').eql('User not found');

    //         done();
    //     })
        
    // });
})