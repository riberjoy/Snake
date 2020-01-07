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
var direcao = 0;
var firstClick = true;
var cont = 0;
var controleTop = [];
var controleLeft = [];
var direcaoRabo = [];
var rota = 0;
var deadS = 1;
var dimensao;

$(document).ready(function () {
    $("#restart").click(function () {
        $("#restart").css("display", "none");
        $("#pontos").css("display", "flex");
        $(".posicao").css("top", "300px");
        $(".posicao").css("left", "450px");
        xLimite = 450;
        yLimite = 300;
        direcao = 0;
        cont = 0;
        firstClick = true;
        pontos = 0;
        controleTop = [];
        controleLeft = [];
        direcaoRabo = [];
        deadS = 1;
        $("img").remove();
        $("<img/>", { id: "cobra-cabeca", class: 'cobra posicao', src: "imagens/corpo_Cobrinha.png" }).appendTo("section section div");
        $("<img/>", { id: "cobra-rabo", class: 'cobra posicao', src: "imagens/rabo_Cobrinha.png" }).appendTo("section section div");
        $("<img/>", { id: "maca", class: 'maca', src: "imagens/maca.png" }).appendTo("section section div");
        $("#cobra-cabeca").attr("src", "imagens/corpo_Cobrinha.png");
        $("#cobra-rabo").css("display", "none");
    })
    var velocidade = 100;
    move(velocidade);
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
        $("#pontos").html(pontos+"");
        nome = "cobra-corpo" + pontos;
        $("<img/>", { id: nome, class: 'cobra', src: "imagens/corpo_Cobrinha.png" }).appendTo("section section div");
        maca();
    }
}

function contolaMovimento() {
    if (controleLeft != null || controleTop != null) {
        for (var i = 1; i <= pontos; i++) {
            nome = "#cobra-corpo" + i;
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


function dead() {
    if (pontos > 3) {
        switch (rota) {
            case 37:
                if (direcao == 39) {
                    return 0;
                }
                break;
            case 38:
                if (direcao == 40) {
                    return 0;
                }
                break;
            case 39:
                if (direcao == 37) {
                    return 0;
                }
                break;
            case 40:
                if (direcao == 38) {
                    return 0;
                }
                break;
        }
    }
    for (var i = 1; i < (pontos - 1); i++) {
        if ($("#cobra-corpo" + i).position().top == $("#cobra-cabeca").position().top &&
            $("#cobra-corpo" + i).position().left == $("#cobra-cabeca").position().left) {
            return 0;
        }


    }
}


$(document).keydown(function (e) {
    dimensao = clearInterval();
    if (deadS == 1) {
        if (direcao != 0) {
            rota = direcao;
        }
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            direcao = e.keyCode;
            
            if (firstClick == true) {
                maca();
                $("#cobra-cabeca").attr("src", "imagens/cabeca_Cobrinha.png");
                $("#cobra-rabo").css("display", "flex");
                firstClick = false;
            }
        }
    }
})

function move(velocidade) {
    dimensao = setInterval(movimento, velocidade);
    function movimento() {
        if (dead() == 0 || ((xLimite <= -1 || yLimite <= -1) || (xLimite >= 886 || yLimite >= 586))) {
            dimensao = clearInterval();
            deadS = 0;
            $("#restart").css("display", "flex");
            $("#pontos").css("display", "none");
            $("#pontos").html("0");
            $(".maca").css("display", "none");
        } else {
            cont = cont + 1;
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