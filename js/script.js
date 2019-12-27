var xLimite = 400;
var yLimite = 300;
var intervalo = 50000;
var velocidade = 10;
var tamanho = 0;
var leftMaca = 0;
var topMaca = 0;
var pontos = 0;
// var apareceMaca;
var direcao = null;
var firstClick = true;
var distancia = 0;
var cont=0;
var controleTop = [];
var controleLeft = [];

$(document).ready(function () {
    $("#restart").click(function () {
        $("#restart").css("display", "none");
        $("#pontos").css("display", "flex");
        $(".posicao").css("top", "290px");
        $(".posicao").css("left", "390px");
        xLimite = 400;
        yLimite = 300;
        direcao = null;
        firstClick = true;
        $("#cobra-cabeca").attr("src","imagens/corpo_Cobrinha.png");
        // apareceMaca = clearInterval();
    })
    move();
})

function maca() {
    leftMaca = 1 + Math.floor(Math.random() * 780);
    topMaca = 1 + Math.floor(Math.random() * 580);
    $(".maca").css("display", "flex");
    $(".maca").css("top", topMaca + "px");
    $(".maca").css("left", leftMaca + "px");
}

function buscaMaca() {
    switch (direcao) {
        case 37://esquerda
        case 39://direita
            if ((xLimite == leftMaca) && ((yLimite - 11) >= (topMaca - 5) && ((yLimite - 11) <= (topMaca + 5)))) {
                $(".maca").css("display", "none");
                pontos++;
                cresceCobra();
                $("#pontos").html("<p>" + pontos + "</p>");
                maca();
            }
            break;
        case 38: //sobe
        case 40://desce
            if (((xLimite - 10) >= (leftMaca - 5) && (xLimite - 10) <= (leftMaca + 5)) && (yLimite == topMaca)) {
                $(".maca").css("display", "none");
                pontos++;
                cresceCobra();
                $("#pontos").html("<p>" + pontos + "</p>");
                maca();
            }
            break;
    }
}

function contolaMovimento(){
    for(var i = 0; i < pontos;i++){
        distancia = distancia + 20;
    }
    for(var j = 0; j < cont;j++){
        distancia = pontos*20;
        if(distancia==0){
            $("#cobra-rabo").css("left", (controleLeft[j]-25)+"px");
            $("#cobra-rabo").css("top", (controleTop[j]-10)+"px");
            controleLeft.cli
            controleTop[j]
        }
    }
}

function cresceCobra() {
    var corpo = $("<img/>", { id: "cobra-corpo", src: "imagens/corpo_Cobrinha.png" });
    $("section div").append(corpo);

}

$(document).keydown(function (e) {
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
        direcao = e.keyCode;
        if (firstClick == true) {
            maca();
            $("#cobra-cabeca").attr("src","imagens/cabeca_Cobrinha.png");
            $("#cobra-rabo").css("display", "flex");
            // apareceMaca = setInterval(maca, intervalo);
            firstClick = false;
        }
    }
})

function move() {
    var dimensao = setInterval(movimento, velocidade);
    function movimento() {
        if ((xLimite == 0 || yLimite == 0) || (xLimite == 801 || yLimite == 601)) {
            dimensao = clearInterval();
            $("#restart").css("display", "flex");
            $("#pontos").css("display", "none");
            // apareceMaca = clearInterval();
            $(".maca").css("display", "none");
        } else {
            if (direcao == 37) {//pra esquerda
                xLimite = xLimite - 1;
                $(".posicao").css("left", (parseInt($("#cobra-cabeca").position().left) - 1) + "px");
                $(".posicao").css("top", $("#cobra-cabeca").position().top + "px");
                $("#cobra-cabeca").css("transform", "rotate(180deg)");
            }
            if (direcao == 38) {//pra cima
                yLimite = yLimite - 1;
                $(".posicao").css("top", (parseInt($("#cobra-cabeca").position().top) - 1) + "px");
                $(".posicao").css("left", parseInt($("#cobra-cabeca").position().left) + "px");
                $("#cobra-cabeca").css("transform", "rotate(270deg)");
            }
            if (direcao == 39) {//pra direita
                xLimite = xLimite + 1;
                $(".posicao").css("left", (parseInt($("#cobra-cabeca").position().left) + 1) + "px");
                $(".posicao").css("top", $("#cobra-cabeca").position().top + "px");
                $("#cobra-cabeca").css("transform", "rotate(0deg)");
            }
            if (direcao == 40) {//pra baixo
                yLimite = yLimite + 1;
                $(".posicao").css("top", (parseInt($("#cobra-cabeca").position().top) + 1) + "px");
                $(".posicao").css("left", $("#cobra-cabeca").position().left + "px");
                $("#cobra-cabeca").css("transform", "rotate(90deg)");
            }
            buscaMaca();
            cont++;
            controleLeft.push(xLimite);
            controleTop.push(yLimite);
            contolaMovimento();
        }
    }
}