function PolyvUpload(obj) {


	this.uploadButton = document.getElementById(obj.uploadButtton);
	this.writeToken = obj.writeToken;
	this.readToken = obj.readToken;
	this.hash = obj.hash;
	this.ts = obj.ts;
	this.userid = obj.userid;

	this._init();

	if (obj.response != undefined) {
		this.responseMessage(obj.response)
	}
}

PolyvUpload.prototype.addHander = function(ele, type, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(type, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent("on" + type, handler);
	} else {
		ele["on" + type] = handler;
	}
}

PolyvUpload.prototype._init = function() {
	var self = this;

	var uploadButton = this.uploadButton;

	var url = "http://v.polyv.net/file/plug-in/index.html";
	var wrapAll = document.createElement("div"),
		wrap = document.createElement("div"),
		frameWrap = document.createElement("div"),
		cancle = document.createElement("span"),
		iframe = document.createElement("iframe");
	self.wrap = wrapAll;
	
	wrapAll.setAttribute("id", "wrapAll");
	cancle.setAttribute("id", "cancle");
	cancle.innerHTML="x";
	wrapAll.style.display = "none";
	wrap.style.cssText = "display: block;";
	wrap.style.cssText = "display: block;position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 1001;background-color: #000;-moz-opacity: 0.5;opacity: .50;filter: alpha(opacity=50);";
	frameWrap.style.cssText = "display: block;position: absolute;left: 50%;top: 50%;width: 1000px;height: 600px;margin-top: -300px;margin-left: -500px;z-index: 1002;box-shadow: 0 0 25px rgba(0,0,0,0.7);border-radius: 10px;";
	cancle.style.cssText = "width: 26px;height: 26px;position: absolute;top: 0px;right: 0px;cursor: pointer;background: #eee;text-align: center;line-height: 26px;color: #666;font-size: 16px;font-family: microsoft yahei;";
	iframe.setAttribute("src", url);
	iframe.setAttribute("id", "polyvFrame");
	iframe.setAttribute("width", "1000");
	iframe.setAttribute("height", "600");
	iframe.style.cssText = "width: 100%;height: 100%;z-index: 1002;border:none;border-radius: 10px"
	frameWrap.appendChild(iframe);
	frameWrap.appendChild(cancle);
	wrapAll.appendChild(wrap);
	wrapAll.appendChild(frameWrap);
	document.getElementsByTagName("body")[0].appendChild(wrapAll);
	this.addHander(uploadButton, "click", function() {
		var wrapAll = document.getElementById("wrapAll");
		var cancle = document.getElementById("cancle");
		wrapAll.style.display = "block";
		var frameMsg = document.getElementById("polyvFrame").contentWindow;
		var obj = {
			"writeToken": self.writeToken,
			"readToken": self.readToken,
			"userid" : self.userid,
			"hash" : self.hash,
			"ts" : self.ts,
			"url": location.href
		}
		frameMsg.postMessage(JSON.stringify(obj), url);
		cancle.onclick = function() {
			wrapAll.style.display = "none";
		}
	})
}

PolyvUpload.prototype.responseMessage = function(func) {
	this.addHander(window, "message", function(event) {
		func(JSON.parse(event.data));
	})
}

PolyvUpload.prototype.closeWrap = function(){
	this.wrap.style.display = "none";
}