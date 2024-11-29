//Main Variablse
const body = document.querySelector('body');


/*Header on Scroll BG & Appearance of Scroll to top element*/

window.addEventListener('scroll', (e) => {
    e = window.scrollY;
    const header = document.querySelector('header'),
    scrollTop = document.querySelector('#scrollTop');

    if(e > 150) {
        header.style.cssText = `background: rgba(42,44,57,0.9);`;
        scrollTop.classList.add('visibleOn');
    } else {
        header.style.removeProperty('background');
        scrollTop.classList.remove('visibleOn');
    }
    
});

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


/*Top Carousel JS*/

//init
let current = 0;
let autocurrent = 0;
let playing;
let timer;
const homebody = document.querySelector('#home');
//functions

const prev = () => {//function for the previouse arrow
    if(current <= 0) return;
    
    current--;
    autoPlay();
    contentChange();
};

const next = () => {//function for the next arrow
    current++;

    autoPlay();
    contentChange();
};

const autoPlay = () => {//function for auto playing the content
    console.log(`Status: ${playing}`);
    const content = document.querySelectorAll('#top-carousel-content');

    if(playing) {
        
        if(autocurrent > (content.length - 1)) autocurrent = 0;

        console.log(autocurrent);
        current = autocurrent;
        autocurrent++;

        timer = setTimeout(() => {
            autoPlay();
        }, 5000);

    } else {
        autocurrent = current;
        clearTimeout(timer);
    }

    contentChange();
}

const contentChange = () => {//function for changing the slides
    const content = document.querySelectorAll('#top-carousel-content');
    console.log(`current: ${current}`);
    if(current > (content.length - 1)) current = 0;

    
    content[current].style.cssText = `order:0;`;
    
    for(let i = 0; i < content.length; i++) {
        if(current !== i) {
            content[i].style.cssText = `order:200`;
        }
    }

    console.log(current);

};

//call functions
contentChange();
window.addEventListener('DOMContentLoaded', () => {playing = true; autoPlay();});
homebody.addEventListener('mouseleave', () => {playing = true; autoPlay();});
homebody.addEventListener('mouseover', () => {playing = false; autoPlay();});



/*Important Message JS*/

//Global Variables
const firsMessage = document.querySelector('#onloadmessage');
let messageon = true;
let shown;
//Functions

const closeMessage = () => {
    messageon = false;

    if(!messageon) {
        firsMessage.style.display = 'none';
        body.style.overflow = 'auto';
    }
}

const shownMessage = () => {
    
    
    window.addEventListener('DOMContentLoaded', function() {
        firsMessage.style.display = 'flex';
        body.style.overflow = 'hidden';
    });     
    
    
}

//Calling Functions
shownMessage();
let btnClose = document.querySelector('#close-message').addEventListener('click',closeMessage);

/*Tabs-Section JS*/

//init
const tabBtns = document.querySelectorAll('#tabBtn');
const tabsContent = document.querySelectorAll('#tabsContent');
let emptyDiv = ``;
let cloneOn = true;

//functions

const beginerState = () => {//Function for the deafult state of the elements
    tabBtns[0].classList.add('active'); 
    tabsContent[0].classList.add('active');

    for(let i = 1; i < tabsContent.length; i++) {
        tabsContent[i].style.position = 'absolute';
        tabsContent[i].style.zIndex = '-999';
    }
};

const changeTab = (i) => {
    
    let elm = document.querySelectorAll('#tabsContent');

    if(tabBtns.length !== elm.length) {
        createClone();
        stylingClone(i);
    }

    
    
    tabBtns[i].classList.add('active'); 
    
    elm[i].classList.add('active');
    elm[i].classList.add('active');
    elm[i].style.cssText = 'position: static; z-index: 1; delay:100ms';

    for(let j = 0; j < tabBtns.length; j++) {
        if(i !== j) {
            tabBtns[j].classList.remove('active'); 
        }
    }  

    for(let j = 0; j < elm.length; j++) {
        if(i !== j) {
            elm[j].classList.remove('active'); 
            elm[j].style.cssText = 'position: absolute; z-index: -999';
        }
    }
    
};


const createClone = () => {//Function for creating a clone existing content if there is more buttons then content
    let elm = document.querySelectorAll('#tabsContent');
    
    let clone = elm[0].cloneNode(true);
    clone.setAttribute('data-clone', 'clone');
    document.querySelector('#tab-content-container').appendChild(clone);

};

const stylingClone = (i) => {//Function for styling clone div tab
    let elm = document.querySelectorAll('#tabsContent');
    tabBtns[0].classList.remove('active');
    
    elm[0].classList.remove('active'); 
    elm[0].style.cssText = 'position: absolute; z-index: -999';

    let clones = document.querySelectorAll('[data-clone="clone"]')[0];
    clones.classList.remove('active');
    clones.style.cssText = 'position: absolute; z-index: -999';
    let noContent = `

        <div class="-mx-3 flex flex-row">
            <!--text-->
            <div class="w-1/2 px-3">
                <h3
                    class="mb-2 font-raleway text-[26px] font-bold leading-tight text-colorTitle"
                >
                    Empty Content
                </h3>
                <div class="font-text text-base font-normal">
                    <p class="mb-4">
                        .......................................................................................
                    </p>

                    <ul>
                        <li class="mb-4 italic">
                            .......................................................................................
                        </li>

                        <li
                            class="relative pl-6 after:inline-block after:size-4 [&:not(:last-of-type)]:mb-[10px]"
                        >
                            .......................................................................................

                            <span
                                class="absolute left-0 top-[4px] inline-block text-[20px] text-colorOrange"
                            >
                                <i class="bi bi-check2-all"></i>
                            </span>
                        </li>

                        <li
                            class="relative pl-6 after:inline-block after:size-4 [&:not(:last-of-type)]:mb-[10px]"
                        >
                            .......................................................................................

                            <span
                                class="absolute left-0 top-[4px] inline-block text-[20px] text-colorOrange"
                            >
                                <i class="bi bi-check2-all"></i>
                            </span>
                        </li>

                        <li
                            class="relative pl-6 after:inline-block after:size-4 [&:not(:last-of-type)]:mb-[10px]"
                        >
                            .......................................................................................

                            <span
                                class="absolute left-0 top-[4px] inline-block text-[20px] text-colorOrange"
                            >
                                <i class="bi bi-check2-all"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <!--image-->
            <div class="w-1/2 px-3" style="height:486px;">
                <span class="flex items-center justify-center w-full h-full" style="background-color:rgba(42, 44, 57, 0.4)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" class="bi bi-card-image fill-white" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                </span>
            </div>
        </div>
    
    `
    clones.innerHTML = noContent;
    
    if(i === (elm.length - 1)) {
        clones.classList.add('active');
        clones.style.cssText = 'position: static; z-index: 1; delay:100ms';
        
    }
}

//call functions
beginerState();

tabBtns.forEach((btn, i) => {
    
    btn.addEventListener('click', () =>{changeTab(i);});
});


//Absolute tabs section
//init
const aTabBtns = document.querySelectorAll('#aTabBtn').forEach((tab, indx) => {
    const aTabBtns = document.querySelectorAll('#aTabBtn');

    tab.addEventListener('click', function() {
        for(let i = 0; i < aTabBtns.length; i++) {


            //if clicked button is same number as i
            if(indx === i) {
                this.classList.add('active');
            } else {
                aTabBtns[i].classList.remove('active');
            } 

        }

        let value = this.dataset.filter;
        sortTabs(value);
    });

});



//fucntions
const sortTabs = (val) => {
    console.log(val);

    const aTabC = document.querySelectorAll('#aTabC > div').forEach((e) => {
        let Cval = e.dataset.filter; 
        
        if(val === Cval) {
            e.style.display = 'block';
        } else if(val === undefined) {
            e.style.display = 'block';
        } else {
            e.style.display = 'none';
        }
    });
};
//call functions


/*Customers-Block Slider JS*/

$(document).ready(function(){
    $('#my-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        speed: 300,
        infinite: true,
        autoplaySpeed: 5000,
        autoplay: true,
        dots: true,
        

        responsive: [
            {
            breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

    $('.slick-dots li button').text('');//this removes the numbers from the dots

    $('.slick-track').css('display', 'flex');//this makes the slides items-stretch
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
    let liveScroll = window.scrollY;//100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      
      if (liveScroll >= sectionTop - 300) {
        current = section.getAttribute("id"); }
    });
  
    navLi.forEach((a) => {
      a.classList.remove("active");
      if (a.href.includes(current)) {
        a.classList.add("active");
      }
    });
};


/* portfolio-single.html */
