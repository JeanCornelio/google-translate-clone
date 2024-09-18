import { useEffect } from 'react'
import './App.css'
import { ArrowIcon } from './components/Icon'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'

import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { SectionType } from './types.d'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

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

  const debouncedFromText = useDebounce(fromtext, 300)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return

        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })
    /*   return () => {
    second
  } */
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <>
      <nav className="pt-10 px-5 flex justify-center">
        <h2 className="text-blue-500 text-2xl font-medium">
          Google Translate
        </h2>
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
                <TextArea
                  type={SectionType.From}
                  value={fromtext}
                  onChange={setFromText}
                ></TextArea>
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
                <TextArea
                  loading={loading}
                  value={result}
                  onChange={setResult}
                  type={SectionType.To}
                ></TextArea>
              </form>
            </div>
          </article>
        </section>
      </main>
    </>
  )
}

export default App
