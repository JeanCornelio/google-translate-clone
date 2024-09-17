import { useReducer } from 'react'
import {
  type Language,
  type Action,
  type State,
  type FromLanguage
} from '../types'
import { AUTO_LANGUAGE } from '../constants'

const initialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromtext: '',
  result: '',
  loading: false
}

const reducer = (state: State, action: Action) => {
  console.log(state, action)
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromtext !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state
    const loading = state.fromtext !== ''
    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = state.fromtext !== ''
    return {
      ...state,
      fromtext: action.payload,
      result: '',
      loading
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
  const [{ fromLanguage, toLanguage, fromtext, result, loading }, dispatch] =
    useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

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
    toLanguage,
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
