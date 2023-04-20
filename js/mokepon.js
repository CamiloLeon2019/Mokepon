let victoriasJugador = 0
let victoriasEnemigo = 0
let mokepones = []
let ataques = []
let ataquesEnemigo = []
let opcionDeMokepoñes
let inputHombreOsoCerdo
let inputTortuerto     
let inputHuevardo
let inputCamascuas
let inputNanai
let inputPytwo
let mokeponJugador
let mokeponEnemigo
let botonAtaqueFuego 
let botonAtaqueAgua 
let botonAtaqueTierra
let indexAtaqueJugador
let indexAtaqueEnemigo
let botones = []
let ataquesJugador = []
let ataquesMokepon = []
let ataquesMokeponEnemigo = []
let ataqueAdicional
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-oponente')
const contenedorTarjetas =  document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById('botones-ataque')
const mokeponSeleccionado = document.getElementById('mokepon-seleccionado')
const mokeponOponenteSeleccionado = document.getElementById('mokepon-oponente')
const logAtaqueJugador = document.getElementById('log-ataque-jugador')
const logAtaqueOponente = document.getElementById('log-ataque-oponente')
const botonMokeponJugador = document.getElementById('boton-seleccion-mokepon')
const botonReiniciar = document.getElementById('reiniciar')
const seccionAtaques = document.getElementById('seleccion-ataque')
const seccionSeleccionMokepon = document.getElementById('seleccion-elemento')
const sectionResultado = document.getElementById('log-resultado')
const sectionHub = document.getElementById('logs-combate')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa') 

class Mokepoñ{
    constructor(nombre, tipo, foto){
        this.nombre = nombre
        this.tipo = tipo
        this.foto = foto
        this.ataques = []
    }
}

let hombreOsoCerdo = new Mokepoñ('HombreOsoCerdo', 'fuego','./img/manbearpig.jpg')
let tortuerto = new Mokepoñ('Tortuerto', 'agua','./img/tortuerto.jpg')
let huevardo = new Mokepoñ('Huevardo', 'tierra' ,'./img/huevardo.jpg')
let camascuas = new Mokepoñ('Camascuas', 'fuego', './img/Camascuas.png')
let nanai = new Mokepoñ('Nanai', 'agua', './img/Nanai.png')
let pytwo = new Mokepoñ('Pytwo', 'tierra', './img/Pytwo.png')

hombreOsoCerdo.ataques.push(
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '🥬', id: 'boton-ataque-tierra'}
)

tortuerto.ataques.push(
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '🥬', id: 'boton-ataque-tierra'}
)

huevardo.ataques.push(
    {nombre: '🥬', id: 'boton-ataque-tierra'},
    {nombre: '🥬', id: 'boton-ataque-tierra'},
    {nombre: '🥬', id: 'boton-ataque-tierra'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '🔥', id: 'boton-ataque-fuego'}
)
camascuas.ataques.push(
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '🥬', id: 'boton-ataque-tierra'}
)

nanai.ataques.push(
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '🥬', id: 'boton-ataque-tierra'}
)

pytwo.ataques.push(
    {nombre: '🥬', id: 'boton-ataque-tierra'},
    {nombre: '🥬', id: 'boton-ataque-tierra'},
    {nombre: '🥬', id: 'boton-ataque-tierra'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '🔥', id: 'boton-ataque-fuego'}
)
mokepones.push(hombreOsoCerdo,tortuerto,huevardo,camascuas,nanai,pytwo)

class Ataque{
    constructor(nombre, tipo){
        this.nombre = nombre
        this.tipo = tipo
    }
}

let fuego = new Ataque('Fuego', 'fuego')
let agua = new Ataque('Agua', 'agua')
let tierra = new Ataque('Tierra', 'tierra')

ataques.push(fuego,agua,tierra)

//Inicia el juego desplegando el dashboard de seleccion de mokepon a elegir segun su elemento y tambien cada ataque 
function iniciarJuego(){
    mokepones.forEach((mokepon) =>{
       opcionDeMokepoñes = 
       `<input type="radio" name="mascota" id="${mokepon.nombre}" />
       <label class="tarjeta-mokepon" for="${mokepon.nombre}">
           <p>${mokepon.nombre}</p>
           <img src="${mokepon.foto}" alt="${mokepon.nombre}">
       </label>`

    contenedorTarjetas.innerHTML += opcionDeMokepoñes

    inputHombreOsoCerdo = document.getElementById('HombreOsoCerdo')
    inputTortuerto      = document.getElementById('Tortuerto')
    inputHuevardo       = document.getElementById('Huevardo')
    inputCamascuas      = document.getElementById('Camascuas')
    inputNanai          = document.getElementById('Nanai')
    inputPytwo          = document.getElementById('Pytwo')
    })

    botonMokeponJugador.addEventListener('click', seleccionarMokeponJugador)
    seccionAtaques.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    botonReiniciar.style.display = 'none'
}

//Logica para la seleccion del mokepoñ jugador y del oponente
function seleccionarMokeponJugador(){
    //Obtiene el nombre de los Mokèpoñes pr su id cada uno con su if
    if(inputHombreOsoCerdo.checked == true){
        alert('Seleccionaste a Hombre Oso Cerdo')
        mokeponSeleccionado.innerHTML = inputHombreOsoCerdo.id
        mokeponJugador = hombreOsoCerdo
    }else if(inputHuevardo.checked == true){
        alert('Seleccionaste a Huevardo')
        mokeponSeleccionado.innerHTML = inputHuevardo.id
        mokeponJugador = huevardo
    }else if (inputTortuerto.checked == true){
        alert('Seleccionaste a Tortuerto')
        mokeponSeleccionado.innerHTML = inputTortuerto.id
        mokeponJugador = tortuerto
    }else if(inputCamascuas.checked == true){
        alert('Seleccionaste a Camascuas')
        mokeponSeleccionado.innerHTML = inputCamascuas.id
        mokeponJugador = camascuas
    }else if(inputNanai.checked == true){
        alert('Seleccionaste a Nanai')
        mokeponSeleccionado.innerHTML = inputNanai.id
        mokeponJugador = nanai
    }else if (inputPytwo.checked == true){
        alert('Seleccionaste a Pytwo')
        mokeponSeleccionado.innerHTML = inputPytwo.id
        mokeponJugador = pytwo
    }else{
        alert('No has seleccionado ningun Moképoñ')
    }
    seleccionarMokeponEnemigo(mokeponJugador)
}

//Funcion para extrear el aray de ataques de cada objeto Mokepon
function extraerAtaques(mokeponSeleccionado){
    let ataques
    for (let i = 0; i < mokepones.length; i++){
        if(mokeponSeleccionado.nombre === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    if(mokeponJugador.tipo == 'fuego' && mokeponEnemigo.tipo == 'tierra' || mokeponJugador.tipo == 'agua' && mokeponEnemigo.tipo == 'fuego' || mokeponJugador.tipo == 'tierra' && mokeponEnemigo.tipo == 'agua'){
        ataqueAdicional = ataques[aleatorio(0,ataques.length -1)]
        console.log(ataqueAdicional)
        ataques.push(ataqueAdicional)
    } 
    mostrarAtaques(ataques)
}

//Selecciona un mokepoñ de manera aleatoria entre las 3 opciones disponibles
function seleccionarMokeponEnemigo(mokeponJugador){
    let oponente = aleatorio(0,mokepones.length-1)
    mokeponEnemigo = mokepones[oponente]
    mokeponOponenteSeleccionado.innerHTML = mokepones[oponente].nombre 
    ataquesMokeponEnemigo = mokepones[oponente].ataques
    extraerAtaques(mokeponJugador)
    seccionSeleccionMokepon.style.display = 'none'
    //seccionAtaques.style.display = 'flex'
    sectionVerMapa.style.display = 'flex'
    sequenciaAtaque()
}

//Uso de la libreria MATH para usar random y generar un numero entre 0 y 1, para despues sumarle 1, 2... n para generar aletoriedad 
function aleatorio(min,max){
    return Math.floor(Math.random() * (max-min+1) + min)
}

function mostrarAtaques(ataques){  
    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id=${ataque.id} class="boton-ataque BAtaque">
                ${ataque.nombre}
            </button>`      
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonAtaqueFuego = document.getElementById('boton-ataque-fuego')
    botonAtaqueAgua = document.getElementById('boton-ataque-agua')
    botonAtaqueTierra = document.getElementById('boton-ataque-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

//Logica para crear el array con la sequencia de los 5 ataques del juego
function sequenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.outerText === '🔥'){
                ataquesJugador.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.outerText === '💧'){
                ataquesJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                ataquesJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            } 
            console.log(ataquesJugador)
            ataqueOponente()   
        })
    })
}

//Logica para seleccionar ataque de oponente de manera aleatoria
function ataqueOponente(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

        if(ataquesMokeponEnemigo[ataqueAleatorio].nombre === '🔥'){
            ataquesEnemigo.push('FUEGO')
        }else if(ataquesMokeponEnemigo[ataqueAleatorio].nombre === '💧'){
            ataquesEnemigo.push('AGUA')
        }else
            ataquesEnemigo.push('TIERRA')
    console.log(ataquesEnemigo)
    iniciarCombate()
}

//Valida que la secuencia de x ataques del jugador se haya completado
function iniciarCombate(){
    console.log('combate iniciado')
    if (ataquesJugador.length === 5){
        combate()
    }
}

//Usado para igualar cada secuencia de ataque 
function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = ataquesEnemigo[enemigo]
}

//Logica de combate donde es similar a piedra, papel o tijera
function combate(){
    for (let i = 0; i < ataquesJugador.length; i++) {
        if(ataquesJugador[i] === ataquesEnemigo[i]){
            indexAmbosOponentes(i,i)
            almacenarResultado()
        }else if (ataquesJugador[i] == 'FUEGO' && ataquesEnemigo[i] == 'TIERRA' || ataquesJugador[i] == 'AGUA' && ataquesEnemigo[i] == 'FUEGO' || ataquesJugador[i] == 'TIERRA' && ataquesEnemigo[i] == 'AGUA'){
            indexAmbosOponentes(i,i)
            almacenarResultado()
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador 
        }else{
            indexAmbosOponentes(i,i)
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo  
            almacenarResultado()
        }
    }
    revisarVictorias()
}

//Realiza la revision de la vida de cada jugador, si alguno llega a 0 primero, se acaba el juego.
function revisarVictorias(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal('Esto ha concluido en empate!')
    }else if(victoriasJugador > victoriasEnemigo)
        crearMensajeFinal('Ha sido una victoria tuya')
    else
        crearMensajeFinal('Ha sido una victoria oponente') 
}

//Crea mensaje para logs donde se ve ataque jugador, ataque enemigo y resultado
function almacenarResultado(){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueOponente = document.createElement('p')

    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueOponente.innerHTML = indexAtaqueEnemigo
    logAtaqueJugador.appendChild(nuevoAtaqueJugador)
    logAtaqueOponente.appendChild(nuevoAtaqueOponente)
}

//Crea mensaje final resultado de la batalla y termina el juego
function crearMensajeFinal(resultado){
    let parrafo = document.createElement('p')
    sectionResultado.innerHTML = ''
    parrafo.innerHTML = resultado
    sectionHub.appendChild(parrafo)
    botonReiniciar.style.display = 'block'
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

//Permite reiniciar el juego haciendo un reinicio
function reiniciarJuego(){
    location.reload()
}

//Carga los eventos del juego
window.addEventListener('load',iniciarJuego)


