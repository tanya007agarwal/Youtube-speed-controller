var mylist = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3];
var storage = chrome.storage.local;

function setSelectedIndex(s, valsearch) {
	for (i = 0; i < s.options.length; i++) {
		if (s.options[i].value == valsearch) {
			s.options[i].selected = true;
			break;
		}
	}
	return;
}

function indexExists(s, valsearch) {
	for (i = 0; i < s.options.length; i++) {
		if (s.options[i].value == valsearch) {
			return true;
		}
	}
	return false;
}

function hasExtra() {
	var s = document.getElementById("mySelect");
	for (i = 0; i < s.options.length; i++) {
		if (!mylist.includes(parseFloat(s.options[i].value))) {
			return i;
		}
	}
	return false;
}

function removeExtra() {
	var s = document.getElementById("mySelect");
	for (i = 0; i < s.options.length; i++) {


		if (!mylist.includes(parseFloat(s.options[i].value))) {
			s.remove(i);
			return;
		}
	}
}

function myFunction() {
	var num = document.getElementById("query-field").value;
	if (isNaN(num) || num == "") {
		document.getElementById("notValidNumText").innerHTML = "Enter a valid number!";
	}
	else {
		while (hasExtra())
			removeExtra();
		chrome.tabs.executeScript({
			code: 'document.getElementsByTagName("video")[0].playbackRate = ' + num
		});

		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			var currTab = tabs[0];
			if (currTab) {
				var key = String(currTab.id);
				var v1 = key;
				var obj = {};
				obj[v1] = document.getElementById("query-field").value;
				storage.set(obj);
			}
		});
		if (mylist.indexOf(num) == -1 && !indexExists(document.getElementById("mySelect"), num))
			addExtra(num);
		setSelectedIndex(document.getElementById("mySelect"), num);
		document.getElementById("notValidNumText").innerHTML = "";
	}
}

function addExtra(value) {
	var x = document.getElementById("mySelect");
	var option = document.createElement("option");
	option.text = value;
	x.add(option);
	setSelectedIndex(document.getElementById("mySelect"), value);
}

document.addEventListener('DOMContentLoaded', function () {
	try {
		document.getElementById("notValidNumText").innerHTML = "";
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			var currTab = tabs[0];
			if (currTab) {
				var key = String(currTab.id);
				var v1 = key;
				storage.get(v1, function (result) {
					console.log(result[key]);
					valueOfLast = result[key];
					if (result[key] == undefined || indexExists(document.getElementById("mySelect"), result[key])) {
					}
					else {
						addExtra(result[key]);
					}
					setSelectedIndex(document.getElementById("mySelect"), result[key]);
					console.log(result[key], key);
				});
			}
		});
		var input = document.getElementById("query-field");
		input.addEventListener("keyup", function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				document.getElementById("clickIt").click();
			}
		});



		var checkPageButton = document.getElementById('clickIt');
		checkPageButton.addEventListener('click', function () {
			var num = document.getElementById("query-field").value;
			if (isNaN(num) || num == "") {
				document.getElementById("notValidNumText").innerHTML = "Enter a valid number!";
			}
			else {
				while (hasExtra())
					removeExtra();
				chrome.tabs.executeScript({
					code: 'document.getElementsByTagName("video")[0].playbackRate = ' + num
				});

				chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
					var currTab = tabs[0];
					if (currTab) {
						var key = String(currTab.id);
						var v1 = key;
						var obj = {};
						obj[v1] = document.getElementById("query-field").value;
						storage.set(obj);
					}
				});
				if (mylist.indexOf(num) == -1 && !indexExists(document.getElementById("mySelect"), num))
					addExtra(num);
				setSelectedIndex(document.getElementById("mySelect"), num);
				document.getElementById("notValidNumText").innerHTML = "";
			}

		}, false);

		var dropDownMenu = document.getElementById('mySelect');
		dropDownMenu.addEventListener('change', function () {
			document.getElementById("query-field").value = "";
			document.getElementById("notValidNumText").innerHTML = "";
			var lastExtraValue = hasExtra();
			if (lastExtraValue != dropDownMenu.options[dropDownMenu.selectedIndex].value) {
				removeExtra();
			}
			chrome.tabs.executeScript({
				code: 'document.getElementsByTagName("video")[0].playbackRate = ' + dropDownMenu.options[dropDownMenu.selectedIndex].value
			});
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				var currTab = tabs[0];
				if (currTab) {
					var key = String(currTab.id);
					var v1 = key;
					var obj = {};
					obj[v1] = dropDownMenu.options[dropDownMenu.selectedIndex].value;
					storage.set(obj);
				}
			});
		}, false);
	} catch (err) {

	}
}, false);