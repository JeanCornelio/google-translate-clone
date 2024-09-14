import './App.css'
import { SUPPORTED_LANGUAGES } from './constants'
import { useStore } from './hooks/useStore'

function App () {
  const { fromLanguage, setFromLanguage } = useStore()

  return (
    <>
      <nav className="pt-10 px-5 flex justify-center">
        <span className="text-blue-500 text-2xl font-medium">
          Google Translate
        </span>
      </nav>
      <main>
        <section className="flex justify-center my-5">
          <button
            onClick={() => { setFromLanguage('es') }}
            className="border p-2 bg-blue-600 text-white"
          >

            change to spanish
          </button>
          <div>
            <h2>{fromLanguage}</h2>

          </div>
        </section>
      </main>
    </>
  )
}

export default App
