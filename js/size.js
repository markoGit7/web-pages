//shoes size
const size = {
    men: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],//teens-adults
    women: [35, 36, 37, 38, 39, 40, 41, 42], //teen-adults
    big_kids: [35, 36, 37, 38, 39], //7-12
    little_kids: [27, 28, 29, 30, 31, 32, 33, 34],//4-7
    toddlers: [2, 3, 4, 5, 6, 7, 8, 9],//9mo - 4yr
};

let select = document.querySelector('#size');

let stock = [];
let stored;

let get = localStorage.getItem('arr');

let stored_stock = JSON.parse(get);

stock = stored_stock;

console.log(stock);


let i_indx, c_indx, j_indx, b_indx;

//functions

const displaySize = (numbers, Pindx, colorIndx, selectIndx) => {// men(11), 0, 0, 0
    
    let sizeBody = document.querySelector('#size_numbs');
    
    sizeBody.innerHTML = ' ';

    
    numbers.forEach((numb, i) => {
        let div = document.createElement('div');
        div.classList.add('numb_box');
        
        
        
        if(stock[Pindx][colorIndx][selectIndx].length < numbers.length) { 
            let rand = Math.floor(Math.random() * (10 - 1) + 1);
            stock[Pindx][colorIndx][selectIndx].push(rand);            
        }
        

        div.innerHTML = `
        <span>${numb}</span>
        <span class="stock_amount">${stock[Pindx][colorIndx][selectIndx][i]}</span>
        `;

        sizeBody.appendChild(div);
    });
    

    test(Pindx, colorIndx, selectIndx);

    let selectNumb = document.querySelectorAll('#size_numbs .numb_box');
    selectNumb.forEach((elm, indx) => {
        
        elm.addEventListener('click', () => {

            //set and remove active class
            for(let i = 0; i < selectNumb.length; i++) {
                if(i === indx) {
                    elm.classList.add('active');
                } else {
                    selectNumb[i].classList.remove('active');
                }
            }

            
            i_indx = Pindx;
            c_indx = colorIndx;
            j_indx = selectIndx;
            b_indx = indx;
            
            
        });
    });

    noStock(Pindx, colorIndx, selectIndx);

    stored = localStorage.setItem('arr', JSON.stringify(stock));
}


const test = (Pindx, colorIndex, selectIndx) => {

    for(let i = 0; i < stock[Pindx].length; i++) {
        
        if(stock[Pindx][i][selectIndx] !== stock[Pindx][colorIndex][selectIndx]) {

            for(let j = 0; j < stock[Pindx][colorIndex][selectIndx].length; j++) {
                
                let numb = stock[Pindx][colorIndex][selectIndx][j];

                if(stock[Pindx][i][selectIndx].length < stock[Pindx][colorIndex][selectIndx].length) {
                    stock[Pindx][i][selectIndx].push(numb);
                }
                
            }
        }

    }
    
};

const noStock = (Pindx, colorIndex, selectedIndex) => {//function for, if a size goes to 0 stock
    let sizeBody = document.querySelector('#size_numbs');
    sizeBody = document.querySelectorAll('.numb_box');

    stock[Pindx][colorIndex][selectedIndex].forEach((numb, i) => {
        
        if(numb === 0) {
            sizeBody[i].classList.add('no_stock');
        }
        
    });
    
};


const size_Minus_One = () => {
    let sizeBody = document.querySelectorAll('#size_numbs .numb_box');
    let n = stock[i_indx][c_indx][j_indx][b_indx];
    
    n = n - 1;

    //decreasing the stock current size -1 on each click
    let current = document.querySelectorAll('.stock_amount');

    //when stock of size gets to 0, it changes the color and it becomes gray
    if(n <= 0) {
        sizeBody[b_indx].classList.remove('active');
        
        n = 0;
    }

    current[b_indx].textContent = n;
    stock[i_indx][c_indx][j_indx][b_indx] = n;

    noStock(i_indx, c_indx, j_indx);
    
    stored = localStorage.setItem('arr', JSON.stringify(stock));
    
};



btn.forEach((elm, indx) => {
    
    if(stock.length < btn.length) {
        stock.push([]);//[], [], [] (3)                    
    }
    
    

    elm.addEventListener('click', () => {

        if(stock[indx].length < color.length) {
            for(let j = stock[indx].length; j < color.length; j++) {//creates color fields [] in btn fields
                stock[indx].push([]);
                

                if(stock[indx][j].length < select.length) {
                    for(let k = stock[indx][j].length; k < select.length; k++) {// creates select fields [] in color fields
                        stock[indx][j].push([]);
                    }
                }

            }
        }
        
        

        select.selectedIndex = 0;
        color.selectedIndex = 0;
        
        
        //deafult displayed value;
        displaySize(size.men, indx, color.selectedIndex, select.selectedIndex);


        //size select
        select.addEventListener('change', (event) => {
            let value = event.target.value;

            displaySize(size[value], indx, color.selectedIndex, select.selectedIndex);

        });
        
        //color select
        color.addEventListener('change', (event) => {
            let value = event.target.selectedIndex;
            select.selectedIndex = 0;
            

            displaySize(size.men, indx, value, select.selectedIndex);

        });
        
        
    });
    
});


