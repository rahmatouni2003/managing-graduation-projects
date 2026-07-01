import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;
console.log(import.meta.env.VITE_REVERB_APP_KEY);
console.log(import.meta.env);
const token = localStorage.getItem("token");

const echo = new Echo({
  broadcaster: "reverb",

  key: import.meta.env.VITE_REVERB_APP_KEY,

  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: Number(import.meta.env.VITE_REVERB_PORT),
  wssPort: Number(import.meta.env.VITE_REVERB_PORT),

  forceTLS: true,

  enabledTransports: ["ws", "wss"],

  authEndpoint: "/broadcasting/auth",

  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export default echo;