import type React from 'react'
import { VOICE_FOR_LANGUAGE } from '../constants'
import {
  type Language

} from '../types'

interface Props { toLanguage: Language, buttonRef: React.RefObject<HTMLButtonElement>, setFromText: (FromText: string) => void }

interface SpeechRecognitionEvent {
  results: {
    [key: number]: SpeechRecognitionResult
    length: number
  }
}

export const useTss = ({ toLanguage, setFromText, buttonRef }: Props) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.continuous = false
  recognition.lang = VOICE_FOR_LANGUAGE[toLanguage]
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  const handleButtonRefStyle = (color: string, disabled: boolean) => {
    buttonRef.current.children[0]?.setAttribute('fill', color)
    buttonRef.current.disabled = disabled
  }

  const handleTss = () => {
    recognition.start(1000)
    handleButtonRefStyle('red', true)
  }

  recognition.onspeechend = function () {
    recognition.stop()
  }

  recognition.onend = function () {
    handleButtonRefStyle('black', false)
  }

  recognition.onresult = function (event: SpeechRecognitionEvent) {
    const transcription = event.results[0][0].transcript
    setFromText(transcription)
  }
  return {
    handleTss

  }
}
