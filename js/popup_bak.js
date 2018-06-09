$(function () {
    //规则按钮事件
    $('#add_suffix_button').click(function (e) {
        $('#file_suffix').append('<div><input type="text" name="suffix" value=""/><a href="#" class="removeclass"><input type=\'button\' value=\'del\'></a></div>');
    });
    $('#add_rule_regexp_button').click(function (e) {
        $('#rule_regexp').append('<div><input type="text" name="rule_regexp" value=""/><a href="#" class="removeclass"><input type=\'button\' value=\'del\'></a></div>');
    });
    $('body').on('click',".removeclass",function (e) {
       $(this).parent('div').remove();
    });

    //设置搜索按钮事件
    $('#search_button').click(function () {
        var current_url = '';
        var current_html = '';
        var suffix_config = null;
        var rule_regexp = null;
        //检测配置是否正确，不正确则提醒用户重新设置
        //TODO
        var suffixs=new Array("js");

        //获取当前页面的url和content
        chrome.tabs.getSelected(null, function (tab) {
            //alert(tab.url);
            //console.log(tab.url)
            current_url = tab.url;
            chrome.tabs.sendMessage(tab.id, {action: "get_content"}, function (response) {
                //console.log(response);
                current_html = response.toString();
                console.log('test');
                //解析指定后缀的资源，webrequest加载然后分析匹配指定规则的内容,由于这可能花费的时间比较多，需要交给background.js
                console.log(get_suffix_list(current_html,suffixs));
                //显示结果
            });
        })
    });
});

//根据后缀规则获取html中指定后缀的字典 {'js':['1.js','2.js'],'php':['1.php','2.php']}
function get_suffix_list(html,suffixs) {
    //TODO
    var result=new Array();
    for(var i=0;i< suffixs.length;i++){
        temp_pattern=new RegExp("[\\.|:|\\/|\\w]+\\."+suffixs[i],"gi");
        result[suffixs[i]]=html.match(temp_pattern);
    }
    return result
}

//根据指定规则匹配敏感信息
function regexp_analyze(content, rule_regexp) {
    //TODO
}

function test() {
    console.log('test');
    console.log(get_suffix_list('<body><script src="/abc/1.js"></script><script src="http://www.baidu.com/abc/2.js"></script></body>'))
}

