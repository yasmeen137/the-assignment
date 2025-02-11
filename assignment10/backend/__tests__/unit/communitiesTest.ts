import { prismaMock } from "../../singleton";
import bcrypt from "bcrypt";
import { createNewCommunity } from "../../src/services/communities";

describe("Create Community", () => {
  it("should create a new community", async () => {
    
    // Step 1: Create a new user
    const hashedPassword = bcrypt.hashSync("password123", 10);

    const user = {
      id: 1,
      username: "John Doe",
      email: "john.doe@example.com",
      password: hashedPassword,
    };

    // Step 2: Create a community
    const community = {
      id: 1,
      name: "Test Community",
      description: "This is a test community",
      photoUrl: "/uploads/test.jpg",
      creatorId: user.id,
    };

    // Mock Prisma response
    prismaMock.community.create.mockResolvedValue(community);

    // Call the function being tested
    const createdCommunity = await createNewCommunity(
      community.name,
      community.description,
      community.creatorId,
      community.photoUrl
    );

    // Step 3: Verify community creation
    expect(createdCommunity).not.toBeNull(); // ✅ Ensure it's not null
    if (createdCommunity) {
      expect(createdCommunity.name).toBe("Test Community");
      expect(createdCommunity.description).toBe("This is a test community");
      expect(createdCommunity.photoUrl).toBe("/uploads/test.jpg");
      expect(createdCommunity.creatorId).toBe(user.id);
    }
  });


  


});