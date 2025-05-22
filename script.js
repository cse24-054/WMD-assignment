document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const voiceSearchBtn = document.getElementById('voice-search');
  const searchForm = document.querySelector('form[role="search"]');
  
  // Voice search functionality
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    voiceSearchBtn.addEventListener('click', function() {
      try {
        recognition.start();
        searchInput.placeholder = 'Listening...';
        voiceSearchBtn.setAttribute('aria-label', 'Listening for voice input');
      } catch (error) {
        console.error('Voice recognition error:', error);
      }
    });
    
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      searchInput.placeholder = 'Search menus, services...';
      voiceSearchBtn.setAttribute('aria-label', 'Voice search');
      // Optionally submit the form automatically
      // searchForm.submit();
    };
    
    recognition.onerror = function(event) {
      searchInput.placeholder = 'Search menus, services...';
      voiceSearchBtn.setAttribute('aria-label', 'Voice search');
    };
    
    recognition.onend = function() {
      searchInput.placeholder = 'Search menus, services...';
      voiceSearchBtn.setAttribute('aria-label', 'Voice search');
    };
  } else {
    voiceSearchBtn.style.display = 'none';
  }
  
  // Keyboard navigation
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    } else if (e.key === 'Escape') {
      searchInput.value = '';
    }
  });
  
  // Search function
  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      // Implement your search navigation logic here
      // For example, redirect to a search results page:
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
      
      // Or if you're using a SPA approach:
      // navigateToSearchResults(searchTerm);
    }
  }
  
  // Make the search bar discoverable via keyboard (Tab navigation)
  searchInput.setAttribute('tabindex', '0');
  voiceSearchBtn.setAttribute('tabindex', '0');
});
document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.querySelector('form[role="search"]');
  const searchInput = document.getElementById('search-input');

  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // Define keywords for each page
    const pageKeywords = {
      'Menu.html': ['menu', 'food', 'dishes', 'meals', 'catering menu'],
      'Event.html': ['events', 'event', 'booking', 'wedding', 'party'],
      'contact.xml': ['contact', 'reach us', 'email', 'phone', 'location'],
      'index.html': ['home', 'main', 'welcome']
    };

    // Find the best matching page
    let bestMatch = null;
    let maxMatches = 0;

    for (const [page, keywords] of Object.entries(pageKeywords)) {
      const matches = keywords.filter(keyword => 
        searchTerm.includes(keyword)
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = page;
      }
    }

    // Navigate to the best matching page or search results
    if (bestMatch && maxMatches > 0) {
      window.location.href = bestMatch;
    } else {
      window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
    }
  });
});

  
    
