config = window.config || {
	host: 'http://120.27.47.182/public/',
	//host: 'http://localhost/yjt/public/',
	selectArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
	questionType: ['全真模拟','单选题', '多选题', '判断题'],
	files: 'http://120.27.47.182/',
	jsonToString: function(o) {
		var r = [];
		if (typeof o == "string")
			return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
		if (o && typeof o == "object") {
			if (!o.sort) {
				for (var i in o)
					r.push(i + ":" + config.jsonToString(o[i]));
				if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
					r.push("toString:" + o.toString.toString());
				}
				r = "{" + r.join() + "}";
			} else {
				for (var i = 0; i < o.length; i++)
					r.push(config.jsonToString(o[i]));
				r = "[" + r.join() + "]";
			}
			return r;
		}
		if (o != undefined) {
			return o.toString();
		}
	},
	Helpers: {
		flashTimer: null,
		flashStr: "",
		flashTitle: function(e) {
			var e = e || config.Helpers.flashStr;
			clearTimeout(config.Helpers.flashTimer),
				document.title = config.Helpers.flashStr = e.substring(1, e.length) + e.substring(0, 1),
				config.Helpers.flashTimer = setTimeout(config.Helpers.flashTitle, 500);
		},
		dateformat: function(e, format) {
			if (!e) {
				return "";
			}
			var map = {
				"y": e.substr(0, 4), //年份 
				"M": e.substr(4, 2), //月份
				"d": e.substr(6, 2), //日
				"h": e.substr(8, 2), //小时 
				"m": e.substr(10, 2), //分 
				"s": e.substr(12, 2) //秒 
			};
			format = format.replace(/([yMdhms])+/g, function(all, t) {
				var v = map[t];
				if (v) {
					return v;
				}
				return all;
			});
			return format;
		},
		dateLocaleString: function() {
			var d = new Date();
			return d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
		},

	},
	validation: {
		//传真
		fax: function(value) {
			var match = /^(\d{3,4}-)?\d{7,8}$/;
			if (!match.test(value)) {
				return false;
			} else {
				return true;
			}
		},
		//手机号
		mobile: function(value) {
			//return /^1[3|4|5|8][0-9]\d{8,8}$/i.test(value);
			return /(^1[3|4|5|7|8][0-9]{9}$)/i.test(value);
		},
		//身份证
		idcard: function(value) {
			if (!value) {
				return true;
			}
			var b = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
			var b1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
			if (!b.test(value) && !b1.test(value)) {
				return false;
			} else {
				return true;
			}
		},
		//电子邮箱
		email: function(value) {
			return /^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value);
		},
		//实数
		realNumber: function(value) {
			return true;
		},
		//正整数
		isNumber: function(value) {

			var regu = "^[0-9]+$";
			var re = new RegExp(regu);
			if (value.match(re) != null) {
				return true;
			} else {
				return false;
			}
		},
		//正整数和小数
		isDecimal: function(value) {
			//	/^-?[1-9]*(\.\d*)?$|^-?0(\.\d*)?$/
			//	^[0-9]+(\.[0-9]+)?$
			var decimal = "^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$";
			var re = new RegExp(decimal);
			if (value.match(re) != null) {
				return true;
			} else {
				return false;
			}
		},

		//去空格
		isReplace: function(value) {
			return value.replace(/^\s+|\s+$/g, "");
		},

		isBlank: function(value) {}

	},
	selectItem: function(data, input_id, default_val) {
		if (data) {
			$("#" + input_id).empty();
			$.each(data, function(i, d) {
				if (default_val == d.id) {
					$("<option selected=true></option>").val(d.id).text(d.name).appendTo("#" + input_id);
				} else {
					$("<option ></option>").val(d.id).text(d.name).appendTo("#" + input_id);
				}
			});
		}
	},
	//获取url参数
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
	random4: function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	},
	UUID: function() {
		return (config.random4() + config.random4() + config.random4() + config.random4() + config.random4() + config.random4() + config.random4() + config.random4());
	},
	saveLocalStorage: function(key, value) {
		localStorage.setItem(key, value);
	},
	loadLocalStorage: function(key) {
		return localStorage.getItem(key);
	},
	loadcss: function(file) {
		var cssTag = document.getElementById('loadCss');
		var head = document.getElementsByTagName('head').item(0);
		if (cssTag) head.removeChild(cssTag);
		css = document.createElement('link');
		css.href = file;
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.id = 'loadcss';
		head.appendChild(css);
	},

         geturlstr: function(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

};


//全局的ajax访问，处理ajax清求时sesion超时
/*$.ajaxSettings({ 
    contentType:"application/x-www-form-urlencoded;charset=utf-8", 
    statusCode: {
        900: function () { 
        },
        901 :function(){
        }
    },
    complete:function(XMLHttpRequest,textStatus){
    	 if( textStatus =="timeout"){
			    return !1;
		  }
		  if(textStatus=="error"){
	   	  }
            var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，
            if(sessionstatus=="timeout"){ 
                        //如果超时就处理 ，指定要跳转的页面
             }
            XMLHttpRequest=null;
         }
  } );*/

var browser = {

	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;

		return {
			weixin: u.toLowerCase().match(/MicroMessenger/i) == "micromessenger",
			weimenhu_android: u.indexOf('ctnq_weimenhu_android') > -1,
			weimenhu_ios: u.indexOf('ctnq_weimenhu_ios') > -1,
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('ctnq_weimenhu_android') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};