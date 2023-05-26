const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const get = async (url) => {
  const response = await fetch(url);
  const body = await response.text();

  console.log(body);
};

get("http://localhost:3000/fast");
get("http://localhost:3000/slow");
get("http://localhost:3000/fast");
get("http://localhost:3000/slow");
get("http://localhost:3000/fast");
get("http://localhost:3000/slow");
