; (function () {
    'use strict';
    var $form_add_task = $('.add-task');
    // 为什么每次添加之后,出现的都是两条一样的数据
    // var new_task = {};

    // local_storage的容器
    var task_list = [];
    let $delete_task;




    init();
    $form_add_task.on('submit', on_add_task_form_submit);
    function on_add_task_form_submit(e) {
        var new_task = {};
        e.preventDefault();
        new_task.content = $(this).find('input[name=content]').val();
        // 如果为空,返回不继续执行
        if (!new_task.content) return;
        var result = add_task(new_task);
        if (result) {
            render_task_list()
        }
    }
    // 监听事件,这样就解决了初始是否有的问题
    function listion_task_delete() {
        $delete_task.on("click", function () {
            var $this = $(this);
            // 视频里面用了3层结构,我这里只用了两层,所以应该就是parent

            // BUG未解决=========add的时候
            var $item = $this.parent();
            var index1 = $item.data('data-index');
            var index2 = $item.data('index');
            var tmp = confirm('确定删除?');
            console.log('====================================');
            console.log($item);
            console.log(index1);
            console.log(index2);
            /* 
                var index1 = $item.data('data-index');
                var index2 = $item.data('index');
                var index3 = $item.attr('data-index');
             */
            
            console.log('====================================');
            tmp ? delete_task(index2) : null;
        })
    }

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
    // 渲染模板
    function refresh_task_list() {
        store.set("task_list", task_list);
        render_task_list()
    }

    function delete_task(index) {
        // 如果没有index或者index不存在
        if (index === undefined || !task_list[index]) return;
        console.log(index);
        
        delete task_list[index];
        refresh_task_list()
    }

    function init() {
        // 初始化默认取值
        // 刚开始什么都没有
        store.remove("task_list")
        task_list = store.get('task_list') || [];
        if (task_list.length) {
            render_task_list();
        }
    }
    function render_task_list() {
        $('.task-list').html('');
        $('.inThed').val('')
        $.map(task_list, function (value, index) {
            let $task = render_task_item(value, index);
            $('.task-list').append($task);
        })
        $delete_task = $(".action.del");
        listion_task_delete()
    }

    function render_task_item(data, index) {
        // 如果没有数据和index就return
        if (!data || !index) return;
        let list_item_tpl = `
        <div class="task-item" data-index="${index}">
            <span><input type="checkbox" name="" id=""></span>
            <span class="task-content">${data.content}</span>
            <span class="action detail">detail</span>
            <span class="action del">delete</span>
        </div>`

        return $(list_item_tpl)
    }


})();
// var a = 1;   相当于给window定义了一个a window.a,污染了变量