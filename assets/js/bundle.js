

/*
Hide header on scroll down & show on scroll up
*/

const header = document.getElementById('header');
let lastPos = document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
  const currPos = document.documentElement.scrollTop;

  if (currPos > lastPos) {
    if (currPos > header.offsetHeight) {
      header.classList.add('-translate-y-full');
      header.classList.remove('shadow-md');
    }
  } else {
    header.classList.remove('-translate-y-full');
    header.classList.add('shadow-md');
  }

  lastPos = currPos;
}, false);

/*
Toggle the menu when pressed on hamburger button
Only on mobile devices
*/

const menu = document.getElementById('menu');
//const searchBox = document.getElementById('search');
const menuToggle = document.getElementById('menu-toggle');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
//  searchBox.classList.toggle('hidden');
}, false);

/*
Lazy load images
*/

const lazyImages = document.getElementsByClassName('lazy');

document.addEventListener('DOMContentLoaded', () => {
  [...lazyImages].forEach((elem) => {
    const originalImage = elem.dataset.src;

    elem.setAttribute('src', originalImage);
    elem.removeAttribute('data-src');
  });
}, false);

  // Define the images array in JavaScript using a template loop
  const images = [
    
  ];
  
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  let currentIndex = 0;

  function updateMainImage(index) {
    mainImage.src = thumbnails[index].src;
    currentIndex = index;

    // Highlight the selected thumbnail
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('border-blue-500', i === index);
    });
  }
  if(thumbnails.length > 1) {
    // Auto-slide logic
    setInterval(() => {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      updateMainImage(currentIndex);
    }, 3000);

  }

  // Add click event to thumbnails
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      updateMainImage(index);
    });
  });
/*
Search for posts with keyword given in the parameter "q"
Only run on search page ("/search/")
*/

class SearchPosts {
  async init() {
    const params = new URL(location.href).searchParams;

    this.start = Number(params.get('start')) || 1;
    this.size = Number(params.get('size')) || 12;

    this.posts = await fetch('../index.json').then((res) => {
      return res.json();
    });

    this.render(params.get('q'));
  }

  render(query) {
    const wrapperEl = document.getElementById('wrapper');
    const searchBoxEl = document.getElementById('searchbox');
    const infoEl = document.getElementById('info');

    query = typeof query === 'string' ? query.toLowerCase() : '';

    history.replaceState(null, null, `?q=${query}&start=${this.start}&size=${this.size}`);

    searchBoxEl.value = query;
    wrapperEl.innerHTML = '';

    if (query === '') {
      infoEl.textContent = 'Enter keywords in the search box above';

      return;
    }

    const matchedPosts = this.posts.filter((post) => {
      const postTitle = post.title.toLowerCase();

      return postTitle.indexOf(query) !== -1;
    });

    if (matchedPosts.length === 0) {
      infoEl.textContent = `No results were found for "${query}"`;

      return;
    }

    const size = this.size;
    const offset = this.start - 1;
    const slicedPosts = matchedPosts.slice(offset, offset + size);

    const lastPostIndex = offset + slicedPosts.length;
    const showingRange = this.start < lastPostIndex || this.start !== 1 ? `${this.start} to ${lastPostIndex}` : this.start;
    const extraS = matchedPosts.length > 1 ? 's' : '';

    infoEl.textContent = `Showing ${showingRange} of ${matchedPosts.length} result${extraS} found for "${query}"`;

    slicedPosts.forEach((post) => {
      const { url, title, date } = post;

      wrapperEl.innerHTML += `
        <div class="w-full sm:w-1/2 md:w-1/3 self-stretch p-2 mb-2">
          <a href="${url}">
            <div class="rounded shadow-md h-full px-6 py-5">
              <div class="font-semibold text-lg mb-2">${title}</div>
              <p class="text-gray-700 mb-1" title="Published date">${date}</p>
            </div>
          </a>
        </div>
      `;
    });
  }
}

if (location.pathname === '/search/') {
  const searchBoxEl = document.getElementById('searchbox');
  const searchPosts = new SearchPosts();

  searchPosts.init();

  searchBoxEl.addEventListener('keyup', debounce(function() {
    searchPosts.render(this.value);
  }, 400));
}

// https://github.com/sindresorhus/p-debounce
function debounce(fn, wait) {
  let timer;
  let resolveList = [];

  return function(...arguments_) {
    return new Promise((resolve) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;

        const result = fn.apply(this, arguments_);

        for (resolve of resolveList) {
          resolve(result);
        }

        resolveList = [];
      }, wait);

      resolveList.push(resolve);
    });
  };
}

