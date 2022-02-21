####运行环境
安装HomeBrew,node v10.12以上（v10.12), Git,

####环境安装
打开Mac控制台
安装HomeBrew：将以下命令粘贴至终端。（参考链接：https://brew.sh/index_zh-cn）
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
安装nodejs 和 npm ：https://nodejs.org/en/
安装依赖库
brew install imagemagick
brew install graphicsmagick
brew install ghostscript


#####实现原理
依赖于nodejs的gm,可以对图片进行伸缩，旋转，裁剪，拼接，合成，注释


####git 仓库:
http://192.168.0.222:9090/AutoShowTool.git


#####执行
cd 脚本目录
npm install
node start.js 


####参数配置
config/config.js文件

var CONFIG = {                      
    gameType :3,//宣传图类型   
    //1 原图 2 手机图+文字(自我定制)) 3 单机棋牌 4 体育 5小游戏 6仙侠 7写实三国 8西游 9捕鱼 10 传奇 11 宫斗 12 Q版三国 13 Q版魔幻
    inPath:"./input", //输入目录
    outPath:"./output", //输出目录
    rotate: 0, //[-20 ~ 0] //游戏截图旋转（竖版不旋转，横版进行旋转）
    isClient:true, //是否为客户资源
    XIESHI_SANGUO_SELECT:2    //1 为原始版本 2 为更新版本（写实三国有效）
}



#####自我定制参数定义 gameType:2

var USER_CONFIG = {
outputDir : "input/test1/", // 导出路径
inputImg : ["4.PNG", "5.PNG", "6.PNG"], // 要生成的资源文件列表

backImgNum : 0, // 宣传图使用的背景图，路径在：res/backimg。 0表示随机选择。
deviceColor : "white", //只有"black", "white", 两种选择。


titleText : "浩 月 棋 牌",
titleFontNum : 2, // 标题使用的字体库编号， 路径在：/res/font/
titleColor : '#000', // 标题的字符颜色， 数值设置参考：https://www.sioe.cn/yingyong/yanse-rgb-16/


bodyFontNum : 1, // 正文使用的字体库编号， 路径在/res/font/
bodyColor : '#f00', // 正文的字符颜色， 数值设置参考：https://www.sioe.cn/yingyong/yanse-rgb-16/


iPhone55 : {
    titleFontSize : 150,    // 5.5英寸的标题字体大小
    titlePosX : 400,        // 5.5英寸的标题起始位置
    titlePosY : 300,

    bodyText : ['棋牌 牛牛 炸金花', '欢快娱乐', '惊险刺激'], // 正文的三张字符内容。
    bodyFontSize : 200,     // 5.5英寸的字体大小
    bodyPosX : 100,         // 5.5英寸的正文起始位置
    bodyPosY : 800,
},

iPhone65 : {
    titleFontSize : 250,
    titlePosX : 500,
    titlePosY : 300,

    bodyText : ['棋牌 牛牛 炸金花', '欢快娱乐', '惊险刺激'],
    bodyFontSize : 200,
    bodyPosX : 100,
    bodyPosY : 800,
},

iPad129 : {
    titleFontSize : 150,
    titlePosX : 500,
    titlePosY : 400,
    bodyText : ['棋牌 牛牛 炸金花', '欢快娱乐', '惊险刺激 iPad 129'],
    bodyFontSize : 200,
    bodyPosX : 200,
    bodyPosY : 1200,
},
}