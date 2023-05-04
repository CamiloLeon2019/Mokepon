const express = require("express")
const cors = require("cors")
const jugadores = []
const app = express()

app.use(cors())
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
}

class Mokepon {
  constructor(nombre){
    this.nombre = nombre
  }

}

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
    
    console.log(jugadores)
    console.log(jugadorId)
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


app.listen(8080, () =>{
    console.log("Servidor Express funcionando")
})