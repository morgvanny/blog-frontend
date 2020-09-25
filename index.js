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
      renderPost(p, u);
    });
  });

const createPost = (postInfo) => {
  return fetch("http://localhost:3000/posts", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postInfo),
  })
    .then((r) => r.json())
    .then((info) => {
      const u = info.included[0];
      renderPost(info.data, u);
    });
};

const handleForm = (e) => {
  const { title, content } = e.target;
  e.preventDefault();
  createPost({
    post: {
      title: title.value,
      content: content.value,
      username: username.value,
    },
  }).then(() => {
    e.target.reset();
  });
};

document.querySelector("form").addEventListener("submit", handleForm);
