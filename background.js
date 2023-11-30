function change() {
    function get(item) {
        if (item == undefined) {
            console.log("There is nothing in localStorage")
        }
        else {

            for (let key in item.newTitles) {
                if (item.newTitles[key].oldTitle == curTitle) {
                    // console.log(item.newTitles[key].newTitle)
                    console.log("Changed")
                    browser.scripting.executeScript({
                        target: { tabId: tabIS, },
                        args: [item.newTitles[key].newTitle],
                        func: (title) => {
                            document.title = title;
                            console.log("Title Changed to(Background Process):", title)
                        },
                    });
                }
            }
            // console.log(item.newTitles)
        }
    }
    browser.storage.local.get().then(get)

    let gettingCurrent = browser.windows.getCurrent({ populate: true, })
    gettingCurrent.then((temp) => { readTab(temp) })
    function readTab(tab) {
        let fake = tab["tabs"];
        temp = fake.filter((items) => {
            return items.active == true;
        });
        // console.log(temp[0]["id"])
        tabIS = temp[0]["id"]
        curTitle = temp[0]["title"]
        // console.log(curTitle)
    }


}

browser.tabs.onUpdated.addListener(change)

let tabIS = null;
let temp = null;
let curTitle = null;
let Changed = null;