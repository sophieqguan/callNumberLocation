console.log("loading CNL...");
run();

async function run() {
    while (true) {
        await sleep(3000);
        replace();
    }
}

function replace () {
    var text = document.querySelectorAll('span.best-location-delivery.locations-link');

    for (let i = 0; i < text.length; i++) {
        let plain = text[i].innerText;
        let orig = getCallNum(plain);
        
        let callNum = orig.substring(1);

        // get first 1 or 2 or 3?? characters
        let section = "";
        for (const char of callNum) {
            if (!(/[A-Z]/).test(char)) break;
            section = section.concat(char);
        }

        // replace
        let loc = getLoc(section);
        let modified = orig + " at " + loc;
        text[i].innerHTML = modified;
        console.log(modified);
    }

    console.log("completed CNL");
}

function getCallNum(orig) {
    for (let i = 0; i < orig.length; i++) {
        if (orig.charAt(i) == ')') 
            return orig.substring(0,i + 1);
    }
    // not reachable, hypothetically
    return orig;
}

function getLoc(section) {
    let len = section.length;

    if ((/B[C-X]/).test(section))
        return "2nd floor, Ocean Side";
    else if ((/A/).test(section) || (/B/).test(section)) 
        return "1st floor, Ocean Side";
    else if ((/[C-F]|[C-F][A-Z]/).test(section)) 
        return "4th floor, Ocean Side";
    else if ((/^G&|G[A-E]/).test(section))
        return "Sciences & Engineering: 2nd Floor, Mountain Side";
    else if ((/G[F-Z]|^H&|H[A-X]/).test(section))
        return "4th floor, Ocean Side";
    else if ((/[J-L]|[J-L][A-Z]/).test(section)) 
        return "6th floor, Ocean Side";
    else if ((/M/).test(section)) 
        return "Music Building, 2nd floor";
    else if ((/N/).test(section)) 
        return "Art & Architecture, 1st floor, Mountain Side";
    else if ((/^P&|P[A-J]/).test(section))
        return "6th floor, Ocean Side";
    else if ((/P[K-R]/).test(section)) 
        return "7th floor, Ocean Side";
    else if ((/P[R-Z]/).test(section))
        return "8th floor, Ocean Side";
    else if ((/[Q-V]|[Q-V][A-Z]/).test(section)) 
        return "Sciences & Engineering: 2nd Floor, Mountain Side";
    else if ((/^Z&|Z[A-Z]/).test(section)) 
        return "2nd floor, Mountain Side";
    
    return "invalid"
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}