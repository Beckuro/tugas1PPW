$(document).ready(function() {
    var loginFlag = false;
    var panjang;
    var data;
    var unameOpp = [""];
    var passOpp = [""];

    // $.ajax({
    //     url: './src/js/users.json',
    //     type: 'get',
    //     dataType: 'json',
    //     error: function(data){
    //     },
    //     success: function(data){
    //       //do something with data
    //     $.each(data,function(i, p) {
    //         data = p;
    //         console.log(data);
    //     });

    //     panjang = data.length;
    //     for(i = 0; i < data.length; i++){
    //         unameOpp.push(data[i].username);
    //         passOpp.push(data[i].password);
    //     }

    //         }
    // });
    $.getJSON('./src/js/users.json', function(data) {
            /*optional stuff to do after success */

        $.each(data,function(i, p) {
            console.log(p);
            data = p;
            console.log(data[0]);
        });

        panjang = data.length;
        for(i = 0; i < data.length; i++){
            unameOpp.push(data[i].username);
            passOpp.push(data[i].password);
        }

    });


    $('#login').click(function(event) {
        /* Act on the event */
        for(i = 1; i <= panjang ; i++){
            if ($('#uname').val() === unameOpp[i] && $('#pass').val() === passOpp[i]){
                loginFlag = true;
                if (typeof(Storage) !== "undefined"){
                sessionStorage.setItem("uname", unameOpp[i]);
                }
                window.open("main.html","_self");
                break;
            }
        }
        if(!loginFlag){
            alert('Password atau Username anda salah');
        } else {
              return false;
        }



    });
});