const express = require("express")
const cors = require("cors")
let jugadores = []
const app = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

class Jugador{
  constructor(id){
    this.id = id
  }

  asignarMokepon(mokepon){
    this.mokepon = mokepon
  }

  actualizarPosicion(x,y){
    this.x = x
    this.y = y
  }

  asignarAtaques(ataques) {
    this.ataques = ataques
  }
}

class Mokepon {
  constructor(nombre){
    this.nombre = nombre
  }
}

app.post("mokepon/reiniciar", (req, res) => {
  jugadores = [] // Clear the array by setting its length to 0
  console.log("Si entra", jugadores)
  res.sendStatus(200); // Send a success status code
});

//metodo para obtener el id de cada nuevo jugador
app.get("/unirse", (req,res) =>{
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

//metodo para obtener el id del jugador y asignarle su mokepon elegido, dentro del servidor
app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id )
    if (jugadorIndex >= 0 ){
      jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    /*
    console.log(jugadores)
    console.log(jugadorId)
    */
    res.end()
})

//Actualiza la posicion de cada jugador dentro del mapa
app.post("/mokepon/:jugadorId/posicion", (req, res) =>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
  
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id )
    if (jugadorIndex >= 0 ){
      jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id )

    res.send({
      enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques", (req, res) =>{
  const jugadorId = req.params.jugadorId || ""
  const ataques = req.body.ataques || []

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id )
  if (jugadorIndex >= 0 ){
    jugadores[jugadorIndex].asignarAtaques(ataques)
  }

  console.log(jugadores[jugadorId.ataques])
  /*
  res.send({
    enemigos
  })
  */
})

app.get("/mokepon/:jugadorId/ataques", (req, res) =>{
  const jugadorId = req.params.jugadorId || ""
  const jugador = jugadores.find((jugador) => jugador.id === jugadorId)

  res.send({
    ataques: jugador.ataques || []
  })
})

app.listen(8080, () =>{
    console.log("Servidor Express funcionando")
})