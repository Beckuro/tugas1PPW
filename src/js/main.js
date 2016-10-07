$(document).ready(function() {
    var name = sessionStorage.getItem("uname");
    var panjang = $('.field div').length;
    var kartu = $('.field').children();
    var card = $('.field .card');
    var time = $('.timer');
    var running = time.attr('isRunning');
    var minElement = $('#minutes');
    var secElement = $('#second');
    var msElement = $('#ms');
    var leaderBoard = getLeaderBoard("Leader");;

    var gambar = ["gambar1","gambar2","gambar3","gambar4","gambar5","gambar6"
    ,"gambar7","gambar8","gambar1","gambar2","gambar3","gambar4","gambar5"
    ,"gambar6","gambar7","gambar8"];
    var numRandom = 16;
    var point = 0;
    var winGame = 8;
    var waktuWin = 0;
    var min = 0;
    var sec = 0;
    var ms = 0;
    var flagClicked = false;
    var unique = [];
    var timer;
    var leaderObjt;



        /* display leaderboard at the beginning of the screen
        */
        sortLeaderBoard(leaderBoard);
        displayLeaderBoard();



        $('.overlay').click(function(event) {
            /* Act on the event */
            closeWarning();
        });

        $('#newGame').click();

        $(".item-login").html("Welcome , "+name);

        $("#no-btn").click(function(event) {
            /* Act on the event */
            $('#myModal').modal('toggle');
        });

        $("#no-btn-1").click(function(event) {
            /* Act on the event */
            $('#myModal1').modal('toggle');
        });

        $("#yes-btn-1").click(function(event) {
            /* Act on the event */
            $('#myModal1').modal('toggle');
        });


        $("#yes-btn").click(function(event) {
            /* Act on the event */
            window.open("index.html","_self");
        });


        // Shuffle card randomly
        $('#newGame').click(function(event) {
            /* Act on the event */
            waktuWin = 0;
            flagClicked = true;
            if(flagClicked){
            reset();
            $('#myModal1').modal('toggle');
            $('.card').removeClass('flipped').removeClass('sama');
            }
            var data;
            kartu.each(function() {
               var j = makeUniqueRandom();
               if(j < 8){
                data = j;
               } else {
                data = j-8;
               }
                console.log(j);
                $(this).html('<img src="./src/images/'+gambar[j]+'.svg" alt="' +gambar[j] + '" data ="'+ data + '" > </img>');
            });

            console.log(unique);
            unique = [];

            run();


        });



        // Credit for some guy in stack-overflow
        // here's the link
        // http://stackoverflow.com/questions/19351759/javascript-random-number-out-of-5-no-repeat-until-all-have-been-used
        function makeUniqueRandom(){
            if(unique.length < 1){
                for( var i = 0; i < numRandom; i++){
                    unique.push(i);
                }
            }

            var index = Math.floor(Math.random() * unique.length);
            var val = unique[index];

             unique.splice(index,1);

             return val;
        }

        // this code was insipired by http://jsbin.com/xaket/3/edit?html,css,js,output
        card.click(function(event) {
            /* Act on the event */
            if(flagClicked){

            if($(this).hasClass('sama')) {
                return ;
            }

            $(this).toggleClass('flipped');

            var diffCard = getBeda();

            if(diffCard.length === 2){
                var firstParent = diffCard.first();
                var secParent = diffCard.last();
                var first = diffCard.first().children('img');
                var second = diffCard.last().children('img');
                var attrFirst = getData(first);
                var attrSecond = getData(second);

                if(attrFirst === attrSecond){
                    point++;
                    firstParent.addClass('sama');
                    secParent.addClass('sama');


                } else {
                    setTimeout(function(){
                        firstParent.removeClass('flipped');
                        secParent.removeClass('flipped');
                    },300);
                }

                console.log(attrFirst + " " + attrSecond);
                console.log(point);

            }

           setTimeout(isWinGame(),1000);

        } else {
            showWarning();
        }


        });

        function getBeda(){
            var val = $('.flipped').not('.sama');

            return val;
        }
        /*
           end of code
                     */



        function getData(obj){
            var data = obj.attr('data');
            return data;
        }



        function isWinGame(){
            if(point === winGame){
                pause();
                $('#myModal1').modal('toggle');
                $('.card').removeClass('flipped').removeClass('sama');
                point = 0;
                flagClicked = false;
                createLeaderBoard();
                setLeaderBoard();
                leaderBoard = getLeaderBoard("Leader");
                console.log(leaderBoard.length);
                sortLeaderBoard(leaderBoard);
                console.log(leaderBoard.length);
                displayLeaderBoard();
            }

        }


        //this code inspired from
        //http://codereview.stackexchange.com/questions/48383/jquery-stopwatch
        //http://jsfiddle.net/8qmyg/17/
        function prependString(t,l){
                t = '' + (t | 0);
                while (t.length < l) {
                    t = '0' + t;
                }

                return t;
            }

        function setTimer(minutes,second,mili){
            minElement.text(prependString(minutes,2));
            secElement.text(prependString(second,2));
            msElement.text(prependString(mili,3));
        }

        function runTimer(){
            var start = Date.now();
            var prevMin = min;
            var prevSec = sec;
            var prevMs = ms;

            timer = setInterval(function(){
                var elapsed = Date.now() - start;
                min = ((elapsed / 60000) + prevMin) % 60;
                sec = ((elapsed/1000) + prevSec) % 60;
                ms = (elapsed + prevMs) % 1000;
                waktuWin = elapsed;
                setTimer(min,sec,ms);

            },20);

        }

            function run(){
                running = true;
                runTimer();
            }

            function pause(){
                running = false;
                clearTimeout(timer);
            }

            function reset(){
                running = false;
                pause();
                min = 0;
                sec = 0;
                ms = 0;
                setTimer(min , sec,ms);
            }

            /*
               end of code
                         */



            function getMinorSec(type,time){
                var hasil;
                if(type === 1){
                    hasil = time/60000;
                } else {
                    hasil = time/1000;
                }
            }



            function showWarning() {
                $('.overlay').css({
                    height: '100%',
                });
            }

            function closeWarning() {
                $('.overlay').css({
                    height: '0%',
                });
            }

            function createLeaderBoard(){
                leaderObjt = {
                    'username' : name,
                    'time'    : waktuWin,
                    'mintoWin' : min,
                    'sectoWin' : sec,
                    'mstoWin' : ms

                };
                if(leaderBoard != null){
                leaderBoard.push(leaderObjt);
                 } else {
                leaderBoard = [leaderObjt];
                }

            }

            function sortLeaderBoard(leader){
                if(leaderBoard != null){
                leader.sort(function(a,b) {
                    return a.time - b.time;
                });
                }
            }

            function displayLeaderBoard(){
                var j = 0;
                var k = 0;
                if(leaderBoard != null){
                    console.log("kesini1");
                    for(var i = 1; i < 6; i++){
                        if(j < leaderBoard.length){
                        console.log('#name'+i+'')
                        k++;
                        $('#name'+k+'').text(leaderBoard[j].username);
                        $('#time'+k+'').text(prependString(leaderBoard[j].mintoWin,2) + ":" +prependString(leaderBoard[j].sectoWin,2) + ":"
                           +prependString(leaderBoard[j].mstoWin,3));
                        j++;
                        }
                    }
                } else {
                    for(var i = 1; i < 6; i++){

                        $('#name'+i+'').text('Null');
                        $('#time'+i+'').text('NaN');

                    }
                }
            }

            function deleteLocalStorage(key){
                localStorage.removeItem(key);
            }

            function getLeaderBoard(key){
                if(localStorage.getItem(key) != null ){
                    return JSON.parse(localStorage.getItem(key));
                }
            }

            function setLeaderBoard(){
                if(leaderBoard != null || leaderBoard.length != 0 ){
                localStorage.setItem("Leader", JSON.stringify(leaderBoard));
                }
            }

            $('#clearItem').click(function(event) {
                /* Act on the event */
                deleteLocalStorage('Leader');
                leaderBoard = null;
                displayLeaderBoard();
            });



});













