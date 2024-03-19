const User = require('../models/User');

let chai = require('chai');
let server = require('../app');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe("/POST Login User",()=>{
    
    it('It should POST a valid User',(done) => {
        let user ={
            User_Name:"Onkar",
            Password: "Onkar@1234"
        }
        
        chai.request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send({...user})
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Login successful !');

            done();
        })
        
    });

    it('Incorrect Credentials',(done) => {
        let user ={
            User_Name:"Login User",
            Password: "ashvhesgdwehgdv"
        }
        chai.request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send({...user})
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(401);
                res.body.should.have.property('err').eql('Incorrect Credentials');

            done();
        })
        
    });

    it('User Not Found',(done) => {
        let user ={
            User_Name:"Nitya",
            Password: "YAjhckce"
        }
        chai.request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send({...user})
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(404);
                res.body.should.have.property('err').eql('User not Found');

            done();
        })
        
    });
    
});

