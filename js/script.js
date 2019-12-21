var xLimite = 400;
var yLimite = 300;

var velocidade = 10;

var direcao;

$(document).keydown(function (e) {
    direcao = e.keyCode;
    ("#pontos").html("asdawedas");
})

$(document).ready(function () {
    $("#restart").click(function () {
        $("#restart").css("display", "none");
        $("#pontos").css("display", "flex");
        $(".posicao").css("top", "290px");
        $(".posicao").css("left", "390px");
        xLimite = 400;
        yLimite = 300;
    })
    move();
})


function move() {
    var dimensao = setInterval(movimento, velocidade);
    function movimento() {
        if ((xLimite == 0 || yLimite == 0) || (xLimite == 801 || yLimite == 601)) {
            dimensao = clearInterval();
            $("#restart").css("display", "flex");
            $("#pontos").css("display", "none");
            $("#pontos").html("0");
        } else {
            if (direcao == 37 || (direcao!=39 && direcao!=38 && direcao!=40)) {//pra esquerda
                xLimite = xLimite - 1;
                $(".posicao").css("left", (parseInt($("#cobra").position().left) - 1) + "px");
                $(".posicao").css("top", $("#cobra").position().top + "px");
            }
            if (direcao == 38 || (direcao!=39 && direcao!=40 && direcao!=37)) {//pra cima
                yLimite = yLimite - 1;
                $(".posicao").css("top", (parseInt($("#cobra").position().top) - 1) + "px");
                $(".posicao").css("left", parseInt($("#cobra").position().left) + "px");
            }
            if (direcao == 39 || (direcao!=40 && direcao!=38 && direcao!=37)) {//pra direita
                xLimite = xLimite + 1;
                $(".posicao").css("left", (parseInt($("#cobra").position().left) + 1) + "px");
                $(".posicao").css("top", $("#cobra").position().top + "px");
            }
            if (direcao == 40 || (direcao!=39 && direcao!=38 && direcao!=37)) {//pra baixo
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