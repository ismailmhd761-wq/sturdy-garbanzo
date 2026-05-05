// --- SMOOTH SCROLLING WITH LENIS ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

// Get scroll value
lenis.on('scroll', (e) => {
    // console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// --- GSAP ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initial Load Animations (Hero)
const heroTl = gsap.timeline();

heroTl.from('.reveal-text', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.2
})
.from('.hero-img', {
    x: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
}, "-=0.8")
.from('.glow-orb', {
    scale: 0.5,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
}, "-=1");

// Floating animation for the hero image
gsap.to(".floating-img", {
    y: -20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up');

revealElements.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Parallax Image Effect
gsap.to(".parallax-img", {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
        trigger: ".journey",
        start: "top bottom", 
        end: "bottom top",
        scrub: true
    } 
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -80 // adjust for navbar height
            });
        }
    });
});
