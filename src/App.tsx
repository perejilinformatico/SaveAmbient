import { type ChangeEvent, useEffect, useMemo, useState } from 'react'
import './App.css'
import styled from './lib/styled'
import { User } from 'lucide-react'

const storageKey = 'saveambient-user-started'
const usernameStorageKey = 'saveambient-username'

const retosAmbientales = [
  'Unete a un grupo de Telegram o WhatsApp que cuide el medio ambiente',
  'Crea con una botella de plastico y algun granulo, una maraca.',
  'Crea con una botella de plastico y algodon, un ojo de pescado.',
  'Crea con una caja de carton algo divertido.',
  'Crea con una caja de carton algo util.',
  'Crea con un envase de yogurt algo util.',
  'Crear con un envase de leche algo util.',
  'Hoy evita comprar una botella descartable y lleva agua desde casa.',
  'Separa papel, carton, plastico y vidrio antes de tirar la basura.',
  'Apaga las luces de una habitacion que no estes usando.',
  'Junta tres residuos que veas en tu cuadra y tiralos donde corresponde.',
  'Usa una bolsa reutilizable en vez de pedir una nueva.',
  'Elegi una comida sin envoltorios innecesarios.',
  'Cerra la canilla mientras te lavas los dientes.',
  'Desenchufa un cargador que no este cargando nada.',
  'Camina, anda en bici o usa transporte publico si podes.',
  'Reutiliza un frasco, caja o bolsa antes de descartarlo.',
  'Comparti un consejo ambiental simple con alguien cercano.',
  'Compra solo lo que necesitas para evitar desperdicio.',
  'Rega una planta con agua reutilizada si tenes disponible.',
  'Revisa si algo que ibas a tirar se puede reparar.',
  'Evita sorbetes, cubiertos o vasos de un solo uso.',
  'Deja una prenda lista para donar en vez de tirarla.',
  'Hace una ducha un poco mas corta que de costumbre.',
  'Guarda sobras de comida para aprovecharlas despues.',
  'Elegi un producto local para reducir transporte innecesario.',
  'Limpia una app, mail o archivo que ya no necesitas para reducir consumo digital.',
  'Usa un reloj digital en vez de uno analogico.',
  'Usa un termo en vez de una botella de plastico.',
  'Usa un paño en vez de toallitas desechables.',
  'Usa un cepillo de dientes reutilizable.',
  'Usa un secador de pelo con temporizador.',
  'Come por todo el dia comida local y de temporada.',
  'Usa un asiento de madera en vez de uno de plastico.',
  'Preguntale a la gente lo que opina sobre el calentamiento global.',
  'Segui en instagram al menos 2 cuentas ambientales.',
  'Segui en twitter al menos 2 cuentas ambientales.',
  'Segui en facebook al menos 2 cuentas ambientales.',
  'Segui en tiktok al menos 2 cuentas ambientales.',
  'Transforma una lata limpia en una maceta pequena.',
  'Crea un comedero para pajaros con materiales reutilizados.',
  'Hace una pulsera o llavero con tapitas limpias.',
  'Usa una caja vieja para organizar cables y evitar comprar un organizador nuevo.',
  'Convierte un frasco en un recipiente para guardar semillas.',
  'Diseña una etiqueta para separar reciclables en casa.',
  'Hace una alcancia con un envase que ya este vacio.',
  'Arma una mini huerta con una botella cortada.',
  'Crea un portalapices usando rollos de carton.',
  'Hace una libreta con hojas usadas de un solo lado.',
  'Convierte una remera vieja en una bolsa simple.',
  'Arma un juguete con carton antes de comprar uno nuevo.',
  'Decora una maceta reutilizada con restos de papel o tela.',
  'Crea una compostera chica con un recipiente que ya tengas.',
  'Hace un separador de libros con carton reciclado.',
  'Transforma un envase en regadera haciendo agujeros pequenos en la tapa.',
  'Crea un cartel ambiental para pegar cerca de la luz o la canilla.',
  'Junta tapitas durante una semana y averigua donde donarlas.',
  'Hace una lampara decorativa con un frasco y una luz reutilizable.',
  'Arma un juego de memoria con carton reciclado.',
  'Convierte una caja en una casita para guardar objetos pequenos.',
  'Hace papel plantable con papel usado y semillas.',
  'Crea un collage con envoltorios limpios antes de tirarlos.',
  'Transforma una media rota en trapo de limpieza.',
  'Usa restos de tela para envolver un regalo sin papel nuevo.',
  'Hace un mini diario ambiental y anota una accion buena del dia.',
  'Crea un sistema de puntos para premiar habitos sostenibles en casa.',
  'Dibuja un mapa de tu casa marcando donde se desperdicia energia.',
  'Arma una caja de reparaciones con hilo, cinta, botones y pegamento.',
  'Convierte un bidon vacio en pala para tierra o arena.',
  'Hace una regadera temporal reutilizando una botella.',
  'Crea un organizador de escritorio con envases limpios.',
  'Arma un mural con ideas para reducir plastico esta semana.',
  'Hace una carrera de cinco minutos para apagar luces innecesarias.',
  'Crea una cancion corta sobre reciclar y cantala mientras ordenas.',
  'Diseña una medalla con carton para alguien que hizo una accion ambiental.',
  'Transforma un sobre usado en una bolsita para semillas.',
  'Hace etiquetas reutilizables cortando carton de cajas viejas.',
  'Crea un reto familiar: un dia entero sin botellas descartables.',
  'Arma un mini invernadero con una botella transparente.',
  'Hace una decoracion con hojas caidas sin arrancar plantas.',
  'Crea una lista de compras anti-desperdicio antes de salir.',
  'Organiza una busqueda del tesoro para encontrar objetos reutilizables.',
  'Convierte una caja de huevos en semillero.',
  'Hace un portacelular con carton reciclado.',
  'Crea un recordatorio visual para llevar bolsa reutilizable.',
  'Arma un frasco de ideas ambientales y saca una por semana.',
  'Hace una escultura pequena con residuos limpios.',
  'Crea un calendario de retos ambientales para siete dias.',
  'Transforma un envase en una cajita para guardar botones o monedas.',
  'Crea una corona con hojas caidas y carton reutilizado.',
  'Arma una estacion de carga para celulares con una caja vieja.',
  'Hace un robot con tapitas, cajas y tubos de carton.',
  'Convierte una botella en un atrapa-lapices para tu escritorio.',
  'Crea una historieta corta donde el planeta sea el protagonista.',
  'Diseña una bandera ambiental con papel reutilizado.',
  'Hace un marcador de paginas con un envase de carton.',
  'Arma un mini museo de objetos reciclados en una mesa.',
  'Crea una ruleta de retos ambientales con carton y un broche.',
  'Transforma una botella chica en un sonajero para jugar.',
  'Hace una flor con tapitas y palitos reutilizados.',
  'Crea una ciudad miniatura usando cajas de remedios o alimentos.',
  'Arma una torre con materiales reciclados y sacale una foto.',
  'Hace un marco para fotos con carton y recortes limpios.',
  'Convierte una lata en un portalapices con papel reutilizado.',
  'Crea una mascara divertida con carton antes de tirarlo.',
  'Diseña stickers caseros con frases para cuidar el ambiente.',
  'Hace un dado de retos ambientales con una caja pequena.',
  'Arma un bingo ambiental para jugar con familia o amigos.',
  'Crea una trivia de cinco preguntas sobre reciclaje.',
  'Hace una entrevista corta a alguien sobre como cuida el planeta.',
  'Graba un audio de diez segundos contando un consejo ambiental.',
  'Crea un slogan ambiental y pegalo cerca de tu mochila.',
  'Hace un dibujo de tu barrio con mas arboles y menos basura.',
  'Inventate un superheroe ambiental y dibuja su poder.',
  'Arma una capsula del tiempo con una promesa ambiental.',
  'Crea una tarjeta de agradecimiento para alguien que recicla.',
  'Hace una cadena de papel con compromisos ambientales.',
  'Transforma una caja en un cofre para guardar reciclables pequenos.',
  'Crea un semaforo ambiental: verde, amarillo y rojo para tus habitos.',
  'Hace una lista de objetos que podrias pedir prestados en vez de comprar.',
  'Arma una zona sin plastico por una tarde en tu casa.',
  'Cambia un snack con paquete por una fruta o comida casera.',
  'Prepara agua saborizada casera para evitar una bebida embotellada.',
  'Crea un menu de un dia usando comida que ya haya en casa.',
  'Hace una revision express de la basura y busca que se puede reducir.',
  'Guarda un envase lindo para usarlo como organizador.',
  'Arma un rincon verde con una planta, semilla o brote.',
  'Crea un cartel para recordar usar ambos lados del papel.',
  'Hace una competencia sana: quien junta mas reciclables limpios.',
  'Inventate una regla de oro ambiental para tu semana.',
  'Crea un nombre divertido para tu botella reutilizable.',
  'Decora tu bolsa reutilizable para que te den ganas de llevarla.',
  'Hace una caminata sin auriculares y escucha los sonidos de la naturaleza.',
  'Busca sombra natural antes de prender ventilador o aire.',
  'Abri cortinas y aprovecha luz natural durante una hora.',
  'Ordena tus reciclables por color como si fuera un juego.',
  'Crea una mision secreta: evitar tres plasticos en un dia.',
  'Hace un mapa de puntos verdes de tu barrio.',
  'Busca donde llevar pilas, aceite usado o electronicos cerca de casa.',
  'Crea una caja de donacion con ropa, juguetes o utiles que ya no uses.',
  'Transforma una botella grande en una pala para macetas.',
  'Hace una mini regadera con una botella y usala una vez.',
  'Crea una maceta colgante con una botella resistente.',
  'Arma un cartel para tu planta con su nombre y cuidados.',
  'Hace un experimento: mide cuanta basura generas en una tarde.',
  'Crea una promesa ambiental de una sola frase y cumplila hoy.',
  'Dibuja tres formas de usar menos agua en casa.',
  'Hace una limpieza digital: borra fotos repetidas o archivos pesados.',
  'Apaga notificaciones por una hora para usar menos pantalla.',
  'Carga el celular solo hasta lo necesario y desenchufa el cargador.',
  'Revisa si podes reutilizar una bolsa antes de buscar otra.',
  'Crea un kit de salida: botella, bolsa y servilleta reutilizable.',
  'Hace una busqueda de tesoro: encontra cinco cosas reutilizables.',
  'Arma un mini taller para reparar algo chiquito.',
  'Crea un premio casero para quien complete un reto ambiental.',
  'Hace una lista de deseos sin comprar nada nuevo esta semana.',
  'Transforma una caja en un teatro de sombras.',
  'Crea personajes con corchos, tapitas o rollos de carton.',
  'Hace un instrumento con materiales reutilizados y proba su sonido.',
  'Arma un juego de bolos con botellas vacias.',
  'Crea una pista de autos con carton reciclado.',
  'Hace una obra de arte usando solo residuos limpios.',
  'Convierte diarios o revistas viejas en papel para envolver.',
  'Crea una guirnalda con papel usado de ambos lados.',
  'Hace una mini biblioteca de intercambio con libros que ya leiste.',
  'Arma una caja de trueque para amigos o familia.',
  'Crea un ranking casero de acciones ambientales de la semana.',
  'Hace un cartel que diga: antes de tirar, pensa si se reutiliza.',
  'Transforma una caja pequena en un buzón de ideas ambientales.',
  'Crea una mision de silencio: diez minutos sin aparatos encendidos.',
  'Hace una tarde sin compras impulsivas.',
  'Busca una forma creativa de reutilizar una bolsa rota.',
  'Crea una lupa de carton para mirar detalles de hojas caidas.',
  'Hace una coleccion de texturas naturales sin arrancar plantas.',
  'Arma una mini exposicion con cosas hechas de reciclaje.',
  'Crea un reto doble: ahorrar agua y luz en la misma tarde.',
  'Hace un dibujo antes y despues de un lugar mas limpio.',
  'Inventate una palabra nueva para un habito ambiental.',
  'Crea una postal ambiental para regalar sin comprar nada.',
  'Transforma una caja en organizador para reciclaje escolar.',
  'Hace un cartel de bienvenida para tu rincon de reciclaje.',
  'Arma un contador de dias sin botellas descartables.',
  'Crea una mision: que nada reciclable termine en basura comun hoy.',
  'Crea un juego de preguntas sobre el reciclaje con tu familia o amigos.',
  'Crea un video corto contando por que reciclar es importante.',
  'Crear un podcast casero sobre el reciclaje.',
  'Transformar una botella, carton o otro material reciclable en un objeto de uso cotidiano',
  'Crear un mural con consejos de reciclaje para la casa, con materiables reciclados',
  'Crear un juego de cartas con materiales reciclables y ganar en el mismo',
  'Crear un silvato con un popote reciclable',
  'Crear un juego de mesa con materiales reciclables',
  'Crear una mini ciudad con materiales reciclables',
  'Crear una maqueta de un edificio sostenible con materiales reciclables',
  'Crear una maqueta de un vehiculo electrico con materiales reciclables',
  'Crear una maqueta de un parque eolico con materiales reciclables',
  'Crear una maqueta de un parque solar con materiales reciclables',
  'Jugar a un videojuego ambiental',
  'Hacer una actividad de manualidades con materiales reciclables',
  'Hacer una maseta para las plantas con materiables reciclables',
  'Regar las plantas que aun no allas regado hoy',
  'Dormir con las luces apagadas por la noche'
]

function App() {
  const [usuarioTocoBoton, setUsuarioTocoBoton] = useState(
    () => localStorage.getItem(storageKey) === 'true',
  )
  const [seDesvanece, setSeDesvanece] = useState(false)
  const [mostrarReto, setMostrarReto] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [nombreUsuario, setNombreUsuario] = useState(
    () => localStorage.getItem(usernameStorageKey) || 'Usuario',
  )

  const retoDelDia = useMemo(() => {
    const posicionAleatoria = Math.floor(Math.random() * retosAmbientales.length)

    return retosAmbientales[posicionAleatoria]
  }, [])

  useEffect(() => {
    if (usuarioTocoBoton) {
      const timer = window.setTimeout(() => setMostrarReto(true), 120)

      return () => window.clearTimeout(timer)
    }

    setMostrarReto(false)
  }, [usuarioTocoBoton])

  useEffect(() => {
    localStorage.setItem(usernameStorageKey, nombreUsuario)
  }, [nombreUsuario])

  useEffect(() => {
    if (!usuarioTocoBoton) setMenuAbierto(false)
  }, [usuarioTocoBoton])

  const handleVerMas = () => {
    setSeDesvanece(true)

    window.setTimeout(() => {
      localStorage.setItem(storageKey, 'true')
      setUsuarioTocoBoton(true)
    }, 650)
  }

  const handleCafe = () => {
    alert('Alias: santiago.395.tour.mp')
  }
  return (
    <Page>
      {usuarioTocoBoton ? (
        <>
          <TopRight>
            <IconButton
              type="button"
              aria-label="Abrir menu de usuario"
              onClick={() => setMenuAbierto(true)}
            >
              <User size={20} />
            </IconButton>
          </TopRight>

          {menuAbierto ? (
            <Overlay role="dialog" aria-modal="true" aria-label="Menu de usuario">
              <OverlayHeader>
                <OverlayTitle>Usuario</OverlayTitle>
              </OverlayHeader>

              <Field>
                <Label>Nombre</Label>
                <Input
                  value={nombreUsuario}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNombreUsuario(e.target.value)
                  }
                  placeholder="Tu nombre"
                />
                <Button type="button" onClick={() => setMenuAbierto(false)}>
                  Guardar
                </Button>
              </Field>
            </Overlay>
          ) : null}

          <Principio $mostrar={mostrarReto}>
            <Logo src="/favicon.png" alt="Logo SaveAmbient" />
            <Eyebrow>Tu reto ambiental de hoy</Eyebrow>
            <Reto>{retoDelDia}</Reto>
            <CafeButton type="button" onClick={handleCafe}>
              Se acepta Cafecito
            </CafeButton>
          </Principio>
        </>
      ) : (
        <Inicio $seDesvanece={seDesvanece}>
          <Logo src="/favicon.png" alt="Logo SaveAmbient" />
          <Frase>Hoy el planeta necesita menos plastico.</Frase>
          <VerMasButton type="button" onClick={handleVerMas}>
            ENTRAR
          </VerMasButton>
        </Inicio>
      )}
    </Page>
  )
}

export default App

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f8fff3;
  color: #12332c;
  position: relative;
`

const TopRight = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const IconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 0;
  background: rgb(255 255 255 / 80%);
  color: #12332c;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 24px rgb(18 51 44 / 12%);
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #f8fff3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 50;
`

const OverlayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const OverlayTitle = styled.p`
  margin: 0;
  font-weight: 800;
  font-size: 1.1rem;
`

const Field = styled.div`
  width: min(100%, 520px);
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
`

const Input = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgb(18 51 44 / 20%);
  padding: 0 12px;
  font: inherit;
  background: white;
  color: #12332c;
`

const Inicio = styled.section<{ $seDesvanece: boolean }>`
  width: min(100%, 520px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
  opacity: ${({ $seDesvanece }) => ($seDesvanece ? 0 : 1)};
  transform: ${({ $seDesvanece }) => ($seDesvanece ? 'translateY(-12px)' : 'translateY(0)')};
  transition: opacity 650ms ease, transform 650ms ease;
`

const Principio = styled.section<{ $mostrar: boolean }>`
  width: min(100%, 620px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
  opacity: ${({ $mostrar }) => ($mostrar ? 1 : 0)};
  transform: ${({ $mostrar }) => ($mostrar ? 'translateY(0)' : 'translateY(16px)')};
  transition: opacity 800ms ease, transform 800ms ease;
`

const Logo = styled.img`
  width: min(70vw, 300px);
  height: auto;
  margin: 20px;
`

const Frase = styled.p`
  margin: 0;
  font-size: clamp(1.05rem, 3vw, 1.20rem);
  line-height: 1.5;
`

const Eyebrow = styled.p`
  margin: 0;
  color: #3c8c4a;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

const Reto = styled.p`
  margin: 0;
  max-width: 520px;
  font-size: clamp(1.35rem, 5vw, 2.5rem);
  font-weight: 750;
  line-height: 1.18;
`

const VerMasButton = styled.button`
  min-width: 156px;
  min-height: 56px;
  border: 0;
  border-radius: 999px;
  padding: 16px 28px;
  background: #22c55e;
  color: white;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
  box-shadow: 0 12px 28px rgb(34 197 94 / 25%);
`

const CafeButton = styled.button`
  min-width: 156px;
  min-height: 56px;
  border: 0;
  border-radius: 999px;
  padding: 16px 28px;
  background: #8b4513;
  color: white;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
  box-shadow: 0 12px 28px rgb(139 69 19 / 25%);
`
const Button = styled.button`
  min-width: 156px;
  min-height: 56px;
  border: 0;
  border-radius: 999px;
  padding: 16px 28px;
  background: #22c55e;
  color: white;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  padding: 12px 24px;
  transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
  box-shadow: 0 12px 28px rgb(34 197 94 / 25%);
`
