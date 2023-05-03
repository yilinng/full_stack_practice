const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

let token = "";

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  //await Blog.insertMany(helper.initialBlogs);

  const passwordHash = await bcrypt.hash("test", 10);
  const user = new User({ username: "test", passwordHash });

  await user.save();
  //user login
  await api
    .post("/api/login")
    .send({ username: "test", password: "test" })
    .then((data) => {
      console.log("data from login...", data._body.token);
      token = data._body.token;
    });
  //user login and update userid

  const initialBlogs = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(initialBlogs);
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
    expect(titles).toContain("React patterns");
  });

  test("a specific blog is within the returned blog", async () => {
    const response = await api.get("/api/blogs");

    //  console.log("response.body", response.body);

    expect(response.body[0].id).toBeDefined();
  });
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[blogsAtStart.length - 1];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultBlog.body.title).toEqual(blogToView.title);
    expect(resultBlog.body.author).toEqual(blogToView.author);
    expect(resultBlog.body.url).toEqual(blogToView.url);
    expect(resultBlog.body.likes).toEqual(blogToView.likes);
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

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const init_blog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(init_blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("likes property is missing from the request, use default value", async () => {
    const init_blog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
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

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(init_blog)
      .expect(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("update of a blog", () => {
  test("succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[blogsAtStart.length - 1];

    const update_blog = {
      title: "update title",
      author: "update author",
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(update_blog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).toContain(update_blog.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
