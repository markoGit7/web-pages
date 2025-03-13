import React, { useState } from 'react';

//Font Awesome ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCoffee, faCheckSquare);



function IpToBinaryConverter() {
    const [n, setN] = useState('');//document.querySelector('input').value
    const [result, setResult] = useState('');


    function spacePress(value) {//Function to set dots automaticly on click of space
        const input = document.querySelector('input');      
        
    };
    
    
    function configFocus(isFocus) {//Function for events that will happen when the input is focused
        const input = document.querySelector('input'), btn = document.querySelector('#submit');
    
        if(isFocus) {
            
            input.classList.add('focus');
            btn.classList.add('focus');
    
        } else {
            
            if(input.classList.contains('focus') && btn.classList.contains('focus')) {
                input.classList.remove('focus');
                btn.classList.remove('focus');
            } else {
                return;
            }
        }
    }
    
    
    
    
    window.onload = function() {
        const input = document.querySelector('input'), btn = document.querySelector('#submit'), body = document.querySelector('body');    
        input.focus();
        
        configFocus(true);
    };


    function enterPress(value) {
        const input = document.querySelector('input');
    
        input.onkeydown = function(event) {
            
            if (event.key === 'Enter') {
                
                if(value !== '') {
                    solve();
                    configFocus(false);
                }
               
            }
    
        }
    };

    function press(value) {//Function for button click shortcut on Enter

        spacePress(value);
        enterPress(value);
            
    };


    

    if(result !== '') {
        update();
        setResult('');
    }

    const error = (e) => {
      return e !== '' ? e : '';
    };
  
    const isExisting = (octet) => {//Function for checking if the current octate exist in 2^n
      let s = null;
  
      for (let j = 7; j > -1; j--) {
        s = j;
        s = Math.pow(2, s);
  
        if (octet === s) {
          return true;
        } else {
          if (j === 0) {
            return false;
          }
        }
      }
    };
  
    const solve = () => {//Main Function for solving the binary alghoritam 
        let msg = ``,
            err;
        let cut = n.split('.');
        
        let res = '';
  
        if (cut.length < 4) {
            msg = `You need 4 octets, but you have ${cut.length}`;
            err = error(msg);
            console.log(err); // Output to console (as in the original code)
            setResult('');
            return;
        }
  
        for (let i = 0; i < cut.length; i++) {
            let octet = Number(cut[i]);
            console.log(octet);
            let exist = isExisting(octet);
            let s = null,
            target = 0;
    
            if (octet > 255) {
            msg = `You can only add, up to 255. You had ${octet} `;
            err = error(msg);
            console.log(err); // Output to console (as in the original code)
            setResult('');
            return;
            }
    
            for (let j = 7; j > -1; j--) {
                s = j;
                s = Math.pow(2, s);
                
                console.log(exist);

                if (exist) {
                    octet === s ? (res += '1') : (res += '0');
                    continue;
                }
    
                if (octet > s) {
                    target += s;           
        
                    if (target <= octet) {
                        res += '1';
                    } else {
                        target = target - s;
                        res += '0';
                    }

                } else {
                    res += '0';
                }
                
    
            }

            if (i < cut.length - 1) {
                res += '.';
            }
    
        }

        setResult(res);
    };

    function update() {//Function for displaying the output on the input field
        let output = document.querySelector('input');
        output.value = '';
        output.value = result;
    };

  
    return (
        <section className='form-block'>
            <h1>192  - 010</h1>
            <div className='internal'>
                <input
                type="text"
                onFocus={() => configFocus(true)} 
                onBlur={() => configFocus(false)}
                onKeyUp={(e) => press(e.target.value)} 
                onChange={(e) => setN(e.target.value)}
                />
                <button id='submit' onClick={solve}><FontAwesomeIcon icon="fa-solid fa-square-check" /></button>
            </div>
        </section>
    );
}
export default IpToBinaryConverter;