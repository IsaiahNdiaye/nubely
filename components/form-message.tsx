import React from 'react'

// Message type for form feedback
export type Message = {
  type: 'error' | 'success'
  text: string
}

// Props for the FormMessage component
interface FormMessageProps {
  message: Message | null
}

// FormMessage component to display error or success messages
export function FormMessage({ message }: FormMessageProps) {
  if (!message) return null

  return (
    <div 
      className={`p-3 rounded-md mt-4 ${
        message.type === 'error' 
          ? 'bg-red-50 text-red-500 border border-red-200' 
          : 'bg-green-50 text-green-500 border border-green-200'
      }`}
    >
      <p className="text-sm">{message.text}</p>
    </div>
  )
} 