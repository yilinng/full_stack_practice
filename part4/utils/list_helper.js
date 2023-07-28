const dummy = (blogs) => {
  return blogs.length + 1;
};

const totalLikes = (blogs) => {
  const blogs_arr = blogs.map((blog) => blog.likes);
  const sumWithInitial = blogs_arr.reduce((pre, curr) => pre + curr, 0);

  return sumWithInitial;
};

const favoriteBlog = (blogs) => {
  let favorite_blog = {};
  blogs.map((blog, index) => {
    if (index === 0) {
      favorite_blog["title"] = blog.title;
      favorite_blog["author"] = blog.author;
      favorite_blog["likes"] = blog.likes;
    }
    if (favorite_blog.likes < blog.likes) {
      favorite_blog["title"] = blog.title;
      favorite_blog["author"] = blog.author;
      favorite_blog["likes"] = blog.likes;
    }
  });
  return favorite_blog;
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
//https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
const mostBlogs = (blogs) => {
  let most_blog = {};
  const blogs_with_nb = blogs.map((blog) => {
    let init_obj = {};
    init_obj["author"] = blog.author;
    init_obj["blogs"] = 1;

    return init_obj;
  });

  //console.log("blogs_with_nb ", blogs_with_nb);

  let holder = {};

  blogs_with_nb.map((blog) => {
    if (blog.author in holder) {
      holder[blog.author] = holder[blog.author] + blog.blogs;
    } else {
      holder[blog.author] = blog.blogs;
    }
  });

  //console.log("holder", holder);

  let arr = Object.values(holder);
  let max = Math.max(...arr);

  most_blog["author"] = getKeyByValue(holder, max);
  most_blog["blogs"] = max;
  return most_blog;
};

const mostLikes = (blogs) => {
  let most_blog = {};
  const blogs_with_nb = blogs.map((blog) => {
    let init_obj = {};
    init_obj["author"] = blog.author;
    init_obj["likes"] = blog.likes;

    return init_obj;
  });

  //console.log("blogs_with_nb ", blogs_with_nb);

  let holder = {};

  blogs_with_nb.map((blog) => {
    if (blog.author in holder) {
      holder[blog.author] = holder[blog.author] + blog.likes;
    } else {
      holder[blog.author] = blog.likes;
    }
  });

  //console.log("holder", holder);

  let arr = Object.values(holder);
  let max = Math.max(...arr);

  most_blog["author"] = getKeyByValue(holder, max);
  most_blog["likes"] = max;
  return most_blog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
