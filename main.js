document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));

  const form = document.getElementById("visibility-form");
  const result = document.getElementById("score-result");
  const scoreNumber = document.getElementById("score-number");
  const scoreTitle = document.getElementById("score-title");
  const scoreMessage = document.getElementById("score-message");
  const scoreCircle = document.querySelector(".score-circle");

  if (form && result && scoreNumber && scoreTitle && scoreMessage && scoreCircle) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const fields = form.querySelectorAll("select");
      const incomplete = [...fields].some((field) => !field.value);

      if (incomplete) {
        alert("Please answer all five questions.");
        return;
      }

      const score = [...fields].reduce((total, field) => total + Number(field.value), 0);
      let title = "";
      let message = "";

      if (score >= 80) {
        title = "Strong visibility foundation";
        message = "Your business appears to have many important elements in place. Ongoing optimization and regular updates can help protect and improve your position.";
      } else if (score >= 50) {
        title = "Good start, with room to improve";
        message = "Some important visibility elements may be missing or inconsistent. The Professional Package may be a good fit.";
      } else {
        title = "Your business may be difficult to find";
        message = "Your profile likely needs setup, correction, or optimization. MapLink JA can help you build a stronger Google presence.";
      }

      scoreNumber.textContent = score;
      scoreTitle.textContent = title;
      scoreMessage.textContent = message;
      scoreCircle.style.background = `conic-gradient(var(--green) ${score * 3.6}deg, #e5ece8 0deg)`;
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
});
