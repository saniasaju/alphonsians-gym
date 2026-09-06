/* ============================================================
   ALPHONSIANS' GYM
   BOOKING PAGE — BOOKING.JS

   Booking flow:
   01. Choose date
   02. Choose time
   03. Choose equipment
   04. Check availability
   05. Suggest alternatives when needed
   06. Confirm booking
============================================================ */


document.addEventListener("DOMContentLoaded", () => {


    /* ========================================================
       01. EQUIPMENT
    ======================================================== */

    const EQUIPMENT = Object.freeze({

        dumbbells:
            "Dumbbells",

        barbell:
            "Barbell & Weight Plates",

        bench:
            "Adjustable Weight Bench",

        bands:
            "Resistance Bands",

        kettlebells:
            "Kettlebells",

        pullup:
            "Pull-Up Bar",

        mat:
            "Yoga Mat",

        rope:
            "Jump Rope"

    });



    /* ========================================================
       02. BOOKING DATA
    ======================================================== */

    const BOOKING_DATA = {

        "2026-08-31": [

            {
                time: "16:00",

                label:
                    "04:00 — 05:00 PM",

                equipment: [
                    "dumbbells",
                    "bench",
                    "bands",
                    "kettlebells",
                    "pullup",
                    "mat",
                    "rope"
                ]
            },

            {
                time: "17:00",

                label:
                    "05:00 — 06:00 PM",

                equipment: [
                    "barbell",
                    "bands",
                    "kettlebells",
                    "pullup",
                    "mat"
                ]
            },

            {
                time: "18:00",

                label:
                    "06:00 — 07:00 PM",

                equipment: [
                    "dumbbells",
                    "barbell",
                    "mat",
                    "rope"
                ]
            }

        ],


        "2026-09-01": [

            {
                time: "16:00",

                label:
                    "04:00 — 05:00 PM",

                equipment: [
                    "dumbbells",
                    "barbell",
                    "bench",
                    "bands",
                    "mat"
                ]
            },

            {
                time: "17:00",

                label:
                    "05:00 — 06:00 PM",

                equipment: [
                    "dumbbells",
                    "kettlebells",
                    "pullup",
                    "mat",
                    "rope"
                ]
            },

            {
                time: "18:00",

                label:
                    "06:00 — 07:00 PM",

                equipment: [
                    "barbell",
                    "bench",
                    "bands",
                    "kettlebells",
                    "mat"
                ]
            }

        ],


        "2026-09-02": [

            {
                time: "16:00",

                label:
                    "04:00 — 05:00 PM",

                equipment: [
                    "dumbbells",
                    "bench",
                    "bands",
                    "kettlebells",
                    "rope"
                ]
            },

            {
                time: "17:00",

                label:
                    "05:00 — 06:00 PM",

                equipment: [
                    "barbell",
                    "bands",
                    "pullup",
                    "mat"
                ]
            },

            {
                time: "18:00",

                label:
                    "06:00 — 07:00 PM",

                equipment: [
                    "dumbbells",
                    "barbell",
                    "kettlebells",
                    "mat",
                    "rope"
                ]
            }

        ],


        "2026-09-03": [

            {
                time: "16:00",

                label:
                    "04:00 — 05:00 PM",

                equipment: [
                    "dumbbells",
                    "bench",
                    "bands",
                    "mat",
                    "rope"
                ]
            },

            {
                time: "17:00",

                label:
                    "05:00 — 06:00 PM",

                equipment: [
                    "barbell",
                    "bench",
                    "kettlebells",
                    "pullup",
                    "mat"
                ]
            },

            {
                time: "18:00",

                label:
                    "06:00 — 07:00 PM",

                equipment: [
                    "dumbbells",
                    "bands",
                    "kettlebells",
                    "pullup",
                    "rope"
                ]
            }

        ],


        "2026-09-04": [

            {
                time: "16:00",

                label:
                    "04:00 — 05:00 PM",

                equipment: [
                    "dumbbells",
                    "barbell",
                    "bench",
                    "mat"
                ]
            },

            {
                time: "17:00",

                label:
                    "05:00 — 06:00 PM",

                equipment: [
                    "bands",
                    "kettlebells",
                    "pullup",
                    "mat",
                    "rope"
                ]
            },

            {
                time: "18:00",

                label:
                    "06:00 — 07:00 PM",

                equipment: [
                    "dumbbells",
                    "barbell",
                    "bands",
                    "kettlebells",
                    "mat"
                ]
            }

        ]

    };



    /* ========================================================
       03. AVAILABLE DATES
    ======================================================== */

    const AVAILABLE_DATES =
        Object.keys(
            BOOKING_DATA
        )
            .sort();



    /* ========================================================
       04. DOM — GENERAL
    ======================================================== */

    const bookingTrack =
        document.getElementById(
            "bookingTrack"
        );


    const bookingViewport =
    document.getElementById(
        "bookingViewport"
    );


    const bookingStages =
        Array.from(
            document.querySelectorAll(
                ".booking-stage"
            )
        );


    const responsiveBookingQuery =
        window.matchMedia(
            "(max-width: 1100px)"
        );


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    const bookingStatus =
        document.getElementById(
            "bookingStatus"
        );



    /* ========================================================
       05. DOM — DATE
    ======================================================== */

    const dateSelect =
        document.getElementById(
            "dateSelect"
        );


    const dateSelectValue =
        document.getElementById(
            "dateSelectValue"
        );


    const dateDropdownPanel =
        document.getElementById(
            "dateDropdownPanel"
        );


    const calendarMonth =
        document.getElementById(
            "calendarMonth"
        );


    const calendarGrid =
        document.getElementById(
            "calendarGrid"
        );


    const calendarPrevious =
        document.getElementById(
            "calendarPrevious"
        );


    const calendarNext =
        document.getElementById(
            "calendarNext"
        );



    /* ========================================================
       06. DOM — TIME
    ======================================================== */

    const timeSelect =
        document.getElementById(
            "timeSelect"
        );


    const timeSelectValue =
        document.getElementById(
            "timeSelectValue"
        );


    const timeDropdownPanel =
        document.getElementById(
            "timeDropdownPanel"
        );


    const timeOptions =
        Array.from(
            document.querySelectorAll(
                ".time-scroll-option"
            )
        );



    /* ========================================================
       07. DOM — EQUIPMENT
    ======================================================== */

    const equipmentButtons =
        Array.from(
            document.querySelectorAll(
                ".equipment-filter"
            )
        );



    /* ========================================================
       08. DOM — RESULT STATES
    ======================================================== */

    const availabilityEmpty =
        document.getElementById(
            "availabilityEmpty"
        );


    const availabilityAvailable =
        document.getElementById(
            "availabilityAvailable"
        );


    const availabilityConflict =
        document.getElementById(
            "availabilityConflict"
        );



    /* ========================================================
       09. DOM — AVAILABLE RESULT
    ======================================================== */

    const resultDate =
        document.getElementById(
            "resultDate"
        );


    const resultTime =
        document.getElementById(
            "resultTime"
        );


    const resultEquipment =
        document.getElementById(
            "resultEquipment"
        );


    const confirmBooking =
        document.getElementById(
            "confirmBooking"
        );



    /* ========================================================
       10. DOM — CONFLICT
    ======================================================== */

    const conflictMessage =
        document.getElementById(
            "conflictMessage"
        );


    const priorityButtons =
        Array.from(
            document.querySelectorAll(
                ".priority-option"
            )
        );


    const alternativeList =
        document.getElementById(
            "alternativeList"
        );



    /* ========================================================
       11. DOM — CONFIRMATION
    ======================================================== */

    const confirmationTitle =
        document.getElementById(
            "confirmationTitle"
        );


    const confirmationDate =
        document.getElementById(
            "confirmationDate"
        );


    const confirmationTime =
        document.getElementById(
            "confirmationTime"
        );


    const confirmationEquipment =
        document.getElementById(
            "confirmationEquipment"
        );



    /* ========================================================
       12. STATE
    ======================================================== */

    const state = {

        date:
            null,

        time:
            null,

        equipment:
            new Set(),

        priority:
            "date",

        currentSession:
            null,

        stage:
            1

    };



    /* ========================================================
       13. CALENDAR STATE
    ======================================================== */

    /*
       September 2026 is the default visual month.

       If a URL provides another valid date,
       initialiseFromURL() changes this.
    */

    let calendarView =
        new Date(
            2026,
            8,
            1
        );



    /* ========================================================
       14. DATE HELPERS
    ======================================================== */

    function parseDateParts(
        dateString
    ) {

        const [
            year,
            month,
            day
        ] =
            dateString
                .split("-")
                .map(Number);


        return {
            year,
            month,
            day
        };

    }



    function dateToKey(
        year,
        month,
        day
    ) {

        return (
            `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        );

    }



    function formatDate(
        dateString,
        format = "long"
    ) {

        if (!dateString) {

            return "—";

        }


        const {
            year,
            month,
            day
        } =
            parseDateParts(
                dateString
            );


        /*
           Using explicit date parts rather than
           parsing midnight prevents timezone shifts.
        */

        const date =
            new Date(
                year,
                month - 1,
                day,
                12
            );


        if (
            format ===
            "field"
        ) {

            return new Intl.DateTimeFormat(
                "en-GB",
                {
                    weekday:
                        "short",

                    day:
                        "2-digit",

                    month:
                        "short"
                }
            ).format(date);

        }


        if (
            format ===
            "short"
        ) {

            return new Intl.DateTimeFormat(
                "en-GB",
                {
                    weekday:
                        "short",

                    day:
                        "numeric",

                    month:
                        "short"
                }
            ).format(date);

        }


        return new Intl.DateTimeFormat(
            "en-GB",
            {
                weekday:
                    "long",

                day:
                    "numeric",

                month:
                    "long",

                year:
                    "numeric"
            }
        ).format(date);

    }



    /* ========================================================
       15. TIME HELPERS
    ======================================================== */

    function getSession(
        date,
        time
    ) {

        if (
            !date ||
            !time
        ) {

            return null;

        }


        const sessions =
            BOOKING_DATA[date] ||
            [];


        return (
            sessions.find(
                session =>
                    session.time ===
                    time
            ) ||
            null
        );

    }



    function getSessionLabel(
        time
    ) {

        const button =
            timeOptions.find(
                option =>
                    option.dataset.time ===
                    time
            );


        return (
            button?.dataset.label ||
            time
        );

    }



    function getTimeFieldLabel(
        time
    ) {

        const button =
            timeOptions.find(
                option =>
                    option.dataset.time ===
                    time
            );


        if (!button) {

            return "Select time";

        }


        const visibleTime =
            button.querySelector(
                ".time-scroll-time"
            );


        return (
            visibleTime?.textContent.trim() ||
            button.dataset.label ||
            time
        );

    }



    function timeToMinutes(
        time
    ) {

        if (!time) {

            return 0;

        }


        const [
            hours,
            minutes
        ] =
            time
                .split(":")
                .map(Number);


        return (
            hours * 60 +
            minutes
        );

    }



    /* ========================================================
       16. EQUIPMENT HELPERS
    ======================================================== */

    function equipmentLabel(
        key
    ) {

        return (
            EQUIPMENT[key] ||
            key
        );

    }



    function selectedEquipment() {

        return Array.from(
            state.equipment
        );

    }



    function hasAllEquipment(
        session,
        required
    ) {

        if (!session) {

            return false;

        }


        return required.every(
            item =>
                session.equipment.includes(
                    item
                )
        );

    }



    function getMatchedEquipment(
        session,
        required
    ) {

        if (!session) {

            return [];

        }


        return required.filter(
            item =>
                session.equipment.includes(
                    item
                )
        );

    }



    function getMissingEquipment(
        session,
        required
    ) {

        if (!session) {

            return [
                ...required
            ];

        }


        return required.filter(
            item =>
                !session.equipment.includes(
                    item
                )
        );

    }



    /* ========================================================
       17. ACCESSIBILITY ANNOUNCEMENT
    ======================================================== */

    function announce(
        message
    ) {

        if (!bookingStatus) {

            return;

        }


        bookingStatus.textContent =
            "";


        window.setTimeout(
            () => {

                bookingStatus.textContent =
                    message;

            },
            30
        );

    }



    /* ========================================================
       18. DROPDOWN HELPERS
    ======================================================== */

    function openDropdown(
        trigger,
        panel
    ) {

        if (
            !trigger ||
            !panel
        ) {

            return;

        }


        /*
           Close the other dropdown first.
        */

        if (
            trigger !== dateSelect
        ) {

            closeDropdown(
                dateSelect,
                dateDropdownPanel
            );

        }


        if (
            trigger !== timeSelect
        ) {

            closeDropdown(
                timeSelect,
                timeDropdownPanel
            );

        }


        panel.hidden =
            false;


        trigger.setAttribute(
            "aria-expanded",
            "true"
        );

    }



    function closeDropdown(
        trigger,
        panel
    ) {

        if (
            !trigger ||
            !panel
        ) {

            return;

        }


        panel.hidden =
            true;


        trigger.setAttribute(
            "aria-expanded",
            "false"
        );

    }



    function toggleDropdown(
        trigger,
        panel
    ) {

        if (
            !trigger ||
            !panel
        ) {

            return;

        }


        const open =
            trigger.getAttribute(
                "aria-expanded"
            ) === "true";


        if (open) {

            closeDropdown(
                trigger,
                panel
            );

        } else {

            openDropdown(
                trigger,
                panel
            );

        }

    }



    function closeAllDropdowns() {

        closeDropdown(
            dateSelect,
            dateDropdownPanel
        );


        closeDropdown(
            timeSelect,
            timeDropdownPanel
        );

    }



    /* ========================================================
       19. CALENDAR RENDERING
    ======================================================== */

    function renderCalendar() {

        if (
            !calendarGrid ||
            !calendarMonth
        ) {

            return;

        }


        calendarGrid.innerHTML =
            "";


        const year =
            calendarView.getFullYear();


        const monthIndex =
            calendarView.getMonth();


        const monthNumber =
            monthIndex + 1;


        const firstDay =
            new Date(
                year,
                monthIndex,
                1
            ).getDay();


        const daysInMonth =
            new Date(
                year,
                monthIndex + 1,
                0
            ).getDate();


        calendarMonth.textContent =
            new Intl.DateTimeFormat(
                "en-GB",
                {
                    month:
                        "long",

                    year:
                        "numeric"
                }
            ).format(
                new Date(
                    year,
                    monthIndex,
                    1
                )
            );


        const fragment =
            document.createDocumentFragment();



        /* Empty leading cells */

        for (
            let index = 0;
            index < firstDay;
            index++
        ) {

            const empty =
                document.createElement(
                    "span"
                );


            empty.className =
                "calendar-day calendar-day--empty";


            empty.setAttribute(
                "aria-hidden",
                "true"
            );


            fragment.appendChild(
                empty
            );

        }



        /* Month days */

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const dateKey =
                dateToKey(
                    year,
                    monthNumber,
                    day
                );


            const available =
                Object.prototype
                    .hasOwnProperty.call(
                        BOOKING_DATA,
                        dateKey
                    );


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "calendar-day";


            button.textContent =
                String(day);


            button.dataset.date =
                dateKey;


            button.disabled =
                !available;


            const selected =
                state.date ===
                dateKey;


            button.classList.toggle(
                "selected",
                selected
            );


            button.setAttribute(
                "aria-pressed",
                String(selected)
            );


            if (available) {

                button.setAttribute(
                    "aria-label",
                    formatDate(
                        dateKey
                    )
                );


                button.addEventListener(
                    "click",
                    () => {

                        selectDate(
                            dateKey
                        );

                    }
                );

            }


            fragment.appendChild(
                button
            );

        }


        calendarGrid.appendChild(
            fragment
        );


        updateCalendarNavigation();

    }



    /* ========================================================
       20. CALENDAR NAVIGATION LIMITS
    ======================================================== */

    function getAvailableMonthRange() {

        const first =
            parseDateParts(
                AVAILABLE_DATES[0]
            );


        const last =
            parseDateParts(
                AVAILABLE_DATES[
                    AVAILABLE_DATES.length - 1
                ]
            );


        return {

            first:
                new Date(
                    first.year,
                    first.month - 1,
                    1
                ),

            last:
                new Date(
                    last.year,
                    last.month - 1,
                    1
                )

        };

    }



    function monthValue(
        date
    ) {

        return (
            date.getFullYear() *
                12 +
            date.getMonth()
        );

    }



    function updateCalendarNavigation() {

        const range =
            getAvailableMonthRange();


        const current =
            monthValue(
                calendarView
            );


        if (calendarPrevious) {

            calendarPrevious.disabled =
                current <=
                monthValue(
                    range.first
                );

        }


        if (calendarNext) {

            calendarNext.disabled =
                current >=
                monthValue(
                    range.last
                );

        }

    }



    /* ========================================================
       21. SELECT DATE
    ======================================================== */

    function selectDate(
        date,
        options = {}
    ) {

        const {
            close = true,
            updateHistory = true,
            announceChange = true
        } = options;


        if (
            !Object.prototype
                .hasOwnProperty.call(
                    BOOKING_DATA,
                    date
                )
        ) {

            return false;

        }


        state.date =
            date;


        const parts =
            parseDateParts(
                date
            );


        calendarView =
            new Date(
                parts.year,
                parts.month - 1,
                1
            );


        if (dateSelectValue) {

            dateSelectValue.textContent =
                formatDate(
                    date,
                    "field"
                );

        }


        renderCalendar();


        if (close) {

            closeDropdown(
                dateSelect,
                dateDropdownPanel
            );

        }


        if (updateHistory) {

            updateURL();

        }


        evaluateSelection();


        if (announceChange) {

            announce(
                `${formatDate(date)} selected.`
            );

        }


        return true;

    }



    /* ========================================================
       22. SELECT TIME
    ======================================================== */

    function selectTime(
        time,
        options = {}
    ) {

        const {
            close = true,
            updateHistory = true,
            announceChange = true
        } = options;


        const valid =
            timeOptions.some(
                option =>
                    option.dataset.time ===
                    time
            );


        if (!valid) {

            return false;

        }


        state.time =
            time;


        timeOptions.forEach(
            option => {

                const selected =
                    option.dataset.time ===
                    time;


                option.classList.toggle(
                    "selected",
                    selected
                );


                option.setAttribute(
                    "aria-selected",
                    String(selected)
                );

            }
        );


        if (timeSelectValue) {

            timeSelectValue.textContent =
                getTimeFieldLabel(
                    time
                );

        }


        if (close) {

            closeDropdown(
                timeSelect,
                timeDropdownPanel
            );

        }


        if (updateHistory) {

            updateURL();

        }


        evaluateSelection();


        if (announceChange) {

            announce(
                `${getSessionLabel(time)} selected.`
            );

        }


        return true;

    }



    /* ========================================================
       23. EQUIPMENT BUTTON STATE
    ======================================================== */

    function updateEquipmentButtons() {

        equipmentButtons.forEach(
            button => {

                const key =
                    button.dataset
                        .equipment;


                const selected =
                    state.equipment.has(
                        key
                    );


                button.classList.toggle(
                    "selected",
                    selected
                );


                button.setAttribute(
                    "aria-pressed",
                    String(selected)
                );

            }
        );

    }

/* ========================================================
   RESPONSIVE VIEWPORT HEIGHT
======================================================== */

let activeStageObserver =
    null;


function getActiveBookingStage() {

    return (
        bookingStages.find(
            stage =>
                stage.classList.contains(
                    "active"
                )
        ) ||
        bookingStages[0] ||
        null
    );

}


function syncBookingViewportHeight() {

    if (!bookingViewport) {
        return;
    }


    /*
       Desktop remains controlled entirely by CSS.
    */

    if (
        !responsiveBookingQuery.matches
    ) {

        bookingViewport.style.height =
            "";

        return;

    }


    const activeStage =
        getActiveBookingStage();


    if (!activeStage) {
        return;
    }


    window.requestAnimationFrame(
        () => {

            bookingViewport.style.height =
                `${Math.ceil(
                    activeStage.scrollHeight
                )}px`;

        }
    );

}


function observeActiveBookingStage() {

    if (activeStageObserver) {

        activeStageObserver.disconnect();

        activeStageObserver =
            null;

    }


    if (
        "ResizeObserver" in window
    ) {

        const activeStage =
            getActiveBookingStage();


        if (activeStage) {

            activeStageObserver =
                new ResizeObserver(
                    syncBookingViewportHeight
                );


            activeStageObserver.observe(
                activeStage
            );

        }

    }


    syncBookingViewportHeight();

}

    /* ========================================================
       24. RESULT STATE
    ======================================================== */

    function showResultState(
        type
    ) {

        if (availabilityEmpty) {

            availabilityEmpty.hidden =
                type !== "empty";

        }


        if (availabilityAvailable) {

            availabilityAvailable.hidden =
                type !== "available";

        }


        if (availabilityConflict) {

            availabilityConflict.hidden =
                type !== "conflict";

        }

    }



    /* ========================================================
       25. CURRENT SESSION
    ======================================================== */

    function refreshCurrentSession() {

        state.currentSession =
            getSession(
                state.date,
                state.time
            );

    }



    /* ========================================================
       26. AVAILABLE RESULT
    ======================================================== */

    function renderAvailableResult() {

        const equipment =
            selectedEquipment();


        if (resultDate) {

            resultDate.textContent =
                formatDate(
                    state.date,
                    "short"
                );

        }


        if (resultTime) {

            resultTime.textContent =
                state.currentSession
                    ?.label ||
                getSessionLabel(
                    state.time
                );

        }


        if (resultEquipment) {

            resultEquipment.textContent =
                equipment
                    .map(
                        equipmentLabel
                    )
                    .join(" · ");

        }


        showResultState(
            "available"
        );


        announce(
            "Everything you need is expected to be available during this session."
        );

    }



    /* ========================================================
       27. CONFLICT MESSAGE
    ======================================================== */

    function renderConflictMessage() {

        if (!conflictMessage) {

            return;

        }


        const required =
            selectedEquipment();


        /*
           No session exists at all.
        */

        if (!state.currentSession) {

            conflictMessage.textContent =
                "There is no training session available at this date and time.";

            return;

        }


        const missing =
            getMissingEquipment(
                state.currentSession,
                required
            )
                .map(
                    equipmentLabel
                );


        if (
            missing.length === 1
        ) {

            conflictMessage.textContent =
                `${missing[0]} is not expected to be available during this session.`;

            return;

        }


        if (
            missing.length === 2
        ) {

            conflictMessage.textContent =
                `${missing[0]} and ${missing[1]} are not expected to be available during this session.`;

            return;

        }


        const last =
            missing.pop();


        conflictMessage.textContent =
            `${missing.join(", ")}, and ${last} are not expected to be available during this session.`;

    }



    /* ========================================================
       28. CANDIDATE
    ======================================================== */

    function createCandidate(
        date,
        session
    ) {

        const required =
            selectedEquipment();


        const matched =
            getMatchedEquipment(
                session,
                required
            );


        const missing =
            getMissingEquipment(
                session,
                required
            );


        return {

            date,

            time:
                session.time,

            label:
                session.label,

            equipment:
                session.equipment,

            matched,

            missing,

            matchCount:
                matched.length,

            totalRequired:
                required.length,

            fullMatch:
                missing.length === 0

        };

    }



    /* ========================================================
       29. DATE DISTANCE
    ======================================================== */

    function dateDistance(
        firstDate,
        secondDate
    ) {

        const first =
            parseDateParts(
                firstDate
            );


        const second =
            parseDateParts(
                secondDate
            );


        const a =
            Date.UTC(
                first.year,
                first.month - 1,
                first.day
            );


        const b =
            Date.UTC(
                second.year,
                second.month - 1,
                second.day
            );


        return Math.abs(
            a - b
        );

    }



    /* ========================================================
       30. ALTERNATIVES — KEEP DATE
    ======================================================== */

    function alternativesKeepDate() {

        if (!state.date) {

            return [];

        }


        const sessions =
            BOOKING_DATA[
                state.date
            ] ||
            [];


        const candidates =
            sessions
                .filter(
                    session =>
                        session.time !==
                        state.time
                )
                .map(
                    session =>
                        createCandidate(
                            state.date,
                            session
                        )
                );


        const selectedMinutes =
            timeToMinutes(
                state.time
            );


        candidates.sort(
            (a, b) => {

                /*
                   Full match first.
                */

                if (
                    a.fullMatch !==
                    b.fullMatch
                ) {

                    return a.fullMatch
                        ? -1
                        : 1;

                }


                /*
                   More selected equipment available.
                */

                if (
                    a.matchCount !==
                    b.matchCount
                ) {

                    return (
                        b.matchCount -
                        a.matchCount
                    );

                }


                /*
                   Closest time.
                */

                return (

                    Math.abs(
                        timeToMinutes(
                            a.time
                        ) -
                        selectedMinutes
                    )

                    -

                    Math.abs(
                        timeToMinutes(
                            b.time
                        ) -
                        selectedMinutes
                    )

                );

            }
        );


        return candidates;

    }



    /* ========================================================
       31. ALTERNATIVES — KEEP TIME
    ======================================================== */

    function alternativesKeepTime() {

        if (!state.time) {

            return [];

        }


        const candidates =
            [];


        AVAILABLE_DATES.forEach(
            date => {

                if (
                    date ===
                    state.date
                ) {

                    return;

                }


                const session =
                    getSession(
                        date,
                        state.time
                    );


                if (!session) {

                    return;

                }


                candidates.push(
                    createCandidate(
                        date,
                        session
                    )
                );

            }
        );


        candidates.sort(
            (a, b) => {

                if (
                    a.fullMatch !==
                    b.fullMatch
                ) {

                    return a.fullMatch
                        ? -1
                        : 1;

                }


                if (
                    a.matchCount !==
                    b.matchCount
                ) {

                    return (
                        b.matchCount -
                        a.matchCount
                    );

                }


                return (
                    dateDistance(
                        a.date,
                        state.date
                    )
                    -
                    dateDistance(
                        b.date,
                        state.date
                    )
                );

            }
        );


        return candidates;

    }



    /* ========================================================
       32. ALTERNATIVES — KEEP EQUIPMENT
    ======================================================== */

    function alternativesKeepEquipment() {

        const required =
            selectedEquipment();


        const candidates =
            [];


        AVAILABLE_DATES.forEach(
            date => {

                const sessions =
                    BOOKING_DATA[
                        date
                    ] ||
                    [];


                sessions.forEach(
                    session => {

                        /*
                           Do not repeat current
                           date + time.
                        */

                        if (
                            date ===
                                state.date &&
                            session.time ===
                                state.time
                        ) {

                            return;

                        }


                        /*
                           Equipment is the priority,
                           therefore only full matches.
                        */

                        if (
                            !hasAllEquipment(
                                session,
                                required
                            )
                        ) {

                            return;

                        }


                        candidates.push(
                            createCandidate(
                                date,
                                session
                            )
                        );

                    }
                );

            }
        );


        candidates.sort(
            (a, b) => {

                /*
                   Prefer same date.
                */

                const aSameDate =
                    a.date ===
                    state.date
                        ? 0
                        : 1;


                const bSameDate =
                    b.date ===
                    state.date
                        ? 0
                        : 1;


                if (
                    aSameDate !==
                    bSameDate
                ) {

                    return (
                        aSameDate -
                        bSameDate
                    );

                }


                /*
                   Then nearest date.
                */

                const dateDifference =
                    dateDistance(
                        a.date,
                        state.date
                    )
                    -
                    dateDistance(
                        b.date,
                        state.date
                    );


                if (
                    dateDifference !==
                    0
                ) {

                    return dateDifference;

                }


                /*
                   Then nearest time.
                */

                return (

                    Math.abs(
                        timeToMinutes(
                            a.time
                        ) -
                        timeToMinutes(
                            state.time
                        )
                    )

                    -

                    Math.abs(
                        timeToMinutes(
                            b.time
                        ) -
                        timeToMinutes(
                            state.time
                        )
                    )

                );

            }
        );


        return candidates;

    }



    /* ========================================================
       33. GET ALTERNATIVES
    ======================================================== */

    function getAlternatives() {

        switch (
            state.priority
        ) {

            case "time":

                return (
                    alternativesKeepTime()
                );


            case "equipment":

                return (
                    alternativesKeepEquipment()
                );


            case "date":

            default:

                return (
                    alternativesKeepDate()
                );

        }

    }



    /* ========================================================
       34. ALTERNATIVE TITLE
    ======================================================== */

    function getAlternativeTitle(
        candidate
    ) {

        switch (
            state.priority
        ) {

            case "date":

                return (
                    candidate.label
                );


            case "time":

                return (
                    formatDate(
                        candidate.date,
                        "short"
                    )
                );


            case "equipment":

            default:

                return (
                    `${formatDate(
                        candidate.date,
                        "short"
                    )} · ${candidate.label}`
                );

        }

    }



    /* ========================================================
       35. ALTERNATIVE DESCRIPTION
    ======================================================== */

    function getAlternativeDescription(
        candidate
    ) {

        if (
            candidate.fullMatch
        ) {

            switch (
                state.priority
            ) {

                case "date":

                    return (
                        "Same date · All selected equipment available"
                    );


                case "time":

                    return (
                        "Same time · All selected equipment available"
                    );


                case "equipment":

                default:

                    return (
                        "All selected equipment available"
                    );

            }

        }


        const amount =
            `${candidate.matchCount} of ${candidate.totalRequired}`;


        switch (
            state.priority
        ) {

            case "date":

                return (
                    `Same date · ${amount} selected items available`
                );


            case "time":

                return (
                    `Same time · ${amount} selected items available`
                );


            default:

                return (
                    `${amount} selected items available`
                );

        }

    }



    /* ========================================================
       36. APPLY ALTERNATIVE
    ======================================================== */

    function applyAlternative(
        candidate
    ) {

        selectDate(
            candidate.date,
            {
                close:
                    true,

                updateHistory:
                    false,

                announceChange:
                    false
            }
        );


        selectTime(
            candidate.time,
            {
                close:
                    true,

                updateHistory:
                    false,

                announceChange:
                    false
            }
        );


        updateURL();


        evaluateSelection();


        announce(
            `${formatDate(
                candidate.date
            )}, ${candidate.label} selected.`
        );

    }



    /* ========================================================
       37. RENDER ALTERNATIVES
    ======================================================== */

    function renderAlternatives() {

        if (!alternativeList) {

            return;

        }


        alternativeList.innerHTML =
            "";


        const alternatives =
            getAlternatives()
                .slice(
                    0,
                    3
                );


        if (
            alternatives.length ===
            0
        ) {

            const message =
                document.createElement(
                    "p"
                );


            message.className =
                "alternative-empty";


            message.textContent =
                state.priority ===
                "equipment"
                    ? "No other sessions currently match all of your selected equipment."
                    : "No other suitable sessions are available for this priority.";


            alternativeList.appendChild(
                message
            );


            return;

        }


        const fragment =
            document.createDocumentFragment();


        alternatives.forEach(
            candidate => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "alternative-option";


                const main =
                    document.createElement(
                        "span"
                    );


                main.className =
                    "alternative-main";


                const title =
                    document.createElement(
                        "strong"
                    );


                title.textContent =
                    getAlternativeTitle(
                        candidate
                    );


                const description =
                    document.createElement(
                        "span"
                    );


                description.textContent =
                    getAlternativeDescription(
                        candidate
                    );


                main.append(
                    title,
                    description
                );


                const arrow =
                    document.createElement(
                        "span"
                    );


                arrow.className =
                    "alternative-arrow";


                arrow.textContent =
                    "↗";


                arrow.setAttribute(
                    "aria-hidden",
                    "true"
                );


                button.append(
                    main,
                    arrow
                );


                button.addEventListener(
                    "click",
                    () => {

                        applyAlternative(
                            candidate
                        );

                    }
                );


                fragment.appendChild(
                    button
                );

            }
        );


        alternativeList.appendChild(
            fragment
        );

    }



    /* ========================================================
       38. CONFLICT RESULT
    ======================================================== */

    function renderConflict() {

        renderConflictMessage();

        renderAlternatives();


        showResultState(
            "conflict"
        );


        announce(
            "This session does not match all of your selected equipment."
        );

    }



    /* ========================================================
       39. EVALUATE SELECTION
    ======================================================== */

    function evaluateSelection() {

        refreshCurrentSession();


        const required =
            selectedEquipment();


        /*
           We need all three types of
           preferences before evaluating.
        */

        if (
            !state.date ||
            !state.time ||
            required.length === 0
        ) {

            showResultState(
                "empty"
            );


            return;

        }


        /*
           No session at selected date/time.
        */

        if (!state.currentSession) {

            renderConflict();

            return;

        }


        /*
           Full equipment match.
        */

        if (
            hasAllEquipment(
                state.currentSession,
                required
            )
        ) {

            renderAvailableResult();

            return;

        }


        /*
           Otherwise partial match.
        */

        renderConflict();

    }



    /* ========================================================
       40. DATE DROPDOWN EVENTS
    ======================================================== */

    if (
        dateSelect &&
        dateDropdownPanel
    ) {

        dateSelect.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                toggleDropdown(
                    dateSelect,
                    dateDropdownPanel
                );

            }
        );


        dateDropdownPanel.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    }



    /* ========================================================
       41. CALENDAR NAVIGATION
    ======================================================== */

    if (calendarPrevious) {

        calendarPrevious.addEventListener(
            "click",
            () => {

                const next =
                    new Date(
                        calendarView.getFullYear(),
                        calendarView.getMonth() - 1,
                        1
                    );


                const range =
                    getAvailableMonthRange();


                if (
                    monthValue(next) <
                    monthValue(
                        range.first
                    )
                ) {

                    return;

                }


                calendarView =
                    next;


                renderCalendar();

            }
        );

    }



    if (calendarNext) {

        calendarNext.addEventListener(
            "click",
            () => {

                const next =
                    new Date(
                        calendarView.getFullYear(),
                        calendarView.getMonth() + 1,
                        1
                    );


                const range =
                    getAvailableMonthRange();


                if (
                    monthValue(next) >
                    monthValue(
                        range.last
                    )
                ) {

                    return;

                }


                calendarView =
                    next;


                renderCalendar();

            }
        );

    }



    /* ========================================================
       42. TIME DROPDOWN EVENTS
    ======================================================== */

    if (
        timeSelect &&
        timeDropdownPanel
    ) {

        timeSelect.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                toggleDropdown(
                    timeSelect,
                    timeDropdownPanel
                );

            }
        );


        timeDropdownPanel.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    }



    /* ========================================================
       43. TIME OPTION EVENTS
    ======================================================== */

    timeOptions.forEach(
        option => {

            option.addEventListener(
                "click",
                () => {

                    selectTime(
                        option.dataset.time
                    );

                }
            );

        }
    );



    /* ========================================================
       44. EQUIPMENT EVENTS
    ======================================================== */

    equipmentButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const key =
                        button.dataset
                            .equipment;


                    if (
                        !key
                    ) {

                        return;

                    }


                    if (
                        state.equipment.has(
                            key
                        )
                    ) {

                        state.equipment.delete(
                            key
                        );

                    } else {

                        state.equipment.add(
                            key
                        );

                    }


                    updateEquipmentButtons();


                    evaluateSelection();

                }
            );

        }
    );



    /* ========================================================
       45. PRIORITY EVENTS
    ======================================================== */

    priorityButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const priority =
                        button.dataset
                            .priority;


                    if (!priority) {

                        return;

                    }


                    state.priority =
                        priority;


                    priorityButtons.forEach(
                        item => {

                            const selected =
                                item ===
                                button;


                            item.classList.toggle(
                                "active",
                                selected
                            );


                            item.setAttribute(
                                "aria-pressed",
                                String(
                                    selected
                                )
                            );

                        }
                    );


                    renderAlternatives();

                }
            );

        }
    );



    /* ========================================================
       46. OUTSIDE CLICK
    ======================================================== */

    document.addEventListener(
        "click",
        () => {

            closeAllDropdowns();

        }
    );



    /* ========================================================
       47. ESCAPE
    ======================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            const dateWasOpen =
                dateSelect
                    ?.getAttribute(
                        "aria-expanded"
                    ) === "true";


            const timeWasOpen =
                timeSelect
                    ?.getAttribute(
                        "aria-expanded"
                    ) === "true";


            closeAllDropdowns();


            if (dateWasOpen) {

                dateSelect?.focus();

                return;

            }


            if (timeWasOpen) {

                timeSelect?.focus();

            }

        }
    );



    /* ========================================================
       48. URL
    ======================================================== */

    function updateURL() {

        if (
            !window.history ||
            !window.history.replaceState
        ) {

            return;

        }


        const url =
            new URL(
                window.location.href
            );


        if (state.date) {

            url.searchParams.set(
                "date",
                state.date
            );

        } else {

            url.searchParams.delete(
                "date"
            );

        }


        if (state.time) {

            url.searchParams.set(
                "time",
                state.time
            );

        } else {

            url.searchParams.delete(
                "time"
            );

        }


        window.history.replaceState(
            {},
            "",
            url
        );

    }



    /* ========================================================
       49. INITIALISE FROM URL
    ======================================================== */

    function initialiseFromURL() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const requestedDate =
            params.get(
                "date"
            );


        const requestedTime =
            params.get(
                "time"
            );


        if (
            requestedDate &&
            Object.prototype
                .hasOwnProperty.call(
                    BOOKING_DATA,
                    requestedDate
                )
        ) {

            selectDate(
                requestedDate,
                {
                    close:
                        false,

                    updateHistory:
                        false,

                    announceChange:
                        false
                }
            );

        }


        if (
            requestedTime &&
            timeOptions.some(
                option =>
                    option.dataset.time ===
                    requestedTime
            )
        ) {

            selectTime(
                requestedTime,
                {
                    close:
                        false,

                    updateHistory:
                        false,

                    announceChange:
                        false
                }
            );

        }


        closeAllDropdowns();


        evaluateSelection();

    }



    /* ========================================================
       50. CONFIRMATION DATA
    ======================================================== */

    function populateConfirmation() {

        refreshCurrentSession();


        if (
            !state.currentSession
        ) {

            return;

        }


        if (confirmationDate) {

            confirmationDate.textContent =
                formatDate(
                    state.date
                );

        }


        if (confirmationTime) {

            confirmationTime.textContent =
                state.currentSession
                    .label;

        }


        if (confirmationEquipment) {

            confirmationEquipment.textContent =
                selectedEquipment()
                    .map(
                        equipmentLabel
                    )
                    .join(" · ");

        }

    }



    /* ========================================================
       51. BOOKING ID
    ======================================================== */

    function createBookingID() {

        if (
            window.crypto &&
            typeof window.crypto
                .randomUUID ===
                "function"
        ) {

            return (
                window.crypto.randomUUID()
            );

        }


        return (
            `booking-${Date.now()}-${Math.random()
                .toString(16)
                .slice(2)}`
        );

    }



    /* ========================================================
       52. SAVE BOOKING
    ======================================================== */

    function saveBooking() {

        refreshCurrentSession();


        if (
            !state.date ||
            !state.time ||
            !state.currentSession ||
            state.equipment.size ===
                0
        ) {

            return false;

        }


        const booking = {

            id:
                createBookingID(),

            date:
                state.date,

            time:
                state.time,

            timeLabel:
                state.currentSession
                    .label,

            equipment:
                selectedEquipment()
                    .map(
                        key => ({

                            key,

                            label:
                                equipmentLabel(
                                    key
                                )

                        })
                    ),

            createdAt:
                new Date()
                    .toISOString()

        };


        try {

            const key =
                "alphonsiansGymBookings";


            const stored =
                JSON.parse(
                    localStorage.getItem(
                        key
                    ) ||
                    "[]"
                );


            const bookings =
                Array.isArray(
                    stored
                )
                    ? stored
                    : [];


            bookings.push(
                booking
            );


            localStorage.setItem(
                key,
                JSON.stringify(
                    bookings
                )
            );


            return true;

        } catch (error) {

            console.warn(
                "Booking could not be stored locally.",
                error
            );


            return false;

        }

    }



    /* ========================================================
       53. SHOW CONFIRMATION
    ======================================================== */

    function showConfirmation() {

    state.stage =
        2;


    closeAllDropdowns();


    if (bookingTrack) {

        bookingTrack.style.transform =
            "translate3d(-100%, 0, 0)";

    }


    bookingStages.forEach(
        (
            stage,
            index
        ) => {

            const active =
                index === 1;


            stage.classList.toggle(
                "active",
                active
            );


            stage.setAttribute(
                "aria-hidden",
                active
                    ? "false"
                    : "true"
            );


            if (
                "inert" in stage
            ) {

                stage.inert =
                    !active;

            }

        }
    );


    if (progressBar) {

        progressBar.style.width =
            "100%";

    }


    if (confirmationTitle) {

        confirmationTitle.setAttribute(
            "tabindex",
            "-1"
        );


        window.requestAnimationFrame(
            () => {

                try {

                    confirmationTitle.focus({
                        preventScroll:
                            true
                    });

                } catch {

                    confirmationTitle.focus();

                }

            }
        );

    }


    observeActiveBookingStage();

}


    /* ========================================================
       54. CONFIRM
    ======================================================== */

    if (confirmBooking) {

        confirmBooking.addEventListener(
            "click",
            () => {

                refreshCurrentSession();


                const required =
                    selectedEquipment();


                /*
                   Re-check everything immediately
                   before confirming.
                */

                const valid =
                    Boolean(
                        state.date &&
                        state.time &&
                        required.length >
                            0 &&
                        state.currentSession &&
                        hasAllEquipment(
                            state.currentSession,
                            required
                        )
                    );


                if (!valid) {

                    evaluateSelection();


                    announce(
                        "This selection cannot be confirmed because not everything is available."
                    );


                    return;

                }


                confirmBooking.disabled =
                    true;


                populateConfirmation();


                saveBooking();


                showConfirmation();


                announce(
                    `Booking confirmed for ${formatDate(
                        state.date
                    )}, ${state.currentSession.label}.`
                );

            }
        );

    }

observeActiveBookingStage();

    /* ========================================================
       55. INITIAL PROGRESS
    ======================================================== */

    if (progressBar) {

        progressBar.style.width =
            "50%";

    }

    window.addEventListener(
    "resize",
    () => {

        closeAllDropdowns();

        syncBookingViewportHeight();

    }
);


if (
    typeof responsiveBookingQuery
        .addEventListener ===
    "function"
) {

    responsiveBookingQuery.addEventListener(
        "change",
        () => {

            closeAllDropdowns();

            observeActiveBookingStage();

        }
    );

}

/* ========================================================
   56. INITIALISE
======================================================== */

renderCalendar();

updateEquipmentButtons();

initialiseFromURL();

observeActiveBookingStage();



/* ========================================================
   57. CLOSE / RETURN HOME
======================================================== */

const bookingClose =
    document.getElementById(
        "bookingClose"
    );


if (bookingClose) {

    bookingClose.addEventListener(
        "click",
        event => {

            event.preventDefault();


            try {

                sessionStorage.setItem(
                    "skipHomeIntro",
                    "true"
                );

            } catch (error) {

                /* Continue if storage is unavailable */

            }


            document.body.classList.add(
                "is-closing"
            );


            window.setTimeout(
                () => {

                    window.location.href =
                        "index.html";

                },
                160
            );

        }
    );

}


});