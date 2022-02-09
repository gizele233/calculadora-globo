'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla');
const operadores = document.querySelectorAll('[id*=operador');
let novoNumero = true;
let operador;
let numero_anterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {

    if(operacaoPendente()){
        const numero_atual = parseFloat(display.textContent.replace(',', '.'));
        novoNumero = true;
        // const resultado = eval (`${numero_anterior}${operador}${numero_atual}`);
        // atualizarDisplay(resultado);

        if(operador == '+'){
            atualizarDisplay(numero_anterior + numero_atual);
        }else if(operador == '-'){
            atualizarDisplay(numero_anterior - numero_atual);
        }else if(operador == '*'){
            atualizarDisplay(numero_anterior * numero_atual);
        }else if(operador == '/'){
            atualizarDisplay(numero_anterior / numero_atual);
        }

    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }else{
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numero_anterior = parseFloat(display.textContent.replace(',', '.'));
    }
    
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limpar_display').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numero_anterior = undefined;
}
document.getElementById('limpar_calculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);


const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

