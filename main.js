// Wilfred Portfolio Site - Main JavaScript
// Maintains startup data and site functionality

// Startup Data Structure
const startupData = {
    ftfc: {
        name: "FTFC",
        type: "Technology Platform",
        dates: "2020 - Present",
        role: "Founder & CEO",
        nextProject: "cellsprings"
    },
    cellsprings: {
        name: "Cellsprings", 
        type: "Biotech Platform",
        dates: "2018 - 2020",
        role: "Co-Founder & CTO",
        nextProject: "vona"
    },
    vona: {
        name: "Vona",
        type: "Social Platform", 
        dates: "2017 - 2019",
        role: "Founder & CEO",
        nextProject: "vynfred"
    },
    vynfred: {
        name: "Vynfred",
        type: "Creative Studio",
        dates: "2016 - Present", 
        role: "Founder & Creative Director",
        nextProject: "makker"
    },
    makker: {
        name: "Makker",
        type: "Fashion E-commerce",
        dates: "2019 - 2021",
        role: "Co-Founder & CTO", 
        nextProject: "deadi"
    },
    deadi: {
        name: "Deadi",
        type: "Productivity Platform",
        dates: "2021 - 2023",
        role: "Co-Founder & Product Lead",
        nextProject: "philly2illy"
    },
    philly2illy: {
        name: "Philly2illy",
        type: "SEO/AIO, Web Development",
        dates: "2025",
        role: "Web Designer & SEO Specialist",
        nextProject: "ftfc"
    }
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeActiveNavigation();
    initializeScrollNavigation();
    initializeExpandableRows();
    initializeBackgroundVideo();
    initializeMediaModals();
});

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle internal page links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function initializeActiveNavigation() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Animation Functions
function initializeScrollAnimations() {
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.startup-card, .work-item, .artwork-category, .resume-item');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Utility Functions for Adding New Projects
function addNewStartup(projectData) {
    // Add to startup data
    startupData[projectData.id] = {
        name: projectData.name,
        type: projectData.type,
        dates: projectData.dates,
        role: projectData.role,
        nextProject: projectData.nextProject || 'ftfc'
    };
    
    console.log(`Added new startup: ${projectData.name}`);
    console.log('Remember to:');
    console.log('1. Copy templates/startup-detail.html to startups/' + projectData.id + '.html');
    console.log('2. Replace all [PLACEHOLDER] values in the new file');
    console.log('3. Add startup card to main page grid');
    console.log('4. Update navigation chain if needed');
}

// Scroll Navigation Function
function initializeScrollNavigation() {
    const navbar = document.querySelector('.navbar');

    // Always show navbar - no scroll-based hiding
    if (navbar) {
        navbar.classList.add('scrolled');
    }
}

// Expandable Rows Function
function initializeExpandableRows() {
    const expandableRows = document.querySelectorAll('.table-row-expandable');

    expandableRows.forEach(row => {
        // Add click handler for mobile expansion
        row.addEventListener('click', function(e) {
            // Only handle expansion on touch devices or when not hovering
            if ('ontouchstart' in window || window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                // Toggle expanded state
                this.classList.toggle('expanded');

                // Close other expanded rows
                expandableRows.forEach(otherRow => {
                    if (otherRow !== this) {
                        otherRow.classList.remove('expanded');
                    }
                });

                // Navigate after a delay to allow viewing the details
                setTimeout(() => {
                    if (this.classList.contains('expanded')) {
                        // If still expanded after delay, navigate
                        const onclick = this.getAttribute('onclick');
                        if (onclick) {
                            eval(onclick);
                        }
                    }
                }, 2000);
            }
        });
    });
}

// Background Video Initialization
function initializeBackgroundVideo() {
    const backgroundVideo = document.querySelector('.background-video');
    if (backgroundVideo) {
        // Set video to start at 10 seconds
        backgroundVideo.currentTime = 10;

        // Ensure video starts at 10 seconds when it loads
        backgroundVideo.addEventListener('loadeddata', function() {
            this.currentTime = 10;
        });

        // Handle video loop to restart at 10 seconds
        backgroundVideo.addEventListener('ended', function() {
            this.currentTime = 10;
            this.play();
        });
    }
}

// Portfolio video hover functionality
function initializePortfolioVideo() {
    // VONA video functionality
    const vonaItem = document.querySelector('.portfolio-item-vona');
    const vonaVideo = vonaItem?.querySelector('.portfolio-video');

    if (vonaItem && vonaVideo) {
        vonaItem.addEventListener('mouseenter', () => {
            vonaVideo.play().catch(e => console.log('Video play failed:', e));
        });

        vonaItem.addEventListener('mouseleave', () => {
            vonaVideo.pause();
            vonaVideo.currentTime = 0;
        });
    }

    // Makker video functionality (starts at 4 seconds)
    const makkerItem = document.querySelector('.portfolio-item-makker');
    const makkerVideo = makkerItem?.querySelector('.portfolio-video');

    if (makkerItem && makkerVideo) {
        makkerItem.addEventListener('mouseenter', () => {
            makkerVideo.currentTime = 4; // Start at 4 seconds
            makkerVideo.play().catch(e => console.log('Video play failed:', e));
        });

        makkerItem.addEventListener('mouseleave', () => {
            makkerVideo.pause();
            makkerVideo.currentTime = 4; // Reset to 4 seconds
        });
    }
}

// Toggle collapsible sections
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const toggle = content.previousElementSibling.querySelector('.toggle-icon');

    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        toggle.textContent = '▲';
        toggle.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        toggle.textContent = '▼';
        toggle.style.transform = 'rotate(0deg)';
    }
}

// Initialize portfolio video when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioVideo();
    initializeScrollTriggeredPortfolio();

    // Initialize collapsible sections as collapsed
    const sections = ['positions', 'skills', 'education'];
    sections.forEach(sectionId => {
        const content = document.getElementById(sectionId);
        if (content) {
            content.style.display = 'none';
        }
    });
});

// Scroll-triggered portfolio animations for mobile
function initializeScrollTriggeredPortfolio() {
    // Check if device is mobile/tablet
    const isMobile = window.innerWidth <= 1024;

    if (!isMobile) return; // Only run on mobile devices

    const portfolioItems = document.querySelectorAll('.portfolio-item-vona, .portfolio-item-cellsprings, .portfolio-item-kxfm, .portfolio-item-vynfred, .portfolio-item-blueskyatg, .portfolio-item-philly2illy, .portfolio-item-makker');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Trigger when item is in middle 60% of viewport
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const item = entry.target;
            const video = item.querySelector('.portfolio-video');
            const bgImage = item.querySelector('.portfolio-bg-image');
            const content = item.querySelector('.portfolio-content');

            if (entry.isIntersecting) {
                // Show background media
                if (video) {
                    video.style.opacity = '0.8';
                    // Set start time for Makker video
                    if (item.classList.contains('portfolio-item-makker')) {
                        video.currentTime = 4;
                    }
                    video.play().catch(e => console.log('Video play failed:', e));
                }
                if (bgImage) {
                    bgImage.style.opacity = '0.8';
                }
                if (content) {
                    content.style.color = 'white';
                    content.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.8)';
                    const category = content.querySelector('.category');
                    if (category) {
                        category.style.color = 'var(--accent-color)';
                        category.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.8)';
                    }
                }

                // Add active class for additional styling
                item.classList.add('mobile-active');
            } else {
                // Hide background media
                if (video) {
                    video.style.opacity = '0';
                    video.pause();
                    // Reset to appropriate start time
                    if (item.classList.contains('portfolio-item-makker')) {
                        video.currentTime = 4;
                    } else {
                        video.currentTime = 0;
                    }
                }
                if (bgImage) {
                    bgImage.style.opacity = '0';
                }
                if (content) {
                    content.style.color = '';
                    content.style.textShadow = '';
                    const category = content.querySelector('.category');
                    if (category) {
                        category.style.color = '';
                        category.style.textShadow = '';
                    }
                }

                // Remove active class
                item.classList.remove('mobile-active');
            }
        });
    }, observerOptions);

    // Observe all portfolio items with media
    portfolioItems.forEach(item => {
        observer.observe(item);
    });

    // Re-initialize on window resize
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 1024;
        if (newIsMobile !== isMobile) {
            // Disconnect current observer and reinitialize
            observer.disconnect();
            setTimeout(() => initializeScrollTriggeredPortfolio(), 100);
        }
    });
}

// Full-size video modal functionality
function initializeVideoModals() {
    // Create modal element if it doesn't exist
    let modal = document.getElementById('video-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'video-modal';
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <video controls autoplay>
                    <source src="" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modalVideo = modal.querySelector('video');
    const modalClose = modal.querySelector('.video-modal-close');

    // Add click handlers to all media videos
    document.querySelectorAll('.media-video').forEach(video => {
        video.addEventListener('click', function(e) {
            e.preventDefault();
            const videoSrc = this.querySelector('source').src;
            modalVideo.querySelector('source').src = videoSrc;
            modalVideo.load();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal handlers
    modalClose.addEventListener('click', closeVideoModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // ESC key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    function closeVideoModal() {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
        document.body.style.overflow = '';
    }
}

// Initialize video modals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoModals();
});

// Media Modal Functions
function initializeMediaModals() {
    // Create modal HTML if it doesn't exist
    if (!document.getElementById('mediaModal')) {
        const modalHTML = `
            <div id="mediaModal" class="media-modal">
                <div class="media-modal-content">
                    <span class="media-modal-close">&times;</span>
                    <img id="modalImage" class="modal-image" src="" alt="">
                    <div id="modalTitle" class="modal-title"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Add event listeners
    const modal = document.getElementById('mediaModal');
    const closeBtn = document.querySelector('.media-modal-close');

    closeBtn.addEventListener('click', closeMediaModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeMediaModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMediaModal();
        }
    });
}

function openMediaModal(mediaItem) {
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');

    const img = mediaItem.querySelector('.media-image');
    const title = mediaItem.querySelector('.media-title');

    if (img && title) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title.textContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeMediaModal() {
    const modal = document.getElementById('mediaModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { startupData, addNewStartup, openMediaModal, closeMediaModal };
}
