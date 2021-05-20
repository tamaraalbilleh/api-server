'use strict'; 

const server = require('../src/server');
const superTest = require('supertest');
let otherRequest =superTest (server.server)
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.server);
const mangoose = require('mongoose');
require('dotenv').config();

// mangoose.connect(process.env.MONGOOSE_TEST_URI, 
//   { useNewUrlParser : true , useUnifiedTopology : true}, async ()=>{
//     await mangoose.connection.db.dropDatabase();
//   });


describe ('testing server functions and errors' , ()=>{

  it ('should get the home page message', async ()=>{
    // arrange 
    let rout = '/';
    // act
    const response = await otherRequest.get (rout);
    // assert
    expect(response.status).toBe (200);
    expect (response.text).toEqual ('welcome to home page!');
  });


  it ('should throw page not found error 404 on bad rout', async ()=>{
    // arrange 
    let rout = '/tama';
    // act
    const response = await otherRequest.get (rout);
    // assert
    expect (response.status).toBe(404);
  });


  it('should throw page not found error 404 on bad method', async () => {
    // arrange 
    // act
    const response = await otherRequest.put ('/api/v1/food');
    // assert
    expect(response.status).toBe (404);
  });


  it ('should throw error 500', async ()=>{
    // arrange 
    let rout = '/bad';
    // act
    const response = await otherRequest.get (rout);
    // assert
    expect(response.status).toEqual (500);
    
  });

  
});
describe('Api Food', ()=>{
  // afterAll(()=>{
  //   mangoose.connection.close();
  // });
  let id;
  let foodObj;
  it('should create a new object using post', async()=>{
    foodObj = {
      name : 'mansaf',
      type : 'lunch',
    };
    const response = await request.post('/api/v1/food').send(foodObj);

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('mansaf');
    expect(response.body.type).toEqual('lunch');
    expect(response.body._id.length).toBeGreaterThan(0);
    id = response.body._id;
  });
  it('get a food using Get /food/:id', async () => {
    foodObj = {
      name : 'mansaf',
      type : 'lunch',
    };
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('mansaf');
  });
  it('should update an object using put', async()=>{
    let editedFood = {
      name : 'mansaf',
      type : 'dinner',
    };
    const response = await request.put(`/api/v1/food/${id}`).send(editedFood);
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('dinner');
  });

  it('should retrieve all data from the DB', async()=>{
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should be able to delete data from the DB', async()=>{
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
  });
});

describe('Api clothes', ()=>{
  // afterAll(()=>{
  //   mangoose.connection.close();
  // });
  let id;
  let clothes;
  it('should create a new object using post', async()=>{
    clothes = {
      name : 'scarf',
      color : 'blue',
    };
    const response = await request.post('/api/v1/clothes').send(clothes);

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('scarf');
    expect(response.body.color).toEqual('blue');
    expect(response.body._id.length).toBeGreaterThan(0);
    id = response.body._id;
  });
  it('get a clothes using Get /clothes/:id', async () => {
    const response = await request.get(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('scarf');
  });
  it('should update an object using put', async()=>{
    clothes = {
      name : 'scarf',
      color : 'red',
    };
    const response = await request.put(`/api/v1/clothes/${id}`).send(clothes);
    expect(response.status).toEqual(200);
    expect(response.body.color).toEqual('red');
  });
  
  it('should retrieve all data from the DB', async()=>{
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  }); 

  it('should be able to delete data from the DB', async()=>{
    const response = await request.delete(`/api/v1/clothes/${id}`);
    expect(response.status).toBe(200);
  });


});