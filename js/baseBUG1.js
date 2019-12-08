;(function(){
    'use strict';
    var $form_add_task = $('.add-task');
    // 为什么每次添加之后,出现的都是两条一样的数据
    // 因为每次修改的都是同一个对象
    // var new_task = {};
    
    // local_storage的容器
    var task_list = [];
    init();
    $form_add_task.on('submit',function(e){
        e.preventDefault();
        new_task.content =  $(this).find('input[name=content]').val();
        // 如果为空,返回不继续执行
        if(!new_task.content) return;
        console.log(new_task);
        console.log("task_list push前",task_list);
        add_task(new_task);
    })
    console.log("task_list push前",task_list);
    function add_task(new_task){
        // 首先每次点击的时候存入进去
        // 存入本地task——list
        // 第一次push,tasklist是一个对象,
        console.log("new_task",new_task);

        // 相当于第一次new_task是{content:123}
        // 第二次,先执行new_task.content  = val,修改掉第一个的值变成最新的值
        // 然后new_task再次push一个最新的值
        // 为什么不管push前和后写在哪都会是两次
        // 其实push前的数量-1
        // 浏览器执行的太快了
        // 把push后的结果也打印了
      
        task_list.push(new_task);
        console.log("task_list push后",task_list);
        
        //从入storage
        store.set("task_list",task_list);
        console.log("task_list",task_list);
    }
    function init(){
        // 初始化默认取值
        // 刚开始什么都没有
        store.remove("task_list")
        task_list =  store.get('task_list')||[];
    }

   
    
    
})();
// var a = 1;   相当于给window定义了一个a window.a,污染了变量