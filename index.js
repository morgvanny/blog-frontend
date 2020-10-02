const app = new App();

const handleForm = (e) => {
  e.preventDefault();

  app.submitPost();
};

document.querySelector("form").addEventListener("submit", handleForm);
