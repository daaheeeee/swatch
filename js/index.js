//로딩 이벤트
// $(window).on('load', function(){
//     $('.loading').delay(3000).hide(500) //3초동안 딜레이 했다가 없애줘, hide()는 넓이 높이 둘 다 사라짐,괄호안에 초 써야 함, fadeOut()는 빈괄호로 쓰면 됨
// })

var loadcount = 0;
var countStop = setInterval(add, 25)
function add(){
    loadcount++
    if (loadcount>100){
        clearInterval(countStop)
        $('.loading').delay(100).fadeOut()
        return false
    }
    $('.loading p').text(loadcount+'%')
}

//새로고침 했을 때 스크롤바를 맨 위로 올라가게
$('html, body').stop().animate({
    scrollTop : 0
}, 1000)

$('#menu li').eq(0).addClass('on')
var cflag = false;
$('#menu li a').on('click', function(e){//focus = tab키 눌렀을 때 (a태그,button태그에만 적용됨) 클릭했을 때 그 위치로 이동, click focus = click또는 focus 이벤트 발생했을 때
    e.preventDefault()
    cflag = true;
    $(this).parent().addClass('on')
    $(this).parent().siblings().removeClass('on')
    var num = $(this).parent().index()

    var secDist = $('section').eq(num).offset().top
    if (num>=1 && !$('.skillContainer').hasClass('on')) { //index번호가 1인 화면에 들어왔을 때(그래프 화면)
        //$('#sect2 .skillContainer > div').addClass('on')//클릭했을 때 그래프 올라오기
        $('.skillContainer').addClass('on')
        count(90, '.html', 15)//그래프 값, 클래스 명, (대기)시간
        count(80, '.css', 16)
        count(70, '.script', 17)
        count(60, '.jquery', 18)
        count(50, '.react', 19)
    } else if (num<1) {
        $('.skillContainer').removeClass('on')//첫번째 구간(시계) 일때는 그래프가 새로 그려지게 하기
    }// else{
    //     $('#sect2 .skillContainer > div').removeClass('on')
    // }

    if(num===4) {
        $('#sect4').addClass('on')
    }else {
        $('#sect4').removeClass('on')
    }


    $('html, body').stop().animate({
        scrollTop : secDist
    }, 500, function(){
        cflag = false
    })
})
function count(jumsu, cname, time){ //그래프 값, 클래스 명, (대기)시간
    let num = 0; 
    var stop = setInterval(function(){
        num++
        if (num<=jumsu) {
            $(cname).find('.score').css({ //변수(cname)는 '' 안함, .html, .css 등 클래스 값이 다 다르니까 변수값 넣기
                height:num+'%'
            })
            $(cname).find('.myscore').text(num+'%') //%를 그래프 안에 넣어주기
        } else { //setinterval은 clearInterval로 멈출 수 있음, clear 쓰기전에 setInterval 변수에 넣어주기
            clearInterval(stop)
        }
    }, time)

}


var sDist0 = $('#sect1').offset().top
var sDist1 = $('#sect2').offset().top
var sDist2 = $('#sect3').offset().top

// 마지막구간이 윈도우높이보다 클때
//var lastSect = $('#sect4').offset().top             
// 마지막구간이 윈도우높이보다 작을때
 var lastSect = $('body').height() - $(window).height()
var sct=0;
$(window).on('scroll', function(){
    // var wh = $(this).height()
    sct = $(this).scrollTop()
    if ( sct>=sDist0 && sct<sDist1 && !cflag ) {
        $('#menu li').eq(0).addClass('on').siblings().removeClass('on') 
        $('.skillContainer').removeClass('on')     
        $('#sect2 .skillContainer > div > .score').css({
            height:'0%',
            
        })
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag && !$('.skillContainer').hasClass('on')) {
        $('#menu li').eq(1).addClass('on').siblings().removeClass('on')
        $('.skillContainer').addClass('on')
        count(90, '.html', 15) 
        count(80, '.css', 16)
        count(70, '.script', 17) 
        count(60, '.jquery', 18)
        count(50, '.react', 19)
    } else if ( sct>=sDist2 && sct<lastSect && !cflag) {
        $('#menu li').eq(2).addClass('on').siblings().removeClass('on')
        $('#sect4').removeClass('on') //sect4 구간위로 가면 없애줘
    } else if ( sct>=lastSect && !cflag) {
        $('#menu li').eq(3).addClass('on').siblings().removeClass('on')
        $('#sect4').addClass('on') //sect4 구간에 오면 보여줘
    } 

})


$('section').on('mousewheel', function(event, delta){
    if (delta>0) {    // 마우스휠을 위로 굴리면 양수
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 1000)
    } else if (delta<0) {  // 마우스휠을 아래로 굴리면 음수
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 1000)
    }
})


$('.slideInner').slick({
    autoplay:true,
    arrows:false,
    pauseOnHover:false,
    autoplaySpeed:3000,
    dots:true
})

$('.slideOuter .plpa').on('click', function(){
    
    if ( $(this).find('i').hasClass('fa-pause') ) {
        $('.slideInner').slick('slickPause')
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slideInner').slick('slickPlay')
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }

})


// 세번째 박스
// $('#sect3 .category a').on('click', function(){
//     var href = $(this).attr('href')
//     // console.log(href)
//     if(href==='all'){
//         $('#sect3 ul li').each(function(){
//             if ($(this).css('display')==='none'){
//                 $(this).fadeIn(500)
//             }else {
//                 $(this).fadeOut(500)

//                 // $(this).css({
//                 //     display:'block'
//                 // }) css하면 띡띡 사라지기 때문에 부드러움을 위해 fadeIn,Out              
//             }
//         })
//     }else if (href==='rwd') {
//         $('#sect3 ul li').each(function(){
//             if($(this).attr('class')==='rwd') {
//                 $(this).fadeIn(500)
//             }else {
//                 $(this).fadeOut(500)
//             }
//         })
//     }else {
//         $('#sect3 ul li').each(function(){
//             if($(this).attr('class')==='react') {
//                 $(this).fadeIn(500)
//             }else {
//                 $(this).fadeOut(500)
//             }
//             //     $(this).css({
//             //         display:'block'
//             //     })
//             // }else {
//             //     $(this).css({
//             //         display:'none'
//             //     })
//             // }
//         })
//     }

//     return false
// })
//each매서드 = for반복문, 순차적으로 접근

//세번째 박스
//플러그인 사용할 때는 flex정렬이 안먹혀서 float정렬 사용함.

$(window).on('load', function(){
     //문서의 모든 내용을 다 불러온 후에, document = html을 다 읽은 후
    $('#sect3 ul').isotope({
        filter:'*',
        layoutMode:'masonry', //fitRows(빈공간을 매꾸지 않음), masonry(자연스럽게 빈 공간을 매꿈)
        itemSelector:'.item'
    })
})


$('#sect3 .category a').on('click', function(){
    var filterValue = $(this).attr('href')
    $('#sect3 ul').isotope({
        filter:filterValue,
        layoutMode:'masonry', //fitRows, masonry
        itemSelector:'.item'
    })

    return false;
})

//관심있는 포트폴리오 클릭하면 팝업으로 보이게 만들어줘, outLayer
$('#sect3 ul  li a').on('click', function(){
    var href = $(this).attr('href')
    var title = $(this).attr('title')
    var src = $(this).find('img').attr('src')
    var alt = $(this).find('img').attr('alt')

    $('body').append(`<div class="outLayer"><div class="inLayer"><h2>${title}</h2><div><img src="${src}" alt="${alt}"><a href="${href}" target="_blank">사이트 이동</a></div></div><button type="button">닫기</button></div>`)
    $('.outLayer').css({
        position:'fixed',
        top:0, left:0, right:0, bottom:0,
        background:'rgba(0,0,0,0.5)',
        zIndex:9999999999,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    })
    $('.inLayer').css({
        maxWidth:'600px',
        fontSize:'30px',
        textAlign:'center',
        color:'#fff'
    })
    $('.inLayer a').css({
        border:'2px solide #f00',
        display:'block',
        padding:'10px 20px',
        background:'blue',
        width:'200px',
        fontSize:'20px',
        margin:'10px auto'
    })
    $('.outLayer button').css({
        position:'absolute',
        top:'10px', right:'10px',
        fontSize:'30px',
        color:'#fff'
    })
    return false
})

$(document).on('click', '.outLayer button, .outLayer', function(){ //click이벤트를 받는 대상이 많으면 쭉쭉적어나가면 됨 '.outLayer button, .outLayer', ...
    $('.outLayer').remove() 
})

$(document).on('click', '.inLayer', function(e){
    e.stopPropagation() //이벤트 전파를 막아주는 매서드(inLayer만 이벤트 발생하게, outLayer는 전파금지)
})