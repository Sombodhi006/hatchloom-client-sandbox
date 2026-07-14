/* ==========================================================================
   L'ÉTOILE - INTERACTIVE ANIMATION ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. Initial Config & Variables
    // ----------------------------------------------------
    // List of numerically sorted image paths from assets01 and assets02
    const imageSources = [
        "./assets01/Generate_smooth_animation_model_._202607142207_000.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_001.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_002.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_003.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_004.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_005.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_006.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_007.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_008.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_009.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_010.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_011.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_012.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_013.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_014.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_015.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_016.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_017.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_018.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_019.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_020.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_021.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_022.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_023.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_024.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_025.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_026.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_027.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_028.jpg",
        "./assets01/Generate_smooth_animation_model_._202607142207_029.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_030.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_034.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_035.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_037.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_038.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_045.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_047.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_051.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_052.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_053.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_054.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_055.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_057.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_058.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_061.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_062.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_063.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_064.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_066.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_067.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_069.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_070.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_071.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_072.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_073.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_074.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_075.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_076.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_077.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_078.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_079.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_080.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_081.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_082.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_083.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_084.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_085.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_086.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_087.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_088.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_089.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_090.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_091.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_092.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_093.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_094.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_095.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_096.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_097.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_098.jpg",
        "./assets02/Generate_smooth_animation_model_._202607142207_099.jpg"
    ];
    const totalImages = imageSources.length;
    const images = [];
    let loadedCount = 0;
    
    const canvas = document.getElementById("animation-canvas");
    const ctx = canvas.getContext("2d");
    
    const loader = document.getElementById("loader");
    const progressBar = document.getElementById("progress-bar");
    const loaderPercent = document.getElementById("loader-percent");
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ----------------------------------------------------
    // 2. Custom Cursor System
    // ----------------------------------------------------
    const cursor = document.getElementById("custom-cursor");
    const cursorDot = document.getElementById("cursor-dot");
    
    // Set initial position out of screen
    gsap.set([cursor, cursorDot], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    
    // QuickTo handlers for ultra-smooth rendering
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });
    const dotX = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3.out" });

    window.addEventListener("mousemove", (e) => {
        cursorX(e.clientX);
        cursorY(e.clientY);
        dotX(e.clientX);
        dotY(e.clientY);
    });

    // Hover states for links & buttons
    const interactiveElements = document.querySelectorAll("a, button, input, .btn-submit");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
    });

    // ----------------------------------------------------
    // 3. Canvas Resizing & Drawing Logic
    // ----------------------------------------------------
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        // Scale back via CSS
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        
        // Redraw current active frame
        if (images.length === totalImages && loadedCount === totalImages) {
            const currentFrame = Math.round(sequenceObject.frame);
            drawFrame(currentFrame, sequenceObject.zoom);
        }
    }

    function drawFrame(index, zoomFactor = 1.0) {
        const img = images[index];
        if (!img) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width;
        const h = canvas.height;
        
        const iw = img.naturalWidth || img.width;
        const ih = img.naturalHeight || img.height;
        
        // Cover calculation (object-fit: cover)
        const scaleX = w / iw;
        const scaleY = h / ih;
        const baseScale = Math.max(scaleX, scaleY);
        
        // Final scale includes the dynamic zoom progress
        const finalScale = baseScale * zoomFactor;
        
        const drawW = iw * finalScale;
        const drawH = ih * finalScale;
        
        // Center the image
        const x = (w - drawW) / 2;
        const y = (h - drawH) / 2;
        
        ctx.clearRect(0, 0, w, h);
        
        // Draw with smoothing for high-quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, iw, ih, x, y, drawW, drawH);
    }

    // Set up canvas dimensions immediately
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // ----------------------------------------------------
    // 4. Image Preloader
    // ----------------------------------------------------
    function preloadImages() {
        document.body.classList.add("is-loading");
        
        imageSources.forEach((src) => {
            const img = new Image();
            img.src = src;
            
            img.onload = handleImageLoad;
            img.onerror = handleImageLoad; // Continue if an image fails to load
            
            images.push(img);
        });
    }

    function handleImageLoad() {
        loadedCount++;
        
        // Calculate progress percentage
        const progressPercent = Math.min(Math.floor((loadedCount / totalImages) * 100), 100);
        
        // Update loader UI
        progressBar.style.width = `${progressPercent}%`;
        loaderPercent.textContent = `${String(progressPercent).padStart(2, "0")}%`;
        
        if (loadedCount === totalImages) {
            startWebsite();
        }
    }

    // ----------------------------------------------------
    // 5. Initialize Page & Scroll Animations
    // ----------------------------------------------------
    const sequenceObject = { frame: 0, zoom: 1.03 };

    function startWebsite() {
        // Fade out preloader
        loader.classList.add("fade-out");
        document.body.classList.remove("is-loading");
        
        // Draw initial frame
        drawFrame(0, sequenceObject.zoom);
        
        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.3,
            lerp: 0.08,
            smoothWheel: true,
            wheelMultiplier: 1.1
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);
        
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // --- Sequence Scroll Trigger ---
        // Ties scroll progress to the frame index and zoom factor
        gsap.to(sequenceObject, {
            frame: totalImages - 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6, // Slight lag to blend frames together smoothly
                onUpdate: (self) => {
                    // Calculate non-linear progressive zoom:
                    // Start at 1.03, swell up to 1.18 in the center, settle back to 1.05
                    const progress = self.progress;
                    sequenceObject.zoom = 1.03 + Math.sin(progress * Math.PI) * 0.15;
                    
                    const currentFrame = Math.round(sequenceObject.frame);
                    drawFrame(currentFrame, sequenceObject.zoom);
                }
            }
        });

        // --- Page Intro Animations ---
        const introTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
        
        introTl.to(".main-header", { opacity: 1, y: 0, mixBlendMode: "difference" }, 0.5)
               .to(".hero-left-col", { opacity: 1, y: 0 }, 0.8)
               .to(".hero-right-col", { opacity: 1, y: 0 }, 1.0);

        // --- Section Content Animations ---
        
        // Section 1: The Silhouette
        gsap.timeline({
            scrollTrigger: {
                trigger: "#silhouette",
                start: "top 75%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        })
        .to("#silhouette .block-left", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
        .to("#silhouette .block-right", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.9");

        // Section 2: Light and Shadow Text Stripes
        gsap.to("#stripe-1", {
            xPercent: -25,
            scrollTrigger: {
                trigger: "#spotlight",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.0
            }
        });

        gsap.to("#stripe-2", {
            xPercent: 25,
            scrollTrigger: {
                trigger: "#spotlight",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.0
            }
        });

        gsap.to("#spotlight .block-center", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#spotlight",
                start: "top 65%",
                toggleActions: "play none none reverse"
            }
        });

        // Section 3: Details & Specs
        gsap.timeline({
            scrollTrigger: {
                trigger: "#details",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        })
        .to("#details .block-left", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
        .to("#details .details-table-col", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.9");

        // Section 4: Collection CTA
        gsap.timeline({
            scrollTrigger: {
                trigger: "#collection",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        })
        .from("#collection .cta-title", { opacity: 0, y: 50, duration: 1.2, ease: "power3.out" })
        .from("#collection .cta-description", { opacity: 0, y: 30, duration: 1.2, ease: "power3.out" }, "-=0.9")
        .from("#collection .form-wrapper", { opacity: 0, y: 30, duration: 1.2, ease: "power3.out" }, "-=0.9");
    }

    // Start loading
    preloadImages();
});
