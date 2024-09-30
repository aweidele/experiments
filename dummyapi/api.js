const form = document.querySelector("#sample-form");
const submitted = document.querySelector("#submitted");
const response = document.querySelector("#response");
const postcontainer = document.querySelector(".posts div");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const inputs = {};
  formData.forEach((value, key) => {
    inputs[key] = value;
  });

  const submitData = JSON.stringify(inputs);
  postData(submitData);

  submitted.innerHTML = `
  <h3>Submitted Data:</h3><pre>${JSON.stringify(inputs, null, 2)}</pre>`;

  console.log(inputs, submitData);
});

function renderResult(data) {
  response.innerHTML = `
  <div class="card">
    <h2>Title: ${data.title}</h2>
    <div>
      <p>ID: ${data.id}</p>
      <p>Author: ${data.userId}</p>
    </div>
  </div>
  <h3>Resulting Data:</h3><pre>${JSON.stringify(data, null, 2)}</pre>
  `;
}

async function postData(body) {
  try {
    const res = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    const data = await res.json();
    renderResult(data);
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

async function getPosts() {
  try {
    const res = await fetch("https://dummyjson.com/posts?sortBy=title&order=asc");
    const data = await res.json();
    console.log(data);
    renderPosts(data);
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

function renderPosts(data) {
  postcontainer.innerHTML = `
    <ul>
      ${data.posts.map((item) => `<li>${item.title}</li>`).join("")}
    </ul>
  `;
}

// getPosts();
/* fetch('https://dummyjson.com/posts?sortBy=title&order=asc')
.then(res => res.json())
.then(console.log); */
