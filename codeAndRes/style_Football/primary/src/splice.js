var execSync= require('child_process').execSync;
var path = require("path");
var fs = require("fs");
var tools = require("../../../utils")
var sizeOf = require('image-size');
var gm = require('gm')
let tool = new tools();
var rotateIndex = {
	"0" : 0.7,
	"-5" :0.7,
	"-10":0.7,
	"-15":0.8,
	"-20":0.9
}

var templist = new Array() 
var otherlist = new Array()
var randArr = new Array()
var getRandLabel = function(prePath,notSelect){
	var dirs = prePath
	var files = fs.readdirSync(dirs)
	files.forEach(function(file){
		if (file != ".DS_Store"){
			var filepath = path.join(dirs,file)
			var info = fs.statSync(filepath);
			if(info.isDirectory()){                 
				// 如果是文件夹遍历
				if (file != notSelect){
					console.log("notSelect===",notSelect)
					getRandLabel(filepath);
				}
			}else{
				// 读出所有的文件
				if (file != ".DS_Store"){
					console.log(path.basename(file))
					var labelpath = path.join(dirs,path.basename(file))
					templist.push(labelpath)
				}
			}
		}
	})
	templist.sort(function(){
		return 0.5 - Math.random()
	})
	return templist[0]
}

var getLabelList = function(workpath,notSelect){
	var files = fs.readdirSync(workpath);  
	for (i in files){
		if (path.basename(files[i]) != ".DS_Store"){
			otherlist.push(path.basename(files[i]))
		}
	}
	otherlist.sort(function(){ return 0.5 - Math.random();}); 
	for (i in otherlist){
		if (i > 2 ) {break}
		templist = new Array() 
		var stylePath = path.join(workpath,otherlist[i])
		var label = getRandLabel(stylePath,notSelect)
		otherlist[i] = label
		console.log(otherlist[i])
	}
	return otherlist
}

var getNeedImgDada = function(config){
	for (var i in config){
		var dir = config[i].work_path
		var randNum = tool.getRandNum(dir)
		if (!randArr[i])
		{
			randArr[i] = randNum
		}
		var bImg  = tool.getfileFilterDS_Store(dir,randArr[i])
		config[i].select = path.join(dir,bImg)
	}
	console.dir(randArr)
	return config
}

//文字适配
var labelAdjust = function(img1,bgimg){
	var bgSize = sizeOf(bgimg)
	var size1 = sizeOf(img1)
	//居中
	return bgSize.width/2 - size1.width/2
}

var photoType_4 = function(inputPath,outPath,workPath){
	randArr = new Array()
	//强制为足球（不出篮球类宣传图）
	var balltype = "basketball"
	var notSelect = balltype == "basketball" ? "football" : "basketball"
	var indexNum = 0

	//游戏截图放大处理
	var img = tool.getfileFilterDS_Store(inputPath,1)
	var gamebgImg   = path.join(inputPath ,img)
	var isL =  tool.islandscape(gamebgImg)
	var str = isL == true ? "heng" : "shu"
	var inputConfig = require("./config.js").USER_CONFIG;
	var deviceTbl = inputConfig[str].device

	// var labelList
	var titleCell2Img
	var titleCellEndImg 
	var outlanpath = outPath
	var dealWith = function(err){
		if (!err) {
			indexNum = indexNum + 1
			console.log("正在制作宣传图",indexNum)
			if (indexNum == 12){
				console.log('宣传图制作成功');
				// tool.removeDir(inputPath)
				tool.explorer(outlanpath)
			}
		} else {
			console.log(err.message || "出错了！" + i);
		}
	}
	
	var lanArr = new Array("en","ch")
	for (var lanType in lanArr){
		var labelList = new Array()
		templist = new Array() 
		otherlist = new Array()
		
		for(var deviceName in deviceTbl){
			var deviceData = deviceTbl[deviceName];
			var lan = lanArr[lanType]
			var config = {
				"bg":{
					work_path: path.join(workPath,"bg",balltype,deviceData.name)
				},
				"bframe":{
					work_path: path.join(workPath,"bottombg",deviceData.name)
				},
				"point":{
					work_path: path.join(workPath , "point")
				},
				"role":{
					work_path: path.join(workPath , "role",balltype)
				},
				"tcell1":{
					work_path: path.join(workPath , "titleCell1")
				}
			}
			var needData = getNeedImgDada(config)
			var bottomImg = needData["bframe"].select
			var roleImg = needData["role"].select
			var titleCell1Img = needData["tcell1"].select
			var bg = needData["bg"].select
	
			//计算底板
			var data =  tool.calcImagePos(bg,bottomImg)
			deviceData.bottombgX = data.x
			deviceData.bottombgY = data.y
	
			//字相关
			var labelPath = path.join(workPath,"label",lan)
			var titleEndPath = path.join(workPath,"titleEnd")
			var titleCell2Path = path.join(workPath,"titleCell2")
	
			if (labelList.length == 0 ){
				templist = new Array()
				labelList = getLabelList(labelPath,notSelect)
			}
			
			if (!titleCell2Img){
				templist = new Array()
				titleCell2Img = getRandLabel(titleCell2Path,notSelect)
				console.log("titleCell2Img==",titleCell2Img)
			}
			
			if (!titleCellEndImg){
				templist = new Array()
				titleCellEndImg = getRandLabel(titleEndPath,notSelect)
				console.log("titleCellEndImg==",titleCellEndImg)
			}
			
	
			//人物放大处理
			var scaleroleW = sizeOf(roleImg).width * deviceData.scaleRole
			var scaleroleH = sizeOf(roleImg).height * deviceData.scaleRole 
			var scaleroleX = sizeOf(bg).width/2 - scaleroleW/2 + deviceData.roleOffsetX
			var scaleroleY
	
			if (lan == "en" ){
				//靠底
				scaleroleY = sizeOf(bg).height - scaleroleH
			}else{
				if (balltype == "basketball"){
					scaleroleY = sizeOf(bg).height - scaleroleH
				}else{
					scaleroleY = sizeOf(bg).height/2 - scaleroleH/2 + deviceData.roleOffsetY
				}
			}
			
			var rolePath =  `image Over ${scaleroleX},${scaleroleY},${scaleroleW},${scaleroleH},"${roleImg}"`
			var bottomBgPath = `image Over ${deviceData.bottombgX},${deviceData.bottombgY},${sizeOf(bottomImg).width},${sizeOf(bottomImg).height},"${bottomImg}"`;
			var titleCell1ImgPath = `image Over ${deviceData.cell1X},${deviceData.cellY},${sizeOf(titleCell1Img).width},${sizeOf(titleCell1Img).height},"${titleCell1Img}"`;
			var titleCell2ImgPath = `image Over ${deviceData.cell2X},${deviceData.cellY},${sizeOf(titleCell2Img).width},${sizeOf(titleCell2Img).height},"${titleCell2Img}"`;
			var titleCellEndImgPath = `image Over ${deviceData.cellEndX},${deviceData.cellY},${sizeOf(titleCellEndImg).width},${sizeOf(titleCellEndImg).height},"${titleCellEndImg}"`;
	
			var Count = tool.getfileCount(inputPath)
			for(i = 0;i<Count;i++) {
				//文字居中
				var labelImg = labelList[i]
				deviceData.labelX = labelAdjust(labelImg,bg)
				var labelPath = `image Over ${deviceData.labelX},${deviceData.labelY},${sizeOf(labelImg).width},${sizeOf(labelImg).height},"${labelImg}"`;
				//游戏截图
				var img = tool.getfileFilterDS_Store(inputPath,i)
				var gamebgImg   = path.join(inputPath ,img)
				var scalebgW = deviceData.gamebgW * deviceData.gamebgScale
				var scalebgH = deviceData.gamebgH * deviceData.gamebgScale
				var scalebgX = sizeOf(bg).width/2 - scalebgW/2 + deviceData.gamebgOffsetX
				var scalebgY = sizeOf(bg).height/2 - scalebgH/2 + deviceData.gamebgOffsetY
				var gameBgPath = `image Over ${scalebgX}, ${scalebgY}, ${scalebgW}, ${scalebgH},"${gamebgImg}"`;
	
				var imgName = `${3}_${lan}_${deviceData.name}_${i}.png`;
				var outName = path.join(outlanpath,imgName);
				
				if(lan != "ch"){
					gm(bg).draw(gameBgPath).draw(rolePath).draw(labelPath)
					.write(outName, function(err) {
						dealWith(err)
					})
				}
				else{
					gm(bg).draw(gameBgPath).draw(rolePath).draw(bottomBgPath).draw(labelPath).draw(titleCell1ImgPath).draw(titleCell2ImgPath).draw(titleCellEndImgPath)
					.write(outName, function(err) {
						dealWith(err)
					})
				}
			}
		}
	}
}

module.exports = photoType_4