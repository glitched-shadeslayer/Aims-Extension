chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        localStorage.setItem("courseGPA", JSON.stringify(request.info));
    }
);