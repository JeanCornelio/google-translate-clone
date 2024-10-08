import { useEffect, useRef } from 'react'
import './App.css'
import {
  ArrowIcon,
  ClipboardIcon,
  MicrophoneIcon,
  SpeakerIcon
} from './components/Icon'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'

import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { type Language, SectionType } from './types.d'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
import { useTss } from './hooks/useTss'

function App () {
  const {
    fromLanguage,
    setFromLanguage,
    toLanguage,
    setToLanguage,
    interchangeLanguages,
    fromtext,
    setFromText,
    result,
    setResult,
    loading
  } = useStore()

  const buttonRef = useRef(null)
  const { handleTss } = useTss({ toLanguage, setFromText, buttonRef })
  const debouncedFromText = useDebounce(fromtext, 300)
  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null) return

        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })
  }, [debouncedFromText, fromLanguage, toLanguage])
  const handleCLipboard = () => {
    navigator.clipboard.writeText(result as string).catch(() => {})
  }
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result as string)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage as Language]
    speechSynthesis.speak(utterance)
  }

  return (
    <>
      <nav className="pt-10 px-5 flex justify-center">
        <h2 className="text-blue-500 text-2xl font-medium">Google Translate</h2>
      </nav>
      <main>
        <section className="  my-5">
          <article className="flex gap-4 w-full justify-center">
            <div className="w-3/12">
              <form className="flex flex-col gap-2">
                <LanguageSelector
                  type={SectionType.From}
                  value={fromLanguage}
                  onChange={setFromLanguage}
                />
                <div className="relative">
                  <TextArea
                    type={SectionType.From}
                    value={fromtext}
                    onChange={setFromText}
                  ></TextArea>
                  <button
                    className="absolute left-2  bottom-2"
                    ref={buttonRef}
                    type="button"
                    onClick={handleTss}
                  >
                    <MicrophoneIcon />
                  </button>
                </div>
              </form>
            </div>

            <button
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguages}
              className="disabled:opacity-50 flex-none self-start w-14 flex justify-center mt-2"
            >
              <ArrowIcon />
            </button>
            <div className="w-3/12">
              <form className="flex flex-col gap-2">
                <LanguageSelector
                  onChange={setToLanguage}
                  type={SectionType.To}
                  value={toLanguage}
                />
                <div className="relative">
                  <TextArea
                    loading={loading}
                    value={result}
                    onChange={setResult}
                    type={SectionType.To}
                  ></TextArea>
                  <div className="absolute left-2  bottom-2 flex gap-3 ">
                    <button type="button" onClick={handleCLipboard}>
                      <ClipboardIcon />
                    </button>
                    <button type="button" onClick={handleSpeak}>
                      <SpeakerIcon />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </article>
        </section>
      </main>
    </>
  )
}

export default App
