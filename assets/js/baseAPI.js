$.ajaxPrefilter(function (options) {
    //给接口设定统一的请求跟路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    //给有权限的接口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem(key, 'token')
        }
    }
})