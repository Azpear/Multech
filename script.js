document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#4361ee"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#4361ee",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Video Modal Functionality
    const videoCards = document.querySelectorAll('.video-card');
    const modal = document.getElementById('videoModal');
    const videoTitle = document.getElementById('videoTitle');
    const videoDuration = document.getElementById('videoDuration');
    const videoDifficulty = document.getElementById('videoDifficulty');
    const videoDescription = document.getElementById('videoDescription');
    const closeModal = document.querySelector('.close-modal');
    const quizBtn = document.getElementById('quizBtn');
    const videoContainer = document.querySelector('.video-container');

    // Video data with YouTube embed URLs and quiz links
    const videos = {
        triangle: {
            title: "Triangles Explained",
            duration: "1:20",
            difficulty: "Easy",
            description: "This video covers all types of triangles Perfect for beginners!",
            embedUrl: "https://www.youtube.com/embed/6m7mw7G9HAs",
            quizLink: "https://quizizz.com/join?gc=07558892"
        },
        pythagoras: {
            title: "Pythagoras Theorem",
            duration: "3:13",
            difficulty: "Medium",
            description: "Love Skate Love Pythagoras Theorem.",
            embedUrl: "https://www.youtube.com/embed/cgvMTS1k6rk",
            quizLink: "https://quizizz.com/join?gc=52885228"
        },
        angle: {
            title: "All About Angles",
            duration: "1:50",
            difficulty: "Easy",
            description: "Learning Angle is FUNN.",
            embedUrl: "https://www.youtube.com/embed/3pcUIFiensQ",
            quizLink: "https://quizizz.com/join?gc=25447148"
        },
        circle: {
            title: "Circle Geometry",
            duration: "1:39",
            difficulty: "Hard",
            description: "Why the long face? Circle is the BEST.",
            embedUrl: "https://www.youtube.com/embed/QM_h6dOZo3w",
            quizLink: "https://quizizz.com/join?gc=27097836"
        }
    };

    // Store the current video type
    let currentVideoType = null;

    // Add click event to video cards
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            currentVideoType = this.getAttribute('data-video');
            const videoData = videos[currentVideoType];
            
            // Set modal content
            videoTitle.textContent = videoData.title;
            videoDuration.innerHTML = `<i class="far fa-clock"></i> ${videoData.duration}`;
            videoDifficulty.textContent = `Difficulty: ${videoData.difficulty}`;
            videoDescription.textContent = videoData.description;
            
            // Create YouTube iframe with proper parameters
            videoContainer.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="${videoData.embedUrl}?autoplay=1&rel=0&enablejsapi=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="position: absolute; top: 0; left: 0;"
                ></iframe>
            `;
            
            // Show modal
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
            
            // Add error handling
            const iframe = videoContainer.querySelector('iframe');
            iframe.onerror = function() {
                videoContainer.innerHTML = `
                    <div class="video-error" style="padding: 2rem; text-align: center; color: var(--danger);">
                        <p>Could not load video. Please try again later.</p>
                        <a href="${videoData.embedUrl}" target="_blank" style="color: var(--primary);">Open on YouTube</a>
                    </div>
                `;
            };
        });
    });

    // Quiz button functionality - redirect to the specific quiz for the current video
    quizBtn.addEventListener('click', function() {
        if (currentVideoType && videos[currentVideoType]) {
            window.open(videos[currentVideoType].quizLink, "_blank");
        } else {
            // Fallback in case something goes wrong
            window.open("https://quizizz.com", "_blank");
        }
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        videoContainer.innerHTML = ''; // Clear the iframe
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            videoContainer.innerHTML = ''; // Clear the iframe
        }
    });
 
    // Add animation to floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        // Random start position and animation duration
        const startY = Math.random() * 20 - 10;
        const duration = 3 + Math.random() * 2;
        const delay = index * 0.5;
        
        // Apply animation
        shape.style.transform = `translateY(${startY}px) rotate(45deg)`;
        shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        // Add hover effect
        shape.addEventListener('mouseenter', () => {
            shape.style.animationPlayState = 'paused';
        });
        
        shape.addEventListener('mouseleave', () => {
            shape.style.animationPlayState = 'running';
        });
    });

    // Add animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add floating animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(45deg);
        }
        50% {
            transform: translateY(-20px) rotate(45deg);
        }
        100% {
            transform: translateY(0px) rotate(45deg);
        }
    }
`;
document.head.appendChild(style);
