var path = require("path");
var fs = require("fs");
var sizeOf = require('image-size');
var gm = require('gm');
var Utils = require("../../../../utils");
let utils = new Utils();

var zorderUpdate = [
	base = {name:"base",IMG:""},
	screen = {name:"screen",IMG:""},
	bg = {name:"bg",IMG:""}
]

let SanGuoStyle = function(i,o,work,isL,firstRole,cfg){
	this.inputPath = i
	this.outputPath = o
	this.workPath = work
	this.isL = isL
	this.indexNum = 0
	this.bgArr = utils.getMoreRandFromDir(path.join(this.workPath,"ch","55"))
	zorderUpdate = [
		base = {name:"base",IMG:""},
		screen = {name:"screen",IMG:""},
		bg = {name:"bg",IMG:""}
	]
	genSanGuoPicture(i,o,cfg)
}



function genSanGuoPicture(input,o,cfg){
	var index = 0
	this.deviceOrientation = this.isL == true ? "heng" : "shu"
	var config = require("./config").USER_CONFIG[this.deviceOrientation]
	var count = utils.getfileCount(this.inputPath)
	for (let ele in config){
		for (let lan in config[ele]){
			var devices = config[ele][lan]
			for (let a=0;a<count;a++){
				var baseIMG = {}
				for (let i in zorderUpdate){
					e = zorderUpdate[i]
					var param  = getUpdateConponentParams(e,devices,ele,a,lan,cfg)
					if (e.name == "base"){
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
						utils.explorer(o)
					}
				})
			}
		}
	}
}

function getUpdateConponentParams(item,itemInfo,dev,id,lan,cfg){
	let t = {
		"55":{width:1242,height:2208},
		"65":{width:1242,height:2688}
	}
	console.log(item.name)
	let x,y,width,height
	if(item.name == "bg"){
		item.IMG  = path.join(this.workPath,lan,dev,this.bgArr[id])
		return [0,0,0,0,item.IMG]
	}
	if (item.name == "base"){
		item.IMG = path.join(this.workPath,lan,dev,this.bgArr[id])
		console.log(item.IMG)
		return [0,0,0,0,item.IMG]
	}
	else if (item.name == "screen"){
		item.IMG = utils.getfileFilterNew(this.inputPath, id)
	}
	width = cfg.w[dev] || 0
	height = cfg.h[dev] || 0
	x = cfg.x[dev] || cfg.x
	y = cfg.y[dev] || cfg.y
	
	return [x,y,width,height,item.IMG]
}




module.exports = SanGuoStyle