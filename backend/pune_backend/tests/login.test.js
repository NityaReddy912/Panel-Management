let mongoose = require('mongoose')
let User = require('../models/User');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
// let login= require ("../controllers/login/loginController")
chai.use(chaiHttp);
describe("/POST ",()=>{

       it('Incorrect Password',(done)=>{
            let user =
            {
                User_Name:"Nitya Rondla",
                Password:"F5M3vat09NBA"
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
                    res.should.have.status(401)
                    res.body.should.have.property("err").eql('Incorrect Credentials');
                    done();
                })

            })
        it('Invalid User',(done)=>{
            let user =
                {
                    User_Name:"Onkar Budrukkar",
                    Password:"F5M3vatNBA"
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
                        res.should.have.status(404)
                        res.body.should.have.property("err").eql('User not Found');
                        done();
                    })
                })

   

            it('Valid User',(done)=>{
                let user =
                    {
                    User_Name:"Nitya Rondla",
                    Password:"eeEYh045BEE"
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
                        res.should.have.status(200)
                        res.body.should.have.property("msg").eql('Login successful !');
                        done();

                    })
            });

        })

