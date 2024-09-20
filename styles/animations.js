AOS.init({
    once: true,
});

//Global Variables
const servicesContent = document.querySelectorAll('#services');
let delay = 0;
//Functions
const setDelay = (number,content) => {
    
    content.setAttribute('data-aos-delay', number);  
    
};

//Calling Functions

if(window.innerWidth > 767) {
    for(let i = 0; i < servicesContent.length; i++) {
        setDelay(delay,servicesContent[i]);
        delay = delay + 250;
    }
}
