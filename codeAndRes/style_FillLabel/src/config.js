var USER_CONFIG_2 = {
	backImgNum : 0,         		// 宣传图使用的背景图，路径在：res/backimg。 0表示随机选择。
	deviceColor : "white",  		// 只有"black", "white", 两种选择。
	deviceDirection : "shu", 		// 设备图的方向， 只有横竖两种选择， 分别为:"shu", "heng".
	titleFont : "korea1.ttf",    	// 标题使用的字体库名称， 路径在：/res/font/
	titleColor : '#c52492',      	// 标题的字符颜色， 参考列表：'#c52492','#4d32b5','#a6681f','#75a4c9','#52ab37',
	bodyFont : "korea1.ttf",     	// 正文使用的字体库名称， 路径在/res/font/
	bodyColor : '#ef7eeb',       	// 正文的字符颜色， 最好是和标题颜色一样就ok
	rolePath:"./input/role.png",
	
	language:{
		//由于不同语言版本的字内容长度不同，故而每个语言都是一个调尺寸的
		ch : {
				titleText : "标题", 
				bodyTextList : ['中文', '中文', '中文'],  // 正文的三张字符内容。
				device:{
					iPhone55 : {
						titleFontSize : 250,    // 5.5英寸的标题字体大小
						titlePosX : 400,		// 5.5英寸的标题起始X坐标
						titlePosY : 400,		// 5.5英寸的标题起始Y坐标
						bodyFontSize : 200,     // 5.5英寸的正文字体大小
						bodyPosX : 200,         // 5.5英寸的正文起始X坐标
						bodyPosY : 1000,		// 5.5英寸的正文起始Y坐标
					},
					iPhone65 : {
						titleFontSize : 250,
						titlePosX : 500,
						titlePosY : 400,
						bodyFontSize : 200,
						bodyPosX : 300,
						bodyPosY : 1000,
					},
					iPad129 : {
						titleFontSize : 250,
						titlePosX : 400,
						titlePosY : 500,
						bodyFontSize : 200,
						bodyPosX : 300,
						bodyPosY : 1500,
					}
				}
			},
		en : {
				titleText : "Title", 
				bodyTextList : [' str_split($resultInHex, 2) str_split($resultInHex, 2)', ' str_split($resultInHex, 2) str_split($resultInHex, 2)', ' str_split($resultInHex, 2) str_split($resultInHex, 2)'],  // 正文的三张字符内容。
				device:{
					iPhone55 : {
						titleFontSize : 250,    // 5.5英寸的标题字体大小
						titlePosX : 400,		// 5.5英寸的标题起始X坐标
						titlePosY : 400,		// 5.5英寸的标题起始Y坐标
						bodyFontSize : 200,     // 5.5英寸的正文字体大小
						bodyPosX : 200,         // 5.5英寸的正文起始X坐标
						bodyPosY : 1000,		// 5.5英寸的正文起始Y坐标
					},
					iPhone65 : {
						titleFontSize : 250,
						titlePosX : 500,
						titlePosY : 400,
						bodyFontSize : 200,
						bodyPosX : 300,
						bodyPosY : 1000,
					},
					iPad129 : {
						titleFontSize : 250,
						titlePosX : 400,
						titlePosY : 500,
						bodyFontSize : 200,
						bodyPosX : 300,
						bodyPosY : 1500,
					}
				}
			},
	    ja : {
				titleText : "タイトル", 
				bodyTextList : ['ははは', 'ははは', 'ははは'],  // 正文的三张字符内容。
				device:{
					iPhone55 : {
						titleFontSize : 250,    // 5.5英寸的标题字体大小
						titlePosX : 400,		// 5.5英寸的标题起始X坐标
						titlePosY : 400,		// 5.5英寸的标题起始Y坐标
						bodyFontSize : 200,     // 5.5英寸的正文字体大小
						bodyPosX : 200,         // 5.5英寸的正文起始X坐标
						bodyPosY : 1000,		// 5.5英寸的正文起始Y坐标
					},
					iPhone65 : {
						titleFontSize : 250,
						titlePosX : 500,
						titlePosY : 400,
						bodyFontSize : 200,
						bodyPosX : 300,
						bodyPosY : 1000,
					},
					iPad129 : {
						titleFontSize : 250,
						titlePosX : 400,
						titlePosY : 500,
						bodyFontSize : 200,
						bodyPosX : 300,
						bodyPosY : 1500,
					}
				}
		    },
		ko : {
				titleText : "표제", 
				bodyTextList : ['하하하', '하하하', '하하하'],
				device:{
					iPhone55 : {
						titleFontSize : 250,    // 5.5英寸的标题字体大小
						titlePosX : 400,		// 5.5英寸的标题起始X坐标
						titlePosY : 400,		// 5.5英寸的标题起始Y坐标
						bodyFontSize : 200,     // 5.5英寸的正文字体大小
						bodyPosX : 200,         // 5.5英寸的正文起始X坐标
						bodyPosY : 1000,		// 5.5英寸的正文起始Y坐标
					},
					iPhone65 : {
						titleFontSize : 250,
						titlePosX : 500,
						titlePosY : 400,
						bodyFontSize : 200,
						bodyPosX : 300,
						bodyPosY : 1000,
					},
					iPad129 : {
						titleFontSize : 250,
						titlePosX : 400,
						titlePosY : 500,
						bodyFontSize : 200,
						bodyPosX : 300,
						bodyPosY : 1500,
					}
				}	
			},
		tc : {
			titleText : "標題", 
			bodyTextList : ['因為', '因為', '因為'],
			device:{
				iPhone55 : {
					titleFontSize : 250,    // 5.5英寸的标题字体大小
					titlePosX : 400,		// 5.5英寸的标题起始X坐标
					titlePosY : 400,		// 5.5英寸的标题起始Y坐标
					bodyFontSize : 200,     // 5.5英寸的正文字体大小
					bodyPosX : 200,         // 5.5英寸的正文起始X坐标
					bodyPosY : 1000,		// 5.5英寸的正文起始Y坐标
				},
				iPhone65 : {
					titleFontSize : 250,
					titlePosX : 500,
					titlePosY : 400,
					bodyFontSize : 200,
					bodyPosX : 300,
					bodyPosY : 1000,
				},
				iPad129 : {
					titleFontSize : 250,
					titlePosX : 400,
					titlePosY : 500,
					bodyFontSize : 200,
					bodyPosX : 300,
					bodyPosY : 1500,
				}
			}	
		}
	},
}

module.exports = {
    USER_CONFIG: USER_CONFIG_2
};




