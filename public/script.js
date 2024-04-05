const loaderContainer = document.querySelector('.loader-container')

function loader() {
    loaderContainer.classList.add('fade-out')
  }
  
  function fadeOut() {
    setInterval(loader, 4000)
  }
  
  window.onload = fadeOut()