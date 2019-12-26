var xLimite = 400;
var yLimite = 300;
var intervalo = 10000;
var velocidade = 20;
var tamanho = 0;
var leftMaca = 0;
var topMaca = 0;
var apareceMaca;
var direcao = null;
var firstClick = true;


$(document).ready(function () {
    $("#restart").click(function () {
        $("#restart").css("display", "none");
        $("#pontos").css("display", "flex");
        $(".posicao").css("top", "290px");
        $(".posicao").css("left", "390px");
        xLimite = 400;
        yLimite = 300;
        direcao = null;
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
    if (xLimite >= leftMaca) { //Direita da maça
        if(xLimite == leftMaca && yLimite == topMaca){
            $(".maca").css("display", "none");
            $("#game").css("border", "none");
        }
    } else {//Esquerda da maça
        if((xLimite+20) == leftMaca && yLimite == topMaca){
            $(".maca").css("display", "none");
        }
    }
    if (yLimite > topMaca) { // Acima da mça
        if(xLimite == leftMaca && yLimite == topMaca){
            $(".maca").css("display", "none");
        }
    } else { //Abaixo da maça
        if(xLimite == leftMaca && (yLimite+20) == topMaca){
            $(".maca").css("display", "none");
        }
    }
}


$(document).keydown(function (e) {
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
        direcao = e.keyCode;
        $("#pontos").html("<p>" + $("#cobra").position().left + "</p>");
    }
    if (firstClick == true) {
        maca();
        apareceMaca = setInterval(maca, intervalo);
        firstClick = false;
    }
})

function move() {
    var dimensao = setInterval(movimento, velocidade);
    function movimento() {
        buscaMaca()
        if ((xLimite == 0 || yLimite == 0) || (xLimite == 801 || yLimite == 601)) {
            dimensao = clearInterval();
            $("#restart").css("display", "flex");
            $("#pontos").css("display", "none");
            $("#pontos").html("0");
        } else {
            if (direcao == 37) {//pra esquerda
                xLimite = xLimite - 1;
                $(".posicao").css("left", (parseInt($("#cobra").position().left) - 1) + "px");
                $(".posicao").css("top", $("#cobra").position().top + "px");
            }
            if (direcao == 38) {//pra cima
                yLimite = yLimite - 1;
                $(".posicao").css("top", (parseInt($("#cobra").position().top) - 1) + "px");
                $(".posicao").css("left", parseInt($("#cobra").position().left) + "px");
            }
            if (direcao == 39) {//pra direita
                xLimite = xLimite + 1;
                $(".posicao").css("left", (parseInt($("#cobra").position().left) + 1) + "px");
                $(".posicao").css("top", $("#cobra").position().top + "px");
            }
            if (direcao == 40) {//pra baixo
                yLimite = yLimite + 1;
                $(".posicao").css("top", (parseInt($("#cobra").position().top) + 1) + "px");
                $(".posicao").css("left", $("#cobra").position().left + "px");
            }
        }
    }
}








// Para adicionar uma nova imaem (mais uma parte da cobrinha)
// usar a seguinte estrutura: 
// $(document).ready(function () {
//     // caso passar pela mesma posição da maça
//     function cresceCobra() {
//         var imagem = $("<img/>", { src: "imagens/corpo_Cobrinha.svg"});
//         $("section div").append(imagem);
//     }
// })