import { useReducer } from 'react'
import { type Language, type Action, type State, type FromLanguage } from '../types'

const initialState = {
  fromLanguage: 'auto',
  toLanguaje: '',
  fromtext: '',
  result: '',
  loading: false
}

const reducer = (state: State, action: Action) => {
  console.log(state, action)
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    return {
      ...state,
      fromLanguage: state.toLanguaje,
      toLanguaje: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguaje: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromtext: action.payload,
      result: ''
    }
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: true,
      result: action.payload
    }
  }

  return state
}

export function useStore () {
  const [{ fromLanguage, toLanguaje, fromtext, result, loading }, dispatch] =
    useReducer(reducer, initialState)

  const interchangeLanguages = () => { dispatch({ type: 'SET_FROM_LANGUAGE' }) }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }
  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }
  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }
  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    toLanguaje,
    fromtext,
    result,
    loading,
    setFromLanguage,
    interchangeLanguages,
    setToLanguage,
    setFromText,
    setResult
  }
}
