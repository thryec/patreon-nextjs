module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat', 'sans-serif'],
        header: ['Messapia', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
        alegreya: ['Alegreya', 'serif'],
        inconsolata: ['Inconsolata', 'monospace'],
      },
      colors: {
        midnight: '#1b2536',
        seablue: '#003C54',
      },
    },
  },
  plugins: [],
}
