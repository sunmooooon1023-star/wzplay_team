/* 랜덤 스와이퍼 */

window.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
    .then(res => res.json())
    .then(items => {
      const Random = items.sort(() => Math.random() - 0.5)
        .slice(0, 16);


      const slideShow = Random.map(item =>
        `<div class="swiper-slide">
        <a href=""><img src="${item.image_poster}"/></a>
        </div>`).join('');

      document.getElementById('swiper-wrapper').innerHTML = slideShow;


      new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        loopAdditionalSlides: 5,
        preloadImages: true
      });
    });


})


/* 2번 search click */

document.getElementById('search-button').addEventListener('click', function (e) {
  e.preventDefault();

  const WORD = document.getElementById('search-input').value.trim();

  if (WORD.length === 0) {
    alert("검색어를 입력해주세요");

    const Result = document.getElementById('content-result');
    Result.innerHTML = '';
    Result.classList.remove('active');

    document.getElementsByClassName('content-text')[0].style.display = "none";

    return;
  }

  document.getElementsByClassName('content-text')[0].style.display = "block";


  fetch('./data.json')
    .then(res => res.json())
    .then(items => {
      const FilterItems = items.filter(item => item.title.toLowerCase().includes(WORD.toLowerCase()));
      renderResults(FilterItems);


      document.getElementById('content-result').scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => console.error('데이터 로딩 실패:', error));
});


/* render */

function renderResults(filteredItems) {
  const Result = document.getElementById('content-result');
  Result.innerHTML = '';

  if (filteredItems.length > 0) {
    filteredItems.forEach(item => {
      const NewDiv = document.createElement('div');
      NewDiv.classList.add('Result');

      NewDiv.innerHTML = `
        <a href=""><img src="${item.image_poster}" alt="${item.title}"></a>
        <a href=""><h4>${item.title}</h4></a>
      `;

      Result.appendChild(NewDiv);

    });
    Result.classList.add('active');

  } else {
    Result.innerHTML = '<p>※ 검색 결과가 없습니다 ※</p>';
    Result.classList.remove('active');

  }
}



/* home-header-search */
/* document.addEventListener('DOMContentLoaded', () => {
  const URL = new URLSearchParams(window.location.search);
  const Query = URL.get('query')?.toLowerCase() || '';


  const Result = document.getElementById('content-result')
  if (Query === '') {
    Result.style.display = 'none';
    return;
  }
  

  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      const filteredItems = data.filter(item => item.title.toLowerCase().includes(Query));
      renderResults(filteredItems);
      document.getElementsByClassName('content-text')[0].style.display = "block";
      document.getElementById('content-result').scrollIntoView({ behavior: 'smooth' });

    })
    .catch(err => {
      console.error('데이터를 불러오는 중 오류 발생:', err);
    });

}); */


