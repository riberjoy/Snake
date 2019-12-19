
var vivo = true;
var direita = 0;

$(document).ready(function(){
    $("#play").click(function(){
        $("#pontos").css("display", "flex");
        $("#play").css("display", "none");
        move();
    })
})

function move(){
    var dimensao = setInterval(movimento, 100);
    function movimento() {
        if (direita == 800) {
        //   direita = 0;
        //   $("#cobra").css("margin-left", direita+"px");
        $("#cobra").css("display", "none");
        dimensao = clearInterval();
        } else { 
            direita = direita+20;
            $("#cobra").css("margin-left", direita+"px");
        }
    }
}

