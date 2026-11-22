
document.addEventListener("DOMContentLoaded", function () {

    // 1. DARK MODE / LIGHT MODE

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("portfolioTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    } else {
        document.body.classList.remove("light-mode");
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("portfolioTheme", "light");
            themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        } else {
            localStorage.setItem("portfolioTheme", "dark");
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }

    });


    // 2. TYPING ANIMATION

    const typingText = document.getElementById("typingText");

    const words = [
        "Student",
        "Java Developer",
        "Web Developer",
        "Learner"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentWord.substring(0, charIndex);

        let speed = deleting ? 60 : 100;

        if (!deleting && charIndex === currentWord.length) {
            deleting = true;
            speed = 1200;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);

    }

    typeEffect();


    // 3. SKILL ANIMATION

    const progressBars = document.querySelectorAll(".progress-bar");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const bar = entry.target;
                const width = bar.getAttribute("data-width");

                bar.style.width = width;

                observer.unobserve(bar);

            }

        });

    }, {
        threshold: 0.5
    });

    progressBars.forEach(function (bar) {
        observer.observe(bar);
    });


    // 4. SCROLL TO TOP

    const scrollTop = document.getElementById("scrollTop");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            scrollTop.style.display = "block";
        } else {
            scrollTop.style.display = "none";
        }

    });

    scrollTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // 5. NAVBAR AUTO CLOSE

    const navLinks = document.querySelectorAll(".nav-link");
    const navbarMenu = document.getElementById("navbarMenu");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth < 992) {

                const collapse =
                    bootstrap.Collapse.getOrCreateInstance(navbarMenu);

                collapse.hide();

            }

        });

    });


    // 6. ACTIVE NAVBAR LINK

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });
    });


    // 7. JQUERY FORM VALIDATION

    $("#contactForm").validate({

        rules: {

            name: {
                required: true,
                minlength: 3
            },

            email: {
                required: true,
                email: true
            },

            message: {
                required: true,
                minlength: 10
            }

        },

        messages: {

            name: {
                required: "Please enter your name",
                minlength: "Name must contain at least 3 characters"
            },

            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },

            message: {
                required: "Please enter your message",
                minlength: "Message must contain at least 10 characters"
            }

        },

        errorElement: "label",
        errorClass: "error",

        submitHandler: function (form) {

            $("#formMessage")
                .text("Thank you! Your message has been validated.")
                .css("color", "#16a34a");

            form.reset();

        }

    });


    // 8. GITHUB API
    const githubStats = document.getElementById("githubStats");

    fetch("https://api.github.com/users/dhanyasree13")

        .then(function (response) {

            if (!response.ok) {
                throw new Error("GitHub profile could not be loaded");
            }

            return response.json();

        })

        .then(function (data) {

            githubStats.innerHTML = `
                <strong>${data.public_repos}</strong> Public Repositories
                &nbsp; | &nbsp;
                <strong>${data.followers}</strong> Followers
            `;

        })

        .catch(function () {

            githubStats.textContent =
                "Visit my GitHub profile to explore my projects.";

        });
});
