function search_request(list){//http://idas.uestc.edu.cn/authserver/custom/js/login.js
	var init_url;
	chrome.tabs.getSelected(null, function (tab) {
        init_url = tab.url;
        console.log(init_url);
        var init_url_sp = init_url.split('/');
        var url_o=init_url_sp[0]+"//"+init_url_sp[1]+init_url_sp[2];
        console.log(url_o);
        console.log(list.length);
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
        		request(url);//http://idas.uestc.edu.cn/articles/loginRule.js
        		
        	}
    	}
    });
    /*var a="http://idas.uestc.edu.cn/authserver/custom/js/login.js";
	request(a);*/
	
}

var result = new Array();

function request(url){
	var xhr = new XMLHttpRequest();
	xhr.onload = function(e) {
		//console.log(result);
		get_regexp(xhr.response);
		
	}
	xhr.open("GET", url,true);
	xhr.responseType = "text";
	xhr.send();
}

function get_regexp(data){
	console.log(data);
	if(data.slice(1,5)!="html"){
		for(var i=0; i<regexp.length; i++){
			var reg = new RegExp(regexp[i],"gi");
			console.log(reg);
			var match;
			while (match = reg.exec(data)) {
			  console.log(match.index + ' ' + reg.lastIndex);
			}
		}
	}
}