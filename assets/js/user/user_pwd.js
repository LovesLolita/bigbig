$(function () {
    /* 自定义表单效验规则 */
    layui.form.verify({
        pwd: [
            /^\S{6,12}$/,
            '密码必须是6-12位的非空字符'
        ],
        //新密码不能和旧密码一致
        samePwd: function (value, item) {
            //value 是使用这个规则的表单项值(新密码)
            //获取旧密码
            var old = $('[name=oldPwd]').val().trim();
            //比较旧密码
            if (old === value) {
                return '新密码不能和旧密码一致';
            }
        },
        //确认密码必须和新密码保持一致
        rePwd: function (value, item) {
            //获取新密码
            var newPwd = $('[name=newPwd]').val().trim();
            //比较密码
            if (newPwd !== value) {
                return '两次密码必须一致'
            }
        }
    })
    /* 实现密码更新 */
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(e.target).serialize();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    });
                }
                layui.layer.msg(res.message, {
                    icon: 6
                });
                $('#resetBtn').click();
            }
        })
    })
})