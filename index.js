let bell = $('#bell')[0],
    say = $('#say')[0],
    music = $('#music')[0];

function loading() {
    let $progressBar = $(".progressBar"),
        $loadingBox = $('.loadingBox');
      let ary = ['phone-bg.jpg',
        'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
      let n = 0;
      ary.forEach(item=>{
          let temp = new Image();
          temp.src = './images/'+item;
          temp.onload = load;
      });
      function load() {
          n++;
          if (n === ary.length){
             $progressBar.css({
                 width: '100%'
             });
              $loadingBox.css({
                  opacity:0
              });
              let timer = setTimeout(()=>{
                  clearTimeout(timer);
                  $loadingBox.css({
                      display:'none'
                  })
                  phone();
              },1800)




          }else {
              $progressBar.css({
                  width:n/ary.length*100+'%'
              })
          }


      }
}
loading();

function phone() {
    bell.play();
    bell.addEventListener('canplay',function () {
        this.play();
    })
    let $phoneBox = $('.phoneBox'),
        $listenBox = $phoneBox.find('.listenBox'),
        $listenBtn = $listenBox.find('.listenBtn'),
        $noBox = $phoneBox.find('.no_listenBox'),
        $noBtn = $noBox.find('.no_listenBtn'),
        $timeBox = $phoneBox.find('.timeBox');
    $listenBtn.tap(function () {
        $listenBox.hide();
        bell.pause();//铃声停止
        say.play();//语音播放
        $noBox.css({
            transform:'translateY(0)'
        });
        $timeBox.show();
        let timer = null;
        say.oncanplay = function () {
            timer = setInterval(()=>{
                    let str = '00:'+(say.currentTime.toFixed(0)<10?'0'+say.currentTime.toFixed(0):say.currentTime.toFixed(0));
                    $timeBox.html(str);
                    if(say.ended){
                        clearInterval(timer);
                        next();
                    }
                },1000
            )
        }
        function next(){
            //$listenBox.hide();
            $phoneBox.css({
                transform:'translateY(100%)'
            })
            msg();
        }
        $noBtn.tap(function () {
            next();
            clearInterval(timer);
            say.pause();
        });
    });


    //点击挂机键 让整个盒子下移
   $noBtn.tap(function(){
        $listenBox.hide();
        $phoneBox.css({
            transform:'translateY(100%)'
       })
       msg();
    })
}
//phone();
function msg () {
    music.play();
    let $msgBox = $('.msgBox'),
        $ul = $msgBox.find('ul'),
        $lis = $msgBox.find('li'),
        $keyBoard = $msgBox.find('.keyBoard'),
        $textBox = $keyBoard.find('.textBox'),
        $btn = $keyBoard.find('.btn');

    let moveTimer = null;
    let n = 0;
    let h = 0; //ul上移高度
    function move(){ moveTimer = setInterval(()=>{
        if(n === $lis.length){
            clearInterval(moveTimer);
            return;
        }
        $lis.eq(n).css({
            opacity: 1,
            transform:'translateY(0)'
        });

        if(n === 2){
            clearInterval(moveTimer);
            $keyBoard.css({
                transform:'translateY(0)'
            })
            let timer = setTimeout(()=>{
                clearTimeout(timer);
                input();


            },1600)

        }
        if(n>=3){
            h += $lis[n].offsetHeight;

            $ul.css({
                transform: `translateY(-${h}px)`
            })
        }
        n++;




    },2000)}
    move();

    function input() {
        let str = '点击发送试试'
        let str2 = '',
            m = 0,
            timer = null;
        timer = setInterval(()=>{
            if( m === str.length){
                $btn.show();
                clearInterval(timer);
                return;
            }
            str2 += str[m];
            m++;
            $textBox.html(str2);
        },100)

    }
    $btn.tap(function () {
        $lis.eq(n).css({
            opacity:1,
            transform:'translateY(0)'
        });
        h += $lis[n].offsetHeight;
        $ul.css({
            transform: `translateY(-${h}px)`
        })
        n++;
        $textBox.html('');
        $keyBoard.css({
            transform:'translateY(3.7rem)',
            transition:'all 0.6s'
        });
        move();

    })

}
