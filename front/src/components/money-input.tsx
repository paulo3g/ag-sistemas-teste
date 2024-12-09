import React from 'react'

import { Input } from '@/components/ui/input'

interface MoneyInputProps {
  id?: string
  value: string | number | undefined
  onChange: (value: string) => void
  placeholder?: string
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
  id = '',
  value = '',
  onChange,
  placeholder = 'R$ 0,00',
}) => {
  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, '')

    return (Number(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    onChange(formatCurrency(inputValue))
  }

  return (
    <Input
      id={id}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  )
}
