import { prismaMock } from "../../singleton";
import bcrypt from "bcrypt";
import { createNewThread } from "../../src/services/threads";

describe("Create Thread", () => {
  it("should create a new thread", async () => {
    
    // Step 1: Create a new user
    const hashedPassword = bcrypt.hashSync("password123", 10);

    const user = {
      id: 1,
      username: "John Doe",
      email: "john.doe@example.com",
      password: hashedPassword,
    };

    // Step 2: Create a thread
    const thread = {
      id: 1,
      title: "Test Thread",
      content: "This is a test thread",
      description: "Thread description", 
      communityId: 1,
      authorId: user.id,
    };

    // Mock Prisma response
    prismaMock.thread.create.mockResolvedValue(thread);

    // Call the function being tested
    const createdThread = await createNewThread(
      thread.title,
      thread.content,
      thread.communityId,
      thread.authorId
    );

    // Step 3: Verify thread creation
    expect(createdThread).toBeDefined();
    expect(createdThread.title).toBe("Test Thread");
    expect(createdThread.content).toBe("This is a test thread");
    expect(createdThread.description).toBe("Thread description"); // ✅ Check for `description`
    expect(createdThread.authorId).toBe(user.id);
  });
});