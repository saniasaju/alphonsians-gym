/* ============================================================
   ALPHONSIANS' GYM
   HOME PAGE — SCRIPT.JS
============================================================ */


/* ============================================================
   01. CHECK WHETHER HOMEPAGE INTRO SHOULD BE SKIPPED
============================================================ */

const skipHomeIntro =
    sessionStorage.getItem("skipHomeIntro") === "true";


if (skipHomeIntro) {

    document.documentElement.classList.add(
        "skip-home-intro"
    );


    sessionStorage.removeItem(
        "skipHomeIntro"
    );

}


/* ============================================================
   02. ELEMENTS + MEDIA QUERIES
============================================================ */

const hero =
    document.querySelector(".hero");


const tabletHeroQuery =
    window.matchMedia(
        "(max-width: 1100px)"
    );


const mobileHeroQuery =
    window.matchMedia(
        "(max-width: 720px)"
    );


const reducedMotionQuery =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


/* ============================================================
   03. HERO ENTRANCE
============================================================ */

if (hero) {

    if (
        skipHomeIntro ||
        reducedMotionQuery.matches
    ) {

        hero.classList.add(
            "hero-loaded"
        );

    } else {

        window.addEventListener(
            "load",
            () => {

                requestAnimationFrame(
                    () => {

                        window.setTimeout(
                            () => {

                                hero.classList.add(
                                    "hero-loaded"
                                );

                            },
                            120
                        );

                    }
                );

            },
            {
                once: true
            }
        );

    }

}


/* ============================================================
   04. RESPONSIVE HERO PARALLAX
============================================================ */

let heroTicking = false;


function getHeroMotionDistance() {

    if (
        reducedMotionQuery.matches ||
        mobileHeroQuery.matches
    ) {

        return {
            image: 0,
            content: 0
        };

    }


    if (tabletHeroQuery.matches) {

        return {
            image: 30,
            content: -12
        };

    }


    return {
        image: 55,
        content: -22
    };

}


function resetHeroMotion() {

    if (!hero) {
        return;
    }


    hero.style.setProperty(
        "--hero-image-y",
        "0px"
    );


    hero.style.setProperty(
        "--hero-content-y",
        "0px"
    );

}


function updateHeroMotion() {

    if (!hero) {
        heroTicking = false;
        return;
    }


    const motion =
        getHeroMotionDistance();


    if (
        motion.image === 0 &&
        motion.content === 0
    ) {

        resetHeroMotion();

        heroTicking = false;

        return;
    }


    const heroHeight =
        hero.offsetHeight;


    if (!heroHeight) {
        heroTicking = false;
        return;
    }


    const scrollY =
        window.scrollY;


    if (
        scrollY <=
        heroHeight * 1.15
    ) {

        const progress =
            Math.min(
                Math.max(
                    scrollY / heroHeight,
                    0
                ),
                1
            );


        hero.style.setProperty(
            "--hero-image-y",
            `${progress * motion.image}px`
        );


        hero.style.setProperty(
            "--hero-content-y",
            `${progress * motion.content}px`
        );

    }


    heroTicking = false;

}


function requestHeroMotionUpdate() {

    if (
        !hero ||
        heroTicking
    ) {
        return;
    }


    window.requestAnimationFrame(
        updateHeroMotion
    );


    heroTicking = true;

}


if (hero) {

    window.addEventListener(
        "scroll",
        requestHeroMotionUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        requestHeroMotionUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "orientationchange",
        requestHeroMotionUpdate
    );


    tabletHeroQuery.addEventListener?.(
        "change",
        requestHeroMotionUpdate
    );


    mobileHeroQuery.addEventListener?.(
        "change",
        requestHeroMotionUpdate
    );


    reducedMotionQuery.addEventListener?.(
        "change",
        requestHeroMotionUpdate
    );


    updateHeroMotion();

}


/* ============================================================
   05. HOMEPAGE DATE SELECTOR
============================================================ */

const dateOptions =
    Array.from(
        document.querySelectorAll(
            ".date-option"
        )
    );


function selectHomepageDate(selectedButton) {

    dateOptions.forEach(
        button => {

            const isSelected =
                button === selectedButton;


            button.classList.toggle(
                "active",
                isSelected
            );


            button.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

        }
    );

}


dateOptions.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                selectHomepageDate(
                    button
                );

            }
        );

    }
);
