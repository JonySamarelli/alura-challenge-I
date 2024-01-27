dialog = document.querySelector('.dialog');
dialogContainer = document.querySelector('.dialog__container');

textoEntrada = document.querySelector('.decodificador__entrada__texto__input');
textoSaida = document.querySelector('.decodificador__resultado__texto__output');

resultadoDecodificacao = document.querySelector('.decodificador__resultado__if');
decodificaoInvalida = document.querySelector('.decodificador__resultado__else');

dialog.addEventListener('click', fecharModal);
dialogContainer.addEventListener('click', function(event){
    event.stopPropagation();
});

function codificar() {
    if (textoValido(textoEntrada.value)) {
        textoSaida.value = textoEntrada.value.replace(/[aeiou]/g, (letra) => {
            switch (letra) {
                case 'a':
                    return 'ai';
                case 'e':
                    return 'enter';
                case 'i':
                    return 'imes';
                case 'o':
                    return 'ober';
                case 'u':
                    return 'ufat';
            }
        })
        exibeResultado(true);
        textoEntrada.value = '';
    } else {
        abrirModal();
    }
}

function decodificar() {
    if (textoValido(textoSaida.value)) {
        textoEntrada.value = textoSaida.value.replace(/ai|enter|imes|ober|ufat/g, (letra) => {
            switch (letra) {
                case 'ai':
                    return 'a';
                case 'enter':
                    return 'e';
                case 'imes':
                    return 'i';
                case 'ober':
                    return 'o';
                case 'ufat':
                    return 'u';
            }
        })
        exibeResultado(false);
        textoSaida.value = '';
    } else {
        if(resultadoDecodificacao.style.display != 'flex'){
            exibeResultado(true);
        } else abrirModal();
    }
}

function adicionarClipboard() {
    if (textoValido(textoSaida.value)) {
        navigator.clipboard.writeText(textoSaida.value);
        textoSaida.value = '';
    } else {
        abrirModal();
    }
}

function fecharModal(){
    document.querySelector('.dialog').open = false;
}

function abrirModal(){
    document.querySelector('.dialog').open = true;
}

function textoValido(texto) {
    return !!texto.match("^[a-z ]+$");
}

function exibeResultado(visible) {
    if (visible) {
        resultadoDecodificacao.style.display = 'flex';
        decodificaoInvalida.style.display = 'none';
    } else {
        resultadoDecodificacao.style.display = 'none';
        decodificaoInvalida.style.display = 'flex';
    }
}
