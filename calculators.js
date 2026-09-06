document.addEventListener("DOMContentLoaded", () => {


    /* ========================================================
       01. CALCULATOR SLIDER — ELEMENTS
    ======================================================== */

    const calculatorsViewport =
        document.getElementById("calculatorsViewport");

    const calculatorsTrack =
        document.getElementById("calculatorsTrack");


    const calorieSlide =
        document.getElementById("calorieCalculator");

    const bmiSlide =
        document.getElementById("bmiCalculator");


    const nextCalculatorButton =
        document.getElementById("nextCalculator");

    const previousCalculatorButton =
        document.getElementById("previousCalculator");


    const calculatorSlides = [
        calorieSlide,
        bmiSlide
    ];


    /* ========================================================
       02. CALORIE CALCULATOR — ELEMENTS
    ======================================================== */

    const calorieForm =
        document.getElementById("calorieForm");


    const calorieAge =
        document.getElementById("calorieAge");

    const calorieWeight =
        document.getElementById("calorieWeight");

    const calorieHeight =
        document.getElementById("calorieHeight");


    const calorieResult =
        document.getElementById("calorieResult");


    const calculateCaloriesButton =
        document.getElementById("calculateCalories");


    /* ========================================================
       03. BMI CALCULATOR — ELEMENTS
    ======================================================== */

    const bmiForm =
        document.getElementById("bmiForm");


    const bmiWeight =
        document.getElementById("bmiWeight");

    const bmiHeight =
        document.getElementById("bmiHeight");


    const bmiResult =
        document.getElementById("bmiResult");

    const bmiCategory =
        document.getElementById("bmiCategory");


    const bmiScalePosition =
        document.querySelector(".bmi-scale-position");


    const calculateBmiButton =
        document.getElementById("calculateBmi");


    /* ========================================================
       04. CALCULATOR DATA
    ======================================================== */

    const activityMultipliers = {

        low: 1.2,

        moderate: 1.375,

        high: 1.55,

        "very-high": 1.725

    };


    const goalAdjustments = {

        lose: -300,

        maintain: 0,

        gain: 300

    };


    /* ========================================================
       05. SLIDER STATE
    ======================================================== */

    let currentCalculator = 0;


    /*
       Drag state
    */

    let isDragging = false;

    let pointerId = null;

    let dragStartX = 0;

    let dragCurrentX = 0;

    let dragStartY = 0;

    let dragCurrentY = 0;


    /*
       Prevent a swipe gesture from accidentally becoming
       navigation when the movement is mostly vertical.
    */

    let dragDirectionLocked = false;

    let isHorizontalDrag = false;


    /* ========================================================
       06. HELPERS
    ======================================================== */

    function getSelectedRadio(name) {

        const selected =
            document.querySelector(
                `input[name="${name}"]:checked`
            );


        return selected
            ? selected.value
            : null;
    }


    function getInputNumber(input) {

        const value =
            Number.parseFloat(
                input.value
            );


        return Number.isFinite(value)
            ? value
            : null;
    }


    function validateInput(input) {

        if (!input) {
            return false;
        }


        /*
           Native HTML validation already knows about:
           - required
           - min
           - max
           - number type
        */

        if (!input.checkValidity()) {

            input.reportValidity();

            input.focus();

            return false;
        }


        const value =
            getInputNumber(input);


        if (value === null) {

            input.focus();

            return false;
        }


        return true;
    }


    function isInteractiveElement(element) {

        return Boolean(
            element.closest(
                `
                    input,
                    button,
                    label,
                    select,
                    textarea,
                    a
                `
            )
        );
    }


    /* ========================================================
       07. CALORIE CALCULATOR
    ======================================================== */

    function calculateCalories() {


        /* ----------------------------------------------------
           VALIDATE
        ---------------------------------------------------- */

        if (!validateInput(calorieAge)) {
            return;
        }


        if (!validateInput(calorieWeight)) {
            return;
        }


        if (!validateInput(calorieHeight)) {
            return;
        }


        /* ----------------------------------------------------
           GET VALUES
        ---------------------------------------------------- */

        const age =
            getInputNumber(calorieAge);

        const weight =
            getInputNumber(calorieWeight);

        const height =
            getInputNumber(calorieHeight);


        const gender =
            getSelectedRadio("gender");

        const activity =
            getSelectedRadio("activity");

        const goal =
            getSelectedRadio("goal");


        if (
            !gender ||
            !activity ||
            !goal
        ) {

            return;
        }


        /* ----------------------------------------------------
           BMR
           Mifflin–St Jeor Equation

           Male:
           10W + 6.25H - 5A + 5

           Female:
           10W + 6.25H - 5A - 161
        ---------------------------------------------------- */

        let bmr =
            (10 * weight)
            +
            (6.25 * height)
            -
            (5 * age);


        if (gender === "male") {

            bmr += 5;

        } else {

            bmr -= 161;

        }


        /* ----------------------------------------------------
           ACTIVITY
        ---------------------------------------------------- */

        const activityMultiplier =
            activityMultipliers[activity];


        const maintenanceCalories =
            bmr *
            activityMultiplier;


        /* ----------------------------------------------------
           GOAL
        ---------------------------------------------------- */

        const adjustment =
            goalAdjustments[goal];


        const finalCalories =
            maintenanceCalories
            +
            adjustment;


        if (
            !Number.isFinite(finalCalories)
            ||
            finalCalories <= 0
        ) {

            return;
        }


        /* ----------------------------------------------------
           DISPLAY
        ---------------------------------------------------- */

        calorieResult.textContent =
            Math.round(finalCalories)
                .toLocaleString("en-IN");

    }


    /* ========================================================
       08. BMI CALCULATOR
    ======================================================== */

    function calculateBMI() {


        /* ----------------------------------------------------
           VALIDATE
        ---------------------------------------------------- */

        if (!validateInput(bmiWeight)) {
            return;
        }


        if (!validateInput(bmiHeight)) {
            return;
        }


        /* ----------------------------------------------------
           VALUES
        ---------------------------------------------------- */

        const weight =
            getInputNumber(bmiWeight);


        const heightCm =
            getInputNumber(bmiHeight);


        const heightMetres =
            heightCm / 100;


        /* ----------------------------------------------------
           CALCULATE
        ---------------------------------------------------- */

        const bmi =
            weight
            /
            (
                heightMetres
                *
                heightMetres
            );


        if (
            !Number.isFinite(bmi)
            ||
            bmi <= 0
        ) {

            return;
        }


        const roundedBmi =
            Number(
                bmi.toFixed(1)
            );


        /* ----------------------------------------------------
           CATEGORY
        ---------------------------------------------------- */

        let category;


        if (roundedBmi < 18.5) {

            category =
                "Underweight";

        }

        else if (roundedBmi < 25) {

            category =
                "Normal";

        }

        else if (roundedBmi < 30) {

            category =
                "Overweight";

        }

        else {

            category =
                "High";

        }


        /* ----------------------------------------------------
           DISPLAY
        ---------------------------------------------------- */

        bmiResult.textContent =
            roundedBmi.toFixed(1);


        bmiCategory.textContent =
            category;


        /* ----------------------------------------------------
           SCALE MARKER
        ---------------------------------------------------- */

        updateBmiMarker(
            roundedBmi
        );

    }


    /* ========================================================
       09. BMI SCALE
    ======================================================== */

    function updateBmiMarker(bmi) {

        if (!bmiScalePosition) {
            return;
        }


        let position;


        /*
           The scale is visually divided into four equal
           categories rather than representing one strictly
           linear numeric range.
        */


        /* UNDERWEIGHT */

        if (bmi < 18.5) {

            position =
                mapValue(
                    bmi,
                    12,
                    18.5,
                    2,
                    24
                );

        }


        /* NORMAL */

        else if (bmi < 25) {

            position =
                mapValue(
                    bmi,
                    18.5,
                    25,
                    26,
                    49
                );

        }


        /* OVERWEIGHT */

        else if (bmi < 30) {

            position =
                mapValue(
                    bmi,
                    25,
                    30,
                    51,
                    74
                );

        }


        /* HIGH */

        else {

            position =
                mapValue(
                    bmi,
                    30,
                    40,
                    76,
                    98
                );

        }


        position =
            Math.max(
                2,
                Math.min(
                    98,
                    position
                )
            );


        bmiScalePosition.style.left =
            `${position}%`;

    }


    /* ========================================================
       10. MAP VALUE BETWEEN RANGES
    ======================================================== */

    function mapValue(
        value,
        inputMin,
        inputMax,
        outputMin,
        outputMax
    ) {

        const clamped =
            Math.max(
                inputMin,
                Math.min(
                    inputMax,
                    value
                )
            );


        const progress =
            (
                clamped
                -
                inputMin
            )
            /
            (
                inputMax
                -
                inputMin
            );


        return (
            outputMin
            +
            (
                progress
                *
                (
                    outputMax
                    -
                    outputMin
                )
            )
        );

    }


    /* ========================================================
       11. SHOW CALCULATOR
    ======================================================== */

    function showCalculator(
        index,
        options = {}
    ) {

        const {
            focusNavigation = false
        } = options;


        /*
           Clamp index to available slides.
        */

        const nextIndex =
            Math.max(
                0,
                Math.min(
                    calculatorSlides.length - 1,
                    index
                )
            );


        currentCalculator =
            nextIndex;


        /* ----------------------------------------------------
           TRACK
        ---------------------------------------------------- */

        calculatorsTrack.classList.toggle(
            "show-calorie",
            currentCalculator === 0
        );


        calculatorsTrack.classList.toggle(
            "show-bmi",
            currentCalculator === 1
        );


        /*
           Inline transform ensures navigation also works
           even if those utility classes are later removed.
        */

        calculatorsTrack.style.transform =
            `translate3d(
                -${currentCalculator * 100}%,
                0,
                0
            )`;


        /* ----------------------------------------------------
           ACCESSIBILITY
        ---------------------------------------------------- */

        calculatorSlides.forEach(
            (slide, slideIndex) => {

                if (!slide) {
                    return;
                }


                const isActive =
                    slideIndex ===
                    currentCalculator;


                slide.setAttribute(
                    "aria-hidden",
                    String(!isActive)
                );


                /*
                   inert prevents keyboard focus from entering
                   the calculator that is currently off-screen.
                */

                if ("inert" in slide) {

                    slide.inert =
                        !isActive;

                }

            }
        );


        /* ----------------------------------------------------
           OPTIONAL FOCUS
        ---------------------------------------------------- */

        if (!focusNavigation) {
            return;
        }


        window.setTimeout(
            () => {

                if (
                    currentCalculator === 0
                    &&
                    nextCalculatorButton
                ) {

                    nextCalculatorButton.focus();

                }


                if (
                    currentCalculator === 1
                    &&
                    previousCalculatorButton
                ) {

                    previousCalculatorButton.focus();

                }

            },
            400
        );

    }


    /* ========================================================
       12. SWITCH BUTTONS
    ======================================================== */

    if (nextCalculatorButton) {

        nextCalculatorButton.addEventListener(
            "click",
            () => {

                showCalculator(
                    1,
                    {
                        focusNavigation: true
                    }
                );

            }
        );

    }


    if (previousCalculatorButton) {

        previousCalculatorButton.addEventListener(
            "click",
            () => {

                showCalculator(
                    0,
                    {
                        focusNavigation: true
                    }
                );

            }
        );

    }


    /* ========================================================
       13. POINTER / SWIPE NAVIGATION
    ======================================================== */

    function handlePointerDown(event) {

        /*
           Don't initiate calculator dragging while the user
           is operating a form control.
        */

        if (
            isInteractiveElement(
                event.target
            )
        ) {

            return;
        }


        if (
            event.pointerType === "mouse"
            &&
            event.button !== 0
        ) {

            return;
        }


        isDragging = true;

        pointerId =
            event.pointerId;


        dragStartX =
            event.clientX;

        dragCurrentX =
            event.clientX;


        dragStartY =
            event.clientY;

        dragCurrentY =
            event.clientY;


        dragDirectionLocked =
            false;

        isHorizontalDrag =
            false;


        try {

            calculatorsViewport.setPointerCapture(
                pointerId
            );

        } catch (error) {

            pointerId =
                event.pointerId;

        }

    }


    function handlePointerMove(event) {

        if (
            !isDragging
            ||
            event.pointerId !== pointerId
        ) {

            return;
        }


        dragCurrentX =
            event.clientX;

        dragCurrentY =
            event.clientY;


        const deltaX =
            dragCurrentX
            -
            dragStartX;


        const deltaY =
            dragCurrentY
            -
            dragStartY;


        /* ----------------------------------------------------
           DETERMINE GESTURE DIRECTION
        ---------------------------------------------------- */

        if (!dragDirectionLocked) {

            const movementX =
                Math.abs(deltaX);


            const movementY =
                Math.abs(deltaY);


            /*
               Wait for a small amount of motion before
               deciding whether the gesture is horizontal.
            */

            if (
                movementX < 8
                &&
                movementY < 8
            ) {

                return;
            }


            dragDirectionLocked =
                true;


            isHorizontalDrag =
                movementX >
                movementY * 1.15;

        }


        /*
           Vertical gesture: let normal page behaviour occur.
        */

        if (!isHorizontalDrag) {

            return;
        }


        calculatorsTrack.classList.add(
            "is-dragging"
        );


        const viewportWidth =
            calculatorsViewport.clientWidth;


        const baseOffset =
            -(currentCalculator * viewportWidth);


        /*
           Add resistance when dragging past the first
           or final calculator.
        */

        let resistedDelta =
            deltaX;


        if (
            currentCalculator === 0
            &&
            deltaX > 0
        ) {

            resistedDelta =
                deltaX * 0.22;

        }


        if (
            currentCalculator ===
                calculatorSlides.length - 1
            &&
            deltaX < 0
        ) {

            resistedDelta =
                deltaX * 0.22;

        }


        const translateX =
            baseOffset
            +
            resistedDelta;


        calculatorsTrack.style.transform =
            `translate3d(
                ${translateX}px,
                0,
                0
            )`;

    }


    function finishPointerGesture(event) {

        if (
            !isDragging
            ||
            event.pointerId !== pointerId
        ) {

            return;
        }


        if (
            pointerId !== null
            &&
            calculatorsViewport.hasPointerCapture?.(
                pointerId
            )
        ) {

            try {

                calculatorsViewport.releasePointerCapture(
                    pointerId
                );

            } catch (error) {
                // Pointer capture may already be released.
            }

        }


        const deltaX =
            dragCurrentX
            -
            dragStartX;


        const viewportWidth =
            calculatorsViewport.clientWidth;


        /*
           Swipe threshold:
           whichever is smaller:
           - 100px
           - 12% of the calculator viewport
        */

        const compactViewport =
            window.matchMedia(
                "(max-width: 720px)"
            ).matches;


        const threshold =
            Math.min(
                compactViewport
                    ? 72
                    : 100,

                viewportWidth
                *
                (
                    compactViewport
                        ? 0.10
                        : 0.12
                )
            );


        calculatorsTrack.classList.remove(
            "is-dragging"
        );


        /* ----------------------------------------------------
           CHANGE SLIDE
        ---------------------------------------------------- */

        if (
            isHorizontalDrag
            &&
            deltaX < -threshold
            &&
            currentCalculator <
                calculatorSlides.length - 1
        ) {

            showCalculator(
                currentCalculator + 1
            );

        }

        else if (
            isHorizontalDrag
            &&
            deltaX > threshold
            &&
            currentCalculator > 0
        ) {

            showCalculator(
                currentCalculator - 1
            );

        }

        else {

            /*
               Snap back to current calculator.
            */

            showCalculator(
                currentCalculator
            );

        }


        /* ----------------------------------------------------
           RESET
        ---------------------------------------------------- */

        isDragging = false;

        pointerId = null;

        dragDirectionLocked = false;

        isHorizontalDrag = false;

    }


    if (calculatorsViewport) {

        calculatorsViewport.addEventListener(
            "pointerdown",
            handlePointerDown
        );


        calculatorsViewport.addEventListener(
            "pointermove",
            handlePointerMove
        );


        calculatorsViewport.addEventListener(
            "pointerup",
            finishPointerGesture
        );


        calculatorsViewport.addEventListener(
            "pointercancel",
            finishPointerGesture
        );

    }


    /* ========================================================
       14. KEYBOARD CALCULATOR NAVIGATION
    ======================================================== */

    document.addEventListener(
        "keydown",
        (event) => {


            /*
               Don't hijack arrow keys while the user is
               editing a field or interacting with a control.
            */

            const activeElement =
                document.activeElement;


            const isEditing =
                activeElement
                &&
                activeElement.matches(
                    `
                        input,
                        textarea,
                        select
                    `
                );


            if (isEditing) {
                return;
            }


            /* RIGHT */

            if (
                event.key === "ArrowRight"
                &&
                currentCalculator === 0
            ) {

                event.preventDefault();

                showCalculator(1);

            }


            /* LEFT */

            if (
                event.key === "ArrowLeft"
                &&
                currentCalculator === 1
            ) {

                event.preventDefault();

                showCalculator(0);

            }

        }
    );


    /* ========================================================
       15. CALCULATE BUTTON EVENTS
    ======================================================== */

    if (calculateCaloriesButton) {

        calculateCaloriesButton.addEventListener(
            "click",
            calculateCalories
        );

    }


    if (calculateBmiButton) {

        calculateBmiButton.addEventListener(
            "click",
            calculateBMI
        );

    }


    /* ========================================================
       16. FORM SUBMIT
    ======================================================== */

    if (calorieForm) {

        calorieForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                calculateCalories();

            }
        );

    }


    if (bmiForm) {

        bmiForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                calculateBMI();

            }
        );

    }


    /* ========================================================
       17. ENTER KEY
    ======================================================== */

    if (calorieForm) {

        calorieForm.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                    &&
                    event.target.matches(
                        "input[type='number']"
                    )
                ) {

                    event.preventDefault();

                    calculateCalories();

                }

            }
        );

    }


    if (bmiForm) {

        bmiForm.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                    &&
                    event.target.matches(
                        "input[type='number']"
                    )
                ) {

                    event.preventDefault();

                    calculateBMI();

                }

            }
        );

    }


    /* ========================================================
       18. WINDOW RESIZE

       If the viewport changes size during a drag or after
       orientation / browser resizing, snap the track back
       to the correct calculator.
    ======================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (isDragging) {

                isDragging = false;

                pointerId = null;

                calculatorsTrack.classList.remove(
                    "is-dragging"
                );

            }


            showCalculator(
                currentCalculator
            );

        }
    );


    /* ========================================================
       19. INITIAL STATE
    ======================================================== */

    /*
       Make sure the correct calculator is visible
       before any interaction.
    */

    calculatorsTrack.classList.add(
        "show-calorie"
    );


    showCalculator(0);


    /*
       Calculate the initial values so the result always
       corresponds with whatever default values exist
       in the HTML.
    */

    calculateCalories();

    calculateBMI();

});