/* ============================================================
   ALPHONSIANS' GYM
   WELLNESS PAGE — WELLNESS.JS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       01. RECIPE DATA
    ======================================================== */

    const recipes = {
        "recipe-01": {
            number: "01",
            title: "Banana Peanut Oats",
            image: "./img/recipe-banana-oats.webp",
            imageAlt: "Banana and peanut oats topped with sliced fruit",
            facts: [
                { label: "Preparation", value: "5 minutes" },
                { label: "Cooking", value: "5 minutes" },
                { label: "Servings", value: "1" }
            ],
            ingredients: [
                "½ cup rolled oats",
                "1 cup milk or a plant-based alternative",
                "1 small ripe banana",
                "1 tablespoon peanut butter",
                "½ teaspoon cinnamon",
                "1 teaspoon chia seeds",
                "Sliced banana or seasonal fruit for topping"
            ],
            method: [
                "Add the oats and milk to a small saucepan.",
                "Cook over medium heat for 4–5 minutes, stirring occasionally, until the oats become soft and creamy.",
                "Mash half of the banana and stir it into the oats.",
                "Add the peanut butter, cinnamon and chia seeds.",
                "Transfer to a bowl and finish with the remaining sliced banana or seasonal fruit."
            ],
            note: "A practical breakfast combining carbohydrates, fibre and healthy fats to support steady morning energy."
        },

        "recipe-02": {
            number: "02",
            title: "Egg & Veggie Wrap",
            image: "./img/recipe-egg-wrap.webp",
            imageAlt: "Egg and vegetable wrap served with fresh greens",
            facts: [
                { label: "Preparation", value: "10 minutes" },
                { label: "Cooking", value: "10 minutes" },
                { label: "Servings", value: "1" }
            ],
            ingredients: [
                "1 whole-wheat chapati or wrap",
                "2 eggs",
                "¼ cup finely chopped onion",
                "¼ cup chopped tomato",
                "¼ cup chopped capsicum",
                "A handful of spinach",
                "1 teaspoon cooking oil",
                "Salt and pepper to taste"
            ],
            method: [
                "Crack the eggs into a bowl, season lightly and whisk until combined.",
                "Heat the oil in a pan and sauté the onion, tomato and capsicum for 2–3 minutes.",
                "Add the spinach and cook until it begins to wilt.",
                "Pour in the eggs and gently scramble them with the vegetables.",
                "Place the mixture in the centre of the chapati or wrap.",
                "Fold the sides inward, roll firmly and serve warm."
            ],
            note: "Eggs provide protein, while the vegetables and whole-wheat wrap add fibre and help make the meal more filling."
        },

        "recipe-03": {
            number: "03",
            title: "Chickpea Crunch Bowl",
            image: "./img/recipe-chickpea-bowl.webp",
            imageAlt: "Chickpea bowl with cucumber, tomato and herbs",
            facts: [
                { label: "Preparation", value: "15 minutes" },
                { label: "Cooking", value: "No cooking" },
                { label: "Servings", value: "2" }
            ],
            ingredients: [
                "1 cup cooked chickpeas",
                "½ cucumber, diced",
                "1 medium tomato, diced",
                "¼ cup grated carrot",
                "¼ cup chopped onion",
                "A handful of fresh coriander",
                "1 tablespoon lemon juice",
                "½ teaspoon roasted cumin powder",
                "Salt and pepper to taste"
            ],
            method: [
                "Drain and rinse the cooked chickpeas thoroughly.",
                "Place the chickpeas, cucumber, tomato, carrot and onion in a large bowl.",
                "Add the chopped coriander and roasted cumin powder.",
                "Pour over the lemon juice and season lightly with salt and pepper.",
                "Mix everything together and serve immediately, or chill before serving."
            ],
            note: "Chickpeas provide plant-based protein and fibre, making this a useful option for a quick and satisfying lunch."
        },

        "recipe-04": {
            number: "04",
            title: "Cucumber Curd Rice",
            image: "./img/recipe-curd-rice.webp",
            imageAlt: "Curd rice served with cucumber and tempered spices",
            facts: [
                { label: "Preparation", value: "10 minutes" },
                { label: "Cooking", value: "5 minutes" },
                { label: "Servings", value: "2" }
            ],
            ingredients: [
                "1½ cups cooked and cooled rice",
                "1 cup plain curd",
                "½ cucumber, finely chopped or grated",
                "1 tablespoon milk, if needed",
                "½ teaspoon mustard seeds",
                "½ teaspoon grated ginger",
                "A few curry leaves",
                "1 teaspoon cooking oil",
                "Salt to taste"
            ],
            method: [
                "Lightly mash the cooled rice in a mixing bowl.",
                "Add the curd, cucumber and salt, then mix until evenly combined.",
                "Add a small amount of milk if a softer consistency is preferred.",
                "Heat the oil in a small pan and add the mustard seeds.",
                "Once they begin to crackle, add the ginger and curry leaves.",
                "Pour the tempering over the curd rice, mix gently and serve."
            ],
            note: "This cooling and familiar meal can be paired with vegetables or a protein source for a more balanced lunch."
        },

        "recipe-05": {
            number: "05",
            title: "Paneer Millet Bowl",
            image: "./img/recipe-paneer-millet.webp",
            imageAlt: "Paneer and millet bowl with colourful vegetables",
            facts: [
                { label: "Preparation", value: "10 minutes" },
                { label: "Cooking", value: "20 minutes" },
                { label: "Servings", value: "2" }
            ],
            ingredients: [
                "1 cup cooked millet",
                "150 g paneer, cut into cubes",
                "½ cup chopped capsicum",
                "½ cup chopped beans",
                "½ cup grated or sliced carrot",
                "1 teaspoon cooking oil",
                "½ teaspoon turmeric powder",
                "½ teaspoon cumin powder",
                "1 tablespoon lemon juice",
                "Salt and pepper to taste"
            ],
            method: [
                "Heat half of the oil in a pan over medium heat.",
                "Add the paneer and cook until lightly golden on each side, then set it aside.",
                "Add the remaining oil and sauté the vegetables until tender but still slightly crisp.",
                "Season with turmeric, cumin, salt and pepper.",
                "Add the cooked millet and paneer to the pan.",
                "Mix gently until everything is heated through.",
                "Finish with lemon juice and serve warm."
            ],
            note: "Millet supplies complex carbohydrates, while paneer adds protein to support energy and post-activity recovery."
        },

        "recipe-06": {
            number: "06",
            title: "Vegetable Poha",
            image: "./img/recipe-vegetable-poha.webp",
            imageAlt: "Vegetable poha with peas, carrots and fresh coriander",
            facts: [
                { label: "Preparation", value: "10 minutes" },
                { label: "Cooking", value: "10 minutes" },
                { label: "Servings", value: "2" }
            ],
            ingredients: [
                "1½ cups poha",
                "½ small onion, finely chopped",
                "¼ cup peas",
                "¼ cup finely chopped carrot",
                "1 small green chilli, optional",
                "½ teaspoon mustard seeds",
                "¼ teaspoon turmeric powder",
                "1 teaspoon cooking oil",
                "1 tablespoon lemon juice",
                "Fresh coriander for serving",
                "Salt to taste"
            ],
            method: [
                "Place the poha in a colander and rinse it briefly under running water.",
                "Set it aside for a few minutes until softened but not mushy.",
                "Heat the oil in a pan and add the mustard seeds.",
                "Add the onion, carrot and peas and cook for 3–4 minutes.",
                "Stir in the turmeric and a small amount of salt.",
                "Add the softened poha and mix gently until evenly combined.",
                "Cook for another 2–3 minutes.",
                "Finish with lemon juice and fresh coriander before serving."
            ],
            note: "Poha provides carbohydrates for energy, while adding vegetables makes this familiar breakfast more filling and varied."
        },

        "recipe-07": {
            number: "07",
            title: "Sprout Chaat",
            image: "./img/recipe-sprout-chaat.webp",
            imageAlt: "Fresh sprout chaat with tomato, cucumber, onion and coriander",
            facts: [
                { label: "Preparation", value: "15 minutes" },
                { label: "Cooking", value: "No cooking" },
                { label: "Servings", value: "2" }
            ],
            ingredients: [
                "1½ cups cooked or ready-to-eat sprouts",
                "½ cucumber, diced",
                "1 medium tomato, diced",
                "¼ cup finely chopped onion",
                "A handful of fresh coriander",
                "1 tablespoon lemon juice",
                "½ teaspoon roasted cumin powder",
                "A pinch of chaat masala, optional",
                "Salt and pepper to taste"
            ],
            method: [
                "Place the sprouts in a large mixing bowl.",
                "Add the cucumber, tomato and onion.",
                "Add the coriander, roasted cumin and optional chaat masala.",
                "Pour over the lemon juice.",
                "Season lightly with salt and pepper.",
                "Mix everything together and serve immediately."
            ],
            note: "Sprouts contribute plant-based protein and fibre, making this a convenient snack when you want something fresh but substantial."
        },

        "recipe-08": {
            number: "08",
            title: "Lentil Veggie Khichdi",
            image: "./img/recipe-veggie-khichdi.webp",
            imageAlt: "Lentil and vegetable khichdi served warm with fresh herbs",
            facts: [
                { label: "Preparation", value: "10 minutes" },
                { label: "Cooking", value: "20 minutes" },
                { label: "Servings", value: "2" }
            ],
            ingredients: [
                "½ cup rice",
                "½ cup moong dal",
                "½ cup mixed vegetables such as carrot, peas and beans",
                "¼ teaspoon turmeric powder",
                "½ teaspoon cumin seeds",
                "1 teaspoon cooking oil or ghee",
                "3 cups water",
                "Salt to taste",
                "Fresh coriander for serving"
            ],
            method: [
                "Rinse the rice and moong dal thoroughly.",
                "Heat the oil or ghee in a pot and add the cumin seeds.",
                "Add the vegetables and cook for 2–3 minutes.",
                "Stir in the turmeric.",
                "Add the rice and dal and mix briefly.",
                "Pour in the water and add salt.",
                "Cover and cook until the rice and lentils are soft and the mixture becomes creamy.",
                "Add a little more water if a softer consistency is preferred.",
                "Finish with fresh coriander and serve warm."
            ],
            note: "Combining rice, lentils and vegetables creates a simple one-pot meal with carbohydrates, plant-based protein and a variety of nutrients."
        }
    };


    /* ========================================================
       02. ORDER + ELEMENTS
    ======================================================== */

    const recipeOrder = Object.keys(recipes);

    const recipeDialog = document.getElementById("recipeDialog");
    const recipeDialogPanel = recipeDialog?.querySelector(".recipe-dialog-panel");

    const dialogCloseButton = document.getElementById("recipeDialogClose");
    const dialogPreviousButton = document.getElementById("recipeDialogPrevious");
    const dialogNextButton = document.getElementById("recipeDialogNext");
    const dialogDownloadButton = document.getElementById("recipeDialogDownload");

    const dialogImage = document.getElementById("recipeDialogImage");
    const dialogNumber = document.getElementById("recipeDialogNumber");
    const dialogTitle = document.getElementById("recipeDialogTitle");
    const dialogFacts = document.getElementById("recipeDialogFacts");
    const dialogIngredients = document.getElementById("recipeDialogIngredients");
    const dialogMethod = document.getElementById("recipeDialogMethod");
    const dialogNote = document.getElementById("recipeDialogNote");

    const recipeScroller = document.querySelector(".recipe-scroller");
    const recipeButtons = recipeScroller
        ? Array.from(recipeScroller.querySelectorAll("[data-recipe-open]"))
        : [];


    /* ========================================================
       03. STATE
    ======================================================== */

    let currentRecipeId = null;
    let lastFocusedElement = null;
    let pageScrollPosition = 0;


    /* ========================================================
       04. HELPERS
    ======================================================== */

    function getRecipeIndex(recipeId) {
        return recipeOrder.indexOf(recipeId);
    }

    function getPreviousRecipeId(recipeId) {
        const currentIndex = getRecipeIndex(recipeId);

        if (currentIndex <= 0) {
            return null;
        }

        return recipeOrder[currentIndex - 1];
    }

    function getNextRecipeId(recipeId) {
        const currentIndex = getRecipeIndex(recipeId);

        if (currentIndex === -1 || currentIndex >= recipeOrder.length - 1) {
            return null;
        }

        return recipeOrder[currentIndex + 1];
    }

    function updateDialogNavButtons() {
        if (!dialogPreviousButton || !dialogNextButton || !currentRecipeId) {
            return;
        }

        const previousId = getPreviousRecipeId(currentRecipeId);
        const nextId = getNextRecipeId(currentRecipeId);

        dialogPreviousButton.disabled = !previousId;
        dialogNextButton.disabled = !nextId;
    }

    function createFactItem(fact) {
        const wrapper = document.createElement("div");
        const term = document.createElement("dt");
        const description = document.createElement("dd");

        term.textContent = fact.label;
        description.textContent = fact.value;

        wrapper.append(term, description);
        return wrapper;
    }

    function createListItem(content) {
        const item = document.createElement("li");
        item.textContent = content;
        return item;
    }

    function populateRecipeDialog(recipeId) {
        const recipe = recipes[recipeId];

        if (
            !recipe ||
            !dialogNumber ||
            !dialogTitle ||
            !dialogImage ||
            !dialogFacts ||
            !dialogIngredients ||
            !dialogMethod ||
            !dialogNote
        ) {
            return false;
        }

        currentRecipeId = recipeId;

        dialogNumber.textContent = `${recipe.number} / Recipe`;
        dialogTitle.textContent = recipe.title;

        dialogImage.src = recipe.image;
        dialogImage.alt = recipe.imageAlt;

        dialogFacts.replaceChildren(
            ...recipe.facts.map(createFactItem)
        );

        dialogIngredients.replaceChildren(
            ...recipe.ingredients.map(createListItem)
        );

        dialogMethod.replaceChildren(
            ...recipe.method.map(createListItem)
        );

        dialogNote.textContent = recipe.note;

        updateDialogNavButtons();

        return true;
    }


    /* ========================================================
       05. PAGE SCROLL LOCK
    ======================================================== */

    function lockPageScroll() {
        pageScrollPosition = window.scrollY;

        document.body.classList.add("recipe-open");
        document.body.style.position = "fixed";
        document.body.style.top = `-${pageScrollPosition}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
    }

    function unlockPageScroll() {
        document.body.classList.remove("recipe-open");
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";

        window.scrollTo(0, pageScrollPosition);
    }


    /* ========================================================
       06. OPEN / CLOSE DIALOG
    ======================================================== */

    function openRecipeDialog(recipeId, triggerElement) {
        if (!recipeDialog) {
            return;
        }

        const populated = populateRecipeDialog(recipeId);

        if (!populated) {
            return;
        }

        if (triggerElement) {
            lastFocusedElement = triggerElement;
        }

        if (typeof recipeDialog.showModal === "function") {
            if (!recipeDialog.open) {
                recipeDialog.showModal();
                lockPageScroll();
            }
        } else {
            recipeDialog.setAttribute("open", "");
            lockPageScroll();
        }

        requestAnimationFrame(() => {
            dialogCloseButton?.focus();
        });
    }

    function closeRecipeDialog() {
        if (!recipeDialog) {
            return;
        }

        if (typeof recipeDialog.close === "function" && recipeDialog.open) {
            recipeDialog.close();
            return;
        }

        recipeDialog.removeAttribute("open");
        handleDialogClosed();
    }

    function handleDialogClosed() {
        unlockPageScroll();

        if (dialogImage) {
            dialogImage.removeAttribute("src");
            dialogImage.alt = "";
        }

        currentRecipeId = null;

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {
            lastFocusedElement.focus({ preventScroll: true });
        }

        lastFocusedElement = null;
    }


    /* ========================================================
       07. PREVIOUS / NEXT RECIPE
    ======================================================== */

    function showPreviousRecipe() {
        if (!currentRecipeId) {
            return;
        }

        const previousId = getPreviousRecipeId(currentRecipeId);

        if (!previousId) {
            return;
        }

        populateRecipeDialog(previousId);
    }

    function showNextRecipe() {
        if (!currentRecipeId) {
            return;
        }

        const nextId = getNextRecipeId(currentRecipeId);

        if (!nextId) {
            return;
        }

        populateRecipeDialog(nextId);
    }


    /* ========================================================
       08. DOWNLOAD CURRENT RECIPE
    ======================================================== */

    function buildRecipeDownloadText(recipe) {
        const factsText = recipe.facts
            .map((fact) => `${fact.label}: ${fact.value}`)
            .join("\n");

        const ingredientsText = recipe.ingredients
            .map((item) => `- ${item}`)
            .join("\n");

        const methodText = recipe.method
            .map((step, index) => `${index + 1}. ${step}`)
            .join("\n");

        return [
            `${recipe.number}. ${recipe.title}`,
            "",
            factsText,
            "",
            "INGREDIENTS",
            ingredientsText,
            "",
            "METHOD",
            methodText,
            "",
            "NOTE",
            recipe.note
        ].join("\n");
    }

    function downloadCurrentRecipe() {
        if (!currentRecipeId) {
            return;
        }

        const recipe = recipes[currentRecipeId];

        if (!recipe) {
            return;
        }

        const fileContent = buildRecipeDownloadText(recipe);
        const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        const safeTitle = recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        link.href = blobUrl;
        link.download = `${recipe.number}-${safeTitle}.txt`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(blobUrl);
    }


    /* ========================================================
       09. RECIPE CARD CLICKS
    ======================================================== */

    if (recipeScroller) {
        recipeScroller.addEventListener("click", (event) => {
            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            const button = target.closest("[data-recipe-open]");

            if (!button || !recipeScroller.contains(button)) {
                return;
            }

            const recipeId = button.dataset.recipeOpen;

            if (!recipeId) {
                return;
            }

            openRecipeDialog(recipeId, button);
        });
    }


    /* ========================================================
       10. DIALOG BUTTON EVENTS
    ======================================================== */

    dialogCloseButton?.addEventListener("click", closeRecipeDialog);
    dialogPreviousButton?.addEventListener("click", showPreviousRecipe);
    dialogNextButton?.addEventListener("click", showNextRecipe);
    dialogDownloadButton?.addEventListener("click", downloadCurrentRecipe);


    /* ========================================================
       11. DIALOG BACKDROP + KEYBOARD
    ======================================================== */

    recipeDialog?.addEventListener("click", (event) => {
        if (!recipeDialogPanel) {
            return;
        }

        if (recipeDialogPanel.contains(event.target)) {
            return;
        }

        closeRecipeDialog();
    });

    recipeDialog?.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeRecipeDialog();
    });

    recipeDialog?.addEventListener("close", handleDialogClosed);

    recipeDialog?.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPreviousRecipe();
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showNextRecipe();
        }
    });


    /* ========================================================
       12. HORIZONTAL RECIPE SCROLLER

       Uses axis locking so a vertical reading gesture does not
       accidentally become a horizontal recipe drag on touch
       devices.
    ======================================================== */

    if (recipeScroller) {
        let pointerIsDown = false;
        let isDragging = false;
        let suppressNextClick = false;
        let pointerStartX = 0;
        let pointerStartY = 0;
        let initialScrollLeft = 0;
        let activePointerId = null;
        let dragAxis = null;

        const dragThreshold = 8;
        const horizontalIntentRatio = 1.15;

        function resetDragState() {
            pointerIsDown = false;
            isDragging = false;
            activePointerId = null;
            dragAxis = null;

            recipeScroller.classList.remove("is-dragging");
        }

        function handlePointerDown(event) {
            if (event.pointerType === "mouse" && event.button !== 0) {
                return;
            }

            pointerIsDown = true;
            isDragging = false;
            suppressNextClick = false;
            activePointerId = event.pointerId;
            dragAxis = null;

            pointerStartX = event.clientX;
            pointerStartY = event.clientY;
            initialScrollLeft = recipeScroller.scrollLeft;
        }

        function handlePointerMove(event) {
            if (!pointerIsDown) {
                return;
            }

            if (activePointerId !== event.pointerId) {
                return;
            }

            const deltaX = event.clientX - pointerStartX;
            const deltaY = event.clientY - pointerStartY;

            if (!dragAxis) {
                if (
                    Math.abs(deltaX) < dragThreshold &&
                    Math.abs(deltaY) < dragThreshold
                ) {
                    return;
                }

                if (
                    Math.abs(deltaX) >
                    Math.abs(deltaY) * horizontalIntentRatio
                ) {
                    dragAxis = "horizontal";
                    isDragging = true;

                    recipeScroller.classList.add("is-dragging");

                    try {
                        recipeScroller.setPointerCapture(event.pointerId);
                    } catch {
                        /* Progressive enhancement only. */
                    }
                } else {
                    dragAxis = "vertical";
                    return;
                }
            }

            if (dragAxis !== "horizontal") {
                return;
            }

            event.preventDefault();
            recipeScroller.scrollLeft = initialScrollLeft - deltaX;
        }

        function handlePointerEnd(event) {
            if (!pointerIsDown) {
                return;
            }

            if (
                activePointerId !== null &&
                event.pointerId !== activePointerId
            ) {
                return;
            }

            if (dragAxis === "horizontal" && isDragging) {
                suppressNextClick = true;
            }

            if (recipeScroller.hasPointerCapture?.(event.pointerId)) {
                recipeScroller.releasePointerCapture(event.pointerId);
            }

            resetDragState();
        }

        recipeScroller.addEventListener("pointerdown", handlePointerDown);
        recipeScroller.addEventListener("pointermove", handlePointerMove);
        recipeScroller.addEventListener("pointerup", handlePointerEnd);
        recipeScroller.addEventListener("pointercancel", handlePointerEnd);

        recipeScroller.addEventListener("lostpointercapture", resetDragState);

        recipeScroller.addEventListener("click", (event) => {
            if (!suppressNextClick) {
                return;
            }

            event.preventDefault();
            event.stopImmediatePropagation();
            suppressNextClick = false;
        }, true);

        recipeScroller.addEventListener("wheel", (event) => {
            if (!event.shiftKey) {
                return;
            }

            const movement =
                event.deltaY !== 0
                    ? event.deltaY
                    : event.deltaX;

            if (movement === 0) {
                return;
            }

            event.preventDefault();
            recipeScroller.scrollLeft += movement;
        }, { passive: false });

        recipeScroller.addEventListener("keydown", (event) => {
            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            const currentCard = target.closest("[data-recipe-open]");

            if (!currentCard) {
                return;
            }

            const currentIndex = recipeButtons.indexOf(currentCard);

            if (currentIndex === -1) {
                return;
            }

            let nextIndex = null;

            if (event.key === "ArrowRight") {
                nextIndex = Math.min(
                    currentIndex + 1,
                    recipeButtons.length - 1
                );
            }

            if (event.key === "ArrowLeft") {
                nextIndex = Math.max(currentIndex - 1, 0);
            }

            if (event.key === "Home") {
                nextIndex = 0;
            }

            if (event.key === "End") {
                nextIndex = recipeButtons.length - 1;
            }

            if (nextIndex === null) {
                return;
            }

            event.preventDefault();

            const nextCard = recipeButtons[nextIndex];
            nextCard.focus();
            nextCard.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest"
            });
        });
    }

});