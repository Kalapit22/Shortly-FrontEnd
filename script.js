const btn = document.getElementById('btn');
const url = document.getElementById('url');
let copyBtns = document.querySelectorAll('.copy-link');;



function ValidateUrl(link) 
{
 var urlFormat = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
	if(link.match(urlFormat)) {
		return true;
	}
	else {
		return false;
	}
}


function addLinkDiv(originalURL, shortURL) {
    const putDivHere = document.querySelector('.results-here');
    const newDiv = document.createElement("div");
    newDiv.className = 'result-div';
    newDiv.innerHTML = "\<p class=\"original-url\"\>" + originalURL + "\</p\> \<p class=\"shorten-url\"\>" + shortURL + "\</p\> \<p class=\"square btn copy-link\"\>Copy\</p\>";
    putDivHere.appendChild(newDiv); //Creates the div
    localStorage.setItem('shortenLinksList', putDivHere.innerHTML);
    copyBtns = document.querySelectorAll('.copy-link');


    copyBtns.forEach(copyBtn => {
        copyBtn.addEventListener('click', e => {
         
            copyToClipboard(copyBtn.parentNode.querySelector('.shorten-url').innerHTML, copyBtn);
        })
    })
}

function copyToClipboard(url, btn) { 
        navigator.clipboard.writeText(url).then(function() {
        
            console.log('OK');
            btn.classList.add('copied');
            btn.innerHTML = "Copied!";
            setTimeout( function() {
                btn.classList.remove('copied');
                btn.innerHTML = "Copy";
            }, 1500);
        }, function() {
            // if access was denied
           console.log('NOK');
        });
}



window.addEventListener('load', e => {
    const putDivHere = document.querySelector('.results-here');
    var originListHtml = localStorage.getItem('shortenLinksList');
    if (!putDivHere.innerHTML) {
        putDivHere.innerHTML = originListHtml;
    }

    copyBtns = document.querySelectorAll('.copy-link');
        //Copy links to clipboard
        copyBtns.forEach(copyBtn => {
            copyBtn.addEventListener('click', e => {
                //console.log(copyBtn.parentNode.querySelector('.shorten-url').innerHTML);
                copyToClipboard(copyBtn.parentNode.querySelector('.shorten-url').innerHTML, copyBtn);
            })
        })
})



btn.addEventListener('click', e => {
	let urlValue = url.value; 
	if (ValidateUrl(urlValue)) {
        url.classList.remove('incorrect');
        fetch("https://api.shrtco.de/v2/shorten?url=" + urlValue)
        .then ( response => response.json() )
        .then (response => {
            if (response.ok) {
                console.log(response);
                console.log(response.result.full_short_link);
                addLinkDiv(urlValue, response.result.full_short_link); 
                btn.classList.remove('waiting');
                btn.innerHTML = "Shorten It!";
            }
            else {
                url.classList.add('incorrect');
                btn.classList.remove('waiting');
                btn.innerHTML = "Shorten It!";
            }
        })
        btn.classList.add('waiting');
        btn.innerHTML = "Please wait...";
	} 
	else {
		url.classList.add('incorrect');
    }
})


document.getElementById('clear-links').addEventListener('click', e => {
    localStorage.clear();
})


const mobileMenuBtn = document.querySelector('.mobile-menu-open');
const mobileMenu = document.querySelector('.mobile-menu');
let isOpen = false;

mobileMenuBtn.addEventListener('click', e => {
    if (!isOpen) {
        mobileMenu.classList.add('open');
        mobileMenu.style.animation = "mobileFadeIn 0.5s linear";
        isOpen = true;
    }
    else {
        mobileMenu.style.animation = "mobileFadeOut 0.5s linear";
        setTimeout(function() {
            mobileMenu.classList.remove('open');
        }, 500);
        isOpen = false;
    }
    
})