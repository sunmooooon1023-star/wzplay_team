const fetchData = async () => {
  const res = await fetch('./data.json');
  const data = await res.json();
  const dataArray = Object.values(data);  // 객체를 배열로 변환 (필요에 따라)
  return dataArray;  // 데이터를 함수가 반환
}

/* render */

document.addEventListener('DOMContentLoaded', async () => {
    const URL = new URLSearchParams(window.location.search);
    const query = URL.get('query')?.toLowerCase() || '';
    console.log(query);

    if (!query) return;

    const data = await fetchData();
            const DataAll = data.find(item => item.id.toLowerCase() === query);

            if (DataAll) {
                const Main = document.getElementById('detail-main');
                const Info1 = document.getElementById('work-info');
                const Episode = document.getElementById('episode-list');

                const MainDiv = document.createElement('div');
                const InfoDive01 = document.createElement('div');
                const InfoDiv02 = document.createElement('div');
                const EpisodeDiv = document.createElement('div');

                MainDiv.classList.add('main-text');
                InfoDive01.classList.add('info01');
                InfoDiv02.classList.add('info02');
                EpisodeDiv.classList.add('episodeAll');

                /* bg css */
                Main.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${DataAll.image_default})`;
                Main.style.backgroundRepeat = 'no-repeat';
                Main.style.backgroundPosition = 'center';
                Main.style.backgroundSize = 'cover';

                MainDiv.innerHTML = `
                    <h2>${DataAll.title}</h2>
                    <img src="source/image/content-detail/like02.png" alt="">
                    <img src="source/image/content-detail/top01.png" alt="">`
                InfoDive01.innerHTML = `
                <div class="info-title">
                <h3>줄거리</h3>
                <a href="#"><img src="source/image/content-detail/share.png" alt="share"></a>
                </div>
                <p>${DataAll.summary}</p>`;

                InfoDiv02.innerHTML = `
                        <h3><span></span>작품정보</h3>
                        <ul class="info02-text">
                            <li>출연: ${DataAll.cast}</li>
                            <li>장르: ${DataAll.category}</li>
                            <li>제작사: ${DataAll.production}</li>
                            <li>${DataAll.tag} </li>
                        </ul>
                        <div class="info02-ico">
                        </div>`;

                        EpisodeDiv.innerHTML = `
                        <h3>전체회차</h3>
                        <span>전체회차 ${DataAll.episode}개</span>
                        <div class="All-list">
                            <div class="list">
                                <img src="${DataAll.image_default}" alt="">
                                <ul class="list-title">
                                    <li>회차: episode title</li>
                                    <li>
                                        <ul class="list-icons">
                                            <li></li>
                                            <li></li>
                                            <li><a href=""><img src="source/image/content-detail/share.png" alt=""></a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>`;

                Main.appendChild(MainDiv);
                Info1.appendChild(InfoDive01);
                Info1.appendChild(InfoDiv02);
                Episode.appendChild(EpisodeDiv);

            }
        })



