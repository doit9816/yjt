﻿<?php $this->_compileInclude('header'); ?><body><?php $this->_compileInclude('nav'); ?><div class="container-fluid">	<div class="row-fluid">		<div class="span2">			<?php $this->_compileInclude('menu'); ?>		</div>		<div class="span10">			<ul class="breadcrumb">				<li><a href="index.php?core-master">全局</a> <span class="divider">/</span></li>				<li class="active">首页</li>			</ul>			<div class="row-fluid">								<table class="table table-hover table-bordered"> 					<thead>						<tr>							<th colspan="2">系统版本信息 </th>						</tr>					</thead>						<tr>							<td>网站域名</td>							<td>								<?php echo $this->tpl_var['fuwu']['SERVER_NAME']; ?>							</td>						</tr>							<tr>							<td>服务器IP</td>							<td><?php echo $this->tpl_var['fuwu']['IP']; ?></td>						</tr>						<tr>							<td>系统时间</td>							<td><?php echo $this->tpl_var['fuwu']['TIME']; ?></td>						</tr>													<tr>							<td>系统版本</td>							<td><?php echo $this->tpl_var['fuwu']['BANBEN']; ?></td>						</tr>													<tr>							<td>运行环境/php版本</td>							<td><?php echo $this->tpl_var['fuwu']['YINQING']; ?>/<?php echo $this->tpl_var['fuwu']['PHPBANBEN']; ?>														</td>						</tr>											</table>										</div>			<div class="row-fluid">				<table class="table table-hover table-bordered">					<ul class="nav nav-tabs">				<li class="active">					<a href="#">系统操作日志</a>				</li>				<li class="pull-right">					<a  class="ajax" href="index.php?core-master-setting">删除一周前的所有日志</a>				</li>							</ul>					<thead>							<tr>						<th>事件ID</th>							<th>操作事件</th>						<th>详细内容</th>						<th>操作时间</th>						<th>操作用户</th>													</tr>						</thead>						<tbody>						<?php $vid = 0;
 foreach($this->tpl_var['pages']['data'] as $key => $val){ 
 $vid++; ?>						<tr>														<td><?php echo $val['logid']; ?></td>								<td><?php echo $val['event']; ?></td>							<td><?php echo $val['content']; ?></td>							<td><?php echo date('Y-m-d H:i:s',$val['eventtime']); ?></td>							<?php if($val['usertruename'] ==''){ ?>							<td><?php echo $val['username']; ?></td>							<?php } else { ?>							<td><?php echo $val['usertruename']; ?></td>							<?php } ?>													</tr>						<?php } ?>						</tbody>				</table>		<div class="pagination pagination-right">						<ul><?php echo $this->tpl_var['pages']['pages']; ?></ul>					</div>		</div>							</div>		</div>	</div></div></body></html>