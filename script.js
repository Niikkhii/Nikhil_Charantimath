document.addEventListener("DOMContentLoaded", () => {
  // --- Data ---
  const projectData = {
    block1: { title: "Library Management", description: "An organized system to manage book inventory, issue-return records, and student library activity.", lang: "C++", tools: "VS Code", github: "https://github.com/yourusername/library-management", functions: ["studentBorrow()", "studentReturn()", "calculateFine()", "display()"], image: "projects/library.png" },
    block2: { title: "Message Hub", description: "A basic chat server that facilitates real-time communication between users on a local network.", lang: "Python", tools: "Socket Programming", github: "https://github.com/Niikkhii/Chat-server.git", functions: ["startServer()", "broadcast()", "handleClient()", "clientSendReceive()"], image: "projects/chatserver.png" },
    block3: { title: "Simple File Transfer", description: "A simple system to send files from one computer to another using sockets over LAN.", lang: "Python", tools: "Socket, File I/O", github: "https://github.com/yourusername/healthcare-app", functions: ["sendFile()", "receiveFile()", "connectClient()", "startServer()"], image: "projects/fileserver.png" },
    // UPDATED: Replaced Flayfare with the new Todo Website project
    block4: { title: "Todo Space", description: "A comprehensive productivity application with nested spaces, a Pomodoro timer, habit tracker.",lang: "JS, HTML, CSS", tools: "TailwindCSS, Chart.js", github: "https://github.com/Niikkhii/Todo-Space-App", functions: ["Nested Task Spaces", "Kanban Board View", "Pomodoro Timer", "Gamification System"], image: "projects/Todo.png" },
    block5: { title: "Healthcare App", description: "An app to manage patient data and provide health tips with a user-friendly UI.", lang: "JavaScript, HTML, CSS", tools: "React, Firebase", github: "https://github.com/Niikkhii/Healthcare-APP.git", functions: ["bookAppointment()", "updateProfile()", "viewReports()", "sendReminder()"], image: "projects/health_compressed.png" },
  };
  const projectIds = Object.keys(projectData);

  // --- State ---
  let currentIndex = 0;
  let autoRollTimer = null;
  let progressBarTimer = null;

  // --- DOM Elements ---
  const slider = document.getElementById("slider");
  const cardTitle = document.getElementById("project-card-title");
  const infoPanel = document.getElementById("project-info");
  const progressBar = document.getElementById("progress-bar");
  const cardWrapper = document.querySelector(".card-animation-wrapper");
  const infoWrapper = document.querySelector(".info-animation-wrapper");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // --- Functions ---
  function animateContent(wrapper) {
    if (!wrapper) return;
    wrapper.classList.remove("fade-in");
    void wrapper.offsetWidth; // Trigger reflow to restart animation
    wrapper.classList.add("fade-in");
  }

  function animateProgressBar() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth;
    progressBar.style.transition = `width 5000ms linear`;
    progressBar.style.width = '100%';
  }

  function updateDisplay() {
    if (!slider || !cardTitle || !infoPanel) return;

    const projectId = projectIds[currentIndex];
    const project = projectData[projectId];

    // Update image and title
    slider.style.backgroundImage = `url(${project.image})`;
    cardTitle.textContent = project.title || "";
    animateContent(cardWrapper);

    // Update info panel
    infoPanel.innerHTML = `
      <h2>${project.title || ""}</h2>
      <p>${project.description || ""}</p>
      <div style="display: flex; gap: 20px; margin-bottom: 15px; flex-wrap: wrap;">
        <div style="background: rgba(138, 43, 226, 0.2); padding: 8px 12px; border-radius: 8px;"><strong>Language:</strong> <span>${project.lang || "N/A"}</span></div>
        <div style="background: rgba(0, 179, 255, 0.2); padding: 8px 12px; border-radius: 8px;"><strong>Tools:</strong> <span>${project.tools || "N/A"}</span></div>
      </div>
      <div id="info-functions-container" style="display:${project.functions ? "block" : "none"};">
        <strong>Key Functions:</strong>
        <ul>${project.functions ? project.functions.map(fn => `<li>${fn}</li>`).join("") : ""}</ul>
      </div>
      <a id="info-github" href="#" target="_blank" style="display:none;"></a>
    `;
    const githubLink = infoPanel.querySelector("#info-github");
    if (githubLink) {
        if (project.github) {
          githubLink.href = project.github;
          githubLink.textContent = "🔗 View on GitHub";
          githubLink.style.display = "inline-block";
        } else if (project.instagram) {
          githubLink.href = project.instagram;
          githubLink.textContent = "📸 View on Instagram";
          githubLink.style.display = "inline-block";
        }
    }
    animateContent(infoWrapper);

    // Restart progress bar and auto-roll timer
    if (progressBarTimer) clearTimeout(progressBarTimer);
    progressBarTimer = setTimeout(() => nextProject(true), 5000);
    animateProgressBar();
  }

  function nextProject(fromAuto = false) {
    currentIndex = (currentIndex + 1) % projectIds.length;
    updateDisplay();
    if (!fromAuto) resetAutoRoll();
  }

  function prevProject() {
    currentIndex = (currentIndex - 1 + projectIds.length) % projectIds.length;
    updateDisplay();
    resetAutoRoll();
  }

  function resetAutoRoll() {
    clearInterval(autoRollTimer);
    autoRollTimer = setInterval(() => nextProject(true), 5000);
  }

  // --- Contact Form & Flip Card ---
  const contactForm = document.getElementById('contactForm');
  const flipCard = document.getElementById('contact-flip-card');
  if (contactForm && flipCard) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const firstName = formData.get('firstName');
        const mailtoLink = `mailto:charantimathnikhil2@gmail.com?subject=Portfolio Contact from ${firstName}&body=${formData.get('message')}`;
        window.open(mailtoLink, '_blank');
        showSuccessDialog(firstName);
        contactForm.reset();
      });

      contactForm.addEventListener('focusin', () => {
        flipCard.classList.add('flipped');
      });

      // Add event listener to flip the card back
      document.addEventListener('click', (event) => {
        // Check if the click is outside the form and the card itself
        const isClickInsideForm = contactForm.contains(event.target);
        const isClickInsideCard = flipCard.contains(event.target);

        if (!isClickInsideForm && !isClickInsideCard) {
            flipCard.classList.remove('flipped');
        }
      });
  }

  // --- Success Dialog ---
  const successDialog = document.getElementById('successDialog');
  if (successDialog) {
      const closeDialogBtn = successDialog.querySelector('.dialog-close');
      function showSuccessDialog(name) {
        successDialog.querySelector('#dialogMessage').textContent = `Thank you, ${name}! Your message is ready to be sent.`;
        successDialog.classList.add('show');
      }
      if(closeDialogBtn) {
        closeDialogBtn.addEventListener('click', () => successDialog.classList.remove('show'));
      }
  }

  // --- Intersection Observer for Animations ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  
  // Observe sections for general fade-in
  document.querySelectorAll('section').forEach(el => observer.observe(el));
  
  // Observe timeline items and set stagger delay
  document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.style.setProperty('--delay-index', index);
    observer.observe(el);
  });
  
  // --- Navigation Highlighting ---
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: "-30% 0px -70% 0px" });
  document.querySelectorAll('section[id]').forEach(section => navObserver.observe(section));

  // --- Certificate Carousel Duplication for Seamless Loop ---
  const certCarousel = document.querySelector('.certificates-carousel-work-inner');
  if (certCarousel) {
    certCarousel.innerHTML += certCarousel.innerHTML;
  }

  // --- Initializations ---
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", prevProject);
    nextBtn.addEventListener("click", () => nextProject(false));
    updateDisplay();
    resetAutoRoll();
  }
});
