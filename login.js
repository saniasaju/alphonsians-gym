/* ============================================================
   SKIP HOME INTRO AFTER CLOSING LOGIN
============================================================ */

const skipHomeIntro =
    sessionStorage.getItem(
        "skipHomeIntro"
    ) === "true";


if (skipHomeIntro) {

    document.documentElement.classList.add(
        "skip-home-intro"
    );


    sessionStorage.removeItem(
        "skipHomeIntro"
    );

}

/* ============================================================
   PASSWORD VISIBILITY
============================================================ */

const passwordInput =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");


passwordToggle.addEventListener(
    "click",
    () => {

        const hidden =
            passwordInput.type === "password";


        passwordInput.type =
            hidden
                ? "text"
                : "password";


        passwordToggle.textContent =
            hidden
                ? "Hide"
                : "Show";


        passwordToggle.setAttribute(
            "aria-label",
            hidden
                ? "Hide password"
                : "Show password"
        );


        passwordToggle.setAttribute(
            "aria-pressed",
            String(hidden)
        );

    }
);



/* ============================================================
   PROTOTYPE LOGIN
============================================================ */

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const studentId =
            document
                .getElementById("studentId")
                .value
                .trim();


        const password =
            passwordInput
                .value
                .trim();


        if (
            !studentId ||
            !password
        ) {

            loginMessage.textContent =
                "Please enter your student ID and password.";

            return;

        }


        loginMessage.textContent =
            "Login successful. Redirecting…";


        /*
            Prototype behaviour.

            Once a real authentication system exists,
            this would be replaced by authentication.
        */

        window.setTimeout(
            () => {

                window.location.href =
                    "booking.html";

            },
            700
        );

    }
);

/* ============================================================
   CLOSE LOGIN
============================================================ */

 const loginClose =
    document.getElementById("loginClose");


if (loginClose) {

    loginClose.addEventListener(
        "click",
        event => {

            event.preventDefault();


            sessionStorage.setItem(
                "skipHomeIntro",
                "true"
            );


            document.body.classList.add(
                "is-closing"
            );


            setTimeout(
                () => {

                    window.location.href =
                        "index.html";

                },
                160
            );

        }
    );

}