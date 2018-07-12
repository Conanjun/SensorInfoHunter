function search_request(list){//http://idas.uestc.edu.cn/authserver/custom/js/login.js
	var init_url;
	$('.result_box').empty();
	chrome.tabs.getSelected(null, function (tab) {
        init_url = tab.url;
        //console.log(init_url);
        var init_url_sp = init_url.split('/');
        var url_o=init_url_sp[0]+"//"+init_url_sp[1]+init_url_sp[2];
        //console.log(url_o);
        var url;
        request(init_url,init_url);
        for(var i = 0; i < suffix.length; i++){
        	for(var j=0;j<list[suffix[i]].length;j++){
        		//console.log(list[suffix[i]][j].slice(0,4));
        		if(list[suffix[i]][j].slice(0,4)=="http"){
        			url=list[suffix[i]][j];
        		}
        		else if(list[suffix[i]][j][0]=="/"){
        			url = url_o+list[suffix[i]][j];
        		}
        		else{
        			url = url_o + "/" + list[suffix[i]][j];
        		}
        		
        		request(url,list[suffix[i]][j]);//http://idas.uestc.edu.cn/articles/loginRule.js
        		
        	}
    	}
    	
    });
    /*var a="http://idas.uestc.edu.cn/authserver/custom/js/login.js";
	request(a);*/
	
}

var result = new Array();

function request(url,or_url){
	var xhr = new XMLHttpRequest();
	xhr.onload = function(e) {
		//console.log(result);
		
		get_regexp(url,or_url,xhr.response);
	}
	xhr.open("GET", url,true);
	xhr.responseType = "text";
	xhr.send();
}

var data_storage_num = new Array();
var data_storage_url = new Array();
var data_storage_location = new Array();
var url_re = new Array();
//console.log(data_storage_url);

function get_regexp(url,or_url,data){
	//console.log(data);
	var num = 0;
	if(data.slice(19,32)!="404 Not Found"){
		/*var reg_url1 = new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]","gi");
		console.log(reg_url1);
		var k=reg_url1.exec(data);
		console.log(k);
		if(k!=null){
			if(!jQuery.inArray(k[0], data_storage_url)){
				request(k[0],k[0]);
			}
			
		}*/
		for(var i=0; i<regexp.length; i++){
			var reg = new RegExp(regexp[i],"gi");
			//console.log(reg);
			var match;
			data_storage_url.push({
				'or_url':or_url,
				'key':regexp[i],
				'url':url
			});
			url_re.push(url);
			while (match = reg.exec(data)) {
			  //console.log(match.index + ' ' + reg.lastIndex);
			  data_storage_location.push({
			  	'or_url':or_url,
				'key':regexp[i],
				'flocation':match.index,
				'llocation':reg.lastIndex
			  });
			  num++;
			}
			//console.log(num);
			show_data(or_url,regexp[i],num);
			data_storage_num.push({
				'or_url':or_url,
				'key':regexp[i],
				'num':num,
			});
			num = 0;
			/*console.log(data_storage_num);
			console.log(data_storage_location);
			console.log(data_storage_url);*/
			var reg_url1 = new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]","gi");
			//console.log(reg_url1);
			var k=reg_url1.exec(data);
			//console.log(url_re);
			if(k!=null){
				//console.log(k[0]);
				if($.inArray(k[0],url_re) == -1 ){
					request(k[0],k[0]);
					//console.log(k);
				}
			
			}
		}
	}
	else{

	}
}

function show_data(or_url,key,num){
	if(num!=0){
    	var label='<li><a href="#" data='+or_url+' class="show_detail"><label>key['+key+']-num['+num+'] {'+or_url+'}</label></a></li>';
    	$('.result_box').append(label);
	}
}

function show_detail(url,key){
	var xhr = new XMLHttpRequest();
	xhr.onload = function(e) {
		show_detail_data(xhr.response,key);
		
	}
	xhr.open("GET", url,true);
	xhr.responseType = "text";
	xhr.send();
}

function show_detail_data(or_data,key){
	var result='';
	var str;
	var temp;
	var location=new Array();
	data=or_data.replace(/</g,"&it").replace(/>/g,"&gt");
	var reg = new RegExp(key,"gi");
	var match;
	while (match = reg.exec(data)) {
			  //console.log(match.index + ' ' + reg.lastIndex);
			  location.push({
				'flocation':match.index,
				'llocation':reg.lastIndex
			  });
			  
		}
	var lnum=location.length;
	str='<span>'+data.substring(0,location[0].flocation)+'</span>';
	result+=str;
	
	for(var i=0;i<lnum;i++){
		if(i==0){
			temp = data.substring(location[i].flocation,location[i].llocation);
			str = '<span><font style="background-color: #ECC27D">'+temp+'</font></span>';
			result+=str;
		}
		else{
			str = '<span>'+data.substring(location[i-1].llocation,location[i].flocation)+'</span>';
			result+=str;
			temp = data.substring(location[i].flocation,location[i].llocation);
			str = '<span><font style="background-color: #ECC27D">'+temp+'</font></span>';
			result+=str;
		}
	}
	str='<span>'+data.substring(location[lnum-1].llocation,data.length)+'</span>';
	result+=str;
	//console.log(result);
	$('#detail_result').html(result);
	$('#back_button').css('display','');
    $('#search_button').css('display','none');
    $('#detail_result').css('display','');
    $('#show_result').css('display','none');
}