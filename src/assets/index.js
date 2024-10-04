$(function() {
    // Use a more specific selector to avoid selecting all marquee elements
    $('.testimonial-marquee').mouseover(function() {
      $(this).attr('scrollamount', 0);
    }).mouseout(function() {
      $(this).attr('scrollamount', 5);
    });
  });
  
  // Use const and let for variable declarations
  const container = document.querySelector('.testimonial-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  // Add error handling for element selection
  if (container && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({
        left: -container.clientWidth,
        behavior: 'smooth',
      });
    });
  
    nextBtn.addEventListener('click', () => {
      container.scrollBy({
        left: container.clientWidth,
        behavior: 'smooth',
      });
    });
  } else {
    console.error('Error: One or more elements not found');
  }
