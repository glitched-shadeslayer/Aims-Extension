chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        localStorage.setItem("courseGPA", JSON.stringify(request.C_info));
        localStorage.setItem("student", JSON.stringify(request.S_info));
    }
)