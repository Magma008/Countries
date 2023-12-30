const dropMain = document.querySelector(".dropMain")
const dropIcon = document.querySelector(".dropIcon")
const url = "https://restcountries.com/v3.1/all"
const drop = document.querySelector(".drop")
const countryCards = document.querySelector(".countryCards")
const region = document.querySelectorAll(".region")
const filterReg = document.querySelector(".filter")
const search = document.querySelector(".search")
const modulePage = document.querySelector(".modulePage")
const btnDark = document.querySelector(".btnDark")
const night = document.querySelector(".night")
const light = document.querySelector(".light")
let data = []

dropMain.addEventListener("click", () => {
    drop.classList.toggle("open")
    dropIcon.classList.toggle("rotate")
})


async function getData() {
    try {
        const resp = await fetch(url)
        data = await resp.json()
        // console.log(data);
        showCountry(data)

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    getData()
})

function showCountry(data) {
    countryCards.innerHTML = ""
    // console.log(data);
    data.forEach(elem => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
            <div class="card-img">
                <img src="${elem.flags.png}" alt="Country Image">
            </div>
            <div class="card-info">
                <h2 class="ctName">${elem.name.common}</h2>
                <p><strong>Region: </strong><span class="regionName">${elem.region}</span></p>
                <p class="dataPop" data-target="${elem.population}"><strong>Population: </strong>${elem.population}</p>
                <p class=""><strong>Capital: </strong>${elem.capital}</p>
            </div>
        `
        countryCards.append(card)

        card.addEventListener("click", () => {
            showModule(elem)
        })
    })


}

//  Filter by region        //
function filterCountry(elem) {
    if (elem.toLowerCase() === "all") {
        showCountry(data)
    }
    else {
        const filteredData = data.filter(item => {
            return item.region.toLowerCase().includes(elem.toLowerCase())
        })
        showCountry(filteredData)
    }
}
const regionName = document.getElementsByClassName("regionName")

region.forEach(elem => {
    elem.addEventListener("click", () => {
        filterReg.innerText = elem.innerText
        drop.classList.toggle("open")
        filterCountry(elem.innerText)
    })
})
//--------------------------------------------//

//      Module Page         //
function showModule(inform) {
    modulePage.classList.remove("hide")
    console.log(inform);
    modulePage.innerHTML = `
    <div class="btnBox">
        <button class="back">Back</button>
    </div>
    <div class="module">
        <div class="leftModule">
            <img src="${inform.flags.svg}" alt="Country Flag">
        </div>

        <div class="rightModule">
            <h1 class="moduleTitle">${inform.name.common}</h1>
            <div class="innerRght">
                <div class="innerLeftText">
                    <p class="moduleText"><span class="str">Region:</span>${inform.region}</p>
                    <p class="moduleText"><span class="str">Capital:</span>${inform.capital}</p>
                    <p class="moduleText"><span class="str">Sub Region:</span>${inform.subregion}</p>
                    <p class="moduleText"><span class="str">Area:</span>${inform.area} km²</p>
                </div>
                <div class="innerRightText">
                    <p class="moduleText"><span class="str">Population:</span>${inform.population}</p>
                    <p class="moduleText"><span class="str">Fifa:</span>${inform.fifa}</p>
                    <p class="moduleText"><span class="str">Domain:</span>${inform.tld}</p>
                    <a target="_blank" href="${inform.maps.googleMaps}" class="moduleText"><span class="str">Map:</span>Google</a>
                </div>
            </div>
        </div>
    </div>
                    `
    const back = document.querySelector(".back")
    back.addEventListener("click", () => {
    modulePage.classList.add("hide")
    })
}
//---------------------------------------------------//
// Dark Mode

btnDark.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark")
        night.classList.add("hide")
        light.classList.remove("hide")
    }
    else {
        document.body.classList.add("dark")
        light.classList.add("hide")
        night.classList.remove("hide")
    }
})
// ------------------------------
//  Search Filter                                  //
function searchCountry(elem) {
    const filteredData = data.filter(item => {
        return item.name.common.toLowerCase().includes(elem.toLowerCase())
    })
    showCountry(filteredData)
}

search.addEventListener("input", (e) => {
    searchCountry(e.target.value)
})
// ----------------------------------------- //