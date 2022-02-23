const { exec } = require('child_process');
var path = require("path");
var fs = require("fs");
var tools = require("../../../utils")
var gm = require('gm')
var sizeOf = require('image-size');
var USER_CONFIG_1 = {
	device:{
		"iPhone55":{
			//游戏背景在图中的位置
			gamebgX:0, gamebgY:0,gamebgW:1242  ,gamebgH:2208,
			name :  "55",
		},
		"iPhone65":{
			gamebgX:0, gamebgY:0,gamebgW:1242  ,gamebgH:2688,	
			name :  "65",
		},
		"iPad129":{
			gamebgX:0, gamebgY:0, gamebgW:2048  ,gamebgH:2732,
			name :  "129",
		},
	}
}

var photoType_1 = function(inputPath,outPath){
	let tool = new tools();
	var Count = tool.getfileCount(inputPath)

	var inputConfig = USER_CONFIG_1
	var deviceTbl = inputConfig.device

	var img = tool.getfileFilterDS_Store(inputPath,1)
	var gamebgImg  = path.join(inputPath ,img)

	var isL = tool.islandscape(gamebgImg)

	// var outlanpath = path.join(outPath,"1")
	var outlanpath = outPath

	tool.mkdirs(outlanpath)
	
	for(var deviceName in deviceTbl){
		// if (deviceName == "iPad129"){
		// 	continue
		// }
		var deviceData = deviceTbl[deviceName];
		console.log("正在处理：", deviceName);
		var width;
		var height;
		if (isL){
			width = deviceData.gamebgH;
			height = deviceData.gamebgW;
		}else{
			width =  deviceData.gamebgW;
			height = deviceData.gamebgH;
		}
		
		var indexNum = 0;
		for (i = 0;i<Count;i++){
			var imgName = `${1}_${deviceData.name}_${i + 1}.png`;
			var outName = path.join(outlanpath,imgName);	
			var img = tool.getfileFilterDS_Store(inputPath,i)
			var gamebgImg   = path.join(inputPath ,img)
			gm(gamebgImg)
			.resize(width, height, '!')
			.write(outName, function (err) {
				if (!err) 
				{
					indexNum  = indexNum + 1
					console.log("正在制作宣传图",indexNum)
					if (indexNum == 9){
						console.log('宣传图制作成功');
						tool.explorer(outlanpath)
					}
				} 
				else 
				{
					console.log(err.message || "出错了！" + i);
				}
			});
		}
	}	
}
module.exports = photoType_1