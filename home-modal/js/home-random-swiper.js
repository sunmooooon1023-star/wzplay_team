const fetchData = async () => {
  const res = await fetch('../data.json');
  const data = await res.json();
  return Object.values(data);
};

const swiperOptions = {
  slidesPerView: 5,
  slidesPerGroup: 4,
  speed: 700,
  spaceBetween: 15,
  loop: true,
};

function initSwiper(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const nextEl = el.querySelector('.swiper-button-next');
    const prevEl = el.querySelector('.swiper-button-prev');

    const options = {
      ...swiperOptions,
      navigation: nextEl && prevEl ? {
        nextEl,
        prevEl,
      } : undefined,
    };

    new Swiper(el, options);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchData();

  const categories = [
    { category: 'movie', name: '영화' },
    { category: 'drama', name: '드라마' },
    { category: 'documentary', name: '다큐' },
    { category: 'musical', name: '뮤지컬' },
    { category: 'varietyShow', name: '예능' },
    { category: 'animation', name: '애니' }
  ];

  const uls = document.querySelectorAll('ul.sub');

  uls.forEach((ul, index) => {
    ul.innerHTML = categories.map(item => `
      <li>
        <span class="category-btn" data-category="${item.category}" data-target="slide0${index + 2}" style="cursor:pointer;">
          ${item.name}
        </span>
      </li>
    `).join('');
  });

  const swiper01 = document.getElementById('slide01');
  const swiper02 = document.getElementById('slide02');
  const swiper03 = document.getElementById('slide03');

  function renderSlides(container, items) {
    container.innerHTML = items.map(item => `
      <div class="swiper-slide">
        <a href="content-detail.html?query=${item.id}">
          <img src="${item.image_default}" alt="${item.title}">
        </a>
      </div>
    `).join('');
  }

  renderSlides(swiper01, data.sort(() => Math.random() - 0.5).slice(0, 16));
  renderSlides(swiper02, data.sort(() => Math.random() - 0.5).slice(0, 16));
  renderSlides(swiper03, data.sort(() => Math.random() - 0.5).slice(0, 16));

  ['.favorite_slider', '.popular_slider', '.recommend_slider'].forEach(selector => {
    initSwiper(selector);
  });

  uls.forEach((ul) => {
    ul.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-btn');
      if (!btn) return;

      const selectedCategory = btn.dataset.category;
      const targetContainerId = btn.dataset.target;
      const container = document.getElementById(targetContainerId);

      if (!container) {
        console.error('타겟 슬라이더 컨테이너를 찾을 수 없습니다.');
        return;
      }

      const filtered = data.filter(item => item.category === selectedCategory).slice(0, 16);
      renderSlides(container, filtered);

      initSwiper(`.swiper_layout.common`);
    });
  });
});
