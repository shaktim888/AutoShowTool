
const genScreenShot = require("./screenshot.js")
const config = require("./config.js")
const fs = require('fs');
const path = require("path");
const gm = require("gm");
const Utils = require("./utils.js")
const utils = new Utils();
const define = require("./define")

var gameStyle = define.GAME_STYLE_TABLE[config.index].style
var inPath = define.inPath
var outPath = define.outPath 
if (process.argv[3]) {
    inPath = path.join(inPath,process.argv[3])
    outPath = path.join(outPath,process.argv[3])
    utils.mkdirs(outPath)
}
//解压
if(process.argv[2]){
    utils.unCompressZip(inPath)
    //对解压文件夹进行特殊处理
    var ab_path = path.resolve(inPath)
    var files = fs.readdirSync(ab_path)
    files.forEach((file)=>{
        var filepath = path.join(ab_path,file)
        var info = fs.statSync(filepath);
        if(info.isDirectory()){     
            if (file != "__MACOSX"){
                var childDir = fs.readdirSync(filepath)
                childDir.forEach((ele)=>{
                    var childFile = path.join(filepath,ele)
                    if(path.extname(childFile) == ".png"){
                        var newFile = path.join(ab_path,ele)
                        fs.renameSync(childFile,newFile)
                    }
                })
            }
            utils.removeDir(filepath);
        }
    })
}
var firstRole = utils.getRandFile("./input_role_dir")
gameStyle = process.argv[2] || gameStyle
var ISTOOL = true
gm(firstRole).resize(null,976).write(firstRole,function(err){
    if(err){console.log(err)}
    genScreenShot(gameStyle,inPath,outPath,firstRole,ISTOOL)
})


