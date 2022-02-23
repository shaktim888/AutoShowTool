var path = require("path");
var fs = require("fs");
var sizeOf = require('image-size');
var gm = require('gm')
var Utils = require("../../../utils");
let utils = new Utils();

var Zorder = [
	bg = {name:"bg",IMG:""},
	screen = {name:"screen",IMG:""},
	role = {name:"role",IMG:""},
	bottom_bar = {name:"bottom_bar",IMG:""},
	label = {name:"label",IMG:""},
	// bottom_bar = {name:"bottom_bar",IMG:""},
]


let XianXiaStyle = function(i,o,work,isL,firstRole){
	this.inputPath = i
	this.outputPath = o
	this.workPath = work
	this.roleArr = utils.getMoreRandFromDir_FullPath(path.join(this.workPath,"role"))
	// this.roleArr[0] = firstRole
	this.labelStyle = utils.GetRandomNum(1,3).toString()
	this.labelArr = utils.getMoreRandFromDir(path.join(this.workPath,"label","ch",this.labelStyle))
	this.isL = isL
	this.indexNum = 0
	Zorder = [
		bg = {name:"bg",IMG:""},
		screen = {name:"screen",IMG:""},
		role = {name:"role",IMG:""},
		bottom_bar = {name:"bottom_bar",IMG:""},
		label = {name:"label",IMG:""},
		// bottom_bar = {name:"bottom_bar",IMG:""},
	]
	generateXianXia(i,o)
}

function generateXianXia(i,o){
	var index = 0
	var deviceOrientation = this.isL == true ? "heng" : "shu"
	var config = require("./config.js").USER_CONFIG[deviceOrientation]
	var count = utils.getfileCount(this.inputPath)
	for (let ele in config){
		for (let lan in config[ele]){
			var devices = config[ele][lan]
			for (let a = 0;a < count;a++){
				var baseIMG = {}
				for (let i in Zorder){
					e = Zorder[i]
					var param  = getConponentParams(e,devices,ele,a,lan)
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
						utils.removeDir(i)
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
function getConponentParams(item,itemInfo,dev,id,lan){
	console.log(item.name)
	let t = {
		"55":{width:1242,height:2208},
		"65":{width:1242,height:2268}
	}
	let x,y,width,height
	if (item.name == "bottom_bar" || item.name == "bg" ){
		let dir = path.join(this.workPath,item.name,dev)
		
		let randNum = utils.getRandNum(dir)
		if (!item.rand){
			item.rand = randNum
		}
		item.IMG  = utils.getfileFilterNew(dir,item.rand)
		if (item.name == "bg"){
			return [0,0,0,0,item.IMG]
		}
	}
	else if (item.name == "role"){
		item.IMG = this.roleArr[id]
		console.log(item.IMG)
	}
	else if (item.name == "label"){
		item.IMG = path.join(this.workPath,'label',lan,this.labelStyle,this.labelArr[id])
	}
	else if (item.name == "screen"){
		item.IMG = utils.getfileFilterNew(this.inputPath,id)
	}
	width = sizeOf(item.IMG).width * itemInfo[item.name].scale
	height = sizeOf(item.IMG).height * itemInfo[item.name].scale
	x = t[dev].width/2 - width/2 + itemInfo[item.name].offset.x
	y = t[dev].height - height - itemInfo[item.name].offset.y
	return [x,y,width,height,item.IMG]
}



module.exports = XianXiaStyle