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
				<li><a href="#">课程管理</a> <span class="divider">/</span></li>
				<li><a href="#">视频列表</a> <span class="divider">/</span></li>
				<li class="active">编辑视频</li>
				
			</ul>
				<ul class="nav nav-tabs">
				<li class="active">
					<a href="#">编辑视频</a>
				</li>
				<li class="pull-right">
					<a href="index.php?vedio-master-demand-vedio">视频管理</a>
				</li>
			</ul>
	      <form action="index.php?vedio-master-demand-editvedio" method="post" class="form-horizontal">
				<fieldset>
				<div class="top_left" style="width: 50%;float: left;">
				<div class="control-group">
					<label for="basic" class="control-label">视频名称</label>
					<div class="controls">
						<input id="basic" name="args[videoname]" type="text" value="{x2;$cat['videoname']}" needle="needle" msg="您必须输入视频名称" />
					</div>
				</div>
				
				
				<div class="control-group">
					<label for="basicthumb" class="control-label">视频上传</label>
					<div class="controls">

				<input type="button" id="upload" value="上传"></input>	
			
				<script src="app/core/styles/js/polyv-upload.js"></script>
				
<script type="text/javascript">

    var obj = {
            uploadButtton: "upload",   //打开上传控件按钮id
            writeToken: "{x2;c:WRITETOKEN}",
            userid : '{x2;c:USERID}',
            ts : '{x2;c:TIME}',
            hash : '{x2;c:HASH}' ,
            readToken: '{x2;c:READTOKEN}',
             response: function(json) { 
             	document.getElementById('VEDIO_IMG').src = json.swf_link;
             	var html = "<table class='table table-hover'><thead><tr><th width='20%'>项目</th><th>参数</th></tr></thead><tbody><tr><td>视频地址</td><td>"+json.swf_link+"</td></tr><tr><td>视频时长</td><td>"+json.duration+"</td></tr><tr><td>播放次数</td><td>"+json.times+"</td></tr>	<tr><td>视频大小</td><td>"+json.source_filesize+"</td></tr></tbody></table>";
             	document.getElementById('imaes').value = json.first_image;
             	document.getElementById('HTML').innerHTML = html;
     			document.getElementById('remoteurl').value = json.swf_link;
     			document.getElementById('duration').value = json.duration;
     			document.getElementById('mp4').value = json.mp4;
       			document.getElementById('videovid').value = json.vid;
        //如果需要关闭窗口
        upload.closeWrap();
         
    }
   }
    var upload = new PolyvUpload(obj);

	
</script>
					</div>
				</div>
	
				<div class="control-group">
					<label for="basicsubjectid" class="control-label">所属课程</label>
					<div class="controls">
						<select id="basicsubjectid" name="args[courceid]" needle="needle" msg="您必须选择课程分类">
						{x2;tree:$kecheng,val,vid}
						{x2;if:v:val['courseid'] == $cat['courceid']}
		        		<option value="{x2;v:val['courseid']}">{x2;v:val['coursename']}</option>
		        		{x2;endif}
		        		{x2;endtree}
				  		{x2;tree:$kecheng,cat,cid}
				  		{x2;if:v:cat['courseid'] != $cat['courceid']}
				  		<option value="{x2;v:cat['courseid']}">{x2;v:cat['coursename']}</option>
				  		{x2;endif}
				  		{x2;endtree}
				  		</select>
					</div>
				</div>
			</div>
				<div class="top_right" style="width: 50%;float: left;height: 200px;">

				<div class="control-group">
				<div >
					
<embed width="320" height="240" src="{x2;$cat['remoteurl']}" id="VEDIO_IMG" />
					</div>
					<div id="HTML">
			
					</div>
				</div>
				</div>
				
				<div class="control-group">
					<label for="basicprice" class="control-label">视频简介</label>
					<div class="controls">
						<textarea class="input-xlarge" rows="4" name="args[content]" id="basicprice">{x2;$cat['content']}</textarea>
					  	<span class="help-block">介绍一下视频，限制200字</span>
					</div>
				</div>
			
				<div class="control-group">
					<div class="controls">
						<button class="btn btn-primary" onclick="ceshi();" type="submit">提交</button>
						
						<input type="hidden" name="args[remoteurl]" id="remoteurl" value="{x2;$cat['remoteurl']}">
						<input type="hidden" name="args[duration]" value="{x2;$cat['duration']}" id="duration"> 
						<input type="hidden" name="args[videohumb]" value="{x2;$cat['videohumb']}" id="imaes">
						<input type="hidden" name="courseid" value="{x2;$courseid}">
						<input type="hidden" name="args[videotype]" value="0">
						<input type="hidden" name="args[videovid]" id="videovid" value="{x2;$cat['videovid']}">
						<input type="hidden" name="args[mp4url]" id="mp4" value="">
						<input type="hidden" name="catid" value="{x2;$cat['videoid']}">
						<input type="hidden" name="insertquestype" value="1"/>
				
						
					</div>
				</div>
				
					<script type="text/javascript">
				$(document).ready(function(){
  					$("form").submit(function(){
    				  var  vid = document.getElementById('videovid').value;
    				  var  basic = document.getElementById('basic').value;
    				  var  basicprice = document.getElementById('basicprice').value;
    				  $.post("http://v.polyv.net/uc/services/rest?method=editById",{
    				  		"writetoken":"{x2;c:WRITETOKEN}",
    				  		"vid":vid,
    				  		"title":basic,
    				  		"context":basicprice,
    				  },function (data) {
    				  	
    				  });
    				 
 					 });
				});
			</script>	
				</fieldset>
			</form>
{x2;if:!$userhash}
		</div>
	</div>
</div>
</body>
</html>
{x2;endif}