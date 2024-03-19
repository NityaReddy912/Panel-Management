let User = require('../models/User');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

    describe("GET USERS",()=>{
        it('It should fetch all Users',(done)=>{
            chai.request(server)
            .get('/getAllUsers')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Successfully Fetched the User');
            done();
            })
        })
    })  

    describe("POST USER",()=>{
        it('It should POST a valid user',(done)=>{
            let userObject ={
                "User_ID":"MNRYJL12BV1111",
                "User_Name":"VaishSam",
                "Email": "vaish@zensar.com",
                "Roles":"Practice Head(PH)",
                "Action":"true"
            }
            chai.request(server)
            .post('/addUser')
            .send(userObject)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Successfully Added User Details');
                res.body.userObject.should.have.property('User_ID');
                res.body.userObject.should.have.property('User_Name');
                res.body.userObject.should.have.property('Email');
                res.body.userObject.should.have.property('Roles');
                res.body.userObject.should.have.property('Action');
                done();
            })
        })
    })

    describe("POST USER",()=>{
        it('It should not POST an invalid user',(done)=>{
            let userObject ={
                "User_ID":"SB75157",
                "User_Name":"B Sathvika",
                "Email": "b.sathvika@zensar.com",
                "Roles":"Panel(Interviewer)",
                "Action":"true"
            }
            chai.request(server)
            .post('/addUser')
            .send(userObject)
            .end((err,res)=>{
                res.should.have.status(409);
                res.body.should.be.a('object');
                res.body.should.have.property('err').eql('User already exists');
                done();
            })
        })
    })

    describe("POST USER",()=>{
        it('It should not POST an invalid user',(done)=>{
            let userObject ={
                "User_ID":"",
                "User_Name":"",
                "Email": "",
                "Roles":"",
                "Action":"true"
            }
            chai.request(server)
            .post('/addUser')
            .send(userObject)
            .end((err,res)=>{
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('err').eql('Invalid Input');
                done();
            })
        })
    })

    describe('PUT USER', () => {
        it('it should UPDATE a user given the UserID', (done) => {
            let result = new User({
                User_ID:"VV75156",
                User_Name:"Vaishnavi Varaganti",
                Email: "v.varaganti@zensar.com",
                Roles:"Practice Head(PH)",
                Action:"true"
            })
            chai.request(server)
                .put('/updateUser/'+result.User_ID)
                .send({
                    User_ID:"VV75156",
                    User_Name:"vaishnavi varaganti",
                    Email: "v.varaganti@zensar.com",
                    Roles:"Practice Head(PH)",
                    Action:"false"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Sucessfully Updated User Details');
                    res.body.result.should.have.property('Action').eql(false);
                done();
            });
        });
    });

    describe('PUT USER', () => {
        it('it should UPDATE a user given the UserID', (done) => {
            let result = new User({
                User_ID:"abcdefghhhhh",
                User_Name:"Vaishnavi Varaganti",
                Email: "v.varaganti@zensar.com",
                Roles:"Practice Head(PH)",
                Action:"true"
            })
            chai.request(server)
                .put('/updateUser/'+result.User_ID)
                .send({
                    User_ID:"abcdefghhhhh",
                    User_Name:"vaishnavi varaganti",
                    Email: "v.varaganti@zensar.com",
                    Roles:"Practice Head(PH)",
                    Action:"false"
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User with abcdefghhhhh not found!');
                done();
            });
        });
    });

    describe('GET USER BY ID', () => {
        it('it should Fetch a user given the UserID', (done) => {
            let usersList = new User({
                User_ID:"VV75156"
            })
            chai.request(server)
                .get('/getbyid/'+usersList.User_ID)
                .send(usersList)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Successfully Fetched the User');
                done();
            });
        });
    });

    describe('GET USER BY ID', () => {
        it('it should not Fetch a user given the wrong UserID', (done) => {
            let usersList = new User({
                User_ID:"a"
            })
            chai.request(server)
                .get('/getbyid/'+usersList.User_ID)
                .send(usersList)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Successfully Fetched the User');
                done();
            });
        });
    });

    describe('SEARCH USER', () => {
        it('it should Fetch a user given the search parameters', (done) => {
            let user = new User({
                "User_ID": "VV75158",
                "Action":"true"
            })
            chai.request(server)
                .post('/search/1')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Successfully Fetched the User');
                done();
            });
        });
    });

    describe('SEARCH USER', () => {
        it('it should not Fetch a user given the wrong search parameters', (done) => {
            let user = new User({
                "User_ID": "vvv",
                "Action":"false"
            })
            chai.request(server)
                .post('/search/1')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User details not found');
                done();
            });
        });
    });