var xLimite = 450;
var yLimite = 300;
var intervalo = 50000;
var velocidade = 100;
var tamanho = 0;
var leftMaca = 0;
var topMaca = 0;
var pontos = 0;
var nome = "cobra-corpo";
// var apareceMaca;
var direcao = null;
var firstClick = true;
var cont = 0;
var controleTop = [];
var controleLeft = [];
var direcaoRabo = [];

$(document).ready(function () {
    $("#restart").click(function () {
        $("#restart").css("display", "none");
        $("#pontos").css("display", "flex");
        $(".posicao").css("top", "300px");
        $(".posicao").css("left", "450px");
        xLimite = 450;
        yLimite = 300;
        direcao = null;
        firstClick = true;
        pontos = 0;
        controleTop = [];
        controleLeft = [];
        direcaoRabo = [];
        $("img").remove();
        $("<img/>", { id: "cobra-cabeca",  class: 'cobra posicao', src: "imagens/corpo_Cobrinha.png" }).appendTo("section section div");
        $("<img/>", { id: "cobra-rabo",  class: 'cobra posicao', src: "imagens/rabo_Cobrinha.png" }).appendTo("section section div");
        $("<img/>", { id: "maca",  class: 'maca', src: "imagens/maca.png" }).appendTo("section section div");
        $("#cobra-cabeca").attr("src", "imagens/corpo_Cobrinha.png");
        $("#cobra-rabo").css("display", "none");
        // apareceMaca = clearInterval();
    })
    move();
})

function maca() {
    leftMaca = 1 + Math.floor(Math.random() * 885);
    topMaca = 1 + Math.floor(Math.random() * 585);
    while (true) {
        leftMaca = 1 + Math.floor(Math.random() * 885);
        if (leftMaca % 15 == 0) {
            break;
        }
    }
    while (true) {
        topMaca = 1 + Math.floor(Math.random() * 585);
        if (topMaca % 15 == 0) {
            break;
        }
    }
    $(".maca").css("display", "flex");
    $(".maca").css("top", topMaca + "px");
    $(".maca").css("left", leftMaca + "px");
}

function buscaMaca() {
    if (((xLimite == leftMaca) && ((yLimite) >= (topMaca) && ((yLimite) <= (topMaca)))) ||
        (((xLimite) >= (leftMaca) && (xLimite) <= (leftMaca)) && (yLimite == topMaca))) {
        $(".maca").css("display", "none");
        controleLeft.push(xLimite);
        controleTop.push(yLimite);
        direcaoRabo.push(direcao);
        pontos++;
        $("#pontos").html("<p>" + pontos + "</p>");
        nome = "cobra-corpo" + pontos;
        $("<img/>", { id: nome,  class: 'cobra', src: "imagens/corpo_Cobrinha.png" }).appendTo("section section div");    
        maca();
    }
}

function contolaMovimento() {
    if (controleLeft != null || controleTop != null) {
        for(var i = 1; i<= pontos; i++){
            nome = "#cobra-corpo"+i;
            $(nome).css("left", (controleLeft[i]) + "px");
            $(nome).css("top", (controleTop[i]) + "px");
        }
        $("#cobra-rabo").css("left", (controleLeft[0]) + "px");
        $("#cobra-rabo").css("top", (controleTop[0]) + "px");
        switch (direcaoRabo[0]) {
            case 37:
                $("#cobra-rabo").css("transform", "rotate(180deg)");
                break;
            case 38:
                $("#cobra-rabo").css("transform", "rotate(270deg)");
                break;
            case 39:
                $("#cobra-rabo").css("transform", "rotate(0deg)");
                break;
            case 40:
                $("#cobra-rabo").css("transform", "rotate(90deg)");
                break;
        }
    }
    direcaoRabo.shift();
    controleLeft.shift();
    controleTop.shift();
    cont--;
}

$(document).keydown(function (e) {
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
        direcao = e.keyCode;
        if (firstClick == true) {
            maca();
            $("#cobra-cabeca").attr("src", "imagens/cabeca_Cobrinha.png");
            $("#cobra-rabo").css("display", "flex");
            // apareceMaca = setInterval(maca, intervalo);
            firstClick = false;
        }
    }
})

function dead(){
    for(var i = 0; i<(cont-1); i++){ 
        if(controleLeft[i] == controleLeft[cont] || controleTop[i] == controleTop[cont]){
            return true;
        }else{
            return false;
        }        
    }
    return false;
}

function move() {
    var dimensao = setInterval(movimento, velocidade);
    function movimento() {
        if ((xLimite <= -1 || yLimite <= -1) || (xLimite >= 886 || yLimite >= 586) || dead()) {
            dimensao = clearInterval();
            $("#restart").css("display", "flex");
            $("#pontos").css("display", "none");
            $("#pontos").html("0");
            // apareceMaca = clearInterval();
            $(".maca").css("display", "none");
        } else {
            cont++;
            controleLeft.push(xLimite);
            controleTop.push(yLimite);
            direcaoRabo.push(direcao);
            if (direcao == 37) {//pra esquerda
                xLimite = xLimite - 15;
                $(".posicao").css("left", (parseInt($("#cobra-cabeca").position().left) - 15) + "px");
                $(".posicao").css("top", $("#cobra-cabeca").position().top + "px");
                $("#cobra-cabeca").css("transform", "rotate(180deg)");
            }
            if (direcao == 38) {//pra cima
                yLimite = yLimite - 15;
                $(".posicao").css("top", (parseInt($("#cobra-cabeca").position().top) - 15) + "px");
                $(".posicao").css("left", parseInt($("#cobra-cabeca").position().left) + "px");
                $("#cobra-cabeca").css("transform", "rotate(270deg)");
            }
            if (direcao == 39) {//pra direita
                xLimite = xLimite + 15;
                $(".posicao").css("left", (parseInt($("#cobra-cabeca").position().left) + 15) + "px");
                $(".posicao").css("top", $("#cobra-cabeca").position().top + "px");
                $("#cobra-cabeca").css("transform", "rotate(0deg)");
            }
            if (direcao == 40) {//pra baixo
                yLimite = yLimite + 15;
                $(".posicao").css("top", (parseInt($("#cobra-cabeca").position().top) + 15) + "px");
                $(".posicao").css("left", $("#cobra-cabeca").position().left + "px");
                $("#cobra-cabeca").css("transform", "rotate(90deg)");
            }
            buscaMaca();
            contolaMovimento();
        }
    }
}