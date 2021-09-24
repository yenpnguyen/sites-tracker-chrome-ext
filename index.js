let mySites = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const sitesFromLocalStorage = JSON.parse( localStorage.getItem("mySites") )
const tabBtn = document.getElementById("tab-btn")

if (sitesFromLocalStorage) {
    mySites = sitesFromLocalStorage
    render(mySites)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        mySites.push(tabs[0].url)
        localStorage.setItem("mySites", JSON.stringify(mySites) )
        render(mySites)
    })
})

function render(sites) {
    let listItems = ""
    for (let i = 0; i < sites.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${sites[i]}'>
                    ${sites[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    mySites = []
    render(mySites)
})

inputBtn.addEventListener("click", function() {
    mySites.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("mySites", JSON.stringify(mySites) )
    render(mySites)
})