import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerUser } from '@/api/auth/register-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpSchema = z
  .object({
    name: z.string().min(1, 'Informe um nome'),
    email: z.string().email('Informe um e-mail válido'),
    password: z
      .string({ message: 'Informe uma senha' })
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string({ message: 'Repita sua senha' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUp() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerUser,
  })

  async function handleSignUp(data: SignUpSchema) {
    try {
      await registerRestaurantFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      toast.success('Usuário cadastrado com sucesso.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
      reset()
    } catch (error) {
      if (isAxiosError(error)) {
        const description = error.response?.data?.message || error.message

        toast.error('Erro ao cadastrar usuário.', { description })
        return
      }

      toast.error('Ops! Ocorreu um erro inesperado, informe ao suporte.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button className="absolute right-4 top-8" variant="ghost" asChild>
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Crie uma conta para começar a usar o sistema.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="name">
                Seu nome <span className="text-red-600">*</span>
              </Label>
              <Input id="name" {...register('name')} />

              {errors?.name && (
                <p className="text-sm font-medium text-destructive">
                  {errors?.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Seu e-mail <span className="text-red-600">*</span>
              </Label>
              <Input type="email" id="email" {...register('email')} />

              {errors?.email && (
                <p className="text-sm font-medium text-destructive">
                  {errors?.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Sua senha <span className="text-red-600">*</span>
              </Label>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password')}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Esconder senha' : 'Mostrar senha'}
                  </span>
                </Button>
              </div>

              {errors?.password && (
                <p className="text-sm font-medium text-destructive">
                  {errors?.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirmar senha <span className="text-red-600">*</span>
              </Label>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...register('confirmPassword')}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? 'Esconder senha' : 'Mostrar senha'}
                  </span>
                </Button>
              </div>

              {errors?.confirmPassword && (
                <p className="text-sm font-medium text-destructive">
                  {errors?.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2Icon className="animate-spin" />}
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="underline underline-offset-4">
                Termos de serviço
              </a>{' '}
              e{' '}
              <a href="#" className="underline underline-offset-4">
                políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
