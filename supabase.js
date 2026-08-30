function cookieStorage() {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const baseOptions = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: isLocal ? "Lax" : "None",
    secure: !isLocal,
    ...(isLocal ? {} : { domain: ".smsdarts.com" }),
  };

  const serialize = (key, value, opts) => {
    let cookie = `${key}=${encodeURIComponent(value)}; Path=${opts.path}`;
    if (opts.domain) cookie += `; Domain=${opts.domain}`;
    if (opts.maxAge) cookie += `; Max-Age=${opts.maxAge}`;
    if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;
    if (opts.secure) cookie += `; Secure`;
    return cookie;
  };

  return {
    getItem: (key) => {
      const escapedKey = key.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
      const match = document.cookie.match(
        new RegExp(`(?:^|; )${escapedKey}=([^;]*)`),
      );
      return match ? decodeURIComponent(match[1]) : null;
    },

    setItem: (key, value) => {
      if (!value) return;

      const parsed = JSON.parse(value);

      const minimal = JSON.stringify({
        access_token: parsed.access_token,
        refresh_token: parsed.refresh_token,
        expires_at: parsed.expires_at,
      });
      document.cookie = serialize(key, minimal, baseOptions);
    },

    removeItem: (key) => {
      document.cookie = serialize(key, "", {
        ...baseOptions,
        maxAge: 0,
      });
    },
  };
}

window.supabase = supabase.createClient(
  "https://eifzhgeruczvvrpdfyos.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZnpoZ2VydWN6dnZycGRmeW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NzMzNTcsImV4cCI6MjA4NDU0OTM1N30.RBPAPDlIxR5Tplt-SKwtirxgjyzlfqvvk1FosUMukjI",
  {
    auth: {
      storage: cookieStorage(),
      detectSessionInUrl: true,
    },
  },
);
