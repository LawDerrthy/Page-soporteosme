// Speech Bubble functionality for Services section
document.addEventListener('DOMContentLoaded', function() {
    let speechBubbleShown = false;
    let speechBubbleTimeout;
    let isInServicesSection = false;
    
    const speechBubble = document.getElementById('serviceSpeechBubble');
    const servicesSection = document.getElementById('servicios');
    
    if (!speechBubble || !servicesSection) return;
    
    // Show speech bubble after 3 seconds of viewing services section
    function showSpeechBubble() {
        if (!speechBubbleShown && isInServicesSection) {
            speechBubble.style.display = 'block';
            speechBubbleShown = true;
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                if (speechBubble.style.display !== 'none') {
                    speechBubble.style.animation = 'fadeOut 0.5s ease-out';
                    setTimeout(() => {
                        speechBubble.style.display = 'none';
                    }, 500);
                }
            }, 8000);
        }
    }
    
    // Reset speech bubble state
    function resetSpeechBubble() {
        speechBubbleShown = false;
        speechBubble.style.display = 'none';
        speechBubble.style.animation = 'fadeInBounce 1s ease-out';
        clearTimeout(speechBubbleTimeout);
    }
    
    // Intersection Observer to detect when services section is in view
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isInServicesSection = true;
                // Show speech bubble after 3 seconds
                speechBubbleTimeout = setTimeout(showSpeechBubble, 3000);
            } else {
                isInServicesSection = false;
                resetSpeechBubble();
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observe the services section
    observer.observe(servicesSection);
    
    // Handle close button
    const closeBtn = speechBubble.querySelector('.speech-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            speechBubble.style.display = 'none';
        });
    }
    
    // Make speech bubble clickable to point to service cards
    speechBubble.addEventListener('click', function(e) {
        if (!e.target.classList.contains('speech-close-btn')) {
            // Scroll to first service card
            const firstServiceCard = document.querySelector('.service-card');
            if (firstServiceCard) {
                firstServiceCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Add pulsing effect to first card
                firstServiceCard.style.animation = 'pulse 1s ease-in-out 3';
                setTimeout(() => {
                    firstServiceCard.style.animation = '';
                }, 3000);
            }
            speechBubble.style.display = 'none';
        }
    });
});

// Add pulse animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(220, 53, 69, 0.5);
        }
    }
`;
document.head.appendChild(style);





