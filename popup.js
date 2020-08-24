document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', onclick, false)

    function onclick() {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            let msg = {
                txt: "start"
            }
            chrome.tabs.create({ url: chrome.runtime.getURL("displaygpa.html") });

            chrome.tabs.sendMessage(tabs[0].id, msg)
        })
    }
}, false)