$(function () {
    chrome.tabs.getSelected(null, function (tab) {
        $('#url_span').text(tab.url);
    });
    init_config();
    $('#back_button').click(function(){
        $('#back_button').css('display','none');
        $('#search_button').css('display','');
        $('#detail_result').css('display','none');
        $('#show_result').css('display','');
    });
    //设置搜索按钮事件
    $('#search_button').click(function () {
        var current_url = '';
        var current_html = '';
        var suffix_config = null;
        var rule_regexp = null;
        //检测配置是否正确，不正确则提醒用户重新设置
        //TODO

        //获取当前页面的url和content
        chrome.tabs.getSelected(null, function (tab) {
            //alert(tab.url);
            //console.log(tab.url)
            current_url = tab.url;
            chrome.tabs.sendMessage(tab.id, {action: "get_content"}, function (response) {
                console.log('into sendMessage callback')
                current_html = response;
                if(typeof current_html == "undefined"){
                    console.log("refresh");
                    $(".warning").css("display","inline-block");
                    $("#search_button").css("left","161px");
                    setTimeout(display_refresh,1000);
                }
                else{
                    
                    //console.log(current_html);
                    var suffix_list=get_suffix_list(current_html);
                    console.log(suffix_list);
                    var suffix_list_ex=del_execlude(suffix_list);
                    console.log(suffix_list_ex);
                    search_request(suffix_list_ex);
                    //show_data(suffix_list_ex);
                }
                //解析指定后缀的资源，webrequest加载然后分析匹配指定规则的内容,由于这可能花费的时间比较多，需要交给background.js
                //显示结果

            });
        })
    });
});

function display_refresh(){
    $(".warning").css("display","none");
    $("#search_button").css("left","320px");
}
//根据后缀规则获取html中指定后缀的字典 {'js':['1.js','2.js'],'php':['1.php','2.php']}
function get_suffix_list(html) {
    //TODO
    var result = new Array();
    for (var i = 0; i < suffix.length; i++) {
        temp_pattern = new RegExp("[\\-|.|:|\\/|\\w]+\\." + suffix[i], "gi");
        console.log(temp_pattern);
        result[suffix[i]] = html.match(temp_pattern);
    }
    return result
}

//根据指定规则匹配敏感信息
function regexp_analyze(content, rule_regexp) {
    //TODO
}

function del_execlude(list){
    //console.log(list);
    var execlude_reg = new Array();
    for(var i = 0; i < suffix.length; i++){
        for(var j=0;j<list[suffix[i]].length;j++){
            for(var k=0;k<execlude.length;k++){
                temp_patt = new RegExp(execlude[k]+"w*","gi");
                console.log(temp_patt);
                if(temp_patt.test(list[suffix[i]][j])){
                    console.log(1);
                    list[suffix[i]].splice(j,1);
                }
            }
        }
    }
    return list;
}


function goBack(){
    window.history.back();
  }

var suffix = new Array();
var regexp = new Array();
var execlude = new Array();

function init_config() {
    var storage=chrome.storage.local;
    suffix=[];
    regexp=[];
    execlude=[];
    storage.get('suffix',function (value) {
        for(var i=0;i<value.suffix.length;i++){
            suffix.push(value.suffix[i]);
        }
    });
    storage.get('regexp',function (value) {
        for(var i=0;i<value.regexp.length;i++){
            regexp.push(value.regexp[i]);
        }
    });
    storage.get('execlude',function (value) {
        for(var i=0;i<value.execlude.length;i++){
            execlude.push(value.execlude[i]);
        }
    });
}

function test() {
    console.log('test');
}


/*$(".show_detail").click(function(){
    console.log(1);
});*/
$(document).on("click",".show_detail",function(){
    var or_url=$(this).attr('data');
    var url;
    var key;
    for(var i=0;i<data_storage_url.length;i++){
        if(data_storage_url[i].or_url==or_url){
            url=data_storage_url[i].url;
            key=data_storage_url[i].key;
        }
    }
    /*for(var i=0;i<data_storage_location.length;i++){
        if(data_storage_location[i].or_url==or_url){
            location.push({
                'flocation':data_storage_location[i].flocation,
                'llocation':data_storage_location[i].llocation
            });
        }
    }*/
    show_detail(url,key);
});