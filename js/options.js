$(function () {
    check_storage(); //检测初始存储信息
    //show_config() 根据chrome.storage.local中的配置显示后缀配置和正则匹配设置
    init_config();

    //规则按钮事件
    $(".regexp").click(function(){
        $("#rule_regexp").css("display","block");
        $("#execlude_file").css("display","none");
        $("#file_suffix").css("display","none");
        $(".cur").css("border-bottom","1px solid #4D0B33");
        $(".regexp").addClass("cur");
        $(".suffix").removeClass("cur");
        $(".execlude").removeClass("cur");
        $(".cur").css("border-bottom","none");
        //$(".nav").movebg({width:120/*滑块的大小*/,extra:40/*额外反弹的距离*/,speed:300/*滑块移动的速度*/,rebound_speed:400/*滑块反弹的速度*/});
    });
    $(".execlude").click(function(){
        $("#rule_regexp").css("display","none");
        $("#execlude_file").css("display","block");
        $("#file_suffix").css("display","none");
        $(".cur").css("border-bottom","1px solid #4D0B33");
        $(".execlude").addClass("cur");
        $(".regexp").removeClass("cur");
        $(".suffix").removeClass("cur");
        $(".cur").css("border-bottom","none");
        //$(".nav").movebg({width:120/*滑块的大小*/,extra:40/*额外反弹的距离*/,speed:300/*滑块移动的速度*/,rebound_speed:400/*滑块反弹的速度*/});
    });
    $(".suffix").click(function(){
        $("#rule_regexp").css("display","none");
        $("#execlude_file").css("display","none");
        $("#file_suffix").css("display","block");
        $(".cur").css("border-bottom","1px solid #4D0B33");
        $(".suffix").addClass("cur");
        $(".execlude").removeClass("cur");
        $(".regexp").removeClass("cur");
        $(".cur").css("border-bottom","none");
        //$(".nav").movebg({width:120/*滑块的大小*/,extra:40/*额外反弹的距离*/,speed:300/*滑块移动的速度*/,rebound_speed:400/*滑块反弹的速度*/});
    });
    $('#search_button').click(function () {
        search();
    })
//regexp
    $("#save_button_regexp").click(function(){
        var regexp_new = $('input[name="rule_regexp"]').val();
        var storage=chrome.storage.local;
        var regexp = new Array();
        storage.get('regexp',function (value) {
            regexp=value.regexp;
            //console.log(regexp);
            //show_stor_regexp(value.regexp);
            if($.inArray(regexp_new,regexp[0]) == -1){
                regexp[0].push(regexp_new);
                storage.set({'regexp':regexp});
                //console.log(regexp[0]);
                $(".add_regexp").text("添加"+regexp_new+"成功");
                $(".add_regexp").css("display","inline-block");
                setTimeout(display,1000);
                show_stor_regexp(regexp[0]);
            }
            else{
                $(".add_regexp").text("已存在"+regexp_new);
                $(".add_regexp").css("display","inline-block");
                setTimeout(display,1000);
            }
        });
        
    });

    $(document).on("click",".del_regexp",function(){
        var target=$(this).attr("data");
        var storage=chrome.storage.local;
        var regexp = new Array();
        storage.get('regexp',function (value) {
            regexp=value.regexp;
            for(var i=0;i<regexp[0].length;i++){
                if(target==regexp[0][i]){
                    regexp[0].splice(i,1);
                }
            }
            storage.set({'regexp':regexp});
            $(".add_regexp").text("删除"+target+"成功");
            $(".add_regexp").css("display","inline-block");
            setTimeout(display,1000);
            show_stor_regexp(regexp[0]);
        });
    });
//execlude
    $("#save_button_execlude").click(function(){
        var execlude_new = $('input[name="execlude"]').val();
        var storage=chrome.storage.local;
        var execlude = new Array();
        storage.get('execlude',function (value) {
            execlude=value.execlude;
            //console.log(regexp);
            //show_stor_regexp(value.regexp);
            //console.log(execlude);
            if($.inArray(execlude_new,execlude) == -1){

                execlude.push(execlude_new);
                storage.set({'execlude':execlude});
                //console.log(execlude);
                 $(".add_execlude").text("添加"+execlude_new+"成功");
                $(".add_execlude").css("display","inline-block");
                setTimeout(display,1000);
                show_stor_execlude(execlude);
            }
            else{
                $(".add_execlude").text("已存在"+execlude_new);
                $(".add_execlude").css("display","inline-block");
                setTimeout(display,1000);
            }
        });
        
    });

    $(document).on("click",".del_execlude",function(){
        var target=$(this).attr("data");
        var storage=chrome.storage.local;
        var execlude = new Array();
        storage.get('execlude',function (value) {
            execlude=value.execlude;
            for(var i=0;i<execlude.length;i++){
                if(target==execlude[i]){
                    execlude.splice(i,1);
                }
            }
            storage.set({'execlude':execlude});
            $(".add_execlude").text("删除"+target+"成功");
            $(".add_execlude").css("display","inline-block");
            setTimeout(display,1000);
            show_stor_execlude(execlude);
        });
    });
//suffix
    $("#save_button_suffix").click(function(){
        var suffix_new = $('input[name="file_suffix"]').val();
        var storage=chrome.storage.local;
        var suffix = new Array();
        storage.get('suffix',function (value) {
            suffix=value.suffix;
            //console.log(suffix);
            //show_stor_regexp(value.regexp);
            if($.inArray(suffix_new,suffix) == -1){
                suffix.push(suffix_new);
                storage.set({'suffix':suffix});
                $(".add_suffix").text("添加"+suffix_new+"成功");
                $(".add_suffix").css("display","inline-block");
                setTimeout(display,1000);
                //show_stor_execlude(execlude);
                //console.log(suffix);
                show_stor_suffix(suffix);
            }
            else{
                $(".add_suffix").text("已存在"+suffix_new);
                $(".add_suffix").css("display","inline-block");
                setTimeout(display,1000);
            }
        });
        
    });

    $(document).on("click",".del_suffix",function(){
        var target=$(this).attr("data");
        var storage=chrome.storage.local;
        var suffix = new Array();
        storage.get('suffix',function (value) {
            suffix=value.suffix;
            for(var i=0;i<suffix.length;i++){
                if(target==suffix[i]){
                    suffix.splice(i,1);
                }
            }
            storage.set({'suffix':suffix});
            $(".add_suffix").text("删除"+target+"成功");
            $(".add_suffix").css("display","inline-block");
            setTimeout(display,1000);
            show_stor_suffix(suffix);
        });
    });
});

function display(){
    $('.add_success').css('display','none');
}

function check_storage(){
    var storage=chrome.storage.local;
    storage.get('suffix',function (value) {
        //console.log(value.suffix);
        if(value.suffix==undefined){
            var temp_suffix = new Array();
            temp_suffix[0]='js';
            storage.set({'suffix':temp_suffix});
            //console.log(value.suffix);
        }
    });
    storage.get('regexp',function (value) {
        //console.log(value.suffix);
        if(value.regexp==undefined){
            var temp_regexp = new Array();
            temp_regexp[0]='ajax';
            storage.set({'regexp':temp_regexp});
            //console.log(value.regexp);
        }
    });
    storage.get('execlude',function (value) {
        //console.log(value.suffix);
        if(value.execlude==undefined){
            var temp_execlude = new Array();
            temp_execlude[0]='jquery';
            temp_execlude[1]='bootstrap';
            storage.set({'execlude':temp_execlude});
        }
    });
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
        show_stor_regexp(value.regexp[0]);
    });
    storage.get('execlude',function (value) {
        //console.log(value);
       show_stor_execlude(value.execlude)
    });
}

function show_stor_suffix(data){
    //console.log(data);
    $('.suffix_data').empty();
    var num= data.length;
    var i,add;
    for(i=0;i<num;i++){
        add = '<tr><td>'+data[i]+'</td><td><a data="'+data[i]+'" href="#" class="del del_suffix">删除</a></td></tr>';
        $('.suffix_data').append(add);
        
    }
}

function show_stor_regexp(data){
    //console.log(data);
    $('.regexp_data').empty();
    var num= data.length;
    var i,add;
    for(i=0;i<num;i++){
        add = '<tr><td>'+data[i]+'</td><td><a data="'+data[i]+'" href="#" class="del del_regexp">删除</a></td></tr>';
        //console.log(add);
        $('.regexp_data').append(add);
        
    }
}

function show_stor_execlude(data){
    //console.log(data);
    $('.execlude_data').empty();
    var num= data.length;
    var i,add;
    for(i=0;i<num;i++){
        add = '<tr><td>'+data[i]+'</td><td><a data="'+data[i]+'" href="#" class="del del_execlude">删除</a></td></tr>';
        $('.execlude_data').append(add);
        
    }
}

function test() {
    console.log('test');
}



$(function(){
    $.fn.movebg=function(options){
        var defaults={
        width:120,/*移动块的大小*/
        extra:50,/*反弹的距离*/
        speed:300,/*块移动的速度*/
        rebound_speed:300/*块反弹的速度*/
        };
    var defaultser=$.extend(defaults,options);
    return this.each(function(){
        var _this=$(this);
        var _item=_this.children("ul").children("li").children("a");/*找到触发滑块滑动的元素   */
        var origin=_this.children("ul").children("li.cur").index();/*获得当前导航的索引*/
        var _mover=_this.find(".move-bg");/*找到滑块*/
        var hidden;/*设置一个变量当html中没有规定cur时在鼠标移出导航后消失*/
        if (origin==-1){origin=0;hidden="1"} else{_mover.show()};/*如果没有定义cur,则默认从第一个滑动出来*/
        var cur=prev=origin;/*初始化当前的索引值等于上一个及初始值;*/
        var extra=defaultser.extra;/*声明一个变量表示额外滑动的距离*/
        _mover.css({left:""+defaultser.width*origin+"px"});/*设置滑块当前显示的位置*/
        
        //设置鼠标经过事件
        _item.each(function(index,it){
            $(it).mouseover(function(){
                cur=index;/*对当前滑块值进行赋值*/
                move();
                prev=cur;/*滑动完成对上个滑块值进行赋值*/
            });
        });
        _this.mouseleave(function(){
            //cur=origin;/*鼠标离开导航时当前滑动值等于最初滑块值*/
            move();
            if(hidden==1){_mover.stop().fadeOut();}/*当html中没有规定cur时在鼠标移出导航后消失*/
        });
        
        //滑动方法
        function move(){
            _mover.clearQueue();
            if(cur<prev){extra=-Math.abs(defaultser.extra);} /*当当前值小于上个滑块值时，额外滑动值为负数*/
            else{extra=Math.abs(defaultser.extra)};/*当当前值大于上个滑块值时，滑动值为正数*/
            _mover.queue(
                function(){
                    $(this).show().stop(true,true).animate({left:""+Number(cur*defaultser.width+extra)+""},defaultser.speed),
                    function(){$(this).dequeue()}
                }
            );
            _mover.queue(
                function(){
                    $(this).stop(true,true).animate({left:""+cur*defaultser.width+""},defaultser.rebound_speed),
                    function(){$(this).dequeue()}
                }
            );
        };
    })
    }
});

$(function(){

    $(".nav").movebg({width:120/*滑块的大小*/,extra:40/*额外反弹的距离*/,speed:300/*滑块移动的速度*/,rebound_speed:400/*滑块反弹的速度*/});

})