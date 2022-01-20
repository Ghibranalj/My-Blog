// quasi main
document.addEventListener("DOMContentLoaded", async (event) => {
  let params = new URLSearchParams(window.location.search)
  let post = params.get("p")

  const yaml = await getYamlEntry(post)

  if (!yaml) {
    window.location.href = "./404.html"
  }

  await renderPost(yaml, post)

  //highlight.js
  document
    .querySelector("#out")
    .querySelectorAll("pre code")
    .forEach((el) => {
      hljs.highlightElement(el)
    })



})


function updateSocialLinks({title, markdown, desc}) {
  const doc = document

  const fb = doc.querySelector("#social-facebook")
  const linked = doc.querySelector("#social-linkedin")
  const reddit = doc.querySelector("#social-reddit")
  const copy = doc.querySelector("#social-copy")

  const link = encodeURI(`${location.origin}/blog.html?p=${markdown}`)
    
  console.log(link)
  fb.setAttribute("href", "/")
}

async function getYamlEntry(post) {
  let postYAML = await fetch("./blog-list.yaml").then((res) => res.text())

  let posts = jsyaml.load(postYAML)

  for (const p of posts) {
    if (p.markdown === post) {
      return p
    }
  }
  return undefined
}

async function renderPost(yaml, post) {
  let canvas = document.querySelector("#out")

  let md = await fetch("./posts/" + post + ".md").then((res) => {
    if (res.status === 404) {
      return undefined
    }
    return res.text()
  })
  if (!md) {
    window.location.href = "./404.html"
  }
  let title = yaml.title
  document.title = title

  let converter = new showdown.Converter()
  let html = converter.makeHtml(md)
  canvas.innerHTML = html
}
