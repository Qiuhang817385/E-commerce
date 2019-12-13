; (function () {
    'use strict';
    var $form_add_task = $('.add-task');
    // 为什么每次添加之后,出现的都是两条一样的数据
    // var new_task = {};

    // local_storage的容器
    var task_list = [];
    let $delete_task_trigger;
    var $detail_task_trigger;
    var $task_detail = $(".task-detail");
    var $task_detail_mask = $(".task-detail-mask");
    var current_index;
    var $update_form;
    var $task_detail_content;
    var $task_detail_content_input;




    init();
    $form_add_task.on('submit', on_add_task_form_submit);
    $task_detail_mask.on('click', hide_task_detail);

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

    // 完成--------完成
    /* 4.监听打开task详情的事件 */
    function listen_task_detail() {
        var index ;
        // 双击显示详情
        $(".task-item").on("dblclick",function(){
            index = $(this).data('index');
            show_task_detail(index);
        })

        $detail_task_trigger.on('click', function () {
            var $this = $(this);
            var $item = $this.parent();
            index = $item.data('index');
            show_task_detail(index);
        })
    }
    // 完成--------完成
    // 完成--------完成
    // 查看Task详情
    /* 1,生成详情模板 */
    function show_task_detail(index) {
        // render 详情列表
        render_task_detail(index);
        current_index = index;
        /* 显示详情模板,默认隐藏 */
        $task_detail.show()
        /* 显示mask */
        $task_detail_mask.show()
    }
    // 完成--------完成
    // 完成--------完成
    /* 3.隐藏task详情 */
    function hide_task_detail() {
        $task_detail.hide()
        $task_detail_mask.hide()
    }
    // 完成--------完成
    // 完成--------完成
    /* 2.更新task */
    function update_task(index, data) {
        if (index === undefined || !task_list[index]) return;
        // task_list[index] = $.merge({},task_list[index],data);
        task_list[index] = data;
        refresh_task_list();
    }
    // 完成--------完成
    // 完成--------完成
    /* 渲染指定详细信息 */
    function render_task_detail(index) {
        if (index === undefined || !task_list[index]) return;
        var item = task_list[index];
        var tpl = `
        <form>
            <div class="content">${item.content} </div>
            <div class="input-item"><input style="display:none;" type="text" name="content" value=${item.content}></div>
            <div>
                <div class="desc input-item">
                    <textarea name="desc" >${item.desc || ''}</textarea>
                </div>
            </div>
            <div class="remind input-item">
                <input type="date" name="remind_date" id="" value=${item.remind_date}>
                <button type="submit">submit</button>
            </div>
        </form>
        `
        /* 先清空task详情模板,再添加 */
        $task_detail.html('');
        $task_detail.html(tpl);

        /* 选中form元素,之后会使用其监听submit事件 */
        $update_form = $task_detail.find("form");
        // 如果双击这个元素
        /* 选中显示task内容元素 */
        $task_detail_content = $update_form.find(".content");
        /* 显示input元素 */
        $task_detail_content_input = $update_form.find("[name=content]");
        /* 内容元素双击,显示input,隐藏自己 */
        $task_detail_content.on('dblclick', function () {
            $(this).hide();
            $task_detail_content_input.show();
        })


        $update_form.on('submit', function (e) {
            e.preventDefault();
            var data = {};
            /* 获取表单中各个值 */
            data.content = $(this).find('[name=content]').val();
            data.desc = $(this).find('[name=desc]').val();
            data.remind_date = $(this).find('[name=remind_date]').val();
            update_task(index, data)
            hide_task_detail();
        })
    }
    // 完成--------完成
    // 完成--------完成
    // 监听事件,这样就解决了初始是否有的问题
    function listen_task_delete() {

        
        $delete_task_trigger.on("click", function () {
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
    // 完成--------完成
    // 完成--------完成
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
    // 完成--------完成
    // 渲染模板
    // 完成--------完成
    function refresh_task_list() {
        store.set("task_list", task_list);
        render_task_list()
    }
    // 完成--------完成
    // 完成--------完成
    function delete_task(index) {
        // 如果没有index或者index不存在
        if (index === undefined || !task_list[index]) return;
        console.log(index);

        delete task_list[index];
        refresh_task_list()
    }
    // 完成--------完成

    function init() {
        // 初始化默认取值
        // 刚开始什么都没有
        store.remove("task_list")
        task_list = store.get('task_list') || [];
        if (task_list.length) {
            render_task_list();
        }
    }
    // 完成--------完成
    function render_task_list() {
        $('.task-list').html('');
        $('.inThed').val('')
        $.map(task_list, function (value, index) {
            let $task = render_task_item(value, index);
            $('.task-list').append($task);
        })
        $delete_task_trigger = $(".action.del");
        $detail_task_trigger = $(".action.detail");
        listen_task_delete()
        listen_task_detail();
    }
    // 完成--------完成

    function render_task_item(data, index) {
        // 如果没有数据和index就return
        if (!data || index === undefined) return;
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