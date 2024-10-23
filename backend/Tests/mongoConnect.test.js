const mongoose=require( "mongoose");
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.mongoTestURL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("MongoDB tests", () => {
    test("should connect to MongoDB", async () => {
        expect(mongoose.connection.readyState).toBe(1); 
    });
});
