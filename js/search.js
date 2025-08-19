var swiper = new Swiper(".mySwiper", {
    slidesPerView: 6,
    grabCursor: true,
    centeredSlides: true, 
    loop: true,  // 무한 루프 활성화
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
