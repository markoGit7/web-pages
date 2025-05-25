/* index.html */

//images carousel

$(document).ready(function(){
    $('.slider').slick({
        infinite: true,
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });
});




//close-x
const modal = document.querySelector('.modal');

let close_x = document.querySelector('.modal .close-x').addEventListener('click', () => {
    modal.style.display = 'none';
    let image_space = document.querySelector('#add-image');
    
    if(image_space.innerHTML !== '') {
        image_space.innerHTML = '';
    }
});

//order
const btn = document.querySelectorAll('#order');

//shoes colors
const colors = {
    air_forces:['all white', 'all black', 'black with white logo',],
    jordans:['Legend Blue'],
    puma:['white', 'black']
};






function setColor (color) {//function for changing the <select> options for colors
    let select = document.querySelector('#color');
    select.innerHTML = '';

    color.forEach((e) => {
        let option = document.createElement('option');
        option.value = e;    
        option.textContent = e;

        select.appendChild(option);
    });

    //Modal Color: displays the first options
    document.querySelector('#choosen_color').innerText = color[0];

};



btn.forEach((elem,indx) => {

    elem.addEventListener('click', () => {
        modal.style.display = 'block';

        let image_space = document.querySelector('#add-image');

        let single = document.querySelectorAll('#prod-container .single');

        let image = single[indx].querySelectorAll('img');

        //reading the colors from the array
        let dataName = single[indx].dataset.label;

        switch (dataName) {
            case 'air_forces': setColor(colors.air_forces);
                break;
            case 'jordans': setColor(colors.jordans);
                break;
            case 'puma': setColor(colors.puma);
                break;
            default: return;
        }

        let newImg = document.createElement('img');

        //statement because the second jordan shoe cant take image[1]; 
        image[1] === undefined ? newImg.src = image[0].src : newImg.src = image[1].src;
        


        //Removing image spans form the modal
        if(image_space.childNodes.length < 1) {
            image_space.appendChild(newImg);
        }

        //Generating image for the modal
        if(image_space.querySelector('img').src !== newImg.src) {
            image_space.innerHTML = '';
            image_space.appendChild(newImg);
        }


        //for the color: in the modal
        let select = document.querySelector('#color').addEventListener('change', (event) => {
            let value = event.target.value;

            let selected_color = document.querySelector('#choosen_color').innerText = value;

            //which color I select change to that image
            image.forEach((img) => {

                if(img.dataset.label == selected_color) {
                    newImg.src = '';
                    newImg.src = img.src;
                }

            });

        });

        //for the total: in the modal
        let price = single[indx].querySelector('.price span').innerHTML;
        
        document.querySelector('#sum').textContent = price;



    });
});




