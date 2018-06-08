$(function () {
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
            console.log(tab.url)
            current_url = tab.url;
            chrome.tabs.sendMessage(tab.id, {action: "get_content"}, function (response) {
                //console.log(response);
                current_html = response;
                //解析指定后缀的资源，webrequest加载然后分析匹配指定规则的内容
                //显示结果
            });
        })
    })
});

//解析html中的指定后缀的资源，根据指定规则匹配敏感信息
function regexp_analyze(content, rule_regexp) {
    //TODO
}

function test() {
    console.log('test');
}

