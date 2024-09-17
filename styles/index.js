//Global Variables
const dropBtn = document.querySelector('#dropdownBtn');
const dropContent = document.querySelector('#dropdown-menue');
const burgerBtn = document.querySelector('#burgerMenu');
let burgerSvg = document.querySelectorAll('#burgerMenu svg');
const navBar = document.querySelector('#navbar');
let arrowRotation = 0;
let prevWidth = 0;


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

    document.querySelector('#darkBackground').setAttribute('style', 'width: 100%; height:100%; position:absolute; top:0px; left:0px; background:rgba(0,0,0,70%); z-index:50;');
    burgerBtn.style.zIndex = '70';
   } else {
    e[1].style.display = 'none';
    e[0].style.display = 'block';
    
    document.querySelector('#darkBackground').removeAttribute('style');
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
    } else {
        dropBtn.addEventListener('click', () => {Check_Active_State(dropContent)});
    }
};


//Calling Functions

resize_ob.observe(document.querySelector('body'));

burgerSvg[1].style.display = 'none';
burgerBtn.addEventListener('click', () =>{Check_Active_State(navBar); Check_Burger_Status(burgerSvg)});
