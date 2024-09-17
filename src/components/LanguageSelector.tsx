import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
| { type: SectionType.From, value: FromLanguage, onChange: (Language: FromLanguage) => void }
| { type: SectionType.To, value: Language, onChange: (Language: Language) => void }

export const LanguageSelector = ({ onChange, value, type }: Props) => {
  const handleChage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    onChange(event.target.value as Language)
  }

  return (

      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChage} value={value}>
        {type === SectionType.From && <option value= {AUTO_LANGUAGE}>Detecting idiom</option>}
        {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (

          <option key={key} value={key}>
            {literal}
          </option>
        ))}
      </select>

  )
}
