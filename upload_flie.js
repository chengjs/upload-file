/*!
 * upload_flie JavaScript Library v3.2.1
 * https://lolku.com/
 * author ：jinShan
 * 作者：金山
 * Date: 2017-10-150T18:59Z
 */
(function (window) {
			// 第一个参数，是对象。当是传入的是字符串或者对象
			// 第二个参数是一些判断值
			var dom = window.document;
			var _this = null;
			function UploadFile(obj,es) {
				"use strict"; // 开启严格模式
				// 下面是进行判断第二个参数的东东。
				if(typeof es === 'undefined' &&  typeof(obj) !== "object" && Object.prototype.toString.call(es).toLowerCase() !== "[object object]" && !obj.length){
					console.log('yes');
					return false;
				}
				_this=this;
				var fileObj = null;
				if(obj[0] instanceof HTMLElement) {
					fileObj = obj[0];
				}else if (obj instanceof HTMLElement ) {
					fileObj = obj;
				}else if (typeof obj === "string") {
					if(obj.slice(0,1) === '#'){
						var obj2 = clearString(obj);
						fileObj = dom.getElementById(obj2);
					}else if (obj.slice(0,1) === '.') {
						var obj2 = clearString(obj);
						fileObj = dom.getElementsByClassName(obj2)[0];
					}else {
						fileObj = dom.getElementsByTagName(obj)[0];
					}
				}else {
					alert('你到底传啥子？');
				}
				// 重置对象上面所有的属性和值
				fileObj.setAttribute("accept","");
				fileObj.setAttribute("type","file");
				fileObj.removeAttribute("multiple"); // removeAttribute 
				// 判断多张图片上传
				if(es.img === true){
					fileObj.setAttribute("accept","image/*");
					if(es.imgs === true){
						fileObj.setAttribute("multiple","multiple");
					}
				}
				// 如果事件change
				this.change = function (callback) {
					if(typeof callback == "function"){
						var dataJson = {
							arrIndexNo: [], // 判断第几个是不是图片
							dataBase64:[], // base64位结果
							local:[],
							sizeArr:[],
							fileName:[]
						}
						var arrFlieName = [];
						fileObj.onchange = function (e) {
							var falg = false;
							var num = -1;
							var len = this.files.length;
							for(var i = 0;i<len;i++){
								arrFlieName.push(this.files[i].name);
								if(es.img === true){
									var type = this.files[i].type.split('/')[0];
									if(type != 'image'){
										dataJson.arrIndexNo.push(i);
										// console.log('第'+i+'个文件不是图片');
									}
								}
								// 判断是最后一个文件
								if(i === len-1){
									falg =!falg;
									dataJson.length =len-dataJson.arrIndexNo.length; // 获取实际选中的文件个数。
								}
								// 判断文件大小。有点模糊，不够严谨。
								var re = /^[0-9]+.?[0-9]*$/;
								if(es.size && re.test(es.size) ){
									var size = Math.round(this.files[i].size / 1024 / 1024);
								    if (size > es.size) {
								        dataJson.sizeArr.push({index:this.files[i]});
								    }
								}
								var filesLocal = window.URL.createObjectURL(e.target.files[i]);
								var reader = new FileReader();
							    //读取文件过程方法
							    reader.onloadstart = function (e) {}
							    reader.onprogress = function (e) {
							        console.log("正在读取中....");
							    }
							    reader.onabort = function (e) {
							        console.log("中断读取....");
							    }
							    reader.onerror = function (e) {
							        console.log("读取异常....");
							    }
							    reader.onload = function (e) {
							    	num++;
							    	dataJson.dataBase64.push({'result':e.target.result});
								    if(es.local === true && filesLocal){
							    		dataJson.local.push({'local':filesLocal});
							    	}
							    	// 判断是最后一个文件,然后在把数据塞进去。
							    	if(len-1===num){
							    		// 将文件名字放入到数组内，然后数组去重，这样
							    		var subLen = arrFlieName.length;
										for(var i = 0;i<subLen;i++){
										    if(dataJson.fileName.indexOf(arrFlieName[i]) == -1){  //判断在dataJson.fileName数组中是否存在，不存在则push到dataJson.fileName数组中
										        dataJson.fileName.push(arrFlieName[i]);
										        console.log(i);
										    }else {
										    	console.log('第'+i+'个');
										    }
										    if(subLen-1 == i){
												callback(dataJson);
										    }
										}
										falg = !falg;
							    	}
							    }
							    reader.readAsDataURL(this.files[i])
							}
						}
					}
				}
				
				
			}
			// 去除字符串的第一个字符
			function clearString (str) {
				var str = str.substr(1,str.length);
				return str;
			}
			window.UploadFile = UploadFile;
		})(window);
