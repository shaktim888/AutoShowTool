const { exec } = require('child_process');
var path = require("path");
var fs = require("fs");
var Utils = require("../../../utils");
let utils = new Utils();
var DEVICE_LIST = {
	"iPhone55":{
		"shu":{
			//设备在背景中的位置
			outX:1625, outY:207, outW:396, outH:828,
			//游戏图在设备中的位置
			inX:1639, inY:296, inW:366, inH:644,
		},
		"heng":{
			outX:1290, outY:423, outW:826, outH:394,
			inX:1378, inY:439, inW:643, inH:366,
		},
		path : "2208_1242",
		name :  "55",
	},

	"iPhone65":{
		"shu":{
			outX:2030, outY:180, outW:441, outH:882,
			inX:2058, inY:205, inW:385, inH:830,
		},
		"heng":{
			outX:1781, outY:423, outW:793, outH:397,
			inX:1803, inY:449, inW:745, inH:346,
		},
		path : "2688_1242",
		name :  "65",
	},

	"iPad129":{
		"shu":{
			outX:1738, outY:465, outW:806, outH:1118,
			inX:1778, inY:541, inW:726, inH:966,
		},
		"heng":{
			outX:1541, outY:644, outW:1051, outH:761,
			inX:1612, inY:685, inW:908, inH:683,
		},
		path : "2732_2048",
		name :  "129",
	},
}

var maxNum = 30;
var globlaNum = Math.floor(Math.random()*maxNum);

var _genRandumBackImg = function(num){	
	if (num === 0){
		num = globlaNum;
	}
	return num;
}

var _getDeviceImg = function(inputConfig, deviceName){
	var deviceColor = inputConfig.deviceColor || "black";
	var deviceDirection = inputConfig.deviceDirection || "shu";
	var deviceImg = workPath + "/device/" + deviceColor + "/" + deviceDirection + "/" + deviceName;
	return deviceImg;
}


var textDelta = 4;

var _getFontColor = function(titleColor){
	var FontColorList = {
	'#c52492' : '#ef7eeb',
	'#c52492' : '#ef7eeb',
	'#a6681f' : '#fed515',
	'#75a4c9' : '#edfbf2',
	'#52ab37' : '#47fd50',
	'#4d32b5' : '#00b4ff',
	}

	
	var colorNum = FontColorList.length;
	var index = Math.floor(Math.random() * colorNum);
	var defaultColor = '#c52492' ;

	var topColor, botColor;

	if(FontColorList[titleColor]){
		topColor = titleColor;
		botColor = FontColorList[titleColor];
	}else{
		topColor = titleColor;
		botColor = defaultColor;
	}

	return {topColor:topColor, botColor:botColor};
}


var gm = require('gm').subClass({imageMagick: true});

//文本自动间距
var labelAdaptive = function(text){
	//拿到文本之后，检测其长度是否超过指定长度，如果超过进行换行，
}


var photoType_2 = function(inputDir,outPath, workPath){
	var index = 0
	var inputConfig = require("./config.js").USER_CONFIG;
	var backImgNum = _genRandumBackImg(inputConfig.backImgNum);

	// var rolePath = `image Over ${180}, ${180}, ${180}, ${180}, "${"./input/role.png"}"`;
	var dir = inputConfig.deviceDirection;

	var FONT_COLOR = _getFontColor(inputConfig.titleColor);
	var languageTbl = inputConfig.language
	
	for(var lanType in languageTbl){ 
		//ch, en ,ja ,ko,tc
		var outlanpath = path.join(outPath , "2/",lanType)
		utils.mkdirs(outlanpath)
		var lanTbl = languageTbl[lanType]
		var deviceTbl = lanTbl.device
		for(var deviceName in deviceTbl){
			//device 
			if(deviceName == "iPad129"){
				continue
			}
			var deviceData = deviceTbl[deviceName];
			var deviceConfig = DEVICE_LIST[deviceName];
			console.log("正在处理：", deviceName);
			var backimgPath = workPath + "/backimg/" + deviceConfig.path + "/" + backImgNum + ".png";
			var deviceImg = _getDeviceImg(inputConfig, deviceConfig.name + ".png");
			var outDevicePath = `image Over ${deviceConfig[dir].outX}, ${deviceConfig[dir].outY}, ${deviceConfig[dir].outW}, ${deviceConfig[dir].outH}, "${deviceImg}"`;
			//模板字符串(人物)
			
			//标题内容字号颜色处理
			var titleText = lanTbl.titleText;
			var titleFont = workPath + '/font/' + inputConfig.titleFont;
			var titleColor = inputConfig.titleColor;
			var titleFontSize = deviceData.titleFontSize
			var bodyFont = workPath + '/font/' + inputConfig.bodyFont;
			var bodyFontSize = deviceData.bodyFontSize;
			var bodyColor = inputConfig.bodyColor;

			for(var i = 0; i < lanTbl.bodyTextList.length; i++){
				var bodyText = lanTbl.bodyTextList[i];
				var imgName = `${lanType}_${deviceConfig.name}_${dir}_${i + 1}.png`;
				var outName = path.join(outlanpath,imgName);
				var img = utils.getfileFilterDS_Store(inputDir,i)
				var inputImg   = path.join(inputDir ,img)
				var inScreenPath = `image Over ${deviceConfig[dir].inX}, ${deviceConfig[dir].inY}, ${deviceConfig[dir].inW}, ${deviceConfig[dir].inH}, "${inputImg}"`;
				gm(backimgPath).draw(inScreenPath).draw(outDevicePath)
				.fill(FONT_COLOR.topColor).fontSize(titleFontSize).font(titleFont).drawText(deviceData.titlePosX, deviceData.titlePosY, titleText)
				.fill(FONT_COLOR.botColor).fontSize(titleFontSize).font(titleFont).drawText(deviceData.titlePosX, deviceData.titlePosY-textDelta, titleText)
				.fill(FONT_COLOR.topColor).fontSize(bodyFontSize).font(bodyFont).drawText(deviceData.bodyPosX, deviceData.bodyPosY, bodyText)
				.fill(FONT_COLOR.botColor).fontSize(bodyFontSize).font(bodyFont).drawText(deviceData.bodyPosX, deviceData.bodyPosY- textDelta, bodyText)
				.write(outName, function(err) {
					if (!err) {
						index = index + 1
						if (index == 30){
							console.log('处理截图成功');
						}
					} else {
						  console.log(err.message || "出错了！" + i);
					}
				})
			}
		}
	}
}


module.exports = photoType_2