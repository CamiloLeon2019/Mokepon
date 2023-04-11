let ataqueJugador = ''
let ataquePC = ''
let vidaJugador = 3
let vidaOponente = 3
let mokepones = []
let ataques = []
let ataquesPC = []
let opcionDeMokepoñes
let inputHombreOsoCerdo
let inputTortuerto     
let inputHuevardo
let ataquesMokepon  
let ataquesMokeponEnemigo  
let mokeponJugador
let botonAtaqueFuego 
let botonAtaqueAgua 
let botonAtaqueTierra
let botones = []
let ataqueMokepon = []
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

class Mokepoñ{
    constructor(nombre,foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}


let hombreOsoCerdo = new Mokepoñ('HombreOsoCerdo', './img/manbearpig.jpg', 5)
let tortuerto = new Mokepoñ('Tortuerto', './img/tortuerto.jpg', 5)
let huevardo = new Mokepoñ('Huevardo', './img/huevardo.jpg', 5)

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
mokepones.push(hombreOsoCerdo,tortuerto,huevardo)

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
       <label class="tarjeta-mokepon-fuego" for="${mokepon.nombre}">
           <p>${mokepon.nombre}</p>
           <img src="${mokepon.foto}" alt="${mokepon.nombre}">
       </label>`

    contenedorTarjetas.innerHTML += opcionDeMokepoñes

    inputHombreOsoCerdo = document.getElementById('HombreOsoCerdo')
    inputTortuerto      = document.getElementById('Tortuerto')
    inputHuevardo       = document.getElementById('Huevardo')
    })

    botonMokeponJugador.addEventListener('click', seleccionarMokeponJugador)
    seccionAtaques.style.display = 'none'
    botonReiniciar.style.display = 'none'
}

//Logica para la seleccion del mokepoñ jugador y del oponente
function seleccionarMokeponJugador(){
    //Obtiene el nombre de los Mokèpoñes pr su id cada uno con su if
    if(inputHombreOsoCerdo.checked == true){
        alert('Seleccionaste a Hombre Oso Cerdo')
        mokeponSeleccionado.innerHTML = inputHombreOsoCerdo.id
        mokeponJugador = inputHombreOsoCerdo.id
    }else if(inputHuevardo.checked == true){
        alert('Seleccionaste a Huevardo')
        mokeponSeleccionado.innerHTML = inputHuevardo.id
        mokeponJugador = inputHuevardo.id
    }else if (inputTortuerto.checked == true){
        alert('Seleccionaste a Tortuerto')
        mokeponSeleccionado.innerHTML = inputTortuerto.id
        mokeponJugador = inputTortuerto.id
    }else{
        alert('No has seleccionado ningun Moképoñ')
    }
    extraerAtaques(mokeponJugador)
    seleccionarMokeponEnemigo()
}

//Funcion para extrear el aray de ataques de cada objeto Mokepon
function extraerAtaques(mokeponSeleccionado){
    let ataques
    for (let i = 0; i < mokepones.length; i++){
        if(mokeponSeleccionado === mokepones[i].nombre){
                ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

//Selecciona un mokepoñ de manera aleatoria entre las 3 opciones disponibles
function seleccionarMokeponEnemigo(){
    let oponente = aleatorio(0,mokepones.length-1)
    mokeponOponenteSeleccionado.innerHTML = mokepones[oponente].nombre
    ataquesMokeponEnemigo = mokepones[oponente].ataques
    seccionSeleccionMokepon.style.display = 'none'
    seccionAtaques.style.display = 'flex'
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

    botonAtaqueFuego.addEventListener('click',ataqueFuego)
    botonAtaqueAgua.addEventListener('click',ataqueAgua)
    botonAtaqueTierra.addEventListener('click',ataqueTierra)
}

//Logica para crear el array con la sequencia de los 5 ataques del juego
function sequenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.outerText === '🔥'){
                ataqueMokepon.push('FUEGO')
                boton.style.background = '#112f58'
            }else if(e.target.outerText === '💧'){
                ataqueMokepon.push('AGUA')
                boton.style.background = '#112f58'
            }else{
                ataqueMokepon.push('TIERRA')
                boton.style.background = '#112f58'
            }       
        })
    ataqueOponente()
    })
}

//Logica de botones de seleccion de cada elemento
function ataqueFuego(){
    alert('Como lo que siento por ti bb 🔥')
    ataqueOponente()
}

function ataqueAgua(){
    alert('Lo que escurre por tus piernas 💧')
    ataqueOponente()
}

function ataqueTierra(){
    alert('Lo que te envuelve como flor 🥬')
    ataqueOponente()
}

//Logica para seleccionar ataque de oponente de manera aleatoria
function ataqueOponente(){
    let ataque = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if(ataque == 0 || ataque == 1 ){
        ataquesPC.push('FUEGO')
    }else if(ataque == 3 || ataque == 4){
        ataquesPC.push('AGUA')
    }else{
        ataquesPC.push('TIERRA')
    }
    console.log(ataquesPC)
    combate()
    revisarVidas()
}

//Logica de combate donde es similar a piedra, papel o tijera
function combate(){
    if ( ataqueJugador == ataquePC){
        crearMensaje('EMPATE')
    }else if (ataqueJugador == 'FUEGO' && ataquePC == 'TIERRA' || ataqueJugador == 'AGUA' && ataquePC == 'FUEGO' || ataqueJugador == 'TIERRA' && ataquePC == 'AGUA'){
        crearMensaje('VICTORIA')
        vidaOponente--
        document.getElementById('vidas-oponente').innerHTML = vidaOponente
    }else{
        crearMensaje('DERROTA')
        vidaJugador--
        document.getElementById('vidas-jugador').innerHTML = vidaJugador
    }
}

//Realiza la revision de la vida de cada jugador, si alguno llega a 0 primero, se acaba el juego.
function revisarVidas(){
    if(vidaOponente == 0){
        crearMensajeFinal('Has Ganaó, Joder!')
    }else if(vidaJugador == 0)
        crearMensajeFinal('La has cagaó. Coño!')
}

//Crea mensaje para logs donde se ve ataque jugador, ataque enemigo y resultado
function crearMensaje(resultado){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueOponente = document.createElement('p')

    sectionResultado.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueOponente.innerHTML = ataquePC
    logAtaqueJugador.appendChild(nuevoAtaqueJugador)
    logAtaqueOponente.appendChild(nuevoAtaqueOponente)
}

//Crea mensaje final resultado de la batalla y termina el juego
function crearMensajeFinal(resultado){
    let parrafo = document.createElement('p')

    parrafo.innerHTML = resultado
    sectionHub.appendChild(parrafo)
    botonReiniciar.style.display = 'block'
    botonReiniciar.addEventListener('click', reiniciarJuego)
    botonAtaqueAgua.disabled = true
    botonAtaqueFuego.disabled = true
    botonAtaqueTierra.disabled = true
}

//Permite reiniciar el juego haciendo un reinicio
function reiniciarJuego(){
    location.reload()
}

//Carga los eventos del juego
window.addEventListener('load',iniciarJuego)


