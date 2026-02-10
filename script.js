document.addEventListener('DOMContentLoaded', () => {
    // --- Planet Modal Logic ---
    const planetData = {
        mercury: {
            title: "Mercury",
            desc: "The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon.",
            dist: "58 million km",
            moons: "0"
        },
        venus: {
            title: "Venus",
            desc: "Venus spins slowly in the opposite direction from most planets. Its thick atmosphere traps heat, making it the hottest planet.",
            dist: "108 million km",
            moons: "0"
        },
        earth: {
            title: "Earth",
            desc: "Our home planet is the only place we know of so far that’s inhabited by living things.",
            dist: "150 million km",
            moons: "1"
        },
        mars: {
            title: "Mars",
            desc: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence that Mars was—billions of years ago—wetter and warmer.",
            dist: "228 million km",
            moons: "2"
        },
        jupiter: {
            title: "Jupiter",
            desc: "Jupiter is more than twice as massive as the other planets of our solar system combined. The Great Red Spot is a giant storm.",
            dist: "778 million km",
            moons: "79+"
        },
        saturn: {
            title: "Saturn",
            desc: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
            dist: "1.4 billion km",
            moons: "82+"
        }
    };

    const modal = document.getElementById('planet-modal');
    const closeModal = document.getElementById('close-modal');
    const planetCards = document.querySelectorAll('.planet-card');

    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalDist = document.getElementById('modal-dist');
    const modalMoons = document.getElementById('modal-moons');

    planetCards.forEach(card => {
        card.addEventListener('click', () => {
            const planetKey = card.getAttribute('data-planet');
            const data = planetData[planetKey];

            if (data) {
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                modalDist.textContent = data.dist;
                modalMoons.textContent = data.moons;
                modal.showModal();
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.close();
    });

    // Close modal if clicked outside
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });

    // --- Quiz Logic ---
    const quizData = [
        {
            question: "Which planet is known as the 'Red Planet'?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1 // Index of correct answer
        },
        {
            question: "What galaxy is Earth located in?",
            options: ["Andromeda", "Whirlpool", "Milky Way", "Triangulum"],
            correct: 2
        },
        {
            question: "What creates the heat and light of the Sun?",
            options: ["Burning Coal", "Nuclear Fusion", "Electricity", "Lava"],
            correct: 1
        },
        {
            question: "What is the name of the first man-made satellite sent into space?",
            options: ["Apollo 11", "Sputnik 1", "Voyager 1", "Hubble"],
            correct: 1
        },
        {
            question: "Who was the first person to walk on the Moon?",
            options: ["Yuri Gagarin", "Buzz Aldrin", "Neil Armstrong", "Michael Collins"],
            correct: 2
        },
        {
            question: "Which planet has the most extensive ring system?",
            options: ["Jupiter", "Uranus", "Neptune", "Saturn"],
            correct: 3
        },
        {
            question: "What force keeps the planets in orbit around the Sun?",
            options: ["Magnetism", "Gravity", "Friction", "Inertia"],
            correct: 1
        },
        {
            question: "What is the Great Red Spot on Jupiter?",
            options: ["A giant storm", "An ocean", "A volcano", "A crater"],
            correct: 0
        },
        {
            question: "Which is the hottest planet in our solar system?",
            options: ["Mercury", "Mars", "Venus", "Jupiter"],
            correct: 2
        },
        {
            question: "Approximately how long does it take for light from the Sun to reach Earth?",
            options: ["8 seconds", "8 minutes", "8 hours", "8 days"],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const quizContainer = document.getElementById('quiz-container');
    const questionEl = document.getElementById('question-text');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-btn');

    function loadQuestion() {
        const data = quizData[currentQuestion];
        questionEl.textContent = data.question;
        optionsEl.innerHTML = '';
        feedbackEl.textContent = '';
        nextBtn.classList.add('hidden');

        data.options.forEach((opt, index) => {
            const btn = document.createElement('div');
            btn.classList.add('quiz-option');
            btn.textContent = opt;
            btn.addEventListener('click', () => selectOption(index, btn));
            optionsEl.appendChild(btn);
        });
    }

    function selectOption(index, element) {
        // Prevent multiple selections
        if (feedbackEl.textContent !== '') return;

        const data = quizData[currentQuestion];
        if (index === data.correct) {
            element.classList.add('correct');
            feedbackEl.textContent = "Correct! Great job, Cadet!";
            feedbackEl.style.color = "#4caf50";
            score++;
        } else {
            element.classList.add('wrong');
            feedbackEl.textContent = "Not quite. Try to remember for next time!";
            feedbackEl.style.color = "#f44336";

            // Highlight correct answer
            const options = optionsEl.children;
            options[data.correct].classList.add('correct');
        }

        nextBtn.classList.remove('hidden');
    }

    nextBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        quizContainer.innerHTML = `
            <h3>Mission Complete!</h3>
            <p>You scored ${score} out of ${quizData.length}.</p>
            <p>${score === quizData.length ? "You are a Space Expert! 🌟" : "Keep exploring to learn more! 🚀"}</p>
            <button class="btn btn-primary" onclick="location.reload()">Restart Mission</button>
        `;
    }

    // Initialize Quiz
    loadQuestion();
});
