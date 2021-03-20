$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);
    // --------------------------------------
    /* 单击上传按钮,出现文件选择框 */
    $('#btnChooseImage').on('click', function () {
        //触发文件选择器的单击事件
        $('#file').click();
    })
    /* 用户选择了文件,渲染到裁剪区域 */
    $('#file').on('change', function () {
        //获取用户选择文件列表(文件控制元素.flies)
        var fileList = $(this)[0].files;
        //判断是否选中了文件
        if (fileList.length === 0) {
            return layui.layer.msg('请选择文件', {
                icon: 5
            });
        }
        // console.log(fileList);
        var file = fileList[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    /* 单击确定,上传头像图片 */
    $('#btnUpload').on('click', function () {
        //获取用户选择文件列表(文件控制元素.flies)
        var fileList = $('#file')[0].files;
        //判断是否选中文件
        if (fileList.length === 0) {
            return layui.layer.msg('请选择文件', {
                icon: 5
            });
        }
        //对图片裁剪后上传服务器
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, {
                        icon: 5
                    });
                }
                layui.layer.msg(res.message, {
                    icon: 6
                });
                //更新父页面的头像
                window.parent.getUserInfo();
            }
        })
    })
})