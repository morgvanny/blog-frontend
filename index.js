const renderPost = (p, u) => {
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.innerText = p.attributes.title;
  div.appendChild(h2);
  const para = document.createElement("p");
  para.innerText = p.attributes.content;

  div.appendChild(para);
  const author = document.createElement("p");
  author.innerText = `by: ${u.attributes.username}`;
  div.appendChild(author);
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", (e) => {
    fetch(`http://localhost:3000/posts/${p.id}`, {
      method: "DELETE",
    }).then(div.remove());
  });
  div.appendChild(button);
  document.body.appendChild(div);
};

fetch("http://localhost:3000/posts")
  .then((r) => r.json())
  .then((info) => {
    console.log(info);
    info.data.forEach((p) => {
      const u = info.included.find((u) => u.id == p.relationships.user.data.id);
      const post = new BlogPost(p);
    });
    BlogPost.displayAll();
  })
  .catch((e) => {
    console.log(e);
  });

const createPost = (postInfo, form) => {
  fetchPromise = fetch("http://localhost:3000/posts", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postInfo),
  })
    .then((r) => r.json())
    .then((info) => {
      if (info.errors) {
        console.log(info.errors);
      } else {
        form.reset();
        const u = info.included[0];
        renderPost(info.data, u);
      }
    });
};

const handleForm = (e) => {
  e.preventDefault();

  const post = new BlogPost({
    attributes: { title: title.value, content: content.value },
    username: username.value,
  });
  post.persist();
};

document.querySelector("form").addEventListener("submit", handleForm);

class BlogPost {
  static all = [];

  constructor({ id, username, attributes: { title, content } }) {
    this.title = title;
    this.content = content;
    this.id = id;
    this.username = username;
    this.constructor.all.push(this);
  }

  static displayAll() {
    posts.innerHTML = "";
    this.all.forEach((p) => {
      p.display();
    });
  }

  display() {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.innerText = this.title;
    div.appendChild(h2);
    const para = document.createElement("p");
    para.innerText = this.content;

    div.appendChild(para);
    // const author = document.createElement("p");
    // author.innerText = `by: ${u.attributes.username}`;
    // div.appendChild(author);
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
          this.id = info.data.id;
          this.constructor.displayAll();
        }
      });
  }

  delete(e) {
    fetch(`http://localhost:3000/posts/${this.id}`, {
      method: "DELETE",
    }).then(() => {
      this.constructor.all = this.constructor.all.filter((p) => {
        return p != this;
      });
      this.constructor.displayAll();
    });
  }
}
