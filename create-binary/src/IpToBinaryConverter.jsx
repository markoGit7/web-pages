import React, { useState } from 'react';

//Font Awesome ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCoffee, faCheckSquare);




// window.onload = function() {
//     input.classList.add('focus');
//     btn.classList.add('focus');
//     input.focus();
// };

// window.onclick = function() {
//     input.classList.remove('focus');
//     btn.classList.remove('focus');

//     input.addEventListener('keydown', (event) => {
//         if (event.key === 'Enter') {
//             alert('Enter key pressed!');
//         }
//     })
// };



function IpToBinaryConverter() {
    const [n, setN] = useState('');//document.querySelector('input').value
    const [result, setResult] = useState('');
    

    if(result !== '') {
        update();
        setResult('');
    }

    const error = (e) => {
      return e !== '' ? e : '';
    };
  
    const isExisting = (octet) => {
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
  
    const solve = () => {
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

    function update() {
        let output = document.querySelector('input');
        output.value = '';
        output.value = result;
    }
  
    return (
        <section className='form-block'>
            <h2>IP Address to Binary Converter</h2>
            <div className='internal'>
                <input
                type="text"
                onChange={(e) => setN(e.target.value)}
                />
                <button id='submit' onClick={solve}><FontAwesomeIcon icon="fa-solid fa-square-check" /></button>
            </div>
        </section>
    );
}
export default IpToBinaryConverter;