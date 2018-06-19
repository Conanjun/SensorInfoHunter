$(function () {
    check_storage(); //检测初始存储信息
    //show_config() 根据chrome.storage.local中的配置显示后缀配置和正则匹配设置
    init_config();

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
        var suffix = new Array();
        var regexp = new Array();
        var execlude = new Array();

        var suffix_num = $('input[name="suffix"]').length;
        var regexp_num = $('input[name="rule_regexp"]').length;
        var execlude_num = $('input[name="execlude"]').length;
        var i;
        for (i = 0; i < suffix_num; i++) {
            suffix[i] = $('input[name="suffix"]:eq(' + [i] + ')').val();
            console.log(suffix[i]);
        }
        for (i = 0; i < regexp_num; i++) {
            regexp[i] = $('input[name="rule_regexp"]:eq(' + [i] + ')').val();
            console.log(regexp[i]);
        }
        for (i = 0; i < execlude_num; i++) {
            execlude[i] = $('input[name="execlude"]:eq(' + [i] + ')').val();
            console.log(execlude[i]);
        }
        //检测配置是否正确，不正确则提醒用户重新设置
        //TODO
        var storage=chrome.storage.local;
        storage.set({'suffix':suffix});
        storage.set({'regexp':regexp});
        storage.set({'execlude':execlude});
    });
});

function check_storage(){
    var storage=chrome.storage.local;
    storage.get('suffix',function (value) {
        console.log(value.suffix);
        if(value.suffix==undefined){
            var temp_suffix = new Array();
            temp_suffix[0]='js';
            storage.set({'suffix':temp_suffix});
            console.log(value.suffix);
        }
    });
    storage.get('regexp',function (value) {
        //console.log(value.suffix);
        if(value.regexp==undefined){
            var temp_regexp = new Array();
            temp_regexp[0]='ajax';
            storage.set({'regexp':temp_regexp});
        }
    });
    storage.get('execlude',function (value) {
        //console.log(value.suffix);
        if(value.execlude==undefined){
            var temp_execlude = new Array();
            temp_execlude[0]='/jquery\w*\.js/';
            temp_execlude[1]='/bootstrap\w*\.js/';
            storage.set({'execlude':temp_execlude});
        }
    });
}

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

function init_config(){
    var storage=chrome.storage.local;
    var temp_suffix = new Array();
    storage.get('suffix',function (value) {
        //显示配置到options.html(刚打开的时候)
        //console.log(value);
        show_stor_suffix(value.suffix);
    });
    storage.get('regexp',function (value) {
        //console.log(value);
        show_stor_regexp(value.regexp);
    });
    storage.get('execlude',function (value) {
       // console.log(value);
       show_stor_execlude(value.execlude)
    });
}

function show_stor_suffix(data){
    //console.log(data);
    var num= data.length;
    var i,add;
    for(i=0;i<num;i++){
        if(i==num-1){
            add='<tr><td><input type="text" name="suffix" value="'+data[i]+'" class="suffix"/></td><td class="focus"><a href="#" id="add_suffix_button" class="add_suffix show">&nbsp;+</a><a href="#" class="removeclass hide">&nbsp;x</a></td></tr>';
        }
        else{
            add='<tr><td><input type="text" name="suffix" value="'+data[i]+'" class="suffix"/></td><td class=""><a href="#" id="add_suffix_button" class="add_suffix hide">&nbsp;+</a><a href="#" class="removeclass ">&nbsp;x</a></td></tr>';
        }
        $('.suffix_table').append(add);
        
    }
}

function show_stor_regexp(data){
    //console.log(data);
    var num= data.length;
    var i,add;
    for(i=0;i<num;i++){
        if(i==num-1){
            add='<tr><td><input type="text" name="rule_regexp" value="'+data[i]+'" class="regexp"/></td><td class="focus"><a href="#" id="add_regexp_button" class="add_regexp show">&nbsp;+</a><a href="#" class="removeclass hide">&nbsp;x</a></td></tr>';
        }
        else{
            add='<tr><td><input type="text" name="rule_regexp" value="'+data[i]+'" class="regexp"/></td><td class=""><a href="#" id="add_regexp_button" class="add_regexp hide">&nbsp;+</a><a href="#" class="removeclass ">&nbsp;x</a></td></tr>';
        }
        $('.regexp_table').append(add);
        
    }
}

function show_stor_execlude(data){
    //console.log(data);
    var num= data.length;
    var i,add;
    for(i=0;i<num;i++){
        if(i==num-1){
            add='<tr><td><input type="text" name="execlude" value="'+data[i]+'" class="execlude"/></td><td class="focus"><a href="#" id="add_execlude_button" class="add_execlude show">&nbsp;+</a><a href="#" class="removeclass hide">&nbsp;x</a></td></tr>';
        }
        else{
            add='<tr><td><input type="text" name="execlude" value="'+data[i]+'" class="execlude"/></td><td class=""><a href="#" id="add_execlude_button" class="add_execlude hide">&nbsp;+</a><a href="#" class="removeclass ">&nbsp;x</a></td></tr>';
        }
        $('.execlude_table').append(add);
        
    }
}

function test() {
    console.log('test');
}
