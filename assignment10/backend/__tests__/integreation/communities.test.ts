import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "../../src/app";
import prisma from "./../../client";

const testSecret = process.env.JWT_SECRET || "test_secret";
const authToken = "Bearer " + jwt.sign({ id: 1 }, testSecret, { expiresIn: "1h" });
let accessToken = ''
let refreshToken = ''
let user = null

beforeAll(async ()=>{

    const user = { 
        email: 'test@gmail.com',
        password: 'password123',
        username: 'testuser'
    }

    let adminUser = await prisma.user.create({
        data: user,
    })

    console.log('user', adminUser)

    accessToken = jwt.sign({id: adminUser.id, email: adminUser.email, username: adminUser.username}, testSecret, {expiresIn: '1h'})
})

afterAll(async () => {
   const deleteUser = prisma.user.deleteMany()
   const deleteComunity = prisma.community.deleteMany()
   const deleteMembers =  prisma.communityMember.deleteMany()

    await prisma.$transaction([
        deleteUser,
        deleteComunity,
        deleteMembers
    ])
    await prisma.$disconnect()
})

describe("POST /communities", () => {
    it("creates a community if valid input is provided", async () => {
        const community = {
            name: "Test Community",
            description: "This is a test community",
            members: ["user1", "user2"],
        };

        const response = await supertest(app)
            .post("/communities")
            .set("Authorization", `Bearer ${accessToken}`) 
            .send(community)
            .expect(201);

        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty("id");
    });

    it("returns 400 if required fields are missing", async () => {
        const invalidCommunity = {
            description: "Missing name field",
        };

        const response = await supertest(app)
            .post("/communities")
            .set("Authorization", authToken)
            .send(invalidCommunity)
            .expect(400);

        expect(response.body).toHaveProperty("message"); 
        expect(response.body.message).toBe("Name and description are required"); 
    });
});