var Utils = require("./utils.js")
var utils = new Utils();
var path = require("path");
var gm = require('gm');
var cfg = require("./cfg/cfg");
global.IS_TEST = false
var genScreenShot = function(gameStyle,inPath,outPath,firstRole,isTool){
	this.gameStyle = gameStyle
	if (gameStyle == "style_PDK" || gameStyle == "style_Mahjong" || gameStyle == "style_Poker"){
		this.gameStyle = "style_QiPai"
	}
	this.inPath = inPath
	this.count = utils.getfileCount(this.inPath)
	if (gameStyle == "style_Fruit" || this.count == 4){
		this.gameStyle = "style_Origin"
	}
	
	
	//outPath //导出目录每次都需要重新定义，此处不能使用全局
	if (isTool === true){
		utils.removeDir(outPath)
		utils.mkdirs(outPath)
	}
	checkError()
	processinScreenshots(outPath,firstRole,gameStyle)
}

function checkError(){
	var screen = utils.getRandFile(this.inPath)
	this.isL = utils.islandscape(screen)
	this.deviceOrientation = this.isL == true ? "horizontal" : "vertical"
	
	if (screen == undefined || this.count>4) {
		throw "没有存放游戏截图或截图数量过多"
	}
	if (this.gameStyle  == undefined ){
		throw "无游戏类型"
	}
}

function processinScreenshots(outPath,firstRole,gameStyle){

	if (this.gameStyle == "style_Origin" || this.gameStyle == "style_FillLabel"){
		let workPath = path.dirname(__filename) + `/codeAndRes/${this.gameStyle}/res`
		processDir = this.inPath
		this.spliceFunc = require(`./codeAndRes/${this.gameStyle}/src/splice`)
		this.spliceFunc(processDir, outPath, workPath)
		return
	}

	var processDir = path.join(path.resolve(this.inPath,"../"), "temp", "temp_screenshot_dir1")

	if (this.gameStyle == "style_QSanGuo"){
		var processDir2 = path.join(path.resolve(this.inPath,"../"), "temp", "temp_screenshot_dir2")
		this.processDir2 = processDir2
		utils.mkdirs(processDir2)
	}

	utils.mkdirs(processDir)
	
	//等待截图处理完进行拼接
	let promise = new Promise((resolve, reject) =>{
		processingPicture(resolve,reject,processDir)
	});
	promise.then((value) =>{
		//两种不同的截图
		if (this.gameStyle == "style_QSanGuo"){
			processDir = {
				dir1:processDir,
				dir2:processDir2
			}
		}
		//开始拼接
		this.spliceFunc(processDir, outPath, value.workpath, this.isL, firstRole, value.params, gameStyle)
	});
}

function processingPicture(resolve,reject,processDir){
	let workPath = path.dirname(__filename) + `/codeAndRes/${this.gameStyle}/res`
	var index = 0
	var styleParams = cfg[this.gameStyle] //游戏风格参数
	if (!styleParams){
		throw "没有配置该风格的参数"
	}
	var selectVerParams = styleParams  //版本参数
	var gmParams //gm图像参数

	//多版本控制
	var versions = styleParams.selectVersion
	var version
	if (versions)  {
		version = utils.getRandEle(versions)
		if (this.gameStyle == "style_ChuanQi" && this.isL == false){
			version = "update"
		}
	}
	if (version) {
		selectVerParams = styleParams[version]
		this.spliceFunc = require(`./codeAndRes/${this.gameStyle}/${version}/src/splice`)
		workPath = path.dirname(__filename) + `/codeAndRes/${this.gameStyle}/${version}/res/`
	}
	else{
		this.spliceFunc = require(`./codeAndRes/${this.gameStyle}/src/splice`)
	}

	var direction = this.deviceOrientation
	var rand
	//判断是否该版本有多种选择
	if (selectVerParams.vertical.inW || selectVerParams.vertical.w ){
		gmParams = selectVerParams[this.deviceOrientation]
	}
	else{
		//多个就随机
		if (selectVerParams["common"]) {
			let arr = ["common",direction]
			direction = "common"  || arr[utils.GetRandomNum(0,1)]
		}
		rand = utils.GetRandomNum(1,Object.keys(selectVerParams[direction]).length) 
		gmParams = selectVerParams[direction][rand]
		if (!gmParams) { throw "随机到了不存在的类型"}
		if (!version) {
			workPath = path.dirname(__filename) + `/codeAndRes/${this.gameStyle}/res/${direction}/${rand}`
		}
		if(selectVerParams.layoutType == 1){
			workPath = path.dirname(__filename) + `/codeAndRes/${this.gameStyle}/${version}/res/${direction}/${rand}`
		}
	}
	var borderIMG
	for(i = 0; i<this.count; i++) {
		var outName = path.join(processDir,"rotate_" + i + ".png")
		let screenIMG = utils.getfileFilterNew(this.inPath,i)
		//有边框与无边框分开处理
		let borderPath = workPath
		if (selectVerParams.borderPath){
			borderPath = path.join(workPath,selectVerParams.borderPath,rand.toString())
		}
		if (selectVerParams.isBorder){
			 
			var templateImg = utils.getRandFile(path.join(borderPath,"template",direction))
			if (!borderIMG){
				borderIMG = utils.getRandFile(path.join(borderPath,"frame",direction))	
			}
			var borderCmd = `image Over 0,0,0,0,${borderIMG}`
			var screenCmd = `image Over ${gmParams.inX},${gmParams.inY},${gmParams.inW},${gmParams.inH},${screenIMG}`
			gm(templateImg).draw(screenCmd).draw(borderCmd).rotate('transparent',gmParams.r || 0).write(outName,function(err){
				if (err) {console.log(err)}
				else{
					index = index + 1
					if (index == selectVerParams.destNum){
						resolve({
						params:	gmParams,
						workpath:workPath
						})
					}
				}
			})
			//Q三国 生成多一份截图
			if(this.gameStyle == "style_QSanGuo"){
				var rotateTopImgName =  path.join(this.processDir2,"rotate2_" + i + ".png")
				gm(templateImg).draw(screenCmd).draw(borderCmd).rotate('transparent',gmParams.r_t).write(rotateTopImgName,(err) =>{
					if (err) {console.log(err)}
					else{
						index = index + 1
						if (index == selectVerParams.destNum){
							resolve({
								params:	gmParams,
								workpath:workPath
							})
						}
					}
				})
			}
		}
		else{
			var width  = gmParams.w["55"] || gmParams.w
			var height = gmParams.h["55"] || gmParams.h 
			gm(screenIMG).rotate('transparent',gmParams.r || 0).resize(width,height,"!").write(outName, (err) =>{
				if (err) {console.log(err)}
				else{
					index = index + 1
					if (index == 3){
						resolve({
							params:	gmParams,
							workpath:workPath
							})
					}
				}	
			})
		}
	}
}



module.exports = genScreenShot;