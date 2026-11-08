
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // SCREEN NAVIGATION
    // =========================

    const screens = document.querySelectorAll(".screen");

    function showScreen(screenId) {

        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        const selectedScreen = document.getElementById(screenId);

        selectedScreen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // =========================
    // BUTTONS
    // =========================

    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const letterButton = document.getElementById("letterButton");
    const finishButton = document.getElementById("finishButton");
    const restartButton = document.getElementById("restartButton");


    startButton.addEventListener("click", () => {
        showScreen("flowers");
    });


    nextButton.addEventListener("click", () => {
        showScreen("reminders");
    });


    letterButton.addEventListener("click", () => {
        showScreen("letter");
    });


    finishButton.addEventListener("click", () => {
        showScreen("ending");
        createPetalBurst();
    });


    restartButton.addEventListener("click", () => {

        // Reset the envelope
        envelope.classList.remove("open");

        // Reset letter button
        finishButton.classList.add("hidden");

        // Restore instruction
        envelopeInstruction.textContent =
            "Tap the envelope to open your letter.";

        // Return to welcome screen
        showScreen("welcome");

    });


    // =========================
    // ENVELOPE INTERACTION
    // =========================

    const envelope = document.getElementById("envelope");

    const envelopeInstruction =
        document.getElementById("envelopeInstruction");


    envelope.addEventListener("click", () => {

        // Prevent opening multiple times
        if (envelope.classList.contains("open")) {
            return;
        }

        envelope.classList.add("open");

        envelopeInstruction.textContent =
            "yey inopen moo, mwaaaaa ♡";

        // Show the final button after the letter opens
        setTimeout(() => {

            finishButton.classList.remove("hidden");

        }, 1500);

    });


    // =========================
    // FLOATING PETALS
    // =========================

    const petalContainer =
        document.getElementById("petalContainer");

    const petalColors = [
        "#f4c4c4",
        "#f6d98b",
        "#f7d6b5",
        "#e9c5d2"
    ];


    function createPetal() {

        const petal = document.createElement("span");

        petal.classList.add("petal");

        const randomLeft = Math.random() * 100;
        const randomDuration = Math.random() * 5 + 6;
        const randomDelay = Math.random() * 2;
        const randomSize = Math.random() * 8 + 8;

        const randomColor =
            petalColors[
                Math.floor(Math.random() * petalColors.length)
            ];

        petal.style.left = `${randomLeft}%`;
        petal.style.animationDuration = `${randomDuration}s`;
        petal.style.animationDelay = `${randomDelay}s`;
        petal.style.width = `${randomSize}px`;
        petal.style.height = `${randomSize + 5}px`;
        petal.style.background = randomColor;

        petalContainer.appendChild(petal);

        // Remove petal after animation
        petal.addEventListener("animationend", () => {
            petal.remove();
        });

    }


    // Create petals periodically
    const petalInterval = setInterval(() => {

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        createPetal();

    }, 1000);


    // =========================
    // PETAL BURST
    // =========================

    function createPetalBurst() {

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        for (let i = 0; i < 18; i++) {

            setTimeout(() => {
                createPetal();
            }, i * 120);

        }

    }

});
