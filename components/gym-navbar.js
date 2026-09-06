/* ============================================================
   ALPHONSIANS' GYM
   REUSABLE NAVBAR COMPONENT — GYM-NAVBAR.JS

   Usage:

   <gym-navbar></gym-navbar>

   Current page:

   <gym-navbar current="train"></gym-navbar>

   Transparent homepage variant:

   <gym-navbar
       transparent
       transparent-until="#home"
   ></gym-navbar>
============================================================ */


class GymNavbar extends HTMLElement {


    /* ========================================================
       01. CONSTRUCTOR
    ======================================================== */

    constructor() {

        super();


        this.attachShadow({
            mode: "open"
        });


        this._onScroll =
            this._onScroll.bind(this);


        this._onKeydown =
            this._onKeydown.bind(this);


        this._onResize =
            this._onResize.bind(this);


        this._previousBodyOverflow = "";

        this._scrollLocked = false;

        this._initialized = false;

    }



    /* ========================================================
       02. OBSERVED ATTRIBUTES
    ======================================================== */

    static get observedAttributes() {

        return [
            "current",
            "transparent",
            "transparent-until",
            "base"
        ];

    }



    /* ========================================================
       03. CONNECT
    ======================================================== */

    connectedCallback() {

        if (
            this._initialized
        ) {
            return;
        }


        this._initialized = true;


        this.render();

        this.cacheElements();

        this.setCurrentPage();

        this.bindEvents();

        this._onScroll();

        this._onResize();

    }



    /* ========================================================
       04. ATTRIBUTE CHANGES
    ======================================================== */

    attributeChangedCallback(
        name,
        oldValue,
        newValue
    ) {

        if (
            oldValue === newValue
            ||
            !this.isConnected
            ||
            !this._initialized
        ) {
            return;
        }



        /* ----------------------------------------------------
           CURRENT PAGE
        ---------------------------------------------------- */

        if (
            name === "current"
        ) {

            this.setCurrentPage();

            return;

        }



        /* ----------------------------------------------------
           TRANSPARENT STATE
        ---------------------------------------------------- */

        if (
            name === "transparent"
            ||
            name === "transparent-until"
        ) {

            this._onScroll();

            return;

        }



        /* ----------------------------------------------------
           BASE PATH
        ---------------------------------------------------- */

        if (
            name === "base"
        ) {

            this.unbindEvents();

            this.closeMenu();


            this.render();

            this.cacheElements();

            this.setCurrentPage();

            this.bindEvents();

            this._onScroll();

            this._onResize();

        }

    }



    /* ========================================================
       05. DISCONNECT
    ======================================================== */

    disconnectedCallback() {

        this.unbindEvents();

        this.unlockPageScroll();

        this._initialized = false;

    }



    /* ========================================================
       06. PATH HANDLING
    ======================================================== */

    get basePath() {

        const base =
            this.getAttribute(
                "base"
            )
            ||
            "./";


        return base.endsWith("/")
            ? base
            : `${base}/`;

    }



    url(file) {

        return `${this.basePath}${file}`;

    }



    /* ========================================================
       07. RENDER
    ======================================================== */

    render() {

        this.shadowRoot.innerHTML = `

            <style>


                /* ====================================================
                   DESIGN TOKENS
                ===================================================== */

                :host {

                    /* --------------------------------------------
                       BRAND
                    --------------------------------------------- */

                    --nav-navy:
                        var(
                            --navy,
                            #0C2340
                        );

                    --nav-gold:
                        var(
                            --gold,
                            #AE9142
                        );

                    --nav-white:
                        var(
                            --white,
                            #FFFFFF
                        );

                    --nav-grey:
                        var(
                            --grey,
                            #525368
                        );


                    /* --------------------------------------------
                       BORDERS
                    --------------------------------------------- */

                    --nav-border-dark:
                        var(
                            --border-dark,
                            rgba(
                                12,
                                35,
                                64,
                                0.18
                            )
                        );

                    --nav-border-light:
                        var(
                            --border-light,
                            rgba(
                                255,
                                255,
                                255,
                                0.22
                            )
                        );


                    /* --------------------------------------------
                       BACKGROUNDS
                    --------------------------------------------- */

                    --nav-solid-bg:
                        var(--nav-white);

                    --nav-scrolled-bg:
                        var(--nav-white);


                    /* --------------------------------------------
                       TYPOGRAPHY
                    --------------------------------------------- */

                    --nav-font-display:
                        var(
                            --font-display,
                            "Archivo",
                            sans-serif
                        );

                    --nav-font-body:
                        var(
                            --font-body,
                            "Open Sans",
                            sans-serif
                        );


                    /* --------------------------------------------
                       LAYOUT
                    --------------------------------------------- */

                    --nav-page-padding:
                        var(
                            --page-padding,
                            120px
                        );

                    --nav-header-height:
                        var(
                            --header-height,
                            98px
                        );

                    --nav-logo-size:
                        48px;

                    --nav-control-size:
                        var(
                            --control-size,
                            44px
                        );


                    /* --------------------------------------------
                       SPACING
                    --------------------------------------------- */

                    --nav-space-2xs: 4px;
                    --nav-space-xs: 8px;
                    --nav-space-s: 12px;
                    --nav-space-m: 16px;
                    --nav-space-l: 24px;
                    --nav-space-xl: 32px;
                    --nav-space-2xl: 48px;
                    --nav-space-3xl: 64px;


                    /* --------------------------------------------
                       MOTION
                    --------------------------------------------- */

                    --nav-ease:
                        var(
                            --ease,
                            cubic-bezier(
                                0.16,
                                1,
                                0.3,
                                1
                            )
                        );

                    --nav-transition:
                        260ms
                        var(--nav-ease);


                    display: block;

                    position: relative;

                    z-index: 100;

                    min-width: 0;

                    background: transparent;

                    font-family:
                        var(--nav-font-body);

                }



                /* ====================================================
                   RESET
                ===================================================== */

                *,
                *::before,
                *::after {

                    box-sizing:
                        border-box;

                }


                a {

                    color: inherit;

                    text-decoration: none;

                }


                button {

                    color: inherit;

                    font: inherit;

                }


                img {

                    display: block;

                    max-width: 100%;

                }


                a:focus-visible,
                button:focus-visible {

                    outline:
                        2px
                        solid
                        var(--nav-gold);

                    outline-offset:
                        var(--nav-space-2xs);

                }



                /* ====================================================
                   HEADER
                ===================================================== */

                .site-header {

                    position: fixed;

                    z-index: 100;

                    top: 0;
                    left: 0;

                    width: 100%;

                    min-width: 0;

                    color:
                        var(--nav-navy);

                    background:
                        var(--nav-solid-bg);

                    transition:
                        background
                        var(--nav-transition),
                        color
                        var(--nav-transition);

                }



                /* ----------------------------------------------------
                   HEADER INNER
                ---------------------------------------------------- */

                .site-header-inner {

                    width: 100%;

                    min-width: 0;

                    min-height:
                        var(--nav-header-height);

                    display: grid;

                    grid-template-columns:
                        minmax(0, 1fr)
                        auto
                        minmax(0, 1fr);

                    align-items: center;

                    gap: 36px;

                    padding-top: 12px;
                    padding-bottom: 12px;

                    padding-left:
                        max(
                            var(--nav-page-padding),
                            env(
                                safe-area-inset-left
                            )
                        );

                    padding-right:
                        max(
                            var(--nav-page-padding),
                            env(
                                safe-area-inset-right
                            )
                        );

                }



                /* ====================================================
                   SCROLLED STATE
                ===================================================== */

                .site-header.scrolled {

                    color:
                        var(--nav-navy);

                    background:
                        var(--nav-scrolled-bg);

                    backdrop-filter: none;

                    -webkit-backdrop-filter:
                        none;

                }


                .site-header.scrolled::after {

                    background:
                        var(--nav-border-dark);

                }



                /* ====================================================
                   TRANSPARENT VARIANT
                ===================================================== */

                :host([transparent])
                .site-header {

                    color:
                        var(--nav-white);

                    background:
                        transparent;

                    backdrop-filter:
                        none;

                    -webkit-backdrop-filter:
                        none;

                }


                :host([transparent])
                .site-header::after {

                    background:
                        var(--nav-border-light);

                }



                /* ----------------------------------------------------
                   TRANSPARENT → SOLID AFTER HERO
                ---------------------------------------------------- */

                :host([transparent])
                .site-header.past-hero {

                    color:
                        var(--nav-navy);

                    background:
                        var(--nav-solid-bg);

                }


                :host([transparent])
                .site-header.past-hero::after {

                    background:
                        var(--nav-border-dark);

                }



                /* ====================================================
                   MENU OPEN STATE
                ===================================================== */

                .site-header.menu-open,

                :host([transparent])
                .site-header.menu-open,

                :host([transparent])
                .site-header.menu-open.scrolled,

                :host([transparent])
                .site-header.menu-open.past-hero {

                    color:
                        var(--nav-white);

                    background:
                        var(--nav-navy);

                }


                .site-header.menu-open::after,

                :host([transparent])
                .site-header.menu-open::after,

                :host([transparent])
                .site-header.menu-open.scrolled::after,

                :host([transparent])
                .site-header.menu-open.past-hero::after {

                    background:
                        var(--nav-border-light);

                }



                /* ====================================================
                   BRAND
                ===================================================== */

                .brand {

                    min-width: 0;

                    display: inline-flex;

                    align-items: center;

                    gap:
                        var(--nav-space-s);

                    justify-self: start;

                }



                .brand-logo {

                    width:
                        var(--nav-logo-size);

                    height:
                        var(--nav-logo-size);

                    flex-shrink: 0;

                    object-fit: contain;

                }



                .brand-copy {

                    min-width: 0;

                    display: flex;

                    flex-direction: column;

                    gap:
                        var(--nav-space-2xs);

                    line-height: 1.15;

                }



                .brand-copy strong {

                    font-family:
                        var(--nav-font-display);

                    font-size: 14px;

                    font-weight: 600;

                    line-height: 1;

                    letter-spacing:
                        -0.015em;

                    text-transform:
                        uppercase;

                    white-space: nowrap;

                }



                .brand-copy small {

                    margin-top: 3px;

                    color: inherit;

                    font-size: 12px;

                    line-height: 1.2;

                    opacity: 0.72;

                    white-space: nowrap;

                }



                /* ====================================================
                   DESKTOP NAVIGATION
                ===================================================== */

                .desktop-nav {

                    min-width: 0;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap:
                        var(--nav-space-xl);

                    justify-self: center;

                    font-family:
                        var(--nav-font-display);

                    font-size: 14px;

                    font-weight: 600;

                }



                .desktop-nav > a {

                    position: relative;

                    white-space: nowrap;

                }



                .desktop-nav > a::after {

                    content: "";

                    position: absolute;

                    left: 0;

                    bottom:
                        calc(
                            var(--nav-space-xs)
                            * -1
                        );

                    width: 0;

                    height: 1px;

                    background:
                        currentColor;

                    transition:
                        width
                        var(--nav-transition);

                }



                @media
                    (hover: hover)
                    and
                    (pointer: fine) {

                    .desktop-nav > a:hover::after {

                        width: 100%;

                    }

                }



                .desktop-nav
                > a[aria-current="page"]::after {

                    width: 100%;

                }



                /* ====================================================
                   HEADER ACTIONS
                ===================================================== */

                .header-actions {

                    min-width: 0;

                    display: flex;

                    align-items: center;

                    justify-content: flex-end;

                    gap:
                        var(--nav-space-m);

                    justify-self: end;

                }



                /* ----------------------------------------------------
                   DESKTOP / TABLET LOGIN
                ---------------------------------------------------- */

                .login-link {

                    position: relative;

                    display: inline-flex;

                    align-items: center;

                    gap:
                        var(--nav-space-xs);

                    min-height:
                        var(--nav-control-size);

                    padding-bottom:
                        var(--nav-space-2xs);

                    font-family:
                        var(--nav-font-display);

                    font-size: 14px;

                    font-weight: 600;

                    white-space: nowrap;

                }



                .login-link::after {

                    content: "";

                    position: absolute;

                    left: 0;
                    bottom: 3px;

                    width: 0;

                    height: 1px;

                    background:
                        currentColor;

                    transition:
                        width
                        var(--nav-transition);

                }



                @media
                    (hover: hover)
                    and
                    (pointer: fine) {

                    .login-link:hover::after {

                        width: 100%;

                    }

                }



                /* ====================================================
                   MENU BUTTON
                ===================================================== */

                .menu-button {

                    position: relative;

                    width:
                        var(--nav-control-size);

                    height:
                        var(--nav-control-size);

                    display: none;

                    flex-shrink: 0;

                    padding: 0;

                    border: 0;

                    background:
                        transparent;

                    color: inherit;

                    cursor: pointer;

                }



                .menu-button span {

                    position: absolute;

                    left: 50%;

                    width:
                        var(--nav-space-l);

                    height: 1px;

                    background:
                        currentColor;

                    transform-origin: center;

                    transition:
                        transform
                        var(--nav-transition),
                        top
                        var(--nav-transition);

                }



                .menu-button span:first-child {

                    top:
                        calc(
                            50%
                            -
                            var(--nav-space-2xs)
                        );

                    transform:
                        translateX(-50%);

                }



                .menu-button span:last-child {

                    top:
                        calc(
                            50%
                            +
                            var(--nav-space-2xs)
                        );

                    transform:
                        translateX(-50%);

                }



                /* ----------------------------------------------------
                   X STATE
                ---------------------------------------------------- */

                .menu-button.active span:first-child,
                .menu-button.active span:last-child {

                    top: 50%;

                }


                .menu-button.active span:first-child {

                    transform:
                        translateX(-50%)
                        rotate(45deg);

                }


                .menu-button.active span:last-child {

                    transform:
                        translateX(-50%)
                        rotate(-45deg);

                }



                /* ====================================================
                   MOBILE / TABLET MENU
                ===================================================== */

                .mobile-menu {

                    position: fixed;

                    z-index: 95;

                    inset: 0;

                    visibility: hidden;

                    opacity: 0;

                    overflow-x: hidden;

                    overflow-y: auto;

                    overscroll-behavior:
                        contain;

                    -webkit-overflow-scrolling:
                        touch;


                    padding-top:
                        calc(
                            var(--nav-header-height)
                            +
                            var(--nav-space-xl)
                        );

                    padding-bottom:
                        max(
                            var(--nav-space-xl),
                            env(
                                safe-area-inset-bottom
                            )
                        );

                    padding-left:
                        max(
                            var(--nav-page-padding),
                            env(
                                safe-area-inset-left
                            )
                        );

                    padding-right:
                        max(
                            var(--nav-page-padding),
                            env(
                                safe-area-inset-right
                            )
                        );


                    background:
                        var(--nav-navy);

                    color:
                        var(--nav-white);


                    transition:
                        opacity
                        var(--nav-transition),
                        visibility
                        var(--nav-transition);

                }



                .mobile-menu.open {

                    visibility: visible;

                    opacity: 1;

                }



                .mobile-menu-inner {

                    width: 100%;

                    min-height: 100%;

                    display: flex;

                    flex-direction: column;

                }



                /* ----------------------------------------------------
                   MENU EYEBROW
                ---------------------------------------------------- */

                .eyebrow {

                    margin: 0;

                    font-family:
                        var(--nav-font-display);

                    font-size: 12px;

                    font-weight: 600;

                    line-height: 1;

                    letter-spacing:
                        0.08em;

                    text-transform:
                        uppercase;

                }



                /* ----------------------------------------------------
                   MENU LINKS
                ---------------------------------------------------- */

                .mobile-menu nav {

                    display: flex;

                    flex-direction: column;

                    margin-top:
                        var(--nav-space-2xl);

                }



                .mobile-menu nav a {

                    min-height:
                        var(--nav-space-3xl);

                    display: flex;

                    align-items: baseline;

                    gap:
                        var(--nav-space-l);

                    padding-block:
                        var(--nav-space-m);

                    font-family:
                        var(--nav-font-display);

                    font-size:
                        clamp(
                            2.3rem,
                            7vw,
                            4rem
                        );

                    font-weight: 600;

                    line-height: 0.95;

                    letter-spacing:
                        -0.045em;

                }



                .mobile-menu nav a > span {

                    min-width:
                        var(--nav-space-l);

                    color:
                        var(--nav-gold);

                    font-size: 12px;

                    font-weight: 600;

                    line-height: 1;

                    letter-spacing: 0;

                }



                /* ----------------------------------------------------
                   MOBILE LOGIN
                ---------------------------------------------------- */

                .mobile-login {

                    position: relative;

                    width: fit-content;

                    min-height:
                        var(--nav-control-size);

                    display: none;

                    align-items: center;

                    margin-top: auto;

                    padding-top:
                        var(--nav-space-xl);

                    padding-bottom:
                        var(--nav-space-2xs);

                    color:
                        var(--nav-white);

                    font-family:
                        var(--nav-font-display);

                    font-size: 14px;

                    font-weight: 600;

                }



                .mobile-login::after {

                    content: "";

                    position: absolute;

                    left: 0;
                    bottom: 0;

                    width: 0;

                    height: 1px;

                    background:
                        currentColor;

                    transition:
                        width
                        var(--nav-transition);

                }



                @media
                    (hover: hover)
                    and
                    (pointer: fine) {

                    .mobile-login:hover::after {

                        width: 100%;

                    }

                }



                /* ====================================================
                   TABLET
                   <= 1100PX
                ===================================================== */

                @media (
                    max-width: 1100px
                ) {

                    :host {

                        --nav-page-padding:
                            40px;

                        --nav-header-height:
                            88px;

                        --nav-logo-size:
                            44px;

                    }



                    .site-header-inner {

                        grid-template-columns:
                            minmax(0, 1fr)
                            auto;

                        gap:
                            var(--nav-space-m);

                        padding-top:
                            var(--nav-space-s);

                        padding-bottom:
                            var(--nav-space-s);

                    }



                    .desktop-nav {

                        display: none;

                    }



                    .menu-button {

                        display: block;

                    }



                    /*
                        Tablet:

                        Login remains visible in the navbar.

                        It is deliberately NOT duplicated inside
                        the open menu.
                    */

                    .login-link {

                        display: inline-flex;

                    }



                    .mobile-login {

                        display: none;

                    }



                    .mobile-menu nav a {

                        font-size:
                            clamp(
                                2.3rem,
                                6vw,
                                3.7rem
                            );

                    }

                }



                /* ====================================================
                   PORTRAIT TABLET
                   <= 900PX
                ===================================================== */

                @media (
                    max-width: 900px
                ) {

                    .mobile-menu {

                        padding-top:
                            calc(
                                var(--nav-header-height)
                                +
                                var(--nav-space-l)
                            );

                    }



                    .mobile-menu nav {

                        margin-top:
                            var(--nav-space-xl);

                    }



                    .mobile-menu nav a {

                        min-height: 60px;

                        font-size:
                            clamp(
                                2.2rem,
                                7vw,
                                3.35rem
                            );

                    }

                }



                /* ====================================================
                   MOBILE
                   <= 720PX
                ===================================================== */

                @media (
                    max-width: 720px
                ) {

                    :host {

                        --nav-page-padding:
                            20px;

                        --nav-header-height:
                            76px;

                        --nav-logo-size:
                            40px;

                    }



                    .site-header-inner {

                        gap:
                            var(--nav-space-xs);

                        padding-top:
                            var(--nav-space-xs);

                        padding-bottom:
                            var(--nav-space-xs);

                    }



                    .brand {

                        gap:
                            var(--nav-space-xs);

                    }



                    .brand-copy strong {

                        font-size: 12px;

                    }



                    .brand-copy small {

                        display: none;

                    }



                    /*
                        Mobile:

                        Remove Log in from the navbar itself
                        and place it inside the open menu.
                    */

                    .login-link {

                        display: none;

                    }



                    .mobile-login {

                        display: inline-flex;

                    }



                    .header-actions {

                        gap: 0;

                    }



                    .mobile-menu {

                        padding-top:
                            calc(
                                var(--nav-header-height)
                                +
                                var(--nav-space-l)
                            );

                    }



                    .mobile-menu nav {

                        margin-top:
                            var(--nav-space-xl);

                    }



                    .mobile-menu nav a {

                        min-height: 58px;

                        gap:
                            var(--nav-space-m);

                        padding-block:
                            var(--nav-space-s);

                        font-size:
                            clamp(
                                2rem,
                                10vw,
                                3.2rem
                            );

                    }

                }



                /* ====================================================
                   COMPACT MOBILE
                   <= 480PX
                ===================================================== */

                @media (
                    max-width: 480px
                ) {

                    :host {

                        --nav-header-height:
                            72px;

                        --nav-logo-size:
                            36px;

                    }



                    .brand-copy {

                        max-width: 155px;

                    }



                    .brand-copy strong {

                        font-size: 12px;

                    }



                    .menu-button span {

                        width: 22px;

                    }



                    .mobile-menu {

                        padding-top:
                            calc(
                                var(--nav-header-height)
                                +
                                var(--nav-space-m)
                            );

                    }



                    .mobile-menu nav {

                        margin-top:
                            var(--nav-space-l);

                    }



                    .mobile-menu nav a {

                        min-height: 54px;

                        font-size:
                            clamp(
                                1.8rem,
                                9vw,
                                2.7rem
                            );

                    }

                }



                /* ====================================================
                   SHORT VIEWPORTS
                ===================================================== */

                @media (
                    max-height: 680px
                )
                and
                (
                    max-width: 1100px
                ) {

                    .mobile-menu {

                        padding-top:
                            calc(
                                var(--nav-header-height)
                                +
                                var(--nav-space-m)
                            );

                    }



                    .mobile-menu nav {

                        margin-top:
                            var(--nav-space-l);

                    }



                    .mobile-menu nav a {

                        min-height: 50px;

                        padding-block:
                            var(--nav-space-xs);

                    }



                    .mobile-login {

                        margin-top:
                            var(--nav-space-l);

                    }

                }



                /* ====================================================
                   TOUCH DEVICES
                ===================================================== */

                @media
                    (hover: none)
                    and
                    (pointer: coarse) {

                    .desktop-nav > a:hover::after,
                    .login-link:hover::after,
                    .mobile-login:hover::after {

                        width: 0;

                    }

                }



                /* ====================================================
                   REDUCED MOTION
                ===================================================== */

                @media (
                    prefers-reduced-motion:
                    reduce
                ) {

                    *,
                    *::before,
                    *::after {

                        transition-duration:
                            0.01ms !important;

                    }

                }

            </style>



            <!-- ==================================================
                 HEADER
            =================================================== -->

            <header
                class="site-header"
                id="siteHeader"
            >

                <div class="site-header-inner">


                    <!-- ==========================================
                         BRAND
                    =========================================== -->

                    <a
                        href="${this.url("index.html")}"
                        class="brand"
                        aria-label="Alphonsians' Gym home"
                    >

                        <img
                            src="${this.url("img/alphonsa-logo.png")}"
                            alt="Alphonsa College"
                            class="brand-logo"
                        >


                        <span class="brand-copy">

                            <strong>
                                Alphonsians' Gym
                            </strong>

                            <small>
                                Alphonsa College, Pala
                            </small>

                        </span>

                    </a>



                    <!-- ==========================================
                         DESKTOP NAVIGATION
                    =========================================== -->

                    <nav
                        class="desktop-nav"
                        aria-label="Main navigation"
                    >

                        <a
                            href="${this.url("booking.html")}"
                            data-nav="booking"
                        >
                            Book a Slot
                        </a>


                        <a
                            href="${this.url("calculators.html")}"
                            data-nav="calculators"
                        >
                            Calculators
                        </a>


                        <a
                            href="${this.url("train.html")}"
                            data-nav="train"
                        >
                            Train
                        </a>


                        <a
                            href="${this.url("wellness.html")}"
                            data-nav="wellness"
                        >
                            Wellness
                        </a>


                        <a
                            href="${this.url("gym.html")}"
                            data-nav="about"
                        >
                            About
                        </a>

                    </nav>



                    <!-- ==========================================
                         HEADER ACTIONS
                    =========================================== -->

                    <div class="header-actions">

                        <a
                            href="${this.url("login.html")}"
                            class="login-link"
                        >
                            Log in

                            <span aria-hidden="true">
                                ↗
                            </span>
                        </a>


                        <button
                            class="menu-button"
                            id="menuButton"
                            type="button"
                            aria-label="Open navigation menu"
                            aria-expanded="false"
                            aria-controls="mobileMenu"
                        >

                            <span></span>
                            <span></span>

                        </button>

                    </div>

                </div>

            </header>



            <!-- ==================================================
                 MOBILE / TABLET MENU
            =================================================== -->

            <div
                class="mobile-menu"
                id="mobileMenu"
                aria-hidden="true"
            >

                <div class="mobile-menu-inner">


                    <p class="eyebrow">
                        ( Navigation )
                    </p>



                    <nav
                        aria-label="Mobile navigation"
                    >

                        <a
                            href="${this.url("booking.html")}"
                            data-nav="booking"
                        >
                            <span>01</span>

                            Book a Slot
                        </a>


                        <a
                            href="${this.url("calculators.html")}"
                            data-nav="calculators"
                        >
                            <span>02</span>

                            Calculators
                        </a>


                        <a
                            href="${this.url("train.html")}"
                            data-nav="train"
                        >
                            <span>03</span>

                            Train
                        </a>


                        <a
                            href="${this.url("wellness.html")}"
                            data-nav="wellness"
                        >
                            <span>04</span>

                            Wellness
                        </a>


                        <a
                            href="${this.url("gym.html")}"
                            data-nav="about"
                        >
                            <span>05</span>

                            About
                        </a>

                    </nav>



                    <a
                        href="${this.url("login.html")}"
                        class="mobile-login"
                    >
                        Log in ↗
                    </a>


                </div>

            </div>

        `;

    }



    /* ========================================================
       08. CACHE ELEMENTS
    ======================================================== */

    cacheElements() {

        this.header =
            this.shadowRoot.getElementById(
                "siteHeader"
            );


        this.menuButton =
            this.shadowRoot.getElementById(
                "menuButton"
            );


        this.mobileMenu =
            this.shadowRoot.getElementById(
                "mobileMenu"
            );


        this.mobileLinks =
            this.mobileMenu
                ? [
                    ...this.mobileMenu.querySelectorAll(
                        "a"
                    )
                ]
                : [];


        if (
            this.mobileMenu
            &&
            "inert" in this.mobileMenu
        ) {

            this.mobileMenu.inert = true;

        }

    }



    /* ========================================================
       09. EVENTS
    ======================================================== */

    bindEvents() {

        if (
            !this.menuButton
        ) {
            return;
        }


        this._menuClickHandler =
            () => this.toggleMenu();


        this.menuButton.addEventListener(
            "click",
            this._menuClickHandler
        );



        this._mobileLinkHandlers =
            new Map();


        this.mobileLinks.forEach(
            (link) => {

                const handler =
                    () => this.closeMenu();


                this._mobileLinkHandlers.set(
                    link,
                    handler
                );


                link.addEventListener(
                    "click",
                    handler
                );

            }
        );



        window.addEventListener(
            "scroll",
            this._onScroll,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            this._onResize
        );


        document.addEventListener(
            "keydown",
            this._onKeydown
        );

    }



    /* ========================================================
       10. UNBIND EVENTS
    ======================================================== */

    unbindEvents() {

        window.removeEventListener(
            "scroll",
            this._onScroll
        );


        window.removeEventListener(
            "resize",
            this._onResize
        );


        document.removeEventListener(
            "keydown",
            this._onKeydown
        );



        if (
            this.menuButton
            &&
            this._menuClickHandler
        ) {

            this.menuButton.removeEventListener(
                "click",
                this._menuClickHandler
            );

        }



        if (
            this._mobileLinkHandlers
        ) {

            this._mobileLinkHandlers.forEach(
                (
                    handler,
                    link
                ) => {

                    link.removeEventListener(
                        "click",
                        handler
                    );

                }
            );


            this._mobileLinkHandlers.clear();

        }

    }



    /* ========================================================
       11. CURRENT PAGE
    ======================================================== */

    setCurrentPage() {

        const explicit =
            this.getAttribute(
                "current"
            );


        const current =
            explicit
            ||
            this.detectCurrentPage();


        this.shadowRoot
            .querySelectorAll(
                "[data-nav]"
            )
            .forEach(
                (link) => {

                    const active =
                        link.dataset.nav
                        ===
                        current;


                    if (
                        active
                    ) {

                        link.setAttribute(
                            "aria-current",
                            "page"
                        );

                    } else {

                        link.removeAttribute(
                            "aria-current"
                        );

                    }

                }
            );

    }



    /* ========================================================
       12. AUTO-DETECT PAGE
    ======================================================== */

    detectCurrentPage() {

        const path =
            window.location.pathname
                .toLowerCase();


        const filename =
            path.split("/")
                .pop()
            ||
            "index.html";


        const map = {

            "booking.html":
                "booking",

            "calculators.html":
                "calculators",

            "train.html":
                "train",

            "wellness.html":
                "wellness",

            "gym.html":
                "about"

        };


        return (
            map[filename]
            ||
            ""
        );

    }



    /* ========================================================
       13. TOGGLE MENU
    ======================================================== */

    toggleMenu() {

        const isOpen =
            this.menuButton
                ?.getAttribute(
                    "aria-expanded"
                )
            ===
            "true";


        if (
            isOpen
        ) {

            this.closeMenu();

        } else {

            this.openMenu();

        }

    }



    /* ========================================================
       14. OPEN MENU
    ======================================================== */

    openMenu() {

        if (
            !this.menuButton
            ||
            !this.mobileMenu
            ||
            !this.header
        ) {
            return;
        }



        this.menuButton
            .classList
            .add(
                "active"
            );


        this.mobileMenu
            .classList
            .add(
                "open"
            );


        this.header
            .classList
            .add(
                "menu-open"
            );



        this.menuButton.setAttribute(
            "aria-expanded",
            "true"
        );


        this.menuButton.setAttribute(
            "aria-label",
            "Close navigation menu"
        );


        this.mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );



        if (
            "inert"
            in
            this.mobileMenu
        ) {

            this.mobileMenu.inert =
                false;

        }



        this.lockPageScroll();

    }



    /* ========================================================
       15. CLOSE MENU
    ======================================================== */

    closeMenu() {

        const wasOpen =
            this.menuButton
                ?.getAttribute(
                    "aria-expanded"
                )
            ===
            "true";


        this.menuButton
            ?.classList
            .remove(
                "active"
            );


        this.mobileMenu
            ?.classList
            .remove(
                "open"
            );


        this.header
            ?.classList
            .remove(
                "menu-open"
            );



        this.menuButton
            ?.setAttribute(
                "aria-expanded",
                "false"
            );


        this.menuButton
            ?.setAttribute(
                "aria-label",
                "Open navigation menu"
            );


        this.mobileMenu
            ?.setAttribute(
                "aria-hidden",
                "true"
            );



        if (
            this.mobileMenu
            &&
            "inert"
            in
            this.mobileMenu
        ) {

            this.mobileMenu.inert =
                true;

        }



        if (
            wasOpen
        ) {

            this.unlockPageScroll();

        }

    }



    /* ========================================================
       16. LOCK PAGE SCROLL
    ======================================================== */

    lockPageScroll() {

        if (
            this._scrollLocked
        ) {
            return;
        }


        this._previousBodyOverflow =
            document.body.style.overflow;


        document.body.style.overflow =
            "hidden";


        this._scrollLocked =
            true;

    }



    /* ========================================================
       17. UNLOCK PAGE SCROLL
    ======================================================== */

    unlockPageScroll() {

        if (
            !this._scrollLocked
        ) {
            return;
        }


        document.body.style.overflow =
            this._previousBodyOverflow;


        this._scrollLocked =
            false;

    }



    /* ========================================================
       18. SCROLL STATE
    ======================================================== */

    _onScroll() {

        if (
            !this.header
        ) {
            return;
        }



        /* ----------------------------------------------------
           STANDARD SCROLL STATE
        ---------------------------------------------------- */

        this.header.classList.toggle(
            "scrolled",
            window.scrollY > 12
        );



        /* ----------------------------------------------------
           TRANSPARENT → SOLID AFTER HERO
        ---------------------------------------------------- */

        if (
            this.hasAttribute(
                "transparent"
            )
        ) {

            const selector =
                this.getAttribute(
                    "transparent-until"
                );


            /*
                Prefer the explicit boundary supplied through:

                transparent-until="#home"

                Otherwise use the first section inside main.
            */

            const boundary =
                selector
                    ? document.querySelector(
                        selector
                    )
                    : document.querySelector(
                        "main > section"
                    );


            if (
                !boundary
            ) {

                this.header
                    .classList
                    .remove(
                        "past-hero"
                    );


                return;

            }



            const boundaryRect =
                boundary
                    .getBoundingClientRect();



            const headerHeight =
                this.header
                    .offsetHeight;



            const pastHero =
                boundaryRect.bottom
                <=
                headerHeight;



            this.header.classList.toggle(
                "past-hero",
                pastHero
            );

        } else {

            this.header
                .classList
                .remove(
                    "past-hero"
                );

        }

    }



    /* ========================================================
       19. RESIZE
    ======================================================== */

    _onResize() {

        const isOpen =
            this.menuButton
                ?.getAttribute(
                    "aria-expanded"
                )
            ===
            "true";


        /*
            Once desktop navigation becomes visible again,
            close any open tablet/mobile menu.
        */

        if (
            window.innerWidth > 1100
            &&
            isOpen
        ) {

            this.closeMenu();

        }



        /*
            Recalculate transparent/solid boundary because
            responsive layout changes can alter hero height.
        */

        this._onScroll();

    }



    /* ========================================================
       20. KEYBOARD
    ======================================================== */

    _onKeydown(event) {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }



        const wasOpen =
            this.menuButton
                ?.getAttribute(
                    "aria-expanded"
                )
            ===
            "true";


        if (
            !wasOpen
        ) {
            return;
        }



        this.closeMenu();


        this.menuButton
            ?.focus();

    }

}



/* ============================================================
   REGISTER COMPONENT
============================================================ */

if (
    !customElements.get(
        "gym-navbar"
    )
) {

    customElements.define(
        "gym-navbar",
        GymNavbar
    );

}