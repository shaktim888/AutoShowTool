
var path = require("path");
var fs = require("fs");
var sizeOf = require('image-size');
const { execSync } = require('child_process');

function Tools(){
	this.mkdirs = function(dirs){
		fs.mkdirSync(dirs, { recursive: true }, (err) => {
			if (err) throw err;
		});
	}
	this.getRandDregree = function(arr1, arr2) {
		var sum = 0,
			factor = 0,
			random = Math.random();
	
		for(var i = arr2.length - 1; i >= 0; i--) {
			sum += arr2[i]; // 统计概率总和
		};
		random *= sum; // 生成概率随机数
		for(var i = arr2.length - 1; i >= 0; i--) {
			factor += arr2[i];
			if(random <= factor) 
			  return arr1[i];
		};
		return null;
	};
	
	this.GetRandomNum = function(Min,Max){
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
	}
	
	this.getRandNum = function(path){
		var count = this.getfileCount(path);
		var randomindex = this.GetRandomNum(0, count - 1);
		return randomindex
	}
	
	//文字适配居中
	this.labelAdjust = function(params,bgimg){
		if (typeof(params) == "string"){
			var bgSize = sizeOf(bgimg)
			var size1 = sizeOf(params)
			return bgSize.width/2 - size1.width/2
		}
		else if (typeof(params) == "object"){
			var bgSize = sizeOf(bgimg)
			var arr = []
			for (var ele in params){
				var size = sizeOf(params[ele])
				arr.push(bgSize.width/2 - size.width/2)	
			}
			return arr
		}
	}

	this.calcImagePos = function(bgimg,img,str){
		var sizebg = sizeOf(bgimg)
		var size = sizeOf(img)
		y = sizebg.height - size.height
		var x = sizebg.width - size.width
		return {x,y}
	}

	this.getMoreRandFromDir = function(dir){
		let count = this.getfileCount(dir)
		let arr = []
		for (let i = 0;i<count;i++){
			arr.push(i)
		}
		arr.sort(function(){
			return 0.5 - Math.random()
		})
		let file = []
		for (let i in arr){
			file[i] = this.getfileFilterDS_Store(dir,arr[i])
			let temp = path.join(dir,file[i])
			if (fs.statSync(temp).isDirectory()){
				var rand = this.getRandNum(temp)
				file[i] = path.join(file[i],this.getfileFilterDS_Store(temp,rand))
			}
		}
		return file
	}
	
	this.getMoreRandFromDirRecursive = function(dir){
		let count = this.getfileCount(dir)
		let arr = []
		for (let i = 0;i<count;i++){
			arr.push(i)
		}
		arr.sort(function(){
			return 0.5 - Math.random()
		})
		let file = []
		let all_image_list = []
		var rand_ele_list = []
		for (let i in arr){
			all_image_list[i] = []
			file[i] = this.getfileFilterDS_Store(dir,arr[i])
			let temp = path.join(dir,file[i])
			this.retDirRandImageRecursive(temp,all_image_list[i])
		}
		for (let i in all_image_list){
			all_image_list[i].sort(function(){
				return 0.5 - Math.random()
			}) 
			rand_ele_list[i] = all_image_list[i][0]
		}
		return rand_ele_list
	}

	this.retDirRandImageRecursive = function(img_path,image_list){
		var ab_path = img_path
		if (!path.isAbsolute(img_path)){
			ab_path = path.join(process.cwd(),img_path)
		}
		var files = fs.readdirSync(ab_path);
		var thistool = this;
        files.forEach(
			function(file){
				var filepath = path.join(ab_path,file)
				var info = fs.statSync(filepath);
				if(info.isDirectory()){                 
					// 如果是文件夹遍历()
					thistool.retDirRandImageRecursive(filepath,image_list);
				}else{
					if (file=".DS_Store"){
						image_list.push(filepath)
					}
				}               
		})
	}

	this.getMoreRandFromDir_FullPath = function(dir){
		let count = this.getfileCount(dir)
		let arr = []
		for (let i = 0;i<count;i++){
			arr.push(i)
		}
		arr.sort(function(){
			return 0.5 - Math.random()
		})
		let file = []
		for (let i in arr){
			file[i] = this.getfileFilterNew(dir,arr[i])
			if (fs.statSync(file[i]).isDirectory()){
				file[i] = this.getRandFile(file[i])
			}
		}
		return file
	}
	

	this.getRandFile = function(dir){
		var randNum = this.getRandNum(dir)
		var file = this.getfileFilterNew(dir,randNum)
		return file
	}

	this.H5ShootScreen = function(h5path){
	
		this.JSShootScreen(h5path)
	}
	// 返回全路径图片
	this.getfileFilterNew= function(dir, index){
		var count =  0;
		var ret;
		var files = fs.readdirSync(dir)
		for(var i in files){
			if (path.basename(files[i]) != ".DS_Store"){
				if (count == index){
					var fullPathFile = path.join(dir,files[i])
					return fullPathFile
				}
				count = count + 1
			}else{
				
			};
		}
		
		return ret;
	}	
	//只返回图片
	this.getfileFilterDS_Store = function(dir, index){
		var count =  0;
		var ret;
		var files = fs.readdirSync(dir)
		for(var i in files){
			if (path.basename(files[i]) != ".DS_Store"){
				if (count == index){
					return files[i]
				}
				count = count + 1
			}else{
				
			};
		}
		
		return ret;
	}

	this.getfileCount = function(workpath){
		var count =  0;
		var files = fs.readdirSync(workpath);  
		for(var i in files){
			if (path.basename(files[i]) != ".DS_Store"){
				count = count + 1;
			}else{
				
			};
		}
		return count;
	}
	this.islandscape = function(img){
		var size = sizeOf(img)
		if (size.width > size.height){
			return true
		}else{
			return false
		}
	}

	this.removeDir = function(rdir){
		// tmp 目录必须存在
		console.log("删除==",rdir)
        let files = [];
        if(fs.existsSync(rdir)){
            files = fs.readdirSync(rdir)
            files.forEach((file, index) => {
                let curPath = path.join(rdir,file)
                if(fs.statSync(curPath).isDirectory()){
                    this.removeDir(curPath); //递归删除文件夹
                } else {
                    fs.unlinkSync(curPath); //删除文件
                }
            });
            fs.rmdirSync(rdir);
        }
	};
	
	this.explorer = function(img_path){
		if ( IS_TEST ) { return }
		var ab_path = img_path
		if (!path.isAbsolute(img_path)){
			ab_path = path.join(process.cwd(),img_path)
		}
		var files = fs.readdirSync(ab_path);
		var thistool = this;
        files.forEach(
			function(file){
				var filepath = path.join(ab_path,file)
				var info = fs.statSync(filepath);
				if(info.isDirectory()){                 
					// 如果是文件夹遍历()
					// thistool.explorer(filepath);
				}else{
					// 读出所有的文件
					console.log('压缩文件:' ,filepath);
					if (file!=".DS_Store"){
						var name = filepath
						execSync("convert "+"\""+name+"\" -background white -alpha remove -alpha off "+"\""+name+"\"");
						execSync("./pngquant/pngquant " + name,{cwd:__dirname})
						execSync("rm -f " + name);
					}
					
				}               
			}
		);
		//工程制作进行清理
		// if(process.argv[4] || img_path.indexOf('ad_view') != -1){
		// 	var clearDirs = ["img","rotateImg","rotateImg2","waitscreen","download"]
		// 	var workpath = path.resolve(ab_path,"..")
		// 	var tool = this
		// 	clearDirs.forEach((ele) =>{
		// 		var clearAbsPath = path.join(workpath,ele)
		// 		tool.removeDir(clearAbsPath)
		// 	})
		// }
	}

	this.unCompressZip = function(dir){
		var ab_path = path.join(process.cwd(),dir) 
		if (!path.isAbsolute(ab_path)){
			ab_path = dir
		}
		console.log(ab_path)
		var files = fs.readdirSync(ab_path)
		var self = this
        files.forEach(
			function(file){
				var filepath = path.join(ab_path,file)
				var info = fs.statSync(filepath);
				if(info.isDirectory()){                 
					self.removeDir(filepath)
				}else{
					if (path.extname(filepath) == ".zip"){
						execSync("unzip " + filepath,{cwd:dir})
						execSync("rm -f " + filepath)
					}else{
						execSync("rm -f " + filepath)
					}
				}               
			}
		);
	}

	this.compressZip = function(dir){
		var dest = "output/output.zip"
		execSync("rm -f " + dest)
		execSync("zip -qr " + dest + " " + dir)
		var files = fs.readdirSync(dir)
        files.forEach(
			function(file){
				var filepath = path.join(dir,file)
				if (path.extname(filepath) == ".png"){
					execSync("rm -f " + filepath)
				}
			}
		);
	}
	this.getRandEle = function(arr){
		arr.sort(function(){
			return 0.5 - Math.random()
		})
		return arr[0]
	}
}

module.exports = Tools