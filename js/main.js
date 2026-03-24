function toggleMenu() {
  var m = document.getElementById("mobileMenu"),
    b = document.getElementById("hamburger"),
    o = m.classList.toggle("visible");
  b.classList.toggle("open", o);
  document.body.style.overflow = o ? "hidden" : "";
}
function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("visible");
  document.getElementById("hamburger").classList.remove("open");
  document.body.style.overflow = "";
}
function toggleFaq(btn) {
  var item = btn.closest(".faq-item"),
    ans = item.querySelector(".faq-a"),
    isOpen = btn.classList.contains("open");
  document.querySelectorAll(".faq-q.open").forEach(function (q) {
    q.classList.remove("open");
    q.closest(".faq-item").querySelector(".faq-a").classList.remove("open");
  });
  if (!isOpen) {
    btn.classList.add("open");
    ans.classList.add("open");
  }
}

function initReveal() {
  var els = Array.from(
    document.querySelectorAll(
      ".reveal,.reveal-left,.reveal-right,.reveal-scale"
    )
  );

  // Одразу показати елементи що вже видимі
  els.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add("visible");
    }
  });

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
  );

  els.forEach(function (el) {
    if (!el.classList.contains("visible")) obs.observe(el);
  });
}

// Запустити після завантаження DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    // Повторно після завантаження картинок
    window.addEventListener("load", initReveal);
  });
} else {
  initReveal();
  window.addEventListener("load", initReveal);
}

// Nav scroll
window.addEventListener("scroll", function () {
  var nav = document.getElementById("mainNav");
  if (nav)
    nav.style.background =
      window.scrollY > 60
        ? "rgba(255,255,255,0.35)"
        : "rgba(255,255,255,0.18)";
});
