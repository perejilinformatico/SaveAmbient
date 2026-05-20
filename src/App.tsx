import { useEffect, useMemo, useState } from 'react'
import './App.css'
import styled from './lib/styled'

const storageKey = 'saveambient-user-started'

const retosAmbientales = [
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
  '.',
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
