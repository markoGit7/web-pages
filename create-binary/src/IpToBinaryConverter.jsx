import React, { useState } from 'react';

function IpToBinaryConverter() {
    const [n, setN] = useState('155.45.32.12');
    const [result, setResult] = useState('');
  
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
    
                if (exist) {
                    octet === s ? (res += '1') : (res += '0');
                    continue;
                }
    
                if (octet > s) {
                    target += s;
        
                    if (target <= octet) {
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
    
            }

            if (i < cut.length - 1) {
                res += '.';
            }
    
        }

        console.log(res);
        setResult(res);
    };
  
    return (
        <div>
            <h2>IP Address to Binary Converter</h2>
            <input
            type="text"
            placeholder="Enter IP address (e.g., 192.168.1.1)"
            value={n}
            onChange={(e) => setN(e.target.value)}
            />
            <button onClick={solve}>Convert</button>
            {result && (
            <div>
                <h3>Binary Representation:</h3>
                <p>{result}</p>
            </div>
            )}
        </div>
    );
}
export default IpToBinaryConverter;