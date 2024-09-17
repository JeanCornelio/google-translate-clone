import { type FromLanguage, ChatCompletionRequestMessage, type Language } from '../types.d'

import { SUPPORTED_LANGUAGES } from '../constants'
import { CohereClient } from 'cohere-ai'

const token = import.meta.env.VITE_COHERE_API_KEY

const cohere = new CohereClient({ token })

export async function translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text
  const messages = [
    {
      role: ChatCompletionRequestMessage.Tool,
      message: 'You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}` You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[`and`]]`. '
    },
    {
      role: ChatCompletionRequestMessage.User,
      message: 'Hola mundo {{Español}} [[English]]'
    },
    {
      role: ChatCompletionRequestMessage.Chatbot,
      message: 'Hellow world'
    },
    {
      role: ChatCompletionRequestMessage.User,
      message: 'How are you? {{auto}} [[Deutsch]]'
    },
    {
      role: ChatCompletionRequestMessage.Chatbot,
      message: 'Wie geht es dir?'
    },
    {
      role: ChatCompletionRequestMessage.User,
      message: 'Bon dia, com estas ? {{auto}} [[Español]]'
    },
    {
      role: ChatCompletionRequestMessage.Chatbot,
      message: 'Buenos días,  ¿Cómo estás?'
    },
    {
      role: ChatCompletionRequestMessage.User,
      message: 'quelle heure est-il? {{auto}} [[Italiano]]'
    },
    {
      role: ChatCompletionRequestMessage.Chatbot,
      message: 'Che ore sono?'
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  // Create validation
  const chat = await cohere.chat({
    chatHistory: [
      ...messages
    ],
    message: `${text} {{${fromCode}}} [[${toCode}]]`
  })
  return chat.text
}
