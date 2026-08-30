//languages
langBtn.addEventListener("click", () => {
  langMenu.classList.toggle("hidden");
});

function changeLanguage(lang){
  const currentLang = window.location.pathname.split('/')[1];
  if(currentLang === lang) {
    langMenu.classList.toggle("hidden");
    return    
  };
  document.cookie = `lang=${lang}; path=/; max-age=${60*60*24*30}`
  localStorage.setItem('lang', lang)
  window.location.href = `/${lang}/${window.location.pathname.split('/')[2]}`  
}