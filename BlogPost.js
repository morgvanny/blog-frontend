class BlogPost {
  constructor({ id, username, attributes: { title, content }, relationships }) {
    this.title = title;
    this.content = content;
    this.id = id;
    this.username = username;
    if (relationships) {
      this.user_id = relationships.user.data.id;
    }
  }

  display() {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.innerText = this.title;
    div.appendChild(h2);
    const para = document.createElement("p");
    para.innerText = this.content;

    div.appendChild(para);
    const author = document.createElement("p");
    author.innerText = `by: ${app.users[this.user_id].username}`;
    div.appendChild(author);
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", (e) => this.delete(e));
    div.appendChild(button);
    posts.appendChild(div);
  }

  persist() {
    fetch("http://localhost:3000/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: {
          title: this.title,
          content: this.content,
          username: this.username,
        },
      }),
    })
      .then((r) => r.json())
      .then((info) => {
        if (info.errors) {
          console.log(info.errors);
        } else {
          newPost.reset();
          // const u = info.included[0];
          // renderPost(info.data, u);
          info.data = [info.data];
          app.addBlogPosts(info);
        }
      });
  }

  delete(e) {
    fetch(`http://localhost:3000/posts/${this.id}`, {
      method: "DELETE",
    }).then(() => {
      delete app.blogPosts[this.id];
      app.displayPosts();
    });
  }
}
