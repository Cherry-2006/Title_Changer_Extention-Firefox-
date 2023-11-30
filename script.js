// Reading the Tab
let gettingCurrent = browser.windows.getCurrent({ populate: true, })
// console.log(gettingCurrent)
let tabIS = null;
let windowIS = nul;
let Title = null;
let Titles = [];
let newTitles = [];
gettingCurrent.then((temp) => { readTab(temp) })
function readTab(tab) {
    let fake = tab["tabs"];
    temp = fake.filter((items) => {
        return items.active == true;
    });
    // console.log(temp[0]["id"])
    tabIS = temp[0]["id"]
    windowIS = temp[0]["windowId"]
    Title = temp[0]["title"]
    // console.log(Title)
}
// Changing the title
let someTitle = document.getElementById("Title")
document.getElementById("changeTitle").addEventListener("click", () => {
    if (someTitle.value == "") {
        alert("Type Something Bastard")
    }
    else {
        browser.scripting.executeScript({
            target: { tabId: tabIS, },
            args: [someTitle.value],
            func: (someTitle) => {
                document.title = someTitle;
                console.log("Title Changed to:", someTitle)
            },
        });
        newTitles = Titles.concat([{ oldTitle: `${Title}`, newTitle: `${someTitle.value}` }])
        browser.storage.local.set({ newTitles })
        someTitle.value = "";

    }
})
browser.tabs.onActivated.addListener(() => { window.close() });

function run(item) {
    // console.log("Its here")
    // console.log(item.newTitles)
    for (let key in item.newTitles) {
        Titles.push(item.newTitles[key])
    }
}
browser.storage.local.get().then(run)

// Extra thing
let optionsOpen = false;
document.getElementById("options").addEventListener("click", () => {
    if (optionsOpen == false) {
        document.getElementById("deepDropdown").style.display = "block"
        optionsOpen = true;
    }
    else {
        document.getElementById("deepDropdown").style.display = "none"
        optionsOpen = false
    }
})

document.getElementById("clear").addEventListener("click", () => {
    if (Titles.length == 0) {
        // console.log("Nothing there")
        alert("Local store is Empty")
    }
    else {
        browser.storage.local.clear();
        Titles = []
    }
})



// Solution you can store the old title and new title in the website by using localStorage.setItem("myCat", "Tom"); reff:-  https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
