//Main Variablse
const body = document.querySelector('body');


//Global Variables
const burgerBtn = document.querySelector('#burgerMenu');
let burgerSvg = document.querySelectorAll('#burgerMenu svg');
const navBar = document.querySelector('#navbar');
const darkBack_BurgerClick = document.querySelector('#dark-background');
let arrowRotation = 0;
let prevWidth = 0;

//Variables for carousels



//Functions

//This works the best for dropdowns and hamburger btns
const Check_Active_State = (content) => {
    if(!(content.classList.contains('active'))) {
        content.classList.add('active');
    } else {
        content.classList.remove('active');
    }
    console.log(content);
};

//This is for changing the burger svg
const Check_Burger_Status = (e) => {
   if(e[1].style.display === 'none') {
    e[1].style.display = 'block';
    e[0].style.display = 'none';

    document.querySelector('body').style.overflow = 'hidden';
    Check_Active_State(darkBack_BurgerClick);
   } else {
    e[1].style.display = 'none';
    e[0].style.display = 'block';

    document.querySelector('body').style.overflow = 'auto';
    Check_Active_State(darkBack_BurgerClick);
   }
};


//Rotating the arrow in the header when it's active
const rotateArrow = () => {
    
    if(!(arrowRotation === 180)) {
        arrowRotation = 180;
        document.querySelector('#dropdownBtn > span >svg').style.rotate = `${arrowRotation}deg`;
        document.querySelector('#dropdownBtn > span > svg').classList.add('active');
        document.querySelector('#dropdownBtn > span').classList.add('active');
    } else {
        arrowRotation = 0;
        document.querySelector('#dropdownBtn > span > svg').style.rotate = `${arrowRotation}deg`;
        document.querySelector('#dropdownBtn > span > svg').classList.remove('active');
        document.querySelector('#dropdownBtn > span').classList.remove('active');
    }
    
}

//This is generating body width on every change of it
const resize_ob = new ResizeObserver(function(entries) {
	// since we are observing only a single element, so we access the first element in entries array
	let rect = entries[0].contentRect;

	// current width & height
	let width = rect.width;

    
    prevWidth = width;

    responsive(width);
});

const responsive = (minWidth) => {
   

    if(minWidth <= 1199) {
        document.querySelector('#dropdownBtn > span').addEventListener('click', () => {Check_Active_State(dropContent); rotateArrow()});

        //This is code for the darkBack_BurgerClick
        if(burgerSvg[1].style.display === 'block') {
            darkBack_BurgerClick.classList.add('active');
        } else {
            darkBack_BurgerClick.classList.remove('active');
        }

    } else {
        //This is code for the darkBack_BurgerClick
        darkBack_BurgerClick.classList.remove('active');
    }
};





//Calling Functions

resize_ob.observe(document.querySelector('body'));

burgerSvg[1].style.display = 'none';
burgerBtn.addEventListener('click', () =>{Check_Active_State(navBar); Check_Burger_Status(burgerSvg)});


/*Dropdown Button JS*/

//init
const dropBtn = document.querySelector('#dropdownBtn');
const dropContent = document.querySelector('#dropdown-menue');
let active;
//functions
const hover = () => {


    dropContent.addEventListener('mouseover', () => {
        dropContent.classList.add('active');

        if(!active) {
            dropBtn.classList.remove('active');
        }
    });
   
};

//call functions
dropBtn.addEventListener('mouseover', () => {
    active = true;
    hover();
});

dropBtn.addEventListener('mouseout', () => {
    dropContent.classList.remove('active');
    active = false;
    hover();
});



/*Important Message JS*/

//Global Variables
const firsMessage = document.querySelector('#onloadmessage');
let messageon = false;
localStorage.setItem('Notshown',messageon);
let shown;
//Functions

const closeMessage = () => {
    setTimeout(() => {
        firsMessage.style.display = 'none';
        body.style.overflow = 'auto';
        messageon = true;
        shown = localStorage.setItem('shown', messageon);
    }, 5000);
}

const shownMessage = () => {
    
    let shown = localStorage.getItem('shown');
    console.log(shown);
    
    if(shown === false) {
        window.addEventListener('DOMContentLoaded', function() {
            firsMessage.style.display = 'flex';
            body.style.overflow = 'hidden';
        
            closeMessage();
            
        });
    }
    
}

//Calling Functions
shownMessage();


/*Customers-Block Slider JS*/

//init
const innerSlider = document.querySelector('#inner-slider');
let currentSlider = 0;
let gapX = 25;
let slideW = document.querySelector('#inner-slider > #slide').clientWidth;

const allSlides = document.querySelectorAll('#inner-slider > #slide');
const slider_container = document.getElementById('slider-container');

let pressed = false;
let slideX = 0;
let scrollLeft;

//functions
const createIndicators = () => {
    //creating indicators
    let i = 0;
    while(i < allSlides.length) {
        let indicatorsParent = document.querySelector('#indicators');
        let divs = document.createElement('div');
        divs.setAttribute('class', 'w-3 h-3 rounded-full [&.active]:bg-colorOrange inline-block');
        divs.style.background = 'rgba(68,68,68,0.15)';
        divs.id = 'indicator';
        indicatorsParent.appendChild(divs);
        i++;
    }   
}


const changeSlide = (indx) => {
    //sliding slides
    currentSlider = indx + 1;
    let prevSlider = currentSlider - 1;

    if(prevSlider <= 0) {
        innerSlider.style.left = `0px`;

    } else if(prevSlider >= (allSlides.length - 1)) {
        innerSlider.style.left = `0px`;
        
    } else {
        currentSlider = (prevSlider * slideW) + (gapX * prevSlider);
        innerSlider.style.left = `-${currentSlider}px`;
        
    }
    
}


const start = (e) => {
    
    pressed = true;
    innerSlider.style.cursor = 'grab';
    slideX = e.pageX || e.touches[0].pageX - innerSlider.offsetLeft;
    scrollLeft = innerSlider.scrollLeft;	
}

const move = (e) => {
    if(!pressed) return;

    e.preventDefault();
    const x = e.pageX - innerSlider.offsetLeft;
    
    const dist = (x - slideX);
    
    innerSlider.style.left = `${scrollLeft - dist}px`;
    
}

const end = () => {
    pressed = false;
    innerSlider.style.cursor = 'deafult';
}

//call functions
createIndicators();

innerSlider.addEventListener('mousedown', start);
innerSlider.addEventListener('mousemove', move);
innerSlider.addEventListener('mouseleave', end);
innerSlider.addEventListener('mouseup', end);

const indicators = document.querySelectorAll('#indicators > #indicator').forEach((indicator, indx) => {
    indicator.style.cursor = 'pointer';
    
    if(indx === 0) {
        indicator.style.background = '#ef6603';
    }

    indicator.addEventListener('click', () => {
 
       let indicators = document.querySelectorAll('#indicators > #indicator');
        //active state on indicators
       for (let i = 0; i < indicators.length; i++) {
            
            if(indx !== i) {
                indicators[i].style.background = 'rgba(68,68,68,0.15)';
            } else {
                indicator.style.background = '#ef6603';
            }
       }

       if(indx === 0) {
            indicators[0].style.background = '#ef6603';
       } else if(indx === (allSlides.length - 1)) {
            indicators[0].style.background = '#ef6603';
            indicators[indx].style.background = 'rgba(68,68,68,0.15)';
       }

       changeSlide(indx);
        
    });
});


//Accordions-Block Section

//Global Variables
const accordionBtns = document.querySelectorAll('#accordionBtn');
const accordionContent = document.querySelectorAll('#collaps-content');

//Functions
const openAccordion = (i) => {
    
    let height = accordionContent[i].querySelector('div').clientHeight;

    if(!(accordionBtns[i].classList.contains('active'))) {
        accordionBtns[i].classList.add('active');

        accordionContent[i].style.height = `${height}px`;
    } else {
        accordionBtns[i].classList.remove('active');
        accordionContent[i].style.height = '0px';
    }

    disableAccordionElement(i);
};

const disableAccordionElement = (i) => {
    if(i === 1) {
        accordionBtns[i].classList.remove('active');
        accordionContent[i].style.height = '0px';
    }
};

//Calling Functions

accordionBtns[0].classList.add('active');
accordionContent[0].style.height = `${accordionContent[0].querySelector('div').clientHeight}px`;


accordionBtns.forEach((accordion, index) => {
    accordion.addEventListener('click', () => {
        openAccordion(index);
    });
});


//Navbar onScroll change Active class

//Global Variables
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("#navbar > li > a");


//Functions

//Calling Functions
window.onscroll = () => {
    var current = "";
    let liveScroll = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      
      if (liveScroll >= sectionTop - 200) {
        current = section.getAttribute("id"); }
    });
  
    navLi.forEach((a) => {
      a.classList.remove("active");
      if (a.href.includes(current)) {
        a.classList.add("active");
      }
    });
};



