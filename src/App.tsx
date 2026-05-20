import { useEffect, useMemo, useState } from 'react'
import './App.css'
import styled from './lib/styled'

const storageKey = 'saveambient-user-started'

const retosAmbientales = [
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
]

function App() {
  const [usuarioTocoBoton, setUsuarioTocoBoton] = useState(
    () => localStorage.getItem(storageKey) === 'true',
  )
  const [seDesvanece, setSeDesvanece] = useState(false)
  const [mostrarReto, setMostrarReto] = useState(false)

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

  const handleVerMas = () => {
    setSeDesvanece(true)

    window.setTimeout(() => {
      localStorage.setItem(storageKey, 'true')
      setUsuarioTocoBoton(true)
    }, 650)
  }

  return (
    <Page>
      {usuarioTocoBoton ? (
        <Principio $mostrar={mostrarReto}>
          <Logo src="/favicon.png" alt="Logo SaveAmbient" />
          <Eyebrow>Tu reto ambiental de hoy</Eyebrow>
          <Reto>{retoDelDia}</Reto>
        </Principio>
      ) : (
        <Inicio $seDesvanece={seDesvanece}>
          <Logo src="/favicon.png" alt="Logo SaveAmbient" />
          <Frase>Hoy el planeta necesita menos plastico.</Frase>
          <VerMasButton type="button" onClick={handleVerMas}>
            VER MAS
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
