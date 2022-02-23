var path = require("path");
var fs = require("fs");
var sizeOf = require('image-size');
var gm = require('gm');
var Utils = require("../../../utils");
let utils = new Utils();
var zorderPrimary = [
	bg = {name:"bg",IMG:""},
	bg_shadow = {name:"bg_shadow",IMG:""},
	role = {name:"role",IMG:""},
	screen = {name:"screen",IMG:""},
	frame = {name:"frame",IMG:""},
	bottom_bar = {name:"bottom_bar",IMG:""},
	effect = {name:"effect",IMG:""},
	label = {name:"label",IMG:""}
]

var zorderUpdate = [
	bg_basic = {name:"bg_basic",IMG:""},
	screen = {name:"screen",IMG:""},
	bg = {name:"bg",IMG:""},
	role = {name:"role",IMG:""},
	bottom_bar = {name:"bottom_bar",IMG:""},
	labelUp = {name:"labelUp",IMG:""},
	labelDown = {name:"labelDown",IMG:""},
	effect = {name:"effect",IMG:""}
]

let SanGuoStyle = function(i,o,work,isL){
	modeUpdate(i,o,work,isL)
	// 	modePrimary(i,o,work,isL)
}

function modeUpdate(i,o,work,isL){
	this.inputPath = i
	this.outputPath = o
	// console.log("111111",work)
	this.workPath = work
	this.isL = isL
	this.indexNum = 0
	this.labelUpArr = utils.getMoreRandFromDir(path.join(this.workPath,"55","labelUp","ch"))
	this.labelDownArr = utils.getMoreRandFromDir(path.join(this.workPath,"55","labelDown","ch"))
	this.roleArr = utils.getMoreRandFromDir(path.join(this.workPath,"55","role"))
	this.bgArr = utils.getMoreRandFromDir(path.join(this.workPath,"55","bg"))
	zorderUpdate = [
		bg_basic = {name:"bg_basic",IMG:""},
		screen = {name:"screen",IMG:""},
		bg = {name:"bg",IMG:""},
		role = {name:"role",IMG:""},
		bottom_bar = {name:"bottom_bar",IMG:""},
		labelUp = {name:"labelUp",IMG:""},
		labelDown = {name:"labelDown",IMG:""},
		effect = {name:"effect",IMG:""}
	]
	genUpdateSanGuo(i,o)
}


let modePrimary = function(i,o,work,isL){
	this.inputPath = i
	this.outputPath = o
	this.workPath = path.join(work,"mode_primary")
	this.isL = isL
	this.indexNum = 0
	this.labelArr = utils.getMoreRandFromDir(path.join(this.workPath,"label","ch"))
	this.roleArr = utils.getMoreRandFromDir(path.join(this.workPath,"55","role"))
	zorderPrimary = [
		bg = {name:"bg",IMG:""},
		bg_shadow = {name:"bg_shadow",IMG:""},
		role = {name:"role",IMG:""},
		screen = {name:"screen",IMG:""},
		frame = {name:"frame",IMG:""},
		bottom_bar = {name:"bottom_bar",IMG:""},
		effect = {name:"effect",IMG:""},
		label = {name:"label",IMG:""}
	]
	genPrimarySanGuo(i,o)
}

function genPrimarySanGuo(input,o){
	var index = 0
	var deviceOrientation = this.isL == true ? "heng" : "shu"
	var config = require("../style_ChuanQi/config10.js").USER_CONFIG[deviceOrientation]
	var count = utils.getfileCount(this.inputPath)
	for (let ele in config){
		for (let lan in config[ele]){
			var devices = config[ele][lan]
			for (let a=0;a<count;a++){
				var baseIMG = {}
				for (let i in zorderPrimary){
					e = zorderPrimary[i]
					var param  = getPrimaryConponentParams(e,devices,ele,a,lan)
					if (e.name == "bg"){
						baseIMG = gm(param[4])
						continue
					} 
					var CMD = `image Over ${param[0]},${param[1]},${param[2]},${param[3]},${param[4]}`
					baseIMG = baseIMG.draw(CMD) 	
				}
				let outName = path.join(o,lan + "_"+ ele + "_" + a + ".png")
				baseIMG.write(outName,function(err){
					index = index + 1
					console.log("正在制作宣传图:",index)
					if (index == 12){
						console.log('宣传图制作成功');
						utils.removeDir(input)
						utils.explorer(o)
					}
				})
			}
		}
	}
}


function genUpdateSanGuo(input,o){
	var index = 0
	var deviceOrientation = this.isL == true ? "heng" : "shu"
	var config = require("./config7.js").USER_CONFIG[deviceOrientation]
	var count = utils.getfileCount(this.inputPath)
	for (let ele in config){
		for (let lan in config[ele]){
			var devices = config[ele][lan]
			for (let a=0;a<count;a++){
				var baseIMG = {}
				for (let i in zorderUpdate){
					e = zorderUpdate[i]
					var param  = getUpdateConponentParams(e,devices,ele,a,lan)
					if (e.name == "bg_basic"){
						baseIMG = gm(param[4])
						continue
					} 
					var CMD = `image Over ${param[0]},${param[1]},${param[2]},${param[3]},${param[4]}`
					baseIMG = baseIMG.draw(CMD) 	
				}
				let outName = path.join(o,lan + "_"+ ele + "_" + a + ".png")
				baseIMG.write(outName,function(err){
					index = index + 1
					console.log("正在制作宣传图:",index)
					if (index == 12){
						console.log('宣传图制作成功');
						utils.removeDir(input)
						utils.explorer(o)
					}
				})
			}
		}
	}
}

/**
 * @param [item] 组件名称
 * @param [itemInfo] 配置中组件信息
 * @param [dev] 设备名称
 * @param [id] 当前截图图片索引
 * @param [lan] 语言版本
 * @returns [x,y,width,height,IMG]  返回一组gm信息
 */
function getPrimaryConponentParams(item,itemInfo,dev,id,lan){
	let t = {
		"55":{width:2208,height:1242},
		"65":{width:2688,height:1242}
	}
	console.log(item.name)
	let x,y,width,height
	if (item.name != "label" && item.name != "screen"){
		let dir = path.join(this.workPath,dev,item.name)
		if (item.name == "frame"){
			let str = this.isL == true ? "horizontal" : "vertical"
			dir = path.join(this.workPath, dev, item.name, str)
		}
		let randNum = utils.getRandNum(dir)
		if (!item.rand){
			item.rand = randNum
		}
		item.IMG  = utils.getfileFilterNew(dir,item.rand)
		if (item.name == "role"){
			item.IMG = path.join(this.workPath,dev,item.name,this.roleArr[id])
		}
		if ( item.name != "bottom_bar" && item.name != "effect"){
			return [0,0,0,0,item.IMG]
		}
	}
	else if (item.name == "label"){
		item.IMG = path.join(this.workPath, item.name, lan, this.labelArr[id])
	}
	else if (item.name == "screen"){
		item.IMG = utils.getfileFilterNew(this.inputPath, id)
	}
	width = sizeOf(item.IMG).width * itemInfo[item.name].scale
	height = sizeOf(item.IMG).height * itemInfo[item.name].scale
	x = t[dev].width/2 - width/2 + itemInfo[item.name].offset.x
	y = t[dev].height - height - itemInfo[item.name].offset.y
	if (item.name == "bottom_bar" || item.name == "effect"){
		x = 0
	}
	return [x,y,width,height,item.IMG]
}

function getUpdateConponentParams(item,itemInfo,dev,id,lan){
	let t = {
		"55":{width:2208,height:1242},
		"65":{width:2688,height:1242}
	}
	console.log(item.name)
	let x,y,width,height
	if (item.name == "bg_basic" || item.name == "bottom_bar" || item.name == "effect"){
		let dir = path.join(this.workPath,dev,item.name)
		let randNum = utils.getRandNum(dir)
		if (!item.rand){
			item.rand = randNum
		}
		item.IMG  = utils.getfileFilterNew(dir,item.rand)
		if (item.name == "bg_basic" || item.name == "effect"){
			return [0,0,0,0,item.IMG]
		}
	}
	else if (item.name == "bg"){
		item.IMG = path.join(this.workPath,dev,item.name,this.bgArr[id])
		return [0,0,0,0,item.IMG]
	}
	else if (item.name == "role"){
		item.IMG = path.join(this.workPath,dev,item.name,this.roleArr[id])
	}
	else if (item.name == "labelUp"){
		item.IMG = path.join(this.workPath, dev, item.name, lan, this.labelUpArr[id])
	}
	else if (item.name == "labelDown"){
		item.IMG = path.join(this.workPath, dev, item.name, lan, this.labelDownArr[id])
	}
	else if (item.name == "screen"){
		item.IMG = utils.getfileFilterNew(this.inputPath, id)
	}
	width = sizeOf(item.IMG).width * itemInfo[item.name].scale
	height = sizeOf(item.IMG).height * itemInfo[item.name].scale
	x = t[dev].width/2 - width/2 + itemInfo[item.name].offset.x
	y = t[dev].height - height - itemInfo[item.name].offset.y
	if (item.name == "bottom_bar"){
		x = 0
	}
	if (item.name == "role"){
		x = t[dev].width - width
	}
	return [x,y,width,height,item.IMG]
}

module.exports = SanGuoStyle