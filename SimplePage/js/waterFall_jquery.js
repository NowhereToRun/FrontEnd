/**
 * Created by NowhereToRun on 2016/8/14.
 */
$(window).on('load', function () {
    waterfall();
});
$(window).on('scroll', function () {
    if (checkScrollSlide()) {
        $.each(data.data, function (index, value) {
            var oBox = $('<div>').addClass('box').appendTo($('#main'));
            var oPic = $('<div>').addClass('pic').appendTo(oBox);
            $('<img>').attr('src', 'img/' + value.src).appendTo(oPic);
        });
        waterfall();
        data = {'data':[]};//清空
    }
});
/*模拟从后台来的数据，用完一次后删除*/
var data = {"data": [
    {"src": "21.jpg"},
    {"src": "22.jpg"},
    {"src": "23.jpg"},
    {"src": "24.jpg"},
    {"src": "25.jpg"},
    {"src": "26.jpg"},
    {"src": "27.jpg"}
]};
function checkScrollSlide() {
    var $lastBox = $('#main>div').last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return lastBoxDis < scrollTop + documentH;
}

function waterfall() {
    var $boxs = $('#main>div');
    var w = $boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width() / w);
    $('#main').width(cols * w).css('margin', 'auto');
    var hArr = [];
    $boxs.each(function (index, value) {
        var h = $boxs.eq(index).outerHeight();
        var h1 = value.offsetHeight;
        console.log(h, h1);
        if (index < cols) {
            hArr.push(h1);
        } else {
            var minH = Math.min.apply(null, hArr);
            var minHIndex = $.inArray(minH, hArr);
            /*value是DOM对象，转换为jQuery对象可以使用jQuery的方法*/
            $(value).css({
                'position': 'absolute',
                'top': minH + 'px',
                'left': minHIndex * w + 'px'
            });
            hArr[minHIndex] += $boxs.eq(index).outerHeight();
        }
    });

}
