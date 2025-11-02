// js/contentful.js
const SPACE_ID = agh593hla85i;
const TOKEN = 5e05188971e0d652f89ffb94cbcad52084c0584155dc4210b0aadebb9dca5caf;
const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

async function loadContentfulHome() {
  const query = `
    query {
      pageCollection(where:{slug:"home"}, limit:1){
        items {
          title
          body
        }
      }
    }`;

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  const page = json?.data?.pageCollection?.items?.[0];

  // Fill in HTML elements
  if (page) {
    document.getElementById('page-title').textContent = page.title;
    document.getElementById('page-body').innerHTML = page.body;
  } else {
    console.warn('No page content found in Contentful');
  }
}

document.addEventListener('DOMContentLoaded', loadContentfulHome);
