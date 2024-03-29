{x2;if:!$userhash}
{x2;include:header}
<body>
{x2;include:nav}
<div class="container-fluid">
	<div class="row-fluid">
		<div class="span2">
			{x2;include:menu}
		</div>
		<div class="span10" id="datacontent">
{x2;endif}
			<ul class="breadcrumb">
				<li><a href="index.php?{x2;$_app}-master">{x2;$apps[$_app]['appname']}</a> <span class="divider">/</span></li>
				<li class="active">用户管理</li>
			</ul>
			<ul class="nav nav-tabs">
				<li class="active">
					<a href="#">用户列表</a>
				</li>
				<li class="dropdown pull-right">
					<a data-toggle="dropdown" class="dropdown-toggle" href="#">添加用户<strong class="caret"></strong></a>
					<ul class="dropdown-menu">
						<li><a href="index.php?user-master-user-add">单个用户</a></li>
						
					</ul>
				</li>
			</ul>
			<form action="index.php?user-master-user" method="post">
				<table class="table">
			        <tr>
						<td>
							手机号：
						</td>
						<td>
							<input class="input-big" name="search[username]" size="80" type="text" value="{x2;$search['username']}"/>
						</td>
						<td>
							注册时间：
						</td>
						<td>
							<input class="input-small datetimepicker" data-date="{x2;date:TIME,'Y-m-d'}" data-date-format="yyyy-mm-dd" type="text" name="search[stime]" size="10" id="stime" value="{x2;$search['stime']}"/> - <input class="input-small datetimepicker" data-date="{x2;date:TIME,'Y-m-d'}" data-date-format="yyyy-mm-dd" size="10" type="text" name="search[etime]" id="etime" value="{x2;$search['etime']}"/>
						</td>

						<td>
							<button class="btn btn-primary" type="submit">搜索</button>
						</td>
					</tr>
					<tr>
						<td><a href="./index.php?download-api-index&user_type=1" class="btn btn-primary" onclick="">导出用户<a/></td>
					</tr>
			        <tr>
						<!-- <td>
							电子邮箱：
						</td>
			        	<td>
			        		<input class="input-small" name="search[useremail]" size="25" type="text" value="{x2;$search['useremail']}"/>			        	</td>
			        	<td>
							用户组：
						</td>
						<td>
							<select name="search[groupid]" class="input-medium">
						  		<option value="0">不限</option>
						  		{x2;tree:$groups,group,gid}
						  		<option value="{x2;v:group['groupid']}"{x2;if:$search['groupid'] == v:group['groupid']} selected{x2;endif}>{x2;v:group['groupname']}</option>
						  		{x2;endtree}
					  		</select>
						</td> -->
						
						<td></td>
			        </tr>
				</table>
				<!--<div class="input">
					<input type="hidden" value="1" name="search[argsmodel]" />
				</div>-->
			</form>
			<form action="index.php?user-master-user-batdel" method="post">
				<table class="table table-hover">
					<thead>
						<tr>
							<th><input type="checkbox" class="checkall" target="delids"/></th>
							<th>ID</th>
							<th>用户账号(手机号)</th>
							<th>用户昵称</th>
							<!-- <th>电子邮件</th> -->
							<th>注册IP</th>
							<!-- <th>积分点数</th> -->
							<th>角色</th>
							<th>注册时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{x2;tree:$users['data'],user,uid}
						<tr>
							<td>{x2;if:v:user['userid'] != $_user['userid']}<input type="checkbox" name="delids[{x2;v:user['userid']}]" value="1">{x2;endif}</td>
							<td>{x2;v:user['userid']}</td>
							<td>{x2;v:user['username']}</td>
							<td>{x2;v:user['nickname']}</td>
							<!-- <td>{x2;v:user['useremail']}</td> -->
							<td>{x2;v:user['userregip']}</td>
							<!-- <td>{x2;v:user['usercoin']}</td> -->
							<td>{x2;$groups[v:user['usergroupid']]['groupname']}</td>
							<td>{x2;date:v:user['userregtime'],'Y-m-d'}</td>
							<td>
								<div class="btn-group">
									<a class="btn" href="index.php?user-master-user-modify&userid={x2;v:user['userid']}&page={x2;$page}{x2;$u}"><em class="icon-edit"></em></a>
									{x2;if:v:user['userid'] != $_user['userid']}
									<a class="btn ajax" href="index.php?user-master-user-del&userid={x2;v:user['userid']}&page={x2;$page}{x2;$u}" target="datacontent"><em class="icon-remove"></em></a>
									{x2;endif}
								</div>
							</td>
						</tr>
						{x2;endtree}
					</tbody>
				</table>
				<div class="control-group">
		            <div class="controls">
			            <label class="radio inline">
			                <input type="radio" name="action" value="delete" checked/>删除
			            </label>
			            {x2;tree:$search,arg,sid}
			            <input type="hidden" name="search[{x2;v:key}]" value="{x2;v:arg}"/>
			            {x2;endtree}
			            <label class="radio inline">
			            	<button class="btn btn-primary" type="submit">提交</button>
			            </label>
			        </div>
		        </div>
			</form>
			<div class="pagination pagination-right">
				<ul>{x2;$users['pages']}</ul>
			</div>
{x2;if:!$userhash}
		</div>
	</div>
</div>
</body>
</html>
{x2;endif}