/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "given-image":
          "url('https://react-todo-app-pi-eight.vercel.app/assets/bg-desktop-dark-DzAvO98h.jpg')",
      },
    },
  },
  plugins: [],
};
