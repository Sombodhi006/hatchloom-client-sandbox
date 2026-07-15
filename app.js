/* ==========================================================================
   L'ÉTOILE - INTERACTIVE ANIMATION ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. Initial Config & Variables
    // ----------------------------------------------------
    // List of numerically sorted image paths from the assets folder
    const imageSources = [];
    for (let i = 0; i <= 65; i++) {
        const frameNum = String(i).padStart(3, "0");
        imageSources.push(`./assets/prototypevideo_${frameNum}.jpg`);
    }
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
            drawFrame(sequenceObject.frame, sequenceObject.zoom);
        }
    }

    function drawFrame(frameFloat, zoomFactor = 1.0) {
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width;
        const h = canvas.height;
        
        // Clear canvas before drawing
        ctx.clearRect(0, 0, w, h);
        
        // Enable high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Calculate current frames and interpolation factor (alpha)
        const index1 = Math.floor(frameFloat);
        const index2 = Math.min(index1 + 1, totalImages - 1);
        const alpha = frameFloat - index1;

        const img1 = images[index1];
        const img2 = images[index2];

        if (img1 && img2 && index1 !== index2 && alpha > 0.01) {
            // Draw first frame (fading out)
            ctx.globalAlpha = 1 - alpha;
            drawSingleImage(img1, w, h, zoomFactor);

            // Draw second frame (fading in)
            ctx.globalAlpha = alpha;
            drawSingleImage(img2, w, h, zoomFactor);
            
            // Reset transparency
            ctx.globalAlpha = 1.0;
        } else if (img1) {
            ctx.globalAlpha = 1.0;
            drawSingleImage(img1, w, h, zoomFactor);
        }
    }

    function drawSingleImage(img, w, h, zoomFactor) {
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
        const scrollTween = gsap.to(sequenceObject, {
            frame: totalImages - 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6, // Slight lag to blend frames together smoothly
            },
            onUpdate: () => {
                // Calculate non-linear progressive zoom based on tween progress (fully scrubbed):
                // Start at 1.03, swell up to 1.18 in the center, settle back to 1.05
                const progress = scrollTween.progress();
                sequenceObject.zoom = 1.03 + Math.sin(progress * Math.PI) * 0.15;
                
                // Draw with sub-pixel / float frame interpolation
                drawFrame(sequenceObject.frame, sequenceObject.zoom);
            }
        });

        // --- Page Intro Animations ---
        const introTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
        
        introTl.to(".main-header", { opacity: 1, y: 0, mixBlendMode: "difference" }, 0.5)
               .fromTo(".viewfinder-frame", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.8 }, 0.4)
               .fromTo(".backdrop-left", { opacity: 0, x: -60 }, { opacity: 0.15, x: 0, duration: 1.5 }, 0.8)
               .fromTo(".backdrop-right", { opacity: 0, x: 60 }, { opacity: 0.15, x: 0, duration: 1.5 }, 0.8)
               .to(".viewfinder-left-panel", { opacity: 1, y: 0 }, 1.0);

        // --- Section Content Animations (Responsive Line Splits on Scroll) ---

        // Custom responsive line-splitting helper
        function splitTextIntoLines(element) {
            if (!element.dataset.originalHtml) {
                element.dataset.originalHtml = element.innerHTML;
            } else {
                element.innerHTML = element.dataset.originalHtml;
            }

            const text = element.innerText;
            const words = text.split(" ");
            element.innerHTML = words.map(word => `<span class="split-word" style="display: inline-block;">${word}</span>`).join(" ");

            const spans = element.querySelectorAll(".split-word");
            const lines = [];
            let currentLine = [];
            let lastOffsetTop = -1;

            spans.forEach(span => {
                const offsetTop = span.offsetTop;
                if (lastOffsetTop !== -1 && Math.abs(offsetTop - lastOffsetTop) > 5) {
                    lines.push(currentLine);
                    currentLine = [];
                }
                currentLine.push(span);
                lastOffsetTop = offsetTop;
            });
            if (currentLine.length > 0) {
                lines.push(currentLine);
            }

            element.innerHTML = "";
            lines.forEach(lineSpans => {
                const lineText = lineSpans.map(s => s.innerText).join(" ");
                const parentSpan = document.createElement("span");
                parentSpan.className = "split-line-parent";
                
                const childSpan = document.createElement("span");
                childSpan.className = "split-line-child";
                childSpan.innerText = lineText;
                
                parentSpan.appendChild(childSpan);
                element.appendChild(parentSpan);
            });
        }

        let splitInstances = [];
        
        function initSplitTextAnimations() {
            // Kill existing triggers
            splitInstances.forEach(inst => {
                if (inst.scrollTrigger) inst.scrollTrigger.kill();
                inst.kill();
            });
            splitInstances = [];

            // Animate headers, bodies, and quotes
            const elements = document.querySelectorAll(".animate-split");
            elements.forEach(el => {
                splitTextIntoLines(el);
                
                const children = el.querySelectorAll(".split-line-child");
                
                const anim = gsap.fromTo(children, 
                    { yPercent: 105 },
                    {
                        yPercent: 0,
                        duration: 1.4,
                        ease: "power4.out",
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                
                splitInstances.push(anim);
            });
        }

        // Initialize SplitText animations
        initSplitTextAnimations();
        
        // Handle window resizing (responsive re-splitting)
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initSplitTextAnimations();
                ScrollTrigger.refresh();
            }, 200);
        });

        // Staggered reveal for section numbers
        document.querySelectorAll(".section-num").forEach(num => {
            gsap.fromTo(num, 
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: num,
                        start: "top 88%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

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

        // Viewfinder controls: plus scroll down, minus scroll up
        const btnPlus = document.getElementById("hero-btn-plus");
        const btnMinus = document.getElementById("hero-btn-minus");
        if (btnPlus && btnMinus) {
            btnPlus.addEventListener("click", () => {
                const target = document.getElementById("silhouette");
                if (target) target.scrollIntoView({ behavior: "smooth" });
            });
            btnMinus.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    }

    // Start loading
    preloadImages();
});
