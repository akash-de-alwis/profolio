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

// Also trigger animation when the section becomes visible
function setupResumeObserver() {
    const resumeSection = document.getElementById('resume');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateResume();
                observer.disconnect(); // Only trigger once
            }
        });
    }, { threshold: 0.5 });

    if (resumeSection) {
        observer.observe(resumeSection);
    }
}

// Initialize observers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupResumeObserver();
    // ... your other initialization code ...
});



