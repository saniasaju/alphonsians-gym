/* ============================================================
   ALPHONSIANS' GYM
   REUSABLE FOOTER COMPONENT — GYM-FOOTER.JS

   Usage:

   <gym-footer count="05 — 05"></gym-footer>

   Optional page-specific values:

   <gym-footer
       label="Contact"
       count="04 — 04"
   ></gym-footer>
============================================================ */


class GymFooter extends HTMLElement {

    connectedCallback() {


        /* ========================================================
           01. PAGE-SPECIFIC VALUES
        ======================================================== */

        const count =
            this.getAttribute("count") ||
            "05 — 05";


        const label =
            this.getAttribute("label") ||
            "Contact";



        /* ========================================================
           02. ADD RESPONSIVE STYLES
        ======================================================== */

        this.ensureResponsiveStyles();



        /* ========================================================
           03. CREATE FOOTER
        ======================================================== */

        const footer =
            document.createElement(
                "footer"
            );


        footer.className =
            "footer";


        footer.setAttribute(
            "aria-label",
            "Site footer"
        );



        /* ========================================================
           04. FOOTER CONTENT
        ======================================================== */

        footer.innerHTML = `

            <div class="container">


                <!-- ==========================================
                     FOOTER META
                =========================================== -->

                <div class="section-label light-label">

                    <span>
                        ( ${label} )
                    </span>


                    <span
                        class="section-count section-count--light"
                    >
                        ${count}
                    </span>

                </div>



                <!-- ==========================================
                     FOOTER MAIN
                =========================================== -->

                <div class="footer-main">

                    <h2>
                        MOVE. TRAIN. THRIVE.
                    </h2>


                    <p>

                        Alphonsa College,
                        Arunapuram P.O.,
                        Pala, Kottayam, Kerala


                        <a
                            href="mailto:alphonsacollegepala@gmail.com"
                        >
                            Email us ↗
                        </a>

                    </p>

                </div>



                <!-- ==========================================
                     FOOTER BOTTOM
                =========================================== -->

                <div class="footer-bottom">

                    <span>
                        Alphonsians' Gym
                    </span>


                    <span>
                        Students Wellness
                    </span>


                    <span>
                        © 2026
                    </span>

                </div>


            </div>

        `;



        /* ========================================================
           05. REPLACE CUSTOM ELEMENT
        ======================================================== */

        this.replaceWith(
            footer
        );

    }



    /* ============================================================
       RESPONSIVE STYLES
    ============================================================ */

    ensureResponsiveStyles() {


        const styleId =
            "gym-footer-responsive-styles";



        /* --------------------------------------------------------
           Only add the stylesheet once.
        --------------------------------------------------------- */

        if (
            document.getElementById(
                styleId
            )
        ) {

            return;

        }



        const style =
            document.createElement(
                "style"
            );


        style.id =
            styleId;



        style.textContent = `


            /* ====================================================
               ALPHONSIANS' GYM
               FOOTER — RESPONSIVE OVERRIDES

               Desktop styles remain controlled by style.css.
            ===================================================== */



            /* ====================================================
               SHARED FOOTER SAFETY
            ===================================================== */

            .footer,
            .footer > .container,
            .footer-main,
            .footer-bottom {

                min-width: 0;

            }



            /*
                The title must NEVER wrap.

                style.css already uses nowrap on desktop.
                This makes that behaviour explicit across
                every responsive breakpoint too.
            */

            .footer-main h2 {

                white-space: nowrap !important;

                max-width: 100%;

            }



            /* ====================================================
               TABLET
               <= 1100px
            ===================================================== */

            @media (max-width: 1100px) {


                /* --------------------------------------------
                   FOOTER
                --------------------------------------------- */

                .footer {

                    padding:
                        var(--section-space)
                        0
                        var(--space-l);

                }



                /* --------------------------------------------
                   TITLE

                   Scale rather than wrap.
                --------------------------------------------- */

                .footer-main h2 {

                    font-size:
                        clamp(
                            2.7rem,
                            7vw,
                            5rem
                        );

                    white-space:
                        nowrap !important;

                }



                /* --------------------------------------------
                   ADDRESS
                --------------------------------------------- */

                .footer-main > p {

                    max-width:
                        min(
                            var(--footer-copy-max),
                            620px
                        );

                    margin-top:
                        var(--space-l);

                }



                /* --------------------------------------------
                   FOOTER BOTTOM

                   Override the column layout that exists
                   in the responsive style.css.
                --------------------------------------------- */

                .footer-bottom {

                    display: grid !important;

                    grid-template-columns:
                        minmax(0, 1fr)
                        minmax(0, auto)
                        minmax(0, 1fr);

                    align-items:
                        center;

                    width: 100%;

                    gap:
                        var(--space-m);

                    flex-direction:
                        row !important;

                    flex-wrap:
                        nowrap !important;

                }



                .footer-bottom > span {

                    min-width: 0;

                }



                .footer-bottom > span:first-child {

                    text-align: left;

                }



                .footer-bottom > span:nth-child(2) {

                    text-align: center;

                }



                .footer-bottom > span:last-child {

                    text-align: right;

                    white-space: nowrap;

                }

            }



            /* ====================================================
               PORTRAIT TABLET
               <= 900px
            ===================================================== */

            @media (max-width: 900px) {


                .footer-main {

                    padding-block:
                        clamp(
                            48px,
                            8vh,
                            80px
                        );

                }



                .footer-main h2 {

                    font-size:
                        clamp(
                            2.5rem,
                            7vw,
                            4.5rem
                        );

                    white-space:
                        nowrap !important;

                }



                .footer-bottom {

                    gap:
                        var(--space-s);

                }

            }



            /* ====================================================
               MOBILE
               <= 720px
            ===================================================== */

            @media (max-width: 720px) {


                /* --------------------------------------------
                   FOOTER SHELL
                --------------------------------------------- */

                .footer {

                    padding:
                        var(--space-xl)
                        0
                        max(
                            var(--space-l),
                            env(
                                safe-area-inset-bottom
                            )
                        );

                }



                /* --------------------------------------------
                   META
                --------------------------------------------- */

                .footer .section-label {

                    gap:
                        var(--space-s);

                }



                /* --------------------------------------------
                   MAIN
                --------------------------------------------- */

                .footer-main {

                    padding-block:
                        clamp(
                            44px,
                            9vh,
                            72px
                        );

                }



                /*
                    Important:

                    Do NOT allow this heading to stack.

                    It simply becomes smaller as the viewport
                    becomes narrower.
                */

                .footer-main h2 {

                    width: 100%;

                    max-width: 100%;

                    margin-inline: auto;

                    font-size:
                        clamp(
                            1.45rem,
                            7.2vw,
                            4.25rem
                        );

                    line-height: 0.9;

                    white-space:
                        nowrap !important;

                    text-wrap:
                        nowrap;

                }



                /* --------------------------------------------
                   ADDRESS
                --------------------------------------------- */

                .footer-main > p {

                    width: 100%;

                    max-width: 34rem;

                    margin-top:
                        var(--space-l);

                    line-height: 1.7;

                }



                /* --------------------------------------------
                   EMAIL LINK
                --------------------------------------------- */

                .footer-main > p a {

                    min-height:
                        var(--control-size);

                    display:
                        inline-flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    margin:
                        var(--space-xs)
                        auto
                        0;

                }



                /* --------------------------------------------
                   FOOTER BOTTOM

                   Keep all three areas on ONE ROW.
                --------------------------------------------- */

                .footer-bottom {

                    display: grid !important;

                    grid-template-columns:
                        minmax(0, 1fr)
                        minmax(0, 1.35fr)
                        minmax(0, 0.55fr);

                    align-items:
                        center;

                    width: 100%;

                    gap:
                        clamp(
                            8px,
                            2vw,
                            16px
                        );

                    padding-top:
                        var(--space-m);

                    flex-direction:
                        row !important;

                    flex-wrap:
                        nowrap !important;

                    text-align:
                        initial;

                }



                .footer-bottom > span {

                    min-width: 0;

                    line-height: 1.35;

                }



                .footer-bottom > span:first-child {

                    text-align: left;

                }



                .footer-bottom > span:nth-child(2) {

                    text-align: center;

                }



                .footer-bottom > span:last-child {

                    text-align: right;

                    white-space: nowrap;

                }

            }



            /* ====================================================
               COMPACT MOBILE
               <= 480px
            ===================================================== */

            @media (max-width: 480px) {


                /* --------------------------------------------
                   MAIN
                --------------------------------------------- */

                .footer-main {

                    padding-block:
                        clamp(
                            40px,
                            8vh,
                            60px
                        );

                }



                /*
                    Keep the full title horizontally aligned.

                    At very narrow widths the font scales down,
                    instead of breaking into three lines.
                */

                .footer-main h2 {

                    font-size:
                        clamp(
                            1.35rem,
                            7vw,
                            2.2rem
                        );

                    white-space:
                        nowrap !important;

                }



                .footer-main > p {

                    max-width: 28rem;

                }



                /* --------------------------------------------
                   FOOTER BOTTOM

                   Still one horizontal row.
                --------------------------------------------- */

                .footer-bottom {

                    grid-template-columns:
                        minmax(0, 1fr)
                        minmax(0, 1.5fr)
                        minmax(0, 0.55fr);

                    gap:
                        6px;

                    line-height:
                        1.35;

                }



                /*
                    The first and last items should always
                    remain single-line.

                    The centre item may naturally use two lines
                    only on extremely narrow devices, while the
                    overall footer remains one horizontal row.
                */

                .footer-bottom > span:first-child,
                .footer-bottom > span:last-child {

                    white-space: nowrap;

                }

            }



            /* ====================================================
               VERY SMALL MOBILE
               <= 360px
            ===================================================== */

            @media (max-width: 360px) {


                .footer-main h2 {

                    font-size:
                        clamp(
                            1.25rem,
                            6.8vw,
                            1.55rem
                        );

                }



                .footer-bottom {

                    grid-template-columns:
                        minmax(0, 1fr)
                        minmax(0, 1.35fr)
                        auto;

                    gap:
                        4px;

                    letter-spacing:
                        0.03em;

                }

            }



            /* ====================================================
               SHORT VIEWPORTS
            ===================================================== */

            @media
                (max-height: 680px)
                and
                (min-width: 721px) {


                .footer {

                    min-height:
                        680px;

                }



                .footer-main {

                    padding-block:
                        var(--space-xl);

                }

            }



            /* ====================================================
               TOUCH DEVICES
            ===================================================== */

            @media
                (hover: none)
                and
                (pointer: coarse) {


                .footer-main > p a:hover::after {

                    width: 0;

                }

            }



            /* ====================================================
               REDUCED MOTION
            ===================================================== */

            @media
                (prefers-reduced-motion: reduce) {


                .footer-main > p a::after {

                    transition:
                        none;

                }

            }

        `;



        /* ========================================================
           ADD TO PAGE
        ======================================================== */

        document.head.appendChild(
            style
        );

    }

}



/* ============================================================
   REGISTER COMPONENT
============================================================ */

if (
    !customElements.get(
        "gym-footer"
    )
) {

    customElements.define(
        "gym-footer",
        GymFooter
    );

}