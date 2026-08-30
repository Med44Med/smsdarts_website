const form = document.querySelector("form");
const registerBtn = document.querySelector("#registerBtn");
const errorMsg = document.querySelector("#errorMsg");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const redirect = urlParams.get("redirect");
let loading = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  errorMsg.innerHTML = "";

  if (loading) return;
  loading = true;
  if (!username || !email || !password || !confirmPassword) {
    return;
  }
  if (password !== confirmPassword) {
    errorMsg.innerHTML = "Les mots de passe ne correspondent pas";
    return;
  }
  registerBtn.innerHTML =
    '<i class="fa-solid fa-circle-notch animate-spin"></i>';

  if (!window.supabase || !window.supabase.auth) {
    errorMsg.innerHTML = "Supabase not initialized.";
    registerBtn.innerHTML = "S'inscrire";
    loading = false;
    return;
  }
  const { data, error } = await window.supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });
  if (error) {
    errorMsg.innerHTML = error?.message;
    registerBtn.innerHTML = "S'inscrire";
    loading = false;
    return;
  }

  console.log(data);
  window.location.href = "/login";
  loading = false;
});

async function signUpWithGoogle() {
  if (!window.supabase || !window.supabase.auth) {
    errorMsg.innerHTML = "Supabase not initialized.";
    return;
  }
  const { data, error } = await window.supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    errorMsg.innerHTML = error?.message;
    return;
  }
  console.log(data);
  //   window.location.href = "https://app.smsdarts.com";
}
