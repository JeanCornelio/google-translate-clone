import './App.css'
import { ArrowIcon } from './components/Icon'
import { LanguageSelector } from './components/LanguageSelector'

import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { SectionType } from './types.d'

function App () {
  const {
    fromLanguage,
    setFromLanguage,
    toLanguaje,
    setToLanguage,
    interchangeLanguages
  } = useStore()

  return (
    <>
      <nav className="pt-10 px-5 flex justify-center">
        <span className="text-blue-500 text-2xl font-medium">
          Google Translate
        </span>
      </nav>
      <main>
        <section className="flex justify-center my-5">
          <article className="flex gap-4">
            <div className="">
              <form className="flex flex-col gap-3">
                <LanguageSelector
                  type={SectionType.From}
                  value={fromLanguage}
                  onChange={setFromLanguage}
                />
                <textarea
                  id="romLanguage"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 rounded-lg   focus:ring-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 outline-none"
                  placeholder="Enter the text"
                  autoFocus
                ></textarea>
              </form>
            </div>

            <button
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguages}
              className="disabled:opacity-50 flex-none self-start w-14 flex justify-center mt-2"
            >
              <ArrowIcon />
            </button>
            <div className="">
              <form className="flex flex-col gap-3">
                <LanguageSelector
                  onChange={setToLanguage}
                  type={SectionType.To}
                  value={toLanguaje}
                />
                <textarea
                  id="romLanguage"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-400 bg-gray-300 rounded-lg     dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white outline-none disabled"
                  disabled
                  placeholder="Translation"
                ></textarea>
              </form>
            </div>
          </article>
        </section>
      </main>
    </>
  )
}

export default App
