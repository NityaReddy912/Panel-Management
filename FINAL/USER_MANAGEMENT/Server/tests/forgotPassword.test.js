const User = require('../models/User');

let chai = require('chai');
let server = require('../app');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe("/POST Forgot Password",()=>{
    it('Mail sent',(done) => {
        let user ={
            User_Name:"Onkar",
            Email:'o.budrukkar@zensar.com',
        }
        chai.request(server)
            .post('/forgot_password')
            .set('content-type', 'application/json')
            .send({...user})
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Reset Link sent to mail');

            done();
        })
        
    });

    it('User Not Found',(done) => {
        let user ={
            User_Name:"Nitya",
            Email: "b.ewkbfj@zensar.com"
        }
        chai.request(server)
            .post('/forgot_password')
            .set('content-type', 'application/json')
            .send({...user})
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(404);
                res.body.should.have.property('err').eql('User not found');

            done();
        })
        
    });
    
});

