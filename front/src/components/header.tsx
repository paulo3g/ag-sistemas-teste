import { Package2Icon } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <h1 className="text-2xl font-bold tracking-widest text-primary">AG</h1>

        <Separator orientation="vertical" className="h-6" />

        <nav className="lg:space-6 flex items-center space-x-4">
          <NavLink to="/products">
            <Package2Icon className="h-4 w-4" />
            Produtos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
