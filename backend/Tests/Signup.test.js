const mongoose=require( "mongoose");
const request=require("supertest");
const app=require("../index")
const { describe } = require("test");
const User = require("../models/user");
require("dotenv").config();

beforeAll(async ()=>{
  await mongoose.connect(process.env.mongoTestURL)
  await User.deleteMany();
})
afterAll(async ()=>{
  await mongoose.connection.close();

})

describe("signup",()=>{
  it("should register a new user and return a success message",async ()=>{
    const response=await request(app)
    .post("/api/users/register")
    .send({
      name:"Subham",
      email:"dsubham257.sd@gmail.com",
      phone:"9832777343",
      password:"123456Aa"
    });
    console.log(response.status,"aya");
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Registration email sent. Please check your inbox to confirm.")
  })
})