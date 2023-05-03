const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
//const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userExtractor, tokenExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog === null)
    return response.status(404).json({ error: "blog does not exist" });
  response.json(blog);
});

blogsRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { title, author, url, likes } = request.body;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = request.user;
    // const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes || 0,
      user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  }
);

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = request.user;

    console.log("user", user);

    const blog = await Blog.findById(request.params.id);

    console.log("blog", blog);

    if (blog === null)
      return response.status(404).json({ error: "blog id is not valid." });

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    }
  }
);

blogsRouter.put(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const id = request.params.id;
    const user = request.user;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    console.log("user from request user", user);

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user._id.toString()) {
      const last_blog = {
        title: request.body.title || blog.title,
        author: request.body.author || blog.author,
        url: request.body.url || blog.url,
        likes: request.body.likes || blog.likes,
        user: blog.user,
      };
      const from_response = await Blog.findByIdAndUpdate(id, last_blog, {
        new: true,
        runValidators: true,
        context: "query",
      });
      response.json(from_response);
    }
  }
);

module.exports = blogsRouter;
