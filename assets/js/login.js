$(function () {
    //登入表单和注册表单的切换
    $('#link_reg,#link_login').on('click', function () {
        $('.reg-box,.login-box').toggle();
    })
    //自定义表单效验规则
    layui.form.verify({
        //pwd规则名称
        pwd: [
            /^\S{6,12}$/,
            '密码必须6-12的非空字符'
        ],
        repwd: function (value, item) {
            //获取密码框的值
            var password = $('#form_reg [name=password]').val();
            //value进行比较
            if (password !== value) {
                return '两次密码不一致'
            }
        }
    })

    //注册功能
    $('#form_reg').on('submit', function (e) {
        //阻止默认提交
        e.preventDefault();
        //收集表单数据
        var data = {
            username: $('#form_reg [name=username]').val().trim(),
            password: $('#form_reg [name=password]').val().trim(),
        }
        //发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    });
                }
                layui.layer.msg(res.message, {
                    icon: 6
                }, function () {
                    $('#link_login').click();
                })
            }
        })
    })

    //登入功能
    $('#form_login').on('submit', function (e) {
        //阻止默认提交
        e.preventDefault();
        //收集表单数据
        var data = $(e.target).serialize();
        //发送请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    })
                }
                layui.layer.msg(res.message, {
                    icon: 6
                }, function () {
                    //保存token数据
                    localStorage.setItem('token', res.token);
                    //跳转
                    location.href = '/index.html';
                })
            }
        })
    })
})