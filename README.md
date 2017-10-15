# upload-file
使用JavaScript开发，文件上传插件，最主要的是用于图片上传Using JavaScript development, file upload plugins, the most important is for image uploading

### 功能介绍 Function is introduced

1. 将文件转成base64位，预览可以使用本地的blob
2. 可以检测文件的大小（判断有点模糊，正在修正）
3. 定义图片的格式或文件的格式
4. 可以使用ajax的请求对象2进行上传
5. 

```html
<input type="flie" id="flie">
<script src="js/upload_flie.js"></script>
```
```js
/*
* 第一步：实例化，UploadFile函数
* 
*/
var fileObj_ = new UploadFile('input',{
    img:true, // 是否是上传图片，如果不是，而是其他文件则否。
    imgs:true, // 前提条件是，必须得开启img变量。为真则设置多张图片上传。
    format:{}, // 自定义图像格式，前提条件是:必须得开启img变量及imgs。字符串或者json
    local:true, // 是不是预览返回本地路径，加载。
    size:.6 // 限制文件大小值
  })
  fileObj_.change(function (e) {
    /**
     * 返回结果值：
     * arrIndexNo array类型，返回第几个不是img格式，
     * length 数值类型，返回的是文件的个数。
     * dataBase64 json类型，返回的是bese64 为字符串
     * local 转换为（本地文件）；
     * 
     */
    console.log(e);
  })
```








