function search_request(list){//http://idas.uestc.edu.cn/authserver/custom/js/login.js
	var init_url;
	$('.result_box').empty();
	chrome.tabs.getSelected(null, function (tab) {
        init_url = tab.url;
        console.log(init_url);
        var init_url_sp = init_url.split('/');
        var url_o=init_url_sp[0]+"//"+init_url_sp[1]+init_url_sp[2];
        console.log(url_o);
        var url;
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
console.log(data_storage_url);

function get_regexp(url,or_url,data){
	//console.log(data);
	var num = 0;
	if(data.slice(1,5)!="html"){
		for(var i=0; i<regexp.length; i++){
			var reg = new RegExp(regexp[i],"gi");
			//console.log(reg);
			var match;
			data_storage_url.push({
				'or_url':or_url,
				'key':regexp[i],
				'url':url
			});
			while (match = reg.exec(data)) {
			  //console.log(match.index + ' ' + reg.lastIndex);
			  data_storage_location.push({
			  	'or_url':or_url,
				'key':regexp[i],
				'flcation':match.index,
				'llcation':reg.lastIndex
			  });
			  num++;
			}
			show_data(or_url,regexp[i],num);
			data_storage_num.push({
				'or_url':or_url,
				'key':regexp[i],
				'num':num,
			});
			num = 0;
			console.log(data_storage_num);
			console.log(data_storage_location);
			console.log(data_storage_url);
		}
	}
	else{

	}
}

function show_data(or_url,key,num){
	if(num!=0){
    	var label='<li><a href="#"><label >key['+key+']-num['+num+'] {'+or_url+'}</label></a></li>';
    	$('.result_box').append(label);
	}
}