import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyle = 'block p-2.5 w-full text-sm text-gray-400 rounded-lg  dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white outline-none resize-none'

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) { return 'Enter the text' }
  if (loading === true) { return 'Loading...' }
  return 'Translation'
}

export const TextArea = ({ type, loading, onChange, value }: Props) => {
  const style = type === SectionType.From
    ? commonStyle
    : `${commonStyle} disabled bg-gray-300`

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event?.target.value)
  }

  return (
    <textarea
      id="romLanguage"
      rows={4}
      className={style}
      disabled={type === SectionType.To}
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      value={value}
      onChange={handleChange}
    ></textarea>
  )
}
