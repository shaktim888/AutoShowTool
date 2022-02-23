var path = require("path");
var fs = require("fs");
var sizeOf = require('image-size');
var gm = require('gm');
var Utils = require("../../../utils");
let utils = new Utils();
var Zorder = [
	bg_down = {name:"bg_down",IMG:""},
	screen = {name:"screen",IMG:""},
	bg_up = {name:"bg_up",IMG:""},
	circle = {name:"circle",IMG:""},
	decoration = {name:"decoration",IMG:""},
	leaves = {name:"leaves",IMG:""},
	bottom_bar = {name:"bottom_bar",IMG:""},
	bottom_label_bar = {name:"bottom_label_bar",IMG:""},
	role = {name:"role",IMG:""},
	label_up = {name:"label_up",IMG:""},
	label_down = {name:"label_down",IMG:""},
	petal = {name:"petal",IMG:""}
]

let GongDouStyle = function(i,o,work,isL){
	this.isClient = "client_yes"
	this.inputPath = i
	this.outputPath = o
	this.workPath = work
	this.isL = isL
	this.indexNum = 0
	this.labelArr = utils.getMoreRandFromDir(path.join(this.workPath,"label","ch","label_down"))
	this.roleArr = utils.getMoreRandFromDir(path.join(this.workPath,this.isClient,"role"))
	this.bgArr = utils.getMoreRandFromDir(path.join(this.workPath,this.isClient,"bg_up","55"))
	Zorder = [
		bg_down = {name:"bg_down",IMG:""},
		screen = {name:"screen",IMG:""},
		bg_up = {name:"bg_up",IMG:""},
		circle = {name:"circle",IMG:""},
		decoration = {name:"decoration",IMG:""},
		leaves = {name:"leaves",IMG:""},
		bottom_bar = {name:"bottom_bar",IMG:""},
		bottom_label_bar = {name:"bottom_label_bar",IMG:""},
		role = {name:"role",IMG:""},
		label_up = {name:"label_up",IMG:""},
		label_down = {name:"label_down",IMG:""},
		petal = {name:"petal",IMG:""}
	]
	generateGongDou(i,o)
}

function generateGongDou(input,o){
	var index = 0
	var deviceOrientation = this.isL == true ? "heng" : "shu"
	var config = require("./config.js").USER_CONFIG[deviceOrientation]
	var count = utils.getfileCount(this.inputPath)
	for (let ele in config){
		for (let lan in config[ele]){
			var devices = config[ele][lan]
			for (let a=0;a<count;a++){
				var baseIMG = {}
				for (let i in Zorder){
					e = Zorder[i]
					var param  = getConponentParams(e,devices,ele,a,lan)
					if (e.name == "bg_down"){
						baseIMG = gm(param[4])
						continue
					} 
					var CMD = `image Over ${param[0]},${param[1]},${param[2]},${param[3]},${param[4]}`
					baseIMG = baseIMG.draw(CMD) 	
				}
				let outName = path.join(o,lan + "_"+ ele + "_" + a + ".png")
				baseIMG.write(outName,function(err){
					if (err){
						console.log(err)
					}
					index = index + 1
					console.log("正在制作宣传图:",index)
					if (index == 12){
						console.log('宣传图制作成功');
						// utils.removeDir(input)
						// utils.explorer(o)
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
function getConponentParams(item,itemInfo,dev,id,lan){
	let t = {
		"55":{height:2208,width:1242},
		"65":{height:2688,width:1242}
	}
	console.log(item.name)
	let x,y,width,height
	if (item.name == "petal" || item.name == "leaves" || item.name == "decoration" || item.name == "circle" || item.name == "bottom_bar" || item.name == "bottom_label_bar"){
		let dir = path.join(this.workPath,item.name)
		if (item.name == "bottom_bar"){
			dir = path.join(this.workPath,item.name,dev)
		}
		let randNum = utils.getRandNum(dir)
		if (!item.rand){
			item.rand = randNum
		}
		item.IMG  = utils.getfileFilterNew(dir,item.rand)
		if (item.name == "leaves"|| item.name == "bottom_bar"){
			return [0,0,0,0,item.IMG]
		}
	}
	else if(item.name == "bg_up" || item.name == "bg_down"){
		item.IMG  = path.join(this.workPath,this.isClient,item.name,dev,this.bgArr[id])
		return [0,0,0,0,item.IMG]
	}
	else if (item.name == "label_up"){
		item.IMG = path.join(this.workPath,"label",lan, item.name,this.labelArr[id])
	}
	else if (item.name == "label_down"){
		item.IMG = path.join(this.workPath,"label",lan, item.name,this.labelArr[id+3])
	}
	else if (item.name == "role"){
		item.IMG = path.join(this.workPath,this.isClient,item.name,this.roleArr[id])
	}
	else if (item.name == "screen"){
		item.IMG = utils.getfileFilterNew(this.inputPath, id)
	}
	width = sizeOf(item.IMG).width * itemInfo[item.name].scale
	height = sizeOf(item.IMG).height * itemInfo[item.name].scale
	x = t[dev].width/2 - width/2 + itemInfo[item.name].offset.x
	y = t[dev].height - height - itemInfo[item.name].offset.y
	if (item.name == "circle"){
		x = t[dev].width - width
	}
	if (item.name == "role" || item.name == "petal" || item.name == "label_up"){
		x = 0
	}
	if (item.name == "bottom_label_bar"){
		x = t[dev].width - sizeOf(item.IMG).width
		y = t[dev].height - sizeOf(item.IMG).height
	}
	if (item.name == "label_down"){
		x = t[dev].width - 822/2 - sizeOf(item.IMG).width/2;
		y = t[dev].height -  (391-153)/2 - sizeOf(item.IMG).height/2
	}
	return [x,y,width,height,item.IMG]
}


module.exports = GongDouStyle