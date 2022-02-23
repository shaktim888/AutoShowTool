var USER_CONFIG_3 = {
	heng:{
		device:{
			"iPhone55":{
				scaleRole:1.2, roleOffsetX:0, roleOffsetY:200,       //人物放大倍数
				gamebgW:2208 ,gamebgH:1242, gamebgScale:0.7,gamebgOffsetX:0, gamebgOffsetY:-200,//游戏背景
				labelY:200,	//文字
				cell1X:100,cell2X:350,cellEndX:600,cellY:1850,//标题字位置
				path : "2208_1242",
				name :  "55",
			},
			"iPhone65":{
				scaleRole:1.5, roleOffsetX:0, roleOffsetY:200,
				gamebgW:2208, gamebgH:1242, gamebgScale:0.7, gamebgOffsetX:0, gamebgOffsetY:-400,
				labelY:200, 
				cell1X:100,cell2X:350,cellEndX:600,cellY:2300,//标题字位置
				path : "2688_1242",
				name :  "65",
			}
		}
	},
	shu:{
		device:{
			"iPhone55":{
				scaleRole:1.1, roleOffsetX:0, roleOffsetY:200,  
				gamebgW:1242,gamebgH:2208, gamebgScale:0.7, gamebgOffsetX:0, gamebgOffsetY:0,  
				labelY:100,	
				cell1X:100,cell2X:350,cellEndX:600,cellY:1800,
				path : "2208_1242",
				name :  "55",
			},
			"iPhone65":{
				scaleRole:1.1,roleOffsetX:0, roleOffsetY:500,   
				gamebgW:1242, gamebgH:2208, gamebgScale:0.7, gamebgOffsetX:0, gamebgOffsetY:0, 
				labelY:100, 
				cell1X:100,cell2X:350,cellEndX:600,cellY:2250,
				path : "2688_1242",
				name :  "65",
			}
		}
	}
}

module.exports = {
    USER_CONFIG:USER_CONFIG_3
};




