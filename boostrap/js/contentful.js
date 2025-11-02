// js/contentful.js
const SPACE_ID = agh593hla85i;
const TOKEN = 5e05188971e0d652f89ffb94cbcad52084c0584155dc4210b0aadebb9dca5caf;
const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

async function loadContentfulHome() {
  const query = `
    query {
      pageCollection(where:{slug:"home"}, limit:1) {
        items {
          title
          body
          sliderImagesCollection {
            items {
              url
              title
              description
            }
          }
        }
      }
    }`;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const page = json?.data?.pageCollection?.items?.[0];
  if (!page) return;

  // Fill in content
  document.getElementById('page-title').textContent = page.title;
  document.getElementById('page-body').innerHTML = page.body;

  // Build slider
  const sliderContainer = document.getElementById('slider');
  if (page.sliderImagesCollection.items.length) {
    page.sliderImagesCollection.items.forEach((img) => {
      const imgEl = document.createElement('img');
      imgEl.src = img.url + '?w=1600&q=75&fm=webp'; // optimized delivery
      imgEl.alt = img.title || 'Slide';
      imgEl.classList.add('slide');
      sliderContainer.appendChild(imgEl);
    });
  }
}

document.addEventListener('DOMContentLoaded', loadContentfulHome);
