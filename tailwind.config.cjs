module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: { extend: {
      colors: {
        ticketopen: '#16a34a',
        ticketinprogress: '#f59e0b',
        ticketclosed: '#6b7280'
      }
  }},
  plugins: []
}
