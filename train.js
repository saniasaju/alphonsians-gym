/* ============================================================
   ALPHONSIANS' GYM
   TRAIN PAGE — TRAIN.JS
============================================================ */


document.addEventListener("DOMContentLoaded", () => {


    /* ========================================================
       01. ELEMENTS
    ======================================================== */

    const viewport =
        document.getElementById("trainPlanViewport");

    const track =
        document.getElementById("trainPlanTrack");

    const previousButton =
        document.getElementById("trainPrevious");

    const nextButton =
        document.getElementById("trainNext");

    const planCount =
        document.getElementById("trainPlanCount");

    const currentPlanLabel =
        document.getElementById("trainCurrentPlan");

    const cards =
        Array.from(
            document.querySelectorAll(".train-plan-card")
        );


    if (
        !viewport ||
        !track ||
        !previousButton ||
        !nextButton ||
        !cards.length
    ) {
        return;
    }



    /* ========================================================
       02. STATE
    ======================================================== */

    let currentIndex = 0;

    let pointerDown = false;

    let startX = 0;

    let currentX = 0;

    let dragDistance = 0;

    let viewportWidth = viewport.clientWidth;

    const lastIndex = cards.length - 1;



    /* ========================================================
       03. HELPERS
    ======================================================== */

    function formatNumber(number) {

        return String(number).padStart(2, "0");

    }


    function getCardName(index) {

        return (
            cards[index].dataset.planName ||
            `Plan ${index + 1}`
        );

    }


    function getBaseTranslate() {

        return -(currentIndex * viewportWidth);

    }



    /* ========================================================
       04. UPDATE TRACK
    ======================================================== */

    function updateTrack({
        animate = true,
        resetScroll = false
    } = {}) {


        viewportWidth = viewport.clientWidth;


        if (animate) {

            track.classList.remove("is-dragging");

        } else {

            track.classList.add("is-dragging");

        }


        const position =
            -(currentIndex * viewportWidth);


        track.style.transform =
            `translate3d(${position}px, 0, 0)`;


        cards.forEach((card, index) => {

            const active =
                index === currentIndex;


            card.classList.toggle(
                "active",
                active
            );


            card.setAttribute(
                "aria-hidden",
                String(!active)
            );


            const scrollArea =
                card.querySelector(
                    "[data-article-scroll]"
                );


            if (scrollArea) {

                scrollArea.tabIndex =
                    active ? 0 : -1;


                if (
                    resetScroll &&
                    !active
                ) {

                    scrollArea.scrollTop = 0;

                }

            }

        });


        const currentCard =
            cards[currentIndex];


        if (planCount) {

            planCount.textContent =
                `${formatNumber(currentIndex + 1)} — ${formatNumber(cards.length)}`;

        }


        if (currentPlanLabel) {

            currentPlanLabel.textContent =
                getCardName(currentIndex);

        }


        previousButton.disabled =
            currentIndex === 0;


        nextButton.disabled =
            currentIndex === lastIndex;


        /*
           Store current slide on the viewport as well.
           Useful later when responsive behaviour is added.
        */

        viewport.dataset.currentPlan =
            String(currentIndex);

    }



    /* ========================================================
       05. GO TO PLAN
    ======================================================== */

    function goToPlan(index) {


        const nextIndex =
            Math.max(
                0,
                Math.min(
                    lastIndex,
                    index
                )
            );


        if (nextIndex === currentIndex) {

            updateTrack();

            return;

        }


        currentIndex =
            nextIndex;


        updateTrack({
            animate: true,
            resetScroll: true
        });

    }



    /* ========================================================
       06. BUTTON NAVIGATION
    ======================================================== */

    previousButton.addEventListener(
        "click",
        () => {

            goToPlan(
                currentIndex - 1
            );

        }
    );


    nextButton.addEventListener(
        "click",
        () => {

            goToPlan(
                currentIndex + 1
            );

        }
    );



    /* ========================================================
   07. POINTER / TOUCH DRAG
======================================================== */

let startY = 0;

let dragAxis = null;

let capturedPointerId = null;


viewport.addEventListener(
    "pointerdown",
    (event) => {


        /* Primary mouse button only */

        if (
            event.pointerType === "mouse" &&
            event.button !== 0
        ) {
            return;
        }


        /*
           Links and buttons should remain normal
           interactive controls.
        */

        if (
            event.target.closest(
                "button, a, input, select, textarea, label"
            )
        ) {
            return;
        }


        pointerDown = true;

        startX = event.clientX;
        startY = event.clientY;

        currentX = event.clientX;

        dragDistance = 0;

        dragAxis = null;

        capturedPointerId = null;

    }
);



viewport.addEventListener(
    "pointermove",
    (event) => {


        if (!pointerDown) {
            return;
        }


        const deltaX =
            event.clientX - startX;


        const deltaY =
            event.clientY - startY;


        /* --------------------------------------------
           DETERMINE INTENT

           Wait for a small amount of movement before
           deciding whether this is horizontal or
           vertical.
        --------------------------------------------- */

        if (!dragAxis) {

            const minimumMovement = 8;


            if (
                Math.abs(deltaX) < minimumMovement &&
                Math.abs(deltaY) < minimumMovement
            ) {
                return;
            }


            /*
               Horizontal movement must be clearly
               stronger than vertical movement.
            */

            if (
                Math.abs(deltaX) >
                Math.abs(deltaY) * 1.15
            ) {

                dragAxis = "horizontal";


                viewport.classList.add(
                    "is-dragging"
                );


                track.classList.add(
                    "is-dragging"
                );


                try {

                    viewport.setPointerCapture(
                        event.pointerId
                    );

                    capturedPointerId =
                        event.pointerId;

                } catch (error) {

                    capturedPointerId =
                        null;

                }


            } else {

                /*
                   This is a vertical reading gesture.

                   Leave it entirely to the browser so
                   the article scroll remains natural.
                */

                dragAxis = "vertical";

                return;
            }

        }


        /*
           Ignore all movement after determining
           that the gesture is vertical.
        */

        if (
            dragAxis !== "horizontal"
        ) {
            return;
        }


        currentX =
            event.clientX;


        dragDistance =
            currentX - startX;


        /* --------------------------------------------
           EDGE RESISTANCE
        --------------------------------------------- */

        if (
            currentIndex === 0 &&
            dragDistance > 0
        ) {

            dragDistance *= 0.28;

        }


        if (
            currentIndex === lastIndex &&
            dragDistance < 0
        ) {

            dragDistance *= 0.28;

        }


        const position =
            getBaseTranslate() +
            dragDistance;


        track.style.transform =
            `translate3d(${position}px, 0, 0)`;

    }
);



/* ========================================================
   08. END DRAG
======================================================== */

function finishDrag(event) {


    if (!pointerDown) {
        return;
    }


    pointerDown = false;


    /*
       Vertical gesture:
       no carousel movement occurred.
    */

    if (
        dragAxis !== "horizontal"
    ) {

        dragAxis = null;

        dragDistance = 0;

        return;
    }


    viewport.classList.remove(
        "is-dragging"
    );


    track.classList.remove(
        "is-dragging"
    );


    if (
        capturedPointerId !== null &&
        viewport.hasPointerCapture?.(
            capturedPointerId
        )
    ) {

        viewport.releasePointerCapture(
            capturedPointerId
        );

    }


    capturedPointerId = null;


    /* --------------------------------------------
       CHANGE THRESHOLD
    --------------------------------------------- */

    const compactViewport =
        window.matchMedia(
            "(max-width: 720px)"
        ).matches;


    const threshold =
        Math.max(
            compactViewport ? 44 : 60,
            viewportWidth *
                (compactViewport ? 0.10 : 0.12)
        );


    if (
        dragDistance <= -threshold &&
        currentIndex < lastIndex
    ) {

        currentIndex += 1;

    }


    else if (
        dragDistance >= threshold &&
        currentIndex > 0
    ) {

        currentIndex -= 1;

    }


    dragDistance = 0;

    dragAxis = null;


    updateTrack({
        animate: true,
        resetScroll: true
    });

}



viewport.addEventListener(
    "pointerup",
    finishDrag
);


viewport.addEventListener(
    "pointercancel",
    finishDrag
);


viewport.addEventListener(
    "lostpointercapture",
    () => {


        if (!pointerDown) {
            return;
        }


        pointerDown = false;

        dragDistance = 0;

        dragAxis = null;

        capturedPointerId = null;


        viewport.classList.remove(
            "is-dragging"
        );


        track.classList.remove(
            "is-dragging"
        );


        updateTrack();

    }
);



    /* ========================================================
       09. KEYBOARD NAVIGATION
    ======================================================== */

    document.addEventListener(
        "keydown",
        (event) => {


            /*
               Don't hijack keys while the user
               is interacting with form controls.
            */

            const tagName =
                document.activeElement?.tagName;


            if (
                tagName === "INPUT" ||
                tagName === "TEXTAREA" ||
                tagName === "SELECT"
            ) {
                return;
            }


            if (event.key === "ArrowLeft") {

                if (currentIndex === 0) {
                    return;
                }


                event.preventDefault();

                goToPlan(
                    currentIndex - 1
                );

            }


            if (event.key === "ArrowRight") {

                if (currentIndex === lastIndex) {
                    return;
                }


                event.preventDefault();

                goToPlan(
                    currentIndex + 1
                );

            }

        }
    );



    /* ========================================================
   10. RESIZE
======================================================== */

let resizeFrame = null;


window.addEventListener(
    "resize",
    () => {


        if (resizeFrame) {

            cancelAnimationFrame(
                resizeFrame
            );

        }


        resizeFrame =
            requestAnimationFrame(
                () => {


                    pointerDown = false;
                    dragDistance = 0;
                    dragAxis = null;
                    capturedPointerId = null;

                    viewport.classList.remove(
                        "is-dragging"
                    );

                    viewportWidth =
                        viewport.clientWidth;


                    updateTrack({
                        animate: false
                    });


                    requestAnimationFrame(
                        () => {

                            track.classList.remove(
                                "is-dragging"
                            );

                        }
                    );


                    resizeFrame = null;

                }
            );

    },
    {
        passive: true
    }
);



    /* ========================================================
       11. IMAGE DRAG PREVENTION
    ======================================================== */

    cards.forEach((card) => {

        const image =
            card.querySelector(
                ".train-plan-background img"
            );


        if (image) {

            image.setAttribute(
                "draggable",
                "false"
            );

        }

    });



    /* ========================================================
       12. INITIALIZE
    ======================================================== */

    updateTrack({
        animate: false
    });


    requestAnimationFrame(
        () => {

            track.classList.remove(
                "is-dragging"
            );

        }
    );


});