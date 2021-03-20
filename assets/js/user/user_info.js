$(function () {
    //获取用户信息,渲染到表单中
    initUser();

    function initUser() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                //
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }

                //表单一键赋值
                layui.form.val('formUserInfo', res.data)
            }
        })
    }

    //自定义表单验证规则
    layui.form.verify({
        nickname: function (value, item) {
            if (value.length > 6) {
                return '昵称不能超过6个字符'
            }
        }
    });
    //更新用户信息
    $('.layui-form').on('submit', function (e) {
        //阻止预设提交行为
        e.preventDefault();
        var data = $(e.target).serialize();
        //发送ajax请求
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    });

                }
                layui.layer.msg(res.message, {
                    icon: 6
                }, function () {
                    initUser();
                });
                window.parent.getUserInfo();
            }
        })
    })

    //重置功能
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        //重新获取用户信息,重新渲染
        initUser();
    })
})