  layui.use(['table', 'form'], function() {
			  var layer = layui.layer,
			  table = layui.table,  form = layui.form;
			  $ = layui.jquery;
			  var clientId = getCookie("clientId");
			  var userCode = queryUserCodeById($ , clientId);
			  queryUser(table,userCode);
			  //查询功能
			  //监听提交
			  form.on('submit(queryUser)', function(data){
			   queryUser(table, data.field.userCode);
			    return false;
			  });
	     
});

function queryUserCodeById($, clientId) {
		var userCode;
		$.ajax({
			async:false,
			url:"http://localhost:8088/user/getUserCode.do",
			type:"post",
			data: {"clientId":clientId},
			dataType:"json",
			success:function(result){
				if(result.status == 10) {
					 userCode = result.data;
				}
			},
			error:function(XMLHttpRequest, textstatus,errorThrown) {
				 layer.msg(XMLHttpRequest.status);
				 layer.msg(XMLHttpRequest.readystate);
				 layer.msg(textstatus);
				return false;
			}
		});
		return userCode;
}

function queryUser(table, userCode) {
	winWidth = 1368;
	if(window.innerWidth) {
		 winWidth = window.innerWidth;
	}
	else if ((document.body) && (document.body.clientWidth)) {
		winWidth = document.body.clientWidth;
	}
	var colWidth = (winWidth - 39) / 5;
		
	$.ajax({
		url:"http://localhost:8088/account/accountQuery.do",
		type:"post",
		data: {"userCode":userCode},
		dataType:"json",
		success:function(result){
		var userData = eval("("+result.data+")");
			table.render({
				 elem: '#userAccountTab',
				 data:userData,
				 height: 78,
				 skin: 'row',
				 cols: [[ //标题栏
				          {field: 'CLIENT_REALLY_NAME', title: '姓名', width:colWidth},
				          {field: 'CLIENT_IDENTITY', title: '身份证号', width:colWidth},
				           {field: 'CLIENT_BANK_ID', title: '开户银行', width:colWidth},
				           {field: 'CLIENT_ACCOUNT_CODE', title: '银行账号' ,width:colWidth},
				           {field: 'CLIENT_BALANCE', title: '余额', width:colWidth}
				         ]] ,
				 page: false
			});
		},
		error:function(XMLHttpRequest, textstatus,errorThrown) {
			 layer.msg(XMLHttpRequest.status);
			 layer.msg(XMLHttpRequest.readystate);
			 layer.msg(textstatus);
			return false;
		}
});
}

function getUserBalance($) {
	var  balance;
	 var clientId = getCookie("clientId");
		if(clientId == null || clientId == "undefined") {
			location.href='../login.html'; 
		} else {
			$.ajax({
				async:false,
				url:"http://localhost:8088/account/userBalance.do",
				type:"post",
				data: {"clientId":clientId},
				dataType:"json",
				success:function(result){
					if(result.status == 10) {
						 balance = result.data;
					}
				}
			});
		}
		return  balance;
}

function getUserNameByUserCode($, userCode){
	 var userName;
	 $.ajax({
				async:false,
				url:"http://localhost:8088/user/getUserNameByUserCode.do",
				type:"post",
				data: {"userCode":userCode},
				dataType:"json",
				success:function(result){
					if(result.status == 10) {
						 userName = result.data;
					}
				}
			});
	return userName;
}