let player1Global = ''
let player2Global = ''
let pontosPlayer1 = 0
let pontosPlayer2 = 0

let vez = 'X'
let fimDeJogo = false

const celulas = document.querySelectorAll('.parteJogo')
const resultado = document.getElementById('resultado')
const botaoReiniciar = document.getElementById('reiniciar')

function iniciar() {
    const form = document.getElementById('formulario')

    form.addEventListener('submit', function (ev) {
        ev.preventDefault()

        const input1 = document.getElementById('player1')
        const input2 = document.getElementById('player2')

        const player1 = input1.value
        const player2 = input2.value

        if (!player1 || !player2){
            alert('Deve inserir o nome dos dois jogadores')
       return
     } 

        player1Global = player1
        player2Global = player2

        input1.value = ''
        input2.value = ''

        form.classList.add('ocultar')

        const jogoVelha = document.getElementById('velha')
        jogoVelha.classList.remove('ocultar')
        jogoVelha.classList.add('mostrar')

        botaoReiniciar.classList.remove('ocultar')

        playersPartida(player1, player2)
    })
}

function playersPartida(player1, player2) {
    const espaco1 = document.getElementById('espaco1')
    espaco1.innerHTML = ''

    const tabela = document.createElement('p')
    tabela.innerText = 'Jogadores'
    tabela.id = 'tabela'

    const linha = document.createElement('div')

    const pPlayer1 = document.createElement('p')
    pPlayer1.innerText = `${player1} (X)`
    pPlayer1.className = 'participantes'

    const pPlacar = document.createElement('p')
    pPlacar.innerText = `${pontosPlayer1}  x  ${pontosPlayer2}`
    pPlacar.className = 'participantes'

    const pPlayer2 = document.createElement('p')
    pPlayer2.innerText = `${player2} (O)`
    pPlayer2.className = 'participantes'

    linha.append(pPlayer1, pPlacar, pPlayer2)

    espaco1.append(tabela, linha)
}

celulas.forEach(function (celula) {
    celula.addEventListener('click', function (ev) {
        jogar(ev)
        verificarVitoria()
    })
})

function jogar(ev) {
    if (fimDeJogo) return

    const celula = ev.currentTarget

    if (celula.innerText !== '') return

    celula.innerText = vez

    vez = vez === 'X' ? 'O' : 'X'
}

function verificarVitoria() {
    const combinacoes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < combinacoes.length; i++) {
        const [a, b, c] = combinacoes[i]

        if (
            celulas[a].innerText !== '' &&
            celulas[a].innerText === celulas[b].innerText &&
            celulas[a].innerText === celulas[c].innerText
        ) {
            if (celulas[a].innerText === 'X') {
                resultado.innerText = player1Global + ' venceu!'
                pontosPlayer1++
            } else {
                resultado.innerText = player2Global + ' venceu!'
                pontosPlayer2++
            }

            playersPartida(player1Global, player2Global)

            fimDeJogo = true
            return
        }
    }

    const todasPreenchidas = Array.from(celulas).every(c => c.innerText !== '')

    if (todasPreenchidas) {
        resultado.innerText = 'Empate!'
        fimDeJogo = true
    }
}


botaoReiniciar.addEventListener('click', function () {
    celulas.forEach(c => c.innerText = '')

    fimDeJogo = false
    vez = 'X'
    resultado.innerText = ''

})

iniciar()