import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/auth/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z
    .string({ message: 'Informe uma senha' })
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: searchParams.get('email') ?? '' },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInSchema) {
    try {
      await authenticate({ email: data.email, password: data.password })

      navigate('/products')
    } catch (error) {
      if (isAxiosError(error)) {
        const description = error.response?.data?.message || error.message

        toast.error('Erro ao fazer login.', { description })
        return
      }

      toast.error('Ops! Ocorreu um erro inesperado, informe ao suporte.')
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button className="absolute right-4 top-8" variant="ghost" asChild>
          <Link to="/sign-up">Novo usuário</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acesse o nosso painel de parceiro.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2Icon className="animate-spin" />}
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
