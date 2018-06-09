$(function () {
    //init() 根据chrome.storage中的配置显示后缀配置和正则匹配设置
    //规则按钮事件
    $('body').on('click', ".removeclass", function (e) {
        var a = $(this).attr('class');
        $(this).parent('td').parent('tr').remove();
    });
    $('body').on('click', ".add_suffix", function (e) {
        var add_target = $(this);
        add_suffix(add_target);
    })
    $('body').on('click', ".add_regexp", function (e) {
        var add_target = $(this);
        add_regexp(add_target);
    })
    $('body').on('click', ".add_execlude", function (e) {
        var add_target = $(this);
        add_execlude(add_target);
    })
    $('#search_button').click(function () {
        search();
    })
    //设置保存按钮事件
    $('#save_button').click(function () {
        var current_url = '';
        var current_html = '';
        var suffix_config = null;
        var rule_regexp = null;
        //检测配置是否正确，不正确则提醒用户重新设置
        //TODO
    });
});

function add_suffix(e) {
    var add = '<tr><td><input type="text" name="suffix" value="" class="suffix"/></td><td class="focus"><a href="#" id="add_suffix_button" class="add_suffix show">&nbsp;+</a><a href="#" class="removeclass hide">&nbsp;x</a></td></tr>';
    e.addClass('hide');
    e.parent('td').find('.removeclass').removeClass('hide');
    $('.focus').removeClass('focus');
    $('.suffix_table').append(add);
}

function add_regexp(e) {
    var add = '<tr><td><input type="text" name="rule_regexp" value=""/></td><td class="focus_regexp"><a href="#" id="add_regexp_button" class="add_regexp show">&nbsp;+</a><a href="#" class="removeclass hide">&nbsp;x</a></td></tr>';
    e.addClass('hide');
    e.parent('td').find('.removeclass').removeClass('hide');
    $('.focus_regexp').removeClass('focus_regexp');
    $('.regexp_table').append(add);
}

function add_execlude(e) {
    var add = '<tr><td><input type="text" name="suffix" value=""/></td><td class="focus_execlude"><a href="#" class="add_execlude show">&nbsp;+</a><a href="#" class="removeclass hide">&nbsp;x</a></td></tr>';
    e.addClass('hide');
    e.parent('td').find('.removeclass').removeClass('hide');
    $('.focus_execlude').removeClass('focus_execlude');
    $('.execlude_table').append(add);
}

function test() {
    console.log('test');
}
