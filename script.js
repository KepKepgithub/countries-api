const selected = document.querySelector('.selected');
const optionWrap = document.querySelector('.optionWrap');
const option = document.querySelectorAll('.option');
const cardWrap = document.querySelector('.cardWrap');
const searchField = document.querySelector('.search');

// when select menu clicked, display options
selected.addEventListener('click',()=>{
    optionWrap.classList.toggle('active');
})
// when an option clicked hide options and show the new selected element as selected
option.forEach((e)=>{
    e.addEventListener('click',()=>{
        optionWrap.classList.remove('active');
        selected.innerHTML = e.innerHTML;
        selected.setAttribute('value', e.getAttribute('value'));
        // Remove all old cards and generate new cards
        document.querySelectorAll('.cardBody').forEach((e)=>{
            e.remove();
        })
        fetch(`https://restcountries.eu/rest/v2/${selected.getAttribute('value')}?
        fields=
        name;
        flag;
        capital;
        population;
        region;
        subregion;
        topLevelDomain;
        currencies;
        languages;
        borders;
        alpha3Code;
        nativeName`).then((response)=>{return response.json()}).then((data)=>{
            console.log(data);
            data.forEach((e)=>{
                createCard(e);
            })
        })
    })
})


fetch(`https://restcountries.eu/rest/v2/${selected.getAttribute('value')}?
        fields=
        name;
        flag;
        capital;
        population;
        region;
        subregion;
        topLevelDomain;
        currencies;
        languages;
        borders;
        alpha3Code;
        nativeName`).then((response)=>{return response.json()}).then((data)=>{
            console.log(data);
            data.forEach((e)=>{
                createCard(e);
            })
})

// Search Field logic
searchField.addEventListener('keyup', ()=>{
    let term = searchField.value.toLowerCase();
    let cards = document.querySelectorAll('.cardBody');
    cards.forEach((e)=>{
        const cardName = e.children[1].innerHTML;
        if(cardName.toLowerCase().indexOf(term) != -1){
            e.style.display = "block";
        }
        else{
            e.style.display = "none";
        }
    })
})
// Region select logic


function createCard(data){
    const cardBody = document.createElement('a');
    cardBody.classList.add('cardBody');
    const flagNode = document.createElement('div');
    flagNode.style.backgroundImage = `url(${data.flag})`;
    const nameNode = document.createElement('h1');
    nameNode.innerHTML =  data.name;
    const populationNode = document.createElement('p');
    populationNode.innerHTML = `Population: <span>${data.population}</span>`;
    const regionNode = document.createElement('p');
    regionNode.innerHTML = `Region: <span>${data.region}</span>`;
    const capitalNode = document.createElement('p');
    capitalNode.innerHTML = `Capital: <span>${data.capital}</span>`;
    const textWrapNone = document.createElement('div');
    textWrapNone.append(nameNode, populationNode, regionNode, capitalNode)
    // appends all the text/img to the cards
    cardBody.append(flagNode, textWrapNone);
    // Places the card inside body
    cardWrap.appendChild(cardBody);

        // creates modal overlay when clicking for more info
        cardBody.addEventListener("click",()=>{
            const modalBody = document.createElement('div');
            modalBody.classList.add('moreInfo');
            modalBody.style.top = `${window.scrollY + 84}px`
    
            const modalBtn = document.createElement('button');
            modalBtn.classList.add('modalBtn');
            modalBtn.innerHTML = '◀ Back';
    
            const modalFlag = document.createElement('div');
            modalFlag.style.backgroundImage = `url(${data.flag})`;
            modalFlag.classList.add('flag');
    
            const modalName = document.createElement('h1');
            modalName.innerHTML = data.name;
    
            const modalNativeName = document.createElement('p');
            modalNativeName.innerHTML = `Natvive Name: <span>${data.nativeName}</span>`;
    
            const modalPopulation = document.createElement('p');
            modalPopulation.innerHTML = `Population: <span>${data.population}</span>`
    
            const modalRegion = document.createElement('p');
            modalRegion.innerHTML = `Region: <span>${data.region}</span>`;
    
            const modalSubregion = document.createElement('p');
            modalSubregion.innerHTML = `Subregion: <span>${data.subregion}</span>`;
    
            const modalCapital = document.createElement('p');
            modalCapital.innerHTML = `Capital: <span>${data.capital}</span>`;
    
            const modalTopDomain = document.createElement('p');
            modalTopDomain.innerHTML = `Top Level Domain: <span>${data.topLevelDomain}</span>`;
    
            // Create a new array of currency "names" to make it easier to work with them
            const newCurrecyArr = [];
            const currencyArr = data.currencies;
            currencyArr.forEach((e)=>{
                newCurrecyArr.push(e.name);
            })
            const modalCurrencies = document.createElement('p');
            modalCurrencies.innerHTML = `Currencies: <span>${newCurrecyArr.join(",")}</span>`;
    
            // Create a new array of languages "names" to make it easier to work with them
            const newLangArr = [];
            const languagesArr = data.languages;
            languagesArr.forEach((e)=>{
                    newLangArr.push(e.name);
            })
            const modalLanguages = document.createElement('p');
            modalLanguages.innerHTML = `Languages: ${newLangArr.join(',')}`;
    
            const modalBordersHeader = document.createElement('h2');
            modalBordersHeader.innerHTML = "Border Countries:";
            const modalBordersWrap = document.createElement('div');
            modalBordersWrap.append(modalBordersHeader);
            const bordersArray = data.borders;
            bordersArray.forEach((e)=>{
                const modalBorders = document.createElement('button');
                modalBorders.innerHTML = e;
                modalBordersWrap.appendChild(modalBorders);
    
                modalBorders.addEventListener('click',()=>{
                    newCode = modalBorders.innerHTML;
                    fetch(`https://restcountries.eu/rest/v2/alpha/${newCode}?fields=name;flag;capital;population;
                    region;subregion;topLevelDomain;currencies;languages;borders;alpha3Code;nativeName`).then((res)=>{
                        return res.json();
                    }).then((data)=>{
                        modalFlag.style.backgroundImage = `url(${data.flag})`;
                        modalName.innerHTML = data.name;
                        modalNativeName.innerHTML = `Natvive Name: <span>${data.nativeName}</span>`;
                        modalPopulation.innerHTML = `Population: <span>${data.population}</span>`;
                        modalRegion.innerHTML = `Region: <span>${data.region}</span>`;
                        modalSubregion.innerHTML = `Subregion: <span>${data.subregion}</span>`;
                        modalCapital.innerHTML = `Capital: <span>${data.capital}</span>`;
                        modalTopDomain.innerHTML = `Top Level Domain: <span>${data.topLevelDomain}</span>`;
                        // Create a new array of currency "names" to make it easier to work with them
                        const newCurrecyArr = [];
                        const currencyArr = data.currencies;
                        currencyArr.forEach((e)=>{
                            newCurrecyArr.push(e.name);
                        })
                        modalCurrencies.innerHTML = `Currencies: <span>${newCurrecyArr.join(",")}</span>`;
                        // Create a new array of languages "names" to make it easier to work with them
                        const newLangArr = [];
                        const languagesArr = data.languages;
                        languagesArr.forEach((e)=>{
                                newLangArr.push(e.name);
                        })
                        modalLanguages.innerHTML = `Languages: ${newLangArr.join(',')}`;
                        
                    })
                })
            })
            modalBordersWrap.classList.add('modalBordersWrap');
            const contentWrap = document.createElement('div');
            contentWrap.classList.add('contentWrap');
            const textWrap1 = document.createElement('div');
            textWrap1.classList.add('textWrap1');
            const textWrap2 = document.createElement('div');
            textWrap2.classList.add('textWrap2')
            
            textWrap1.append(modalName, modalNativeName, modalPopulation,modalRegion, modalSubregion, modalCapital)
            textWrap2.append(modalTopDomain,modalCurrencies, modalLanguages)

            contentWrap.append( modalFlag, textWrap1, textWrap2,modalBordersWrap)
            modalBody.append(modalBtn,contentWrap);
            document.body.appendChild(modalBody);
    
    
    
            disableScroll();
            modalBtn.addEventListener('click', ()=>{
                modalBody.remove();
                enableScroll();
            })
        })
}


function disableScroll() { 
    // Get the current page scroll position 
    scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
        }; 
}

function enableScroll() { 
    window.onscroll = function() {}; 
} 






// THEME LOGIC, THEME SWITCHING AND SAVING
const themeCheckbox = document.querySelector("#themeCheckbox");
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        themeCheckbox.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

themeCheckbox.addEventListener('change', switchTheme, false);