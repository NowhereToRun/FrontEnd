/**
 * Created by NowhereToRun on 2016/8/14.
 */

window.onload = function () {
    waterfall();
};
/*模拟从后台来的数据，用完一次后删除*/
var data = {"data": [
    {"src": "21.jpg"},
    {"src": "22.jpg"},
    {"src": "23.jpg"},
    {"src": "24.jpg"},
    {"src": "25.jpg"},
    {"src": "26.jpg"},
    {"src": "27.jpg"},
    {"src": "28.jpg"},
    {"src": "29.jpg"},
    {"src": "30.jpg"}
]};
window.onscroll = function () {
    if (checkScrollSlide()) {
        var oParent = document.getElementById('main');
        /*将数据块渲染到页面的尾部*/
        for (var i = 0; i < data['data'].length; i++) {
            var oBox = document.createElement('div');
            oBox.className = 'box';
            oParent.appendChild(oBox);
            var oPic = document.createElement("div");
            oPic.className = "pic";
            oBox.appendChild(oPic);
            var oImg = document.createElement("img");
            oImg.src = "img/" + data["data"][i]["src"];
            oPic.appendChild(oImg);
        }
        data = {"data":[]};
    }
    waterfall();
};
function waterfall() {
    var oBoxs = document.querySelectorAll("#main>.box");
    var oBoxsW = oBoxs[0].offsetWidth;  //offsetWidth包括paddind的宽度
    var cols = Math.floor(document.documentElement.clientWidth / oBoxsW);
    /*设置main的宽度*/
    document.querySelector("#main").style.cssText = 'width:' + cols * oBoxsW + 'px; margin: auto;';
    var hArr = [];  //数组内存每一列的高度
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            //求出数组中最小的值
            var minH = Math.min.apply(null, hArr);
            //找到最小值索引
            var index = hArr.indexOf(minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxsW * index + 'px';
            //把图片添加到高度最小的图片下方后，此列对应总高度变化
            hArr[index] = hArr[index] + oBoxs[i].offsetHeight;
        }
    }
}

//检测是否具有加载数据块的条件
//当前box高度的一半+offsetTop < 屏幕高 + 滚动的距离
function checkScrollSlide() {
    var oParent = document.querySelector("#main");
    var oBox = oParent.querySelectorAll(".box");
    var lastBoxH = oBox[oBox.length - 1].offsetTop + Math.floor(oBox[oBox.length - 1].offsetHeight / 2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return lastBoxH < scrollTop + height;
}