const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    // console.log("response.body", response.body);

    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("Go To Statement Considered Harmful");
  });

  test("a specific blog is within the returned blog", async () => {
    const response = await api.get("/api/blogs");

    //  console.log("response.body", response.body);

    expect(response.body[0].id).toBeDefined();
  });
});

describe("viewing a specificblog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  });

  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("addition of a new note", () => {
  test("succeeds with valid data", async () => {
    const init_blog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(init_blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("likes property is missing from the request,", async () => {
    const init_blog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };

    await api
      .post("/api/blogs")
      .send(init_blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const from_response = await api.get("/api/blogs");

    console.log("response.body", from_response.body);
    expect(from_response.body[from_response.body.length - 1].likes).toEqual(0);
  });

  test("fails with status code 400 if data invalid", async () => {
    const init_blog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
    };

    await api.post("/api/blogs").send(init_blog).expect(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
