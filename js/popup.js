$(function () {
    //规则按钮事件
    /*$('#add_suffix_button').click(function (e) {
        $('#file_suffix').append('<div><input type="text" name="suffix" value=""/><a href="#" class="removeclass"><input type=\'button\' value=\'del\'></a></div>');
    });
    $('#add_rule_regexp_button').click(function (e) {
        $('#rule_regexp').append('<div><input type="text" name="rule_regexp" value=""/><a href="#" class="removeclass"><input type=\'button\' value=\'del\'></a></div>');
    });*/
    $('body').on('click',".removeclass",function (e) {
    	var a=$(this).attr('class');
       $(this).parent('td').parent('tr').remove();
    });
    $('body').on('click',".add_suffix",function (e) {
    	var add_target=$(this);
        add_suffix(add_target);
    })
    $('body').on('click',".add_regexp",function (e) {
    	var add_target=$(this);
        add_regexp(add_target);
    })
     $('body').on('click',".add_execlude",function (e) {
    	var add_target=$(this);
        add_execlude(add_target);
    })
    $('#search_button').click(function () {
        search();
    })
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
                //console.log(response);
                current_html = response;
                //解析指定后缀的资源，webrequest加载然后分析匹配指定规则的内容,由于这可能花费的时间比较多，需要交给background.js
                //显示结果
                
            });
        })
    });
});

//根据后缀规则获取html中指定后缀的字典 {'js':['1.js','2.js'],'php':['1.php','2.php']}
function get_suffix_list(html) {
    //TODO
}

//根据指定规则匹配敏感信息
function regexp_analyze(content, rule_regexp) {
    //TODO
}

function test() {
    console.log('test');
}

function add_suffix(e){
        //alert(1);
        var add='<tr><td><input type="text" name="suffix" value="" class="suffix"/></td><td class="focus"><a href="#" id="add_suffix_button" class="add_suffix show">&nbsp;+</a><a href="#" class="removeclass hide">&nbsp;x</a></td></tr>';
        e.addClass('hide');
        e.parent('td').find('.removeclass').removeClass('hide');
        $('.focus').removeClass('focus');
        $('.suffix_table').append(add);
        //alert(e);
}

function add_regexp(e){
        //alert(1);
        var add='<tr><td><input type="text" name="rule_regexp" value=""/></td><td class="focus_regexp"><a href="#" id="add_regexp_button" class="add_regexp show">&nbsp;+</a><a href="#" class="removeclass hide">&nbsp;x</a></td></tr>';
        e.addClass('hide');
        e.parent('td').find('.removeclass').removeClass('hide');
        $('.focus_regexp').removeClass('focus_regexp');
        $('.regexp_table').append(add);
        //alert(e);
}
function add_execlude(e){
        //alert(1);
        var add='<tr><td><input type="text" name="suffix" value=""/></td><td class="focus_execlude"><a href="#" class="add_execlude show">&nbsp;+</a><a href="#" class="removeclass hide">&nbsp;x</a></td></tr>';
        e.addClass('hide');
        e.parent('td').find('.removeclass').removeClass('hide');
        $('.focus_execlude').removeClass('focus_execlude');
        $('.execlude_table').append(add);
        //alert(e);
}

var suffix = new Array();
var regexp = new Array();
var execlude = new Array();
function search(){
	var suffix_num = $('input[name="suffix"]').length;
	var regexp_num = $('input[name="rule_regexp"]').length;
	var execlude_num = $('input[name="execlude"]').length;
	var i;
	for(i=0;i<suffix_num;i++){
		suffix[i] = $('input[name="suffix"]:eq('+[i]+')').val();
		console.log(suffix[i]);
	}
	for(i=0;i<regexp_num;i++){
		regexp[i] = $('input[name="rule_regexp"]:eq('+[i]+')').val();
		console.log(regexp[i]);
	}
	for(i=0;i<execlude_num;i++){
		execlude[i] = $('input[name="execlude"]:eq('+[i]+')').val();
		console.log(execlude[i]);
	}
}