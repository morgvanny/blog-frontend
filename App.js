class App {
  constructor() {
    this.blogPosts = {};
    this.users = {};
    fetch("http://localhost:3000/posts")
      .then((r) => r.json())
      .then((info) => {
        console.log(info);
        this.addBlogPosts(info);
      })
      .catch((e) => {
        console.log(e);
      });
    //fetch some blog posts
    // this.blogPosts = whatever I fetched
    // create some users from the blogPost fetch and set this.users
    // display blog posts
  }

  addBlogPost(p) {
    this.blogPosts[p.id] = new BlogPost(p);
  }

  addUser(u) {
    this.users[u.id] = new User(u);
  }

  addBlogPosts(info) {
    if (Array.isArray([info.data])) {
      info.data.forEach((p) => {
        this.addBlogPost(p);
      });
    } else this.addBlogPost(p);
    info.included.forEach((u) => {
      this.addUser(u);
    });

    this.displayPosts();
  }

  displayPosts() {
    posts.innerHTML = "";

    for (const p in this.blogPosts) {
      this.blogPosts[p].display();
    }
  }

  submitPost() {
    const post = new BlogPost({
      attributes: { title: title.value, content: content.value },
      username: username.value,
    });
    post.persist();
  }
}
