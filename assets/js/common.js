/*==========  Show Menu  ==========*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close');

/*========== Menu show ==========*/
/* validate if constant exists*/
if(navToggle) {
    navToggle.addEventListener('click',() => {
        navMenu.classList.add('show-menu');
    })
}

/*========== Hide show ==========*/
/* validate if constant exists*/
if(navClose) {
    navClose.addEventListener('click',() => {
        navMenu.classList.remove('show-menu');
    });
}

/*==========  Remove Menu Moblie ==========*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction () {
    const navMenu = document.getElementById('nav-menu');
    //when click on each link,remove the show-menu class
    navMenu.classList.remove('show-menu');
}

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*========== Background Header ==========*/
function scrollHeader() {
    const header = document.getElementById('header');
    //when the scroll is greater than 50 viewport height,add the scroll-header class to header tag.
    if(this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}

window.addEventListener('scroll', scrollHeader);

/*========== Contact Form ==========*/
const contactForm = document.getElementById('contact-form'),
contactName = document.getElementById('conatct-name'),
contactEmail = document.getElementById('conatct-email'),
Message = document.getElementById('message'),
contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

    //check if the feild has a value
    if(contactName.value === '' || contactEmail.value === '' || Message.value === '' ){
        //add and remove color
        contactMessage.classList.remove('color-light');
        contactMessage.classList.add('color-dark');

        //show message
        contactMessage.textContent = 'fill all the input fields';
    } else {
        //serviceID - templateID - #form - publickey
        emailjs.sendForm(
            'service_fev76ec',
            'template_xkgbdth',
            '#contact-form',
            'C5d_NhrPTY9qF3K2e'
        )
        .then(() => {
            //show message and add color,window + dot to open emoji
            contactMessage.classList.add('color-light');
            contactMessage.textContent = 'Message sent ';

            //remove message after 5 seconds
            setTimeout(() =>{
                contactMessage.textContent = '';
            },5000);
        }, 
        (error) => {
            alert('oops! Somthing went wrong...!',error);
        }
        );

        //clear input fields
        contactName.value = '';
        contactEmail.value = '';
        Message.value = '';

    }
};

contactForm.addEventListener('submit',sendEmail);

/*========== Style Switcher ==========*/
const styleSwitcherToggle = document.querySelector('.style__Switcher-toggler'),
styleSwitcher = document.querySelector('.style__switcher');

styleSwitcherToggle.addEventListener('click', () => {
    styleSwitcher.classList.toggle('open');
})

//hide switcher on scroll 
window.addEventListener('scroll', () => {
    if(styleSwitcher.classList.contains('open')){
        styleSwitcher.classList.remove('open');
    }
});


const alternateStyles = document.querySelectorAll('.alternate-style');

function setActiveStyle(color){
    alternateStyles.forEach((style) => {
        if(color === style.getAttribute('title')){
            style.removeAttribute('disabled');
        }
        else{
            style.setAttribute('disabled', 'true')
        }
    });
}

/*========== Skills Animation ==========*/
function animateSkills() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skills__percentage');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class to all skill bars
                skillBars.forEach(bar => {
                    bar.style.animation = 'none'; // Reset animation
                    bar.offsetHeight; // Trigger reflow
                    bar.style.animation = 'skillsBar 2s cubic-bezier(0.17, 0.67, 0, 1)';
                });
                
                // Disconnect observer after animation is triggered
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    // Start observing the skills section
    observer.observe(skillsSection);
}

// Initialize skills animation
document.addEventListener('DOMContentLoaded', animateSkills);

// Reinitialize skills animation when clicking on Portfolio nav link
const portfolioLink = document.querySelector('a[href="#skills"]');
if (portfolioLink) {
    portfolioLink.addEventListener('click', () => {
        setTimeout(animateSkills, 100); // Small delay to ensure smooth transition
    });
}

/*========== Resume Animation ==========*/
function animateResume() {
    const resumeItems = document.querySelectorAll('.resume__item');
    
    // Reset animations by removing and re-adding items
    resumeItems.forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight; // Trigger reflow
        item.style.animation = 'slideInResume 0.8s ease forwards'; // Increased duration from 0.5s to 0.8s
    });

    // Add longer sequential delay for each item
    resumeItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.4}s`; // Increased delay from 0.2s to 0.4s
    });
}

// Initialize resume animation when clicking on Resume nav link
const resumeLink = document.querySelector('a[href="#resume"]');
if (resumeLink) {
    resumeLink.addEventListener('click', () => {
        setTimeout(animateResume, 300); // Increased delay from 100ms to 300ms
    });
}

/*========== Services Animation ==========*/
function animateServices() {
    const serviceItems = document.querySelectorAll('.services__item');
    
    // Reset animations
    serviceItems.forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight; // Trigger reflow
        item.style.animation = 'fadeInService 0.8s ease forwards'; // Increased duration from 0.5s to 0.8s
    });

    // Add longer sequential delay for each item
    serviceItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.4}s`; // Increased delay from 0.2s to 0.4s
    });
}

// Initialize services animation when clicking on Services nav link
const servicesLink = document.querySelector('a[href="#services"]');
if (servicesLink) {
    servicesLink.addEventListener('click', () => {
        setTimeout(animateServices, 300); // Increased delay from 100ms to 300ms
    });
}

/*========== Blog Posts Animation ==========*/
function animatePosts() {
    const postContents = document.querySelectorAll('.post__content');
    const postImages = document.querySelectorAll('.post__img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on element index
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200); // 200ms delay between each animation
            }
        });
    }, { threshold: 0.2 });

    // Observe both content and images
    postContents.forEach(post => observer.observe(post));
    postImages.forEach(img => observer.observe(img));
}

// Initialize post animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animatePosts();
    setupServicesObserver();
    setupResumeObserver();
    // ... your other initialization code ...
});

// Reinitialize post animations when clicking on Blog nav link
const blogLink = document.querySelector('a[href="#blog"]');
if (blogLink) {
    blogLink.addEventListener('click', () => {
        // Reset animations for both content and images
        const postContents = document.querySelectorAll('.post__content');
        const postImages = document.querySelectorAll('.post__img');
        
        postContents.forEach(post => post.classList.remove('animate'));
        postImages.forEach(img => img.classList.remove('animate'));
        
        // Trigger animations again after a short delay
        setTimeout(animatePosts, 300);
    });
}

/*========== Contact Form Animation ==========*/
function animateContactForm() {
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.style.animation = 'none';
        contactForm.offsetHeight; // Trigger reflow
        contactForm.style.animation = 'simpleFormFade 1s ease forwards';
    }
}

// Initialize contact form animation when clicking on Contact nav link
const contactLink = document.querySelector('a[href="#contact"]');
if (contactLink) {
    contactLink.addEventListener('click', () => {
        // Wait for the scroll animation to complete
        setTimeout(() => {
            // Reset and trigger all contact section animations
            animateContactForm();
            animateSocialLinks();
            
            // Reset form animations
            const contactInputs = document.querySelectorAll('.contact__input-div');
            contactInputs.forEach((input, index) => {
                input.style.animation = 'none';
                input.offsetHeight; // Trigger reflow
                input.style.animation = `simpleInputFade 0.5s ease forwards ${index * 0.2 + 0.3}s`;
            });

            // Reset button animation
            const contactButton = document.querySelector('.contact__button');
            if (contactButton) {
                contactButton.style.animation = 'none';
                contactButton.offsetHeight;
                contactButton.style.animation = 'simpleInputFade 0.5s ease forwards 0.9s';
            }
        }, 300); // Adjust timing if needed
    });
}

// Add observer for contact section
function setupContactObserver() {
    const contactSection = document.getElementById('contact');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateContactForm();
                animateSocialLinks();
                observer.disconnect(); // Only trigger once
            }
        });
    }, { threshold: 0.3 });

    if (contactSection) {
        observer.observe(contactSection);
    }
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    setupContactObserver();
    // ... your other initialization code ...
});

// Update the animateSocialLinks function
function animateSocialLinks() {
    const socialLinks = document.querySelectorAll('.contact__social-link');
    
    socialLinks.forEach((link, index) => {
        link.style.animation = 'none';
        link.offsetHeight; // Trigger reflow
        link.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
    });
}

// Add this function to handle home section animations
function animateHomeSection() {
    // Reset and trigger animations for home elements
    const homeElements = {
        name: document.querySelector('.home__name'),
        work: document.querySelector('.home__work'),
        list: document.querySelector('.home__list'),
        socialLinks: document.querySelectorAll('.home__social-link')
    };

    // Reset animations by removing and re-adding animation classes
    if (homeElements.name) {
        homeElements.name.style.animation = 'none';
        homeElements.name.offsetHeight; // Trigger reflow
        homeElements.name.style.animation = 'fadeInDown 0.8s ease forwards';
    }

    if (homeElements.work) {
        homeElements.work.style.animation = 'none';
        homeElements.work.offsetHeight;
        homeElements.work.style.animation = 'fadeInStagger 0.8s ease forwards 0.4s';
    }

    if (homeElements.list) {
        homeElements.list.style.animation = 'none';
        homeElements.list.offsetHeight;
        homeElements.list.style.animation = 'fadeInStagger 0.8s ease forwards 0.6s';
    }

    // Reset and animate social links
    const socialLinks = document.querySelectorAll('.home__social-link');
    socialLinks.forEach((link, index) => {
        link.style.animation = 'none';
        link.offsetHeight; // Trigger reflow
        link.style.animation = `socialFadeIn 0.5s ease forwards ${0.9 + (index * 0.2)}s`;
    });
}

// Initialize home animations when clicking on Hello nav link
const helloLink = document.querySelector('a[href="#home"]');
if (helloLink) {
    helloLink.addEventListener('click', () => {
        setTimeout(animateHomeSection, 300); // Delay to ensure smooth transition
    });
}

// Also trigger animations when the section becomes visible
function setupHomeObserver() {
    const homeSection = document.getElementById('home');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateHomeSection();
                observer.disconnect(); // Only trigger once
            }
        });
    }, { threshold: 0.3 });

    if (homeSection) {
        observer.observe(homeSection);
    }
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    setupHomeObserver();
    // ... your other initialization code ...
});

// Create a reusable function to set up section observers
function setupSectionObserver(sectionId, animationCallback, threshold = 0.3) {
    const section = document.getElementById(sectionId);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animationCallback();
                observer.disconnect(); // Only trigger once
            }
        });
    }, { threshold });

    if (section) {
        observer.observe(section);
    }
}

// Initialize all section observers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set up observers for each section
    setupSectionObserver('home', animateHomeSection);
    setupSectionObserver('skills', animateSkills);
    setupSectionObserver('services', animateServices);
    setupSectionObserver('resume', animateResume);
    setupSectionObserver('blog', animatePosts);
    setupSectionObserver('contact', () => {
        animateContactForm();
        animateSocialLinks();
    });

    // Add scroll event listener to reset observers when reaching top
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st < lastScrollTop) { // Scrolling up
            // Reinitialize observers when scrolling to top
            if (st < 100) {
                setupSectionObserver('home', animateHomeSection);
                setupSectionObserver('skills', animateSkills);
                setupSectionObserver('services', animateServices);
                setupSectionObserver('resume', animateResume);
                setupSectionObserver('blog', animatePosts);
                setupSectionObserver('contact', () => {
                    animateContactForm();
                    animateSocialLinks();
                });
            }
        }
        lastScrollTop = st <= 0 ? 0 : st;
    });
});



