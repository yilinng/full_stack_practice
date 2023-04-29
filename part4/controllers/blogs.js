const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.get("/:id", getBlog, async (request, response) => {
  const blog = request.blog;
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  console.log("request.token", request.token);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

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

  response.json(savedBlog);
});

blogsRouter.delete("/:id", getBlog, async (request, response, next) => {
  const id = request.params.id;
  const blog = request.blog;

  console.log("request.token", request.token);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const userid = decodedToken.id;
  try {
    if (blog.user.toString() === userid.toString()) {
      await Blog.deleteOne({ _id: id });
      response
        .status(204)
        .json(
          `deleting a blog is possible only if the token sent with the request is the same as that of the blog's creator`
        );
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  console.log("id put", id);

  const blog = {
    title: request.body.title,
    auther: request.body.auther,
    url: request.body.url,
    likes: request.body.likes,
  };

  Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

async function getBlog(request, response, next) {
  let blog;
  try {
    blog = await Blog.findById(request.body._id);
    if (blog === null) {
      return response.status(404).json({ message: "Cannot find blog" });
    }
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }

  request.blog = blog;
  next();
}

module.exports = blogsRouter;
