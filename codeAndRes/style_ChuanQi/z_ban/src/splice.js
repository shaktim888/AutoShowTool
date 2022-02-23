var path = require("path");
var fs = require("fs");
var sizeOf = require('image-size');
var gm = require('gm');
var Utils = require("../../../../utils");
let utils = new Utils();

var zorderUpdate = [
	bg = {name:"bg",IMG:""},
	screen = {name:"screen",IMG:""},
	frame = {name:"frame",IMG:""},
]

let ChuanQiStyle = function(i,o,work,isL,firstRole,cfg){
	this.inputPath = i
	this.outputPath = o
	this.workPath = work
	this.isL = isL
	this.indexNum = 0
	cfg =cfg
	this.bgArr = utils.getMoreRandFromDir(path.join(this.workPath,"55","bg"))
	this.bumscreenArr = utils.getMoreRandFromDirRecursive(path.join(this.workPath,"screen"))

	zorderUpdate = [
		bg = {name:"bg",IMG:""},
		screen = {name:"screen",IMG:""},
		frame = {name:"frame",IMG:""}
	]
	genNewChuanQiStyle(i,o,cfg)
}


function genNewChuanQiStyle(input,o,cfg){
	var index = 0
	var deviceOrientation = this.isL == true ? "heng" : "shu"
	var config = require("./config.js").USER_CONFIG[deviceOrientation]
	var count = utils.getfileCount(this.inputPath)
	for (let ele in config){
		for (let lan in config[ele]){
			var devices = config[ele][lan]
			for (let a=0;a<count;a++){
				var baseIMG = {}
				for (let i in zorderUpdate){
					e = zorderUpdate[i]
					var param  = getUpdateConponentParams(e,devices,ele,a,lan,cfg)
					if (e.name == "bg"){
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
					if (index == 18){
						console.log('宣传图制作成功');
						utils.removeDir(input)
						utils.explorer(o)
					}
				})
			}
		}
	}
}

function getUpdateConponentParams(item,itemInfo,dev,id,lan,cfg){
	let x,y,width,height
	if(item.name == "bg"){
		item.IMG = path.join(this.workPath,dev,item.name,this.bgArr[id])
		return [0,0,0,0,item.IMG]
	}
	if(item.name == "frame"){
		let dir = path.join(this.workPath,dev,item.name)
		let randNum = utils.getRandNum(dir)
		if (!item.rand){
			item.rand = randNum
		}
		item.IMG  = utils.getfileFilterNew(dir,item.rand)
		return [0,0,0,0,item.IMG]
	}
	else if (item.name == "screen"){
		if (lan == "ch" || (lan == "en" && dev == "129" )){
			item.IMG = utils.getfileFilterNew(this.inputPath, id)
		}
		else if (lan == "en" && dev != "129"){
			item.IMG = this.bumscreenArr[id]
		}
	}
	width = cfg.w[dev] || 0
	height = cfg.h[dev] || 0
	x = cfg.x[dev]
	y = cfg.y[dev]
	
	return [x,y,width,height,item.IMG]
}




module.exports = ChuanQiStyle