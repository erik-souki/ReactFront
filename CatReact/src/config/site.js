import {
  Calendar,
  Heart,
  LogIn,
  MessageCircle,
  Palette,
  PlusCircle,
  Search,
  Tag,
} from 'lucide-react'

export const appRoutes = {
  home: '/',
  catDetails: 'gatos/:id',
  login: 'login',
  register: 'cadastro',
  registerCat: 'cadastrar-gato',
}

export const navItems = [
  { to: appRoutes.home, label: 'Início', end: true },
  { to: `/${appRoutes.registerCat}`, label: 'Colocar para adoção' },
]

export const desktopActionItems = [
  { to: `/${appRoutes.login}`, label: 'Entrar', icon: LogIn, variant: 'ghost' },
  {
    to: `/${appRoutes.register}`,
    label: 'Cadastrar',
    icon: PlusCircle,
    variant: 'primary',
  },
]

export const mobileActionItems = [
  { to: `/${appRoutes.login}`, label: 'Entrar' },
  { to: `/${appRoutes.register}`, label: 'Cadastrar', primary: true },
]

export const footerLinks = [
  { to: appRoutes.home, label: 'Adotar' },
  { to: `/${appRoutes.registerCat}`, label: 'Cadastrar gato' },
  { to: `/${appRoutes.login}`, label: 'Login' },
]

export const homeSteps = [
  {
    icon: Search,
    title: 'Encontre',
    description: 'Navegue por perfis de gatos disponíveis perto de você com filtros simples.',
  },
  {
    icon: MessageCircle,
    title: 'Converse',
    description: 'Fale com o tutor responsável e entenda a rotina, cuidados e personalidade.',
  },
  {
    icon: Heart,
    title: 'Adote',
    description: 'Finalize a adoção com segurança e ofereça um novo lar cheio de carinho.',
  },
]

export const detailCards = [
  { key: 'age', label: 'Idade', icon: Calendar },
  { key: 'breed', label: 'Raça', icon: Tag },
  { key: 'color', label: 'Cor', icon: Palette },
  { key: 'gender', label: 'Sexo', icon: Heart },
]

export const homeSearchFields = ['name', 'breed', 'city']
