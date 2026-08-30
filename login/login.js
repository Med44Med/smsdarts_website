const form = document.querySelector("form");
const submitBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("errorMsg");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const redirect = urlParams.get("redirect");
let loading = false;

form.addEventListener("submit", async (e) => {

  e.preventDefault();
  
  if (loading) return;
  
  loading = true;
  
  errorMsg.textContent = "";
  submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i>';
  
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");
  
  if (!window.supabase || !window.supabase.auth) {
    errorMsg.textContent = "Supabase not initialized.";
    submitBtn.innerHTML = "Se connecter";
    loading = false;
    return;
  }

  const { error } = await window.supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {  
    errorMsg.textContent = error.message;
    submitBtn.innerHTML = "Se connecter";
    loading = false;
    return;
  }

  window.location.href = redirect || "https://app.smsdarts.com";
  loading = false;

});

async function loginWithGoogle() {
  const { error } = await window.supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.log(error.message);
  }
}
