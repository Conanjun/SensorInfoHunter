var html = document.body.innerHTML;
chrome.extension.onMessage.addListener(
    function (request, sender, sendMessage) {
        if (request.action == "get_content")
            sendMessage(html);
        else
            sendMessage("error action");
    });