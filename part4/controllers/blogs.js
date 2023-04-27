const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;

  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).send({ error: "unknown endpoint" });
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response, next) => {
  const { title, auther, url, likes } = request.body;

  console.log("post request body", request.body);

  if (title === undefined || auther === undefined || url === undefined) {
    return response
      .status(400)
      .json({ error: "title or auther or url missing" });
  }

  const new_blog = new Blog({
    title: title,
    auther: auther,
    url: url,
    likes: likes || 0,
  });

  new_blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  console.log("id", id);
  try {
    await Blog.deleteOne({ _id: id });
    response.json("delete success.");
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

module.exports = blogsRouter;
