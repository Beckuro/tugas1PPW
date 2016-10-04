$(document).ready(function() {
    var name = sessionStorage.getItem("uname");
    var gambar = ["gambar1","gambar2","gambar3","gambar4","gambar5","gambar6","gambar7","gambar8","gambar1","gambar2","gambar3","gambar4","gambar5","gambar6","gambar7","gambar8"];
    var panjang = $('.field div').length;
    var kartu = $('.field').children();
    var point = 0;
    var winGame = 8;
    var unique = [];
    var card = $('.field .card');
    var numRandom = 16;

        /* Act on the event */
        console.log(name);
        console.log(panjang);
        console.log(kartu);


        $(".item-login").html("Welcome , "+name);

        $("#no-btn").click(function(event) {
            /* Act on the event */
            $('#myModal').modal('toggle');
        });

        $("#yes-btn").click(function(event) {
            /* Act on the event */
            window.open("index.html","_self");
        });


        // Shuffle card randomly
        $('#newGame').click(function(event) {
            /* Act on the event */
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
            if($(this).hasClass('sama')) {
                return ;
            }

            $(this).toggleClass('flipped');

            var diffCard = getBeda();

            if(diffCard.length === 2){
                var first = diffCard.first().children('img');
                var second = diffCard.last().children('img');
                var attrFirst = getData(first);
                var attrSecond = getData(second);

                console.log(attrFirst + " " + attrSecond);

            }


        });

        function getData(obj){
            var data = obj.attr('data');
            return data;
        }

        function getBeda(){
            var val = $('.flipped').not('.sama');

            return val;
        }
});



/*

  CHALLENGE:

  - If the number of flipped cards is equal to 2,
    see if their text matches.

  - If they do match, give yourself a point.

  - If you've selected 2 cards, regardless of whether or not
    they match, flip them back over. You can use the following
    code to execute code after 500 milliseconds.

    setTimeout(function () {
      console.log("This message will appear after 500 milliseconds");
    }, 500);


  BONUS:

  - If the cards match, keep them flipped over.

  - The game is over when you've matched all of the cards.

*/

// var points = 0;
// var score = $("h2");
// var card = $(".game li");
// card.click(function () {

//   if ( $(this).hasClass('matched') ) {
//     return;
// }

//   /* Toggle the flip class */
//   $(this).toggleClass("flipped");

//   /* Get all of the currently flipped cards */
//   var flipped = $(".flipped").not(".matched");

//   /* Check to make sure at least 2 are flipped */

//   if ( flipped.length === 2 ) {
//     /* Select the first and second cards from the collection */
//     var firstCard = flipped.first();
//     var secondCard = flipped.last();

//     /* Compare to see if the first and second in our collection are equal */
//     if ( firstCard.text() === secondCard.text() ) {
//       points++;
//       score.text("You've found " + points + " matches.");
//       firstCard.addClass("matched");
//       secondCard.addClass("matched");
//     } else {

//       setTimeout(function () {
//         firstCard.removeClass("flipped");
//         secondCard.removeClass("flipped");
//     }, 1000);

//     }

//     /*


//     */
//   } //endif

// });












