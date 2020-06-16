var storage = chrome.storage.local;

function reset() {
    chrome.extension.sendMessage({todo: "pikabooxx8097"});
}

chrome.extension.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	
	var key = String(message.m.key);
	
	if (message.m.todo == "x6h8mm") {
        var v1 = key;
					var obj = {};
					obj[v1] = 1;
					storage.set(obj);
    }
    setTimeout(function() {
        sendResponse({status: true});
    }, 1);
	return true;
}

if (window.performance) {
    console.info("window.performance works fine on this browser");
  }
    if (performance.navigation.type == 1) {
      reset();
    } else {
      console.info( "This page is not reloaded");
    }