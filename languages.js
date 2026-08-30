const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");

langBtn.addEventListener("click", () => {
  langMenu.classList.toggle("hidden");
});

(function () {
  const LANG_KEY = "site_lang";
  const SUPPORTED_LANGS = ["en", "fr", "ar"];
  const DEFAULT_LANG = "en";

  function getLangFromPath() {
    const path = window.location.pathname;
    if (path.startsWith("/fr")) return "fr";
    if (path.startsWith("/ar")) return "ar";
    return "en";
  }

  function getCookie(name) {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)"),
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  function setCookie(name, value) {
    const isLocalhost =
      location.hostname === "localhost" || location.hostname === "127.0.0.1";
    console.log(isLocalhost);

    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=${isLocalhost ? "Lax" : "None"}; ${isLocalhost ? "" : "Secure"};`;
  }

  function getStoredLang() {
    return localStorage.getItem(LANG_KEY) || getCookie(LANG_KEY);
  }

  function storeLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    setCookie(LANG_KEY, lang);
  }

  function redirectToLang(lang) {
    const base = lang === "en" ? "/" : `/${lang}/`;
    window.location.href = base;
  }

  /* -------------------------
     Init
  -------------------------- */

  const pathLang = getLangFromPath();
  const storedLang = getStoredLang();

  if (storedLang && storedLang !== pathLang) {
    redirectToLang(storedLang);
  } else {
    storeLang(pathLang);
  }

  /* -------------------------
     Public API
  -------------------------- */

  window.setLanguage = function (lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    storeLang(lang);
    redirectToLang(lang);
  };
})();
