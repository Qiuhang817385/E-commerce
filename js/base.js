; (function () {
    'use strict';
    var $form_add_task = $('.add-task');
    // 为什么每次添加之后,出现的都是两条一样的数据
    // var new_task = {};

    // local_storage的容器
    var task_list = [];



    init();
    $form_add_task.on('submit', function (e) {
        var new_task = {};
        e.preventDefault();
        new_task.content = $(this).find('input[name=content]').val();
        // 如果为空,返回不继续执行
        if (!new_task.content) return;
        var result = add_task(new_task);
        if (result) {
            render_task_list()
        }
    })
    function add_task(new_task) {
        // 首先每次点击的时候存入进去
        // 存入本地task——list
        // 第一次push,tasklist是一个对象,
        task_list.push(new_task);
        //从入storage
        // 刷新
        refresh_task_list();

        // 添加成功
        return true;
    }
    function refresh_task_list(){
        store.set("task_list", task_list);
        render_task_list()
    }
    function delete_task(index){
        // 如果没有index或者index不存在
        if(!index||!task_list[index]) return;

        delete task_list[index];

        refresh_task_list()
        

    }
    function init() {
        // 初始化默认取值
        // 刚开始什么都没有
        store.remove("task_list")
        task_list = store.get('task_list') || [];
        if(task_list.length){
            render_task_list();
        }
    }
    function render_task_list() {
        $('.task-list').html('');
        $('.inThed').val('')
        $.map(task_list, function (value, index) {
            let $task = render_task_tpl(value);
            $('.task-list').append($task);
        })
    }

    function render_task_tpl(data) {
        let list_item_tpl = `
        <div class="task-item">
            <span><input type="checkbox" name="" id=""></span>
            <span class="task-content">${data.content}</span>
            <span class="detail">detail</span>
            <span class="del">❌</span>
        </div>`

        return $(list_item_tpl)
    }


})();
// var a = 1;   相当于给window定义了一个a window.a,污染了变量