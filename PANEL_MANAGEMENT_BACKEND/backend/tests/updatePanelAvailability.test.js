const Panelavailability = require("../models/panels_availabilities");
const panel = require("../models/Panel");
const panelstatus = require("../models/panels_availability_status");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);
// var server = require('connect').createServer();

describe("/POST updatePanel",()=>{
    it('It should POST a valid user',(done)=>{
        let panel={
            user_id: "HL75133",
            name: "Harshith",
            grade: "d1",
            fromtime: "9:30" ,
            totime: "10:30",
            status: "PanelNoShow",
            date: "2023-02-03",
        }
        chai.request(server)
            .post('/updatePanel')
            .set('content-type','application/json')
            .send(panel)
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('successfully updated');
                 
            done();
        })
    });
    it('It should not POST as user id is invalid',(done)=>{
        let panel={
            user_id: "VV98756",
            name: "Vaishnavi",
            grade: "d2",
            fromtime: "4:30" ,
            totime: "5:30",
            status: "PanelNoShow",
            date: "2023-02-03",
        }
        chai.request(server)
            .post('/updatePanel')
            .set('content-type','application/json')
            .send(panel)
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(500);

            // res.body.should.have.property('message').eql('Successfully Added User Details');
            // res.body.userObject.should.have.property('user_id');
            done();
        })
    });
    it('It should not POST as user id is missing',(done)=>{
        let panel={
           
            name: "Vaishnavi",
            grade: "d2",
            fromtime: "4:30" ,
            totime: "5:30",
            status: "PanelNoShow",
            date: "2023-02-03",
        }
        chai.request(server)
            .post('/updatePanel')
            .set('content-type','application/json')
            .send(panel)
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(500);

            // res.body.should.have.property('message').eql('Successfully Added User Details');
            // res.body.userObject.should.have.property('user_id');
            done();
        })
    });
    it('It should not POST as name is missing',(done)=>{
        let panel={
            user_id: "VV98756",
            grade: "d2",
            fromtime: "4:30" ,
            totime: "5:30",
            status: "PanelNoShow",
            date: "2023-02-03",
        }
        chai.request(server)
            .post('/updatePanel')
            .set('content-type','application/json')
            .send(panel)
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(500);

            // res.body.should.have.property('message').eql('Successfully Added User Details');
            // res.body.userObject.should.have.property('user_id');
            done();
        })
    });
    it('It should not POST as grade is missing',(done)=>{
        let panel={
            user_id: "VV98756",
            name: "Vaishnavi",
            fromtime: "4:30" ,
            totime: "5:30",
            status: "PanelNoShow",
            date: "2023-02-03",
        }
        chai.request(server)
            .post('/updatePanel')
            .set('content-type','application/json')
            .send(panel)
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(500);

            // res.body.should.have.property('message').eql('Successfully Added User Details');
            // res.body.userObject.should.have.property('user_id');
            done();
        })
    });
    it('It should not POST as from time is missing',(done)=>{
        let panel={
            user_id: "VV98756",
            name: "Vaishnavi",
            grade: "d2",
            totime: "5:30",
            status: "PanelNoShow",
            date: "2023-02-03",
        }
        chai.request(server)
            .post('/updatePanel')
            .set('content-type','application/json')
            .send(panel)
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(500);

            // res.body.should.have.property('message').eql('Successfully Added User Details');
            // res.body.userObject.should.have.property('user_id');
            done();
        })
    });
    it('It should not POST as to time is missing',(done)=>{
        let panel={
           
            user_id: "VV98756",
            name: "Vaishnavi",
            grade: "d2",
            fromtime: "4:30" ,
          
            status: "PanelNoShow",
            date: "2023-02-03",
        }
        chai.request(server)
            .post('/updatePanel')
            .set('content-type','application/json')
            .send(panel)
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(500);

            // res.body.should.have.property('message').eql('Successfully Added User Details');
            // res.body.userObject.should.have.property('user_id');
            done();
        })
    });
    it('It should not POST as status is missing',(done)=>{
        let panel={
            user_id: "VV75156",
            name: "Vaishnavi",
            grade: "d2",
            fromtime: "5:30" ,
            totime: "6:30",
            date: "2023-02-03",
        }
        chai.request(server)
            .post('/updatePanel')
            .set('content-type','application/json')
            .send(panel)
            .end((err,res)=>{
                if(err){
                    console.log(err)
                    done()
                }
                res.should.have.status(500);

            // res.body.should.have.property('message').eql('Successfully Added User Details');
            // res.body.userObject.should.have.property('user_id');
            done();
        })
    });

})