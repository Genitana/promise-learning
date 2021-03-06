
function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];
    this.then = function (onFulfilled) {
        console.log("then new promise  =================")

        return new Promise(function (resolve) {
            console.log("then 的 newpromise 的 handle 。。。");

            handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    };
    function handle(callback) {
        console.log("执行handle ...")

        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if(!callback.onFulfilled) {
            callback.resolve(value);
            return;
        }
        var ret = callback.onFulfilled(value);
        callback.resolve(ret);
    }
    
    function resolve(newValue) {
        console.log("执行 resolve 。。。，value:", newValue);

        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }
    console.log("n... fn 执行 。。。")
    fn(resolve);
}

// 例4
getUserId()
    .then(getUserJobById)
    // .then(function (job) {
    //     // 对job的处理
    // });
function getUserJobById(id) {
    console.log("new promise getUserJobById >>>>>>>>>>>>>")
    return new Promise(function (resolve) {

            resolve(id);
    });
}

function getUserId() {
    console.log("new promise getUserId ------------")
    return new Promise(function (resolve) {

        resolve(9876);
    });
}