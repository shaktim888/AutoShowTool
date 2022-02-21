
/*
    此配置表针对截图进行处理的参数（如：添加边框，截图在边框的位置，截图尺寸等）
    参数注释
    destNums:生成目标截图数量
    isBorder:是否添加边框
    horizontal：横版游戏截图参数表
    vertical: 竖版游戏截图参数表
    layoutType: 布局类型 ：1:单组件（只有截图与美术留白截图组成） 2:多组件（有多个组件进行拼接）主要是目录层次不同


*/
var LAYOUT_TYPE_A = 1
var LAYOUT_TYPE_B = 2

var cfg = {
    style_ChuanQi:{
        selectVersion:["z_ban","update"],
        abandoned:{
            destNum:3,
            isBorder:false,
            horizontal:{w:937, h:527, r:-5.98},
            vertical:{w:527, h:937, r:8}
        },
        z_ban:{
            destNum:3,
            isBorder:false,
            horizontal:{x:{55:200,65:300,129:260},y:{55:150,65:150,129:300},w:{55:1785,65:2082,129:2203},h:{55:951,65:971,129:1506}},
            vertical:{x:{55:200,65:0,129:0},y:{55:150,65:0,129:0},w:{55:1785,65:1785,129:1785},h:{55:951,65:951,129:951}},
        },
        update:{
            destNum:3,
            isBorder:false,
            layoutType:LAYOUT_TYPE_A,
            horizontal:{
            [1]:{x:80,y:200,w:1082,h:640,r:0},
            [2]:{x:{55:70,65:70},y:{55:150,65:230},w:1094,h:725,r:0},
            [3]:{x:{55:50,65:50},y:{55:1350,65:1730},w:1121,h:632,r:0},
            [4]:{x:-240,y:-150,w:1800,h:1500,r:-15},
            [5]:{x:70,y:70,w:1080,h:802,r:0},
            [6]:{x:50,y:170,w:1148,h:656,r:0},
            [7]:{x:100,y:20,w:1085,h:845,r:0},
            [8]:{x:50,y:80,w:1152,h:699,r:0},
            [9]:{x:{55:70,65:70},y:{55:980,65:1459},w:1079,h:632,r:0},
            [10]:{x:60,y:150,w:1079,h:632,r:0},
            [11]:{x:90,y:123,w:1053,h:826,r:0},
            [12]:{x:40,y:200,w:1152,h:701,r:0},
            [13]:{x:70,y:130,w:1092,h:729,r:0},
            [14]:{x:70,y:130,w:1089,h:685,r:0},
            [15]:{x:{55:-5,65:-5},y:{55:1180,65:1650},w:1242,h:853,r:0},
            [16]:{x:10,y:100,w:1183,h:759,r:0},
            [17]:{x:10,y:180,w:1205,h:656,r:0},
            [18]:{x:65,y:200,w:1121,h:700,r:0},
            [19]:{x:50,y:{55:180,65:300},w:1148,h:583,r:0},
            [20]:{x:80,y:140,w:1078,h:697,r:0},
            [21]:{x:{55:50,65:50},y:{55:850,65:1230},w:1175,h:611,r:0},
            [22]:{x:50,y:150,w:1122,h:729,r:0},
            [23]:{x:70,y:{55:330,65:380},w:1133,h:615,r:0},
            [24]:{x:{55:-10,65:-10},y:{55:1230,65:1680},w:1262,h:868,r:0}
        },
        vertical:{
            [1]:{x:{55:80,65:80},y:{55:100,65:150},w:{55:756,65:774},h:{55:1308,65:1533},r:0},
            [2]:{x:{55:60,65:60},y:{55:80,65:150},w:{55:756,65:835},h:{55:1308,65:1457},r:0}, //同比例缩放
            [3]:{x:{55:135,65:60},y:{55:130,65:220},w:{55:922,65:970},h:{55:1109,65:1275},r:0},
            [4]:{x:{55:60,65:60},y:{55:210,65:200},w:{55:756,65:834},h:{55:1308,65:1463},r:0},
            [5]:{x:{55:75,65:75},y:{55:150,65:150},w:{55:1081,65:1150},h:{55:1702,65:2073},r:0},
            [6]:{x:{55:130,65:110},y:{55:180,65:300},w:{55:724,65:725},h:{55:1021,65:1121},r:0}, 
        }
        }
    },
    
    style_BuYu:{
        destNum:3,
        isBorder:true,
        horizontal:{
            inX:95, inY:85, inW:1185, inH:665,
        },
        vertical:{
            inX:95, inY:85, inW:665, inH:1185,
        }
    },
   
    style_Fruit:{
        destNum:3,
        isBorder:true,
        horizontal:{
            inX:50, inY:50,r:0, inW:1140, inH:700,
        },
        vertical:{
            inX:50, inY:50,r:0, inW:700, inH:1140,
        }
    },
    style_GongDou:{
        destNum:3,
        isBorder:false,
        horizontal:{
            w:2208,h:1242
        },
        vertical:{
            w:1242,h:2208
        }
    },
    style_Dice:{
        destNum:3,
        isBorder:true,
        horizontal:{
            inX:50, inY:50,r:0, inW:1140, inH:700,
        },
        vertical:{
            inX:50, inY:50,r:0, inW:700, inH:1140,
        }
    },
    style_DiZhu:{
        destNum:3,
        isBorder:true,
        horizontal:{
            inX:50, inY:50,r:0, inW:1140, inH:700,
        },
        vertical:{
            inX:50, inY:50,r:0, inW:700, inH:1140,
        }
    },
    style_NiuNiu:{
        destNum:3,
        isBorder:true,
        horizontal:{
            inX:50, inY:50,r:0, inW:1140, inH:700,
        },
        vertical:{
            inX:50, inY:50,r:0, inW:700, inH:1140,
        }
    },
    style_LongHu:{
        destNum:3,
        isBorder:true,
        horizontal:{
            inX:50, inY:50,r:0, inW:1140, inH:700,
        },
        vertical:{
            inX:50, inY:50,r:0, inW:700, inH:1140,
        }
    },
    style_Other:{
        destNum:3,
        isBorder:true,
        vertical:{
            //游戏图在设备中的位置
            inX:40, inY:40, inW:590, inH:1100
        },
        horizontal:{
            inX:0, inY:40, inW:1265, inH:665
        }
    },
    style_QiPai:{
        selectVersion:["HorizontalType","update"],
        primary:{
            destNum:3,
            isBorder:false,

            horizontal:{
                w:2208,h:1242,
            },
            vertical:{
                w:1242,h:2208
            }
        },
        update:{
            destNum:3,
            isBorder:true,
            horizontal:{inX:30, inY:45,r:-7, inW:1440, inH:810},
            vertical:{inX:50, inY:50,r:-7, inW:820, inH:1440}
        },
        HorizontalType:{
            borderPath:"border",
            destNum:3,
            isBorder:true,
            horizontal:{
                [1]:{inX:25, inY:20,inW:1297, inH:694, r:-7, id : 0},
                [2]:{inX:180, inY:100,inW:1328, inH:756, r:7, id : 1},
                [3]:{inX:43, inY:40,inW:1365, inH:835, r:0, id : 2}
            },
            vertical:{
                [1]:{inX:20, inY:20,inW:694, inH:1297, r:0, id : 0},
                [2]:{inX:100, inY:330,inW:756, inH:1328, r:0, id : 1},
                [3]:{inX:40, inY:40,inW:707, inH:1155, r:0, id : 2}
            },
        }
    },
    style_QMoHuan:{
        destNum:3,
        isBorder:true,
        vertical:{
            //游戏图在设备中的位置
            inX:40, inY:40,inW:899, inH:1610,
        },
        horizontal:{
            inX:40, inY:40,inW:1610, inH:899,
        }
    },
    style_QSanGuo:{
        isBorder:true,
        destNum:6,
        horizontal:{
            r:-10, r_b:-10,inX:10, inY:10,inW:1400, inH:860,
        },
        vertical:{
            r:6, r_b:-10,inX:10, inY:10, inW:860, inH:1390,
        }
    },
    style_SanGuo:{
        selectVersion:["high"],
        abandoned:{
            destNum:3,
            isBorder:false,
            horizontal:{w:937, h:527, r:-5.98},
            vertical  :{w:527, h:937, r:8}
        },
        primary:{
            destNum:3,
            isBorder:true,
            vertical:{inX:8, inY:8, inW:680, inH:1210}, 
            horizontal:{inX:8, inY:8, inW:1210, inH:680}
        },
        update:{
            destNum:3,
            isBorder:false,
            horizontal:{r:0, w:1292, h:817},
            vertical:{r:0, w:1377, h:1242}
        },
        high:{
            layoutType:LAYOUT_TYPE_A,
            destNum:3,
            isBorder:false,
            horizontal:{
                [1]:{x:160,y:100,w:1313,h:813,r:0},
                [2]:{x:{55:760,65:1030},y:{55:100,65:100},w:{55:1300,65:1439},h:{55:845,65:880},r:-2.3},
                [3]:{x:{55:780,65:1130},y:{55:180,65:180},w:{55:1262,65:1404},h:{55:662,65:738},r:0},
                [4]:{x:{55:-3,65:-3},y:{55:1250,65:1300},w:{55:1242,65:1300},h:{55:625,65:718},r:0},
                [5]:{x:{55:30,65:-3},y:{55:1150,65:1450},w:1231,h:913,r:-12},
                [6]:{x:0,y:0,w:{55:2208,65:2688},h:{55:1242,65:1288},r:0},
                [7]:{x:{55:700,65:1050},y:{55:210,65:210},w:1438,h:900,r:5},
                [8]:{x:{55:100,65:300},y:{55:40,65:40},w:1438,h:900,r:-6},
                [9]:{x:{55:100,65:100},y:{55:40,65:40},w:1504,h:826,r:0}
            },
            vertical:{
               [1]:{x:320,y:260,w:780,h:1110,r:0},
               [2]:{x:20,y:20,w:1242,h:{55:1444,65:1378},r:0}
            }
        }
    },
    style_Football:{
        selectVersion:["update"],
        primary:{
            destNum:3,
            isBorder:true,
            vertical:{inX:40, inY:40, inW:590, inH:1100},
            horizontal:{inX:0, inY:40, inW:1265, inH:665}
        },
        update:{
            destNum:3,
            isBorder:true,
            horizontal:{inX:110, inY:30,r:-90+18, inW:701, inH:389},
            vertical:{inX:30, inY:110,r:18, inW:389, inH:701}
        }
    },
    style_Basketball:{
        destNum:3,
        isBorder:true,
        horizontal:{inX:20, inY:30,r:-90+18, inW:840, inH:389},
        vertical:{inX:30, inY:30,r:18, inW:389, inH:840}
    },
    style_XianXia:{
        destNum:3,
        isBorder:false,
        horizontal:{
            w:2208,h:1242
        },
        vertical:{
            w:1242,h:2208
        }
    },
    style_QXianXia:{
        destNum:3,
        isBorder:false,
        horizontal:{
            [1]:{x:{55:100,65:60},y:{55:140,65:250},w:{55:1030,65:1108},h:{55:663,65:712},r:0},
            [2]:{x:140,y:160,w:1071,h:698,r:5.7},
            [3]:{x:25,y:180,w:1160,h:728,r:0},
            [4]:{x:{55:-40,65:-40},y:{55:80,65:80},w:{55:842,65:856},h:{55:663,65:673},r:-14},
            [5]:{x:-0,y:{55:80,65:130},w:1087,h:793,r:-9.5},
            [6]:{x:25,y:285,w:1185,h:847,r:-4.5}
        },
        vertical:{
            [1]:{x:{55:540,65:500},y:{55:230,65:280},w:{55:595,65:621},h:{55:1001,65:1043},r:0},
            [2]:{x:-10,y:-10,w:{55:1131,65:1185},h:{55:1267,65:1354},r:0}
        },
        common:{
            [1]:{x:0,y:-10,w:1224,h:1007,r:0},
            [2]:{x:20,y:80,w:1222,h:1222,r:0}
        } 
    },
    style_XiYou:{
        destNum:3,
        isBorder:true,
        vertical:{inX:205, inY:140, inW:610, inH:1084},
        horizontal:{inX:80, inY:150, inW:1084, inH:610}
    }
}
module.exports = cfg