//Main Variablse
const body = document.querySelector('body');


//Global Variables
const dropBtn = document.querySelector('#dropdownBtn');
const dropContent = document.querySelector('#dropdown-menue');
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

	console.log('Current Width : ' + width);
    
    prevWidth = width;

    responsive(width);
});

const responsive = (minWidth) => {
    console.log(`prev: ${prevWidth}`);
    console.log(`current: ${minWidth}`);

    if(minWidth <= 1199) {
        document.querySelector('#dropdownBtn > span').addEventListener('click', () => {Check_Active_State(dropContent); rotateArrow()});

        //This is code for the darkBack_BurgerClick
        if(burgerSvg[1].style.display === 'block') {
            darkBack_BurgerClick.classList.add('active');
        } else {
            darkBack_BurgerClick.classList.remove('active');
        }

    } else {
        dropBtn.addEventListener('click', () => {Check_Active_State(dropContent)});
        
        //This is code for the darkBack_BurgerClick
        darkBack_BurgerClick.classList.remove('active');
    }
};



//Carousels Functions
const Sliding = (car, indx) => {
    for(let i = 0; i < car.length; i++) {
        if(indx === i) {
            car[i].style.opacity = '100%';
            car[i].style.display = 'block';
        } else {
            car[i].style.opacity = '0%';
            car[i].style.display = 'none';
        }
    }
};

const outOfRange = () => {
   console.log(nav);

   if(nav < 0) {
        nav = (topContent.length - 1);
    } else if(nav > (topContent.length - 1)) {
        nav = 0;
   }
   
};

const startDragging = (e) => {
    dragging = true;
    dragX = e.pageX;
    Dragging();
};

const Dragging = () => {
    if(dragging) {
       Content_Parent.classList.add('dragg'); 
    } else {
        Content_Parent.classList.remove('dragg');
    }
};

const stopDragging = () => {
    dragging = false;
    Dragging();
};





//Calling Functions

resize_ob.observe(document.querySelector('body'));

burgerSvg[1].style.display = 'none';
burgerBtn.addEventListener('click', () =>{Check_Active_State(navBar); Check_Burger_Status(burgerSvg)});


//Important Message Div

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
})




