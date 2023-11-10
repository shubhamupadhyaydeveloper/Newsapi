const apikey = "4afa3d603c734013bb7086dcf25a1673";
const url = "https://newsapi.org/v2/everything?q=";
const form = document.querySelector('form')
// const loader = document.querySelector('.loader')

window.onload = () => {
  fetchurl("india");
};

async function fetchurl(query) {
  const key = `${url}${query}&apiKey=${apikey}`;
  const process = await fetch(key);
  const data = await process.json();
  console.log(data);
  handledata(data.articles);
}

function handledata(articles) {
  const newsContainer = document.getElementById("news-container");
  const newBox = document.getElementById("news-card-template");

  console.log(newBox)
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newBox.content.cloneNode(true);
    showChanges(cardClone, article);
    newsContainer.appendChild(cardClone);
  });
}

function showChanges(insertdata, articles) {
  const newsimg = insertdata.querySelector(".news-img");
  const newstitle = insertdata.querySelector("#title");
  const newsdescription = insertdata.querySelector("#description");
  const newsdate = insertdata.querySelector("#dataandtime");
  const newsorigin = insertdata.querySelector(".href");

  newsimg.src = articles.urlToImage;
  newstitle.innerHTML = articles.title;
  newsdescription.innerHTML = articles.description;

  const date = new Date(articles.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsdate.innerHTML = date;
  newsorigin.href = articles.url;
}

function handleactive(id) {
  fetchurl(id);
}

form.addEventListener('submit' ,(event) =>  {
    let input = document.querySelector('input').value
    fetchurl(input)
})


