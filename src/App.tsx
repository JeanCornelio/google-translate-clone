import { useReducer } from 'react'
import './App.css'

const initialState = {
  fromLanguage: 'es',
  toLanguaje: 'en',
  fromtext: '',
  result: '',
  loading: false
}

const reducer = (state, action) => {
  console.log(state, action)

  if (action.type === 'INTERCHANGE_LANGUAGES') {
    return {
      ...initialState,
      fromLanguage: state.toLanguaje,
      toLanguaje: state.fromLanguage
    }
  }
}

function App () {
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log(state)
  const setLanguage = () => {
    dispatch({ payload: state, type: 'INTERCHANGE_LANGUAGES' })
  }

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
            onClick={setLanguage}
            className="border p-2 bg-blue-600 text-white"
          >
            {' '}
            change Idiom
          </button>
          <div>
            <h2>{state?.fromLanguage}</h2>
            <h2>{state?.toLanguaje}</h2>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
