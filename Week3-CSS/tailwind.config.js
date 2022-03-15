module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {  
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#3050ce',
        'secondary': '#1f3e72',
        'terciary':'#6d7b93',
        'backyellow':'#fffbee',
        'backblue': '#eaf1fe',
        'backbotton': '#3555d3'
      }),
      textColor: theme => ({
        ...theme('colors'),
        'primary': '#3050ce',
        'secondary': '#1f3e72',
        'terciary':'#6d7b93',
        
      }),
      
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
