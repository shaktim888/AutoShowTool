var path = require("path");
var fs = require("fs");
var sizeOf = require('image-size');
var gm = require('gm');
var Utils = require("../../../utils");
let utils = new Utils();
var Zorder = [
	bg = {name:"bg",IMG:""},
	screen_bottom = {name:"screen_bottom",IMG:""},
	screen_top = {name:"screen_top",IMG:""},
	role = {name:"role",IMG:""},
	label = {name:"label",IMG:""},
	effect = {name:"effect",IMG:""}
]
let QSanGuoStyle = function(i,o,work,isL){
	this.inputPath = i.dir2
	this.inputPath_top = i.dir1
	this.outputPath = o
	this.workPath = work
	this.isL = isL
	
	this.indexNum = 0
	this.labelArr = getThreeColorArr(path.join(this.workPath,"label","ch"))
	this.roleArr = getThreeColorArr(path.join(this.workPath,"55","role"))
	this.effectArr = getThreeColorArr(path.join(this.workPath,"55","effect"))
	this.bgArr = utils.getMoreRandFromDir(path.join(this.workPath,"55","bg"))
	Zorder = [
		bg = {name:"bg",IMG:""},
		screen_bottom = {name:"screen_bottom",IMG:""},
		screen_top = {name:"screen_top",IMG:""},
		role = {name:"role",IMG:""},
		label = {name:"label",IMG:""},
		effect = {name:"effect",IMG:""}
	]
	genQSanGuoStyle(i.dir2,i.dir1,o)
}
function genQSanGuoStyle(input,i_top,o){
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
					if (e.name == "bg"){
						baseIMG = gm(param[4])
						continue
					} 
					if(e.name == "screen_top" && this.isL){
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
						// utils.removeDir(i_top)
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
	let t = {
		"55":{height:2208,width:1242},
		"65":{height:2688,width:1242}
	}
	console.log(item.name)
	let x,y,width,height
	if(item.name == "bg"){
		item.IMG  = path.join(this.workPath,dev,item.name,this.bgArr[0])
		return [0,0,0,0,item.IMG]
	}
	else if (item.name == "label"){
		item.IMG = path.join(this.workPath,item.name,lan,this.labelArr[id])
	}
	else if(item.name == "effect"){
		item.IMG = path.join(this.workPath,dev,item.name,this.effectArr[id])
		return [0,0,0,0,item.IMG]
	}
	else if(item.name == "role"){
		item.IMG = path.join(this.workPath,dev,item.name,this.roleArr[id])
	}
	else if (item.name == "screen_bottom" ){
		item.IMG = utils.getfileFilterNew(this.inputPath, id)
	}
	else if (item.name == "screen_top"){
		item.IMG = utils.getfileFilterNew(this.inputPath_top, id)
	}
	width = sizeOf(item.IMG).width * itemInfo[item.name].scale
	height = sizeOf(item.IMG).height * itemInfo[item.name].scale
	x = t[dev].width/2 - width/2 + itemInfo[item.name].offset.x
	y = t[dev].height - height - itemInfo[item.name].offset.y
	if (item.name == "role"){
		x = t[dev].width - sizeOf(item.IMG).width
		y = t[dev].height - sizeOf(item.IMG).height
	}

	if ( (item.name == "screen_top" || item.name == "screen_bottom")&& dev == "65" && this.isL === false){
		height = height * 1.2
	}
	return [x,y,width,height,item.IMG]
}

function getThreeColorArr(dirname){
	let arr = []
	let colorArr = ["red","blue","green"]
	let colorList = undefined
	colorArr.forEach((ele,index)=>{
		let colorPath = path.join(dirname,ele)
		if (colorList === undefined){
			colorList = utils.getMoreRandFromDir(colorPath)
		}
		let colorImg = path.join(ele,colorList[0])
		if (dirname.indexOf("label") != -1){
			colorImg = path.join(ele,colorList[index])
		}
		arr.push(colorImg)
	})
	return arr
}


module.exports = QSanGuoStyle