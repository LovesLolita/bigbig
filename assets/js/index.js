$(function () {
    //弹层对象
    var layer = layui.layer;


    //退出登入
    $('#logout').on('click', function () {
        //询问退出
        layer.confirm('退出吗', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //单击确定执行这个回调函数
            localStorage.removeItem('token');
            //跳转这个登入页面
            location.href = '/login.html';
            layer.close(index);
        })
    })
})
//获取用户信息
getUserInfo();

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message, {
                    icon: 5
                })
            }
            //渲染用户数据
            renderAvatar(res.data);
        },
    })

}

function renderAvatar(user) {
    //欢迎语(昵称或者用户名  昵称优先显示)
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎你' + name);

    if (user.user_pic) {
        //渲染图片头像\文字头像隐藏
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //
        var first = name.substr(0, 1).toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();

    }
}