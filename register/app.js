async function checkLoggedIn() {
  if (window.supabase && window.supabase.auth) {
    try {
      const { data } = await window.supabase.auth.getUser();
      if (data && data.user) {
        const redirectUrl = getRedirectUrl();
        window.location.replace(redirectUrl);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  }
}
checkLoggedIn();

function getRedirectUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const redirect = urlParams.get("redirect");
  return redirect || "https://app.smsdarts.com";
}
