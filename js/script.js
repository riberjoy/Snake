var vivo = true;

var posicaoAtual = parseInt($("#cobra").offset().left);

var xLimite = 800;
var xLimite = 600;



var velocidade = 1000;

$(document).ready(function () {
    $("#play").click(function () {
        $("#pontos").css("display", "flex");
        $("#play").css("display", "none");
        move();
    })
})

function move() {
    var dimensao = setInterval(movimento, velocidade);
    function movimento() {
        if (xLimite == 0) {
            //   direita = 0;
            //   $("#cobra").css("margin-left", direita+"px");
            $("#cobra").css("display", "none");
            dimensao = clearInterval();
        } else {
            xLimite = xLimite -1;
            $(".posicao").css("left",(posicaoAtual+1)+"px");
            $("#pontos").html($("#cobra").offset().left);
            // document.getElementById("#pontos").innerHTML = esquerda ;
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