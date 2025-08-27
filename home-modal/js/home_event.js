import { fetchData } from "./home_init.js";
import { hoverModal } from "./home_modal.js";

export const bindCardHoverEvent = () => {
    const card = document.querySelectorAll(".swiper-slide");

    card.forEach(each => {
        each.addEventListener("mouseenter", () => {
            const cardId = each.getAttribute("id");
            hoverModal(fetchData, cardId);
        })
    })
}

export const bindCardClickEvent = () => {
    
}

export const bindHomeAnimation = () => {
    //h2 애니메이션
    const sectionTitles = document.querySelectorAll('h2');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 1.0 
    });

    sectionTitles.forEach(target => observer.observe(target));

    //benefit 섹션
    const benefitTargets = [document.querySelector('.overlay-benefit'), document.querySelector('.benefit-img')];

    benefitTargets.forEach(target => {
        if (!target) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 1.0 });
        observer.observe(target);
    });

    //community 섹션
    const communityTargets = document.querySelectorAll('.community-item');

    const communityObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                communityObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1.0 });
    communityTargets.forEach(target => communityObserver.observe(target));

    //독점작 섹션
    const logo = document.querySelector('.logo-wrapper');
    if (logo) {
        const logoObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    logo.classList.add('show');
                    logoObserver.unobserve(logo);
                }
            });
        }, { threshold: 0.5 });
        logoObserver.observe(logo);
    }
}