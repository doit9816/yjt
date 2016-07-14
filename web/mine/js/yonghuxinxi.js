var yonghuxinxi = {
	data: {},
	dataInit: function() {
		//用户登陆判断
		$tokened=localStorage.getItem('token');
		if($tokened==null)
		{
			window.location.href="../login_register/deng.html";
		}
		yonghuxinxi.fn.initialize();
		//		yonghuxinxi.fn.list_init();
	},
	eventBind: function() {},
	fn: {
		list_init: function() {},
		dataFill: function(list) {
			if (list) {
				var data = {
					total: list.data.length,
					list: list,
					host: localStorage.getItem('file'),
				};
				var html = template('list_kq_content', data);
				document.getElementById('teacherComment_list').innerHTML = html;
			}
		},
		tagFill: function() {
			var data = {
				user_name: JSON.parse(localStorage.getItem('userInfo')).nickname,
				ChaBuDaoXinXi: '查不到信息',
			};
			var tem = template('page', data);
			document.getElementById('page').innerHTML = tem;
		},
		initialize: function() {
			yonghuxinxi.fn.tagFill();
		},
		cordavaDataGet: function() {
			yonghuxinxi.dataInit();
			yonghuxinxi.eventBind();

		},
		//修改昵称
		change_name: function() {
			var nickName = document.getElementById('nick_name').value;
			$.ajax({
				type: 'GET',
				url: config.host + "/user/info/update",
				data: {
					token: token,
					nickname: nickName,
				},
				dataType: "jsonp",
				success: function(list) {
					console.log("请求成功");
					if (list.status == 1) {
						//登录成功操作
						alert('设置成功');
						yonghuxinxi.fn.init_user();
						
//						self.location.reload();
					} else {
						alert(list.data);
					}
				},
				error: function(xhr, type) {
					console.log("请求失败");
					alert('网络异常');
				}
			});
		},
		init_user:function(){
			//初始化用户信息
				$.ajax({
					type: 'GET',
					url: config.host + "/user/info",
					data: {
						token: localStorage.getItem('token'),
					},
					dataType: "jsonp",
					success: function(list) {
						if (list.status == 1) {
							console.log("请求成功");
							//成功操作
							var userInfo = list.data;
							localStorage.setItem('userInfo', JSON.stringify(userInfo));
							history.go(0);
						} else {
							//alert(list.data);
							window.location.href="../login_register/deng.html";
						}
					},
					error: function(xhr, type) {
						console.log("请求失败");
						alert('网络异常');
					}
				});
		},
		change_pwd: function() {
			var oldpwd = document.getElementById('oldpwd').value;
			var newpwd = document.getElementById('newpwd').value;
			var again_pwd = document.getElementById('again_pwd').value;
			if (oldpwd.length < 6 || newpwd.length < 6 || again_pwd.length < 6) {
				alert('密码不能小于6位');
			} else if (newpwd != again_pwd) {
				alert('两次输入的密码不一致');
			} else {
				$.ajax({
					type: 'GET',
					url: config.host + "/pssword/retrieve",
					data: {
						token: localStorage.getItem('token'),
						old_userpassword: oldpwd,
						new_userpassword: newpwd,
					},
					dataType: "jsonp",
					success: function(list) {
						if (list.status == 1) {
							console.log("请求成功");
							//登录成功操作
							window.location.href = '../login_register/deng.html';
						} else {
							alert(list.data);
						}
					},
					error: function(xhr, type) {
						console.log("请求失败");
						alert('网络异常');
					}
				});
			}
		}

	}
}
$(function($) {
	yonghuxinxi.fn.cordavaDataGet();
});