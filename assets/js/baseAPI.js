$.ajaxPrefilter(function (options) {
    //给接口设定统一的请求跟路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    //给有权限的接口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    //限制后台首页的访问权限
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})