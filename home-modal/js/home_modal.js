export const hoverModal = async (data, id) => {
    const content = data.filter(item => item.id === id);
    if(!content) return;

    const hoverModalWrapper = document.getElementById("homeHoverModalWrapper");
    hoverModalWrapper.innerHTML = '';

    try{
        const response = await fetch("../hover_modal.html");
        const htmltext = await response.text();
        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(htmlText, "text/html");
        const modalElement = parsedHTML.getElementById(modalContentId)?.cloneNode(true);
    }
    catch{

    }
}

export const clickModal = (data, id) => {

}

//community 브랜치의 js 폴더 안에 있는 community_modal.js 파일 참고할 것.
//그 안의 handleModal 함수를 응용하면 될 것 같음.
//8월 27일 js 파일들 통폐합해서 정리함.
//모달 관련 함수는 지금 이 파일에서 끝내거나, 호버 모달, 클릭 모달 따로 파일을 파도 상관 없음.
//export로 함수를 밖으로 빼는 로직을 썼는데 이 원리가 궁금하면 gpt한테 물어볼 것.