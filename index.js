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
  createPost(
    {
      post: {
        title: title.value,
        content: content.value,
        username: username.value,
      },
    },
    e.target
  );
};

document.querySelector("form").addEventListener("submit", handleForm);

const wes = {
  first: "Wes",
  last: "Bos",
  links: {
    social: {
      twitter: "https://twitter.com/wesbos",
      facebook: "https://facebook.com/wesbos.developer",
    },
    web: {
      blog: "https://wesbos.com",
    },
  },
};

const nameLogger = ({ first = "Morgan", last }) => {
  console.log(first);
  console.log(last);
};

// nameLogger(wes);

function individualNameLogger(first, last) {
  console.log(first);
  console.log(last);
}

const array = [5, 4, 3, 2, 1, ["b", "c", "a"]];

const newArray = [...array.slice(0, 5), [...array[5]]];

const newWes = {
  ...wes,
  links: { social: { ...wes.links.social }, web: { ...wes.links.web } },
};

const names = { first: "Wes", last: "Bos" };

const links = {
  first: "Morgan",
  social: {
    twitter: "https://twitter.com/wesbos",
    facebook: "https://facebook.com/wesbos.developer",
  },
  web: {
    blog: "https://wesbos.com",
  },
};

const person = { ...names, ...links };

const thing = false;

thing ? console.log("thing was true") : console.log("thing was not true");

const name = thing ? "Morgan" : "Wes";

const num1 = 1;
const num2 = 2;
const num3 = 3;

function add(...rest) {
  let sum = 0;
  rest.forEach((num) => {
    sum += num;
  });
  return sum;
}

sum = add(num1, num2, num3, 15, 22, 33, 11);

console.log(sum);
