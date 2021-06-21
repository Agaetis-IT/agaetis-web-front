import Button from './Button'

export default function BottomNav() {
  const links = [
    { title: 'Contact', href: '/contact' },
    { title: 'Données personnelles', href: '/personal-data' },
    { title: 'Mentions légales', href: '/mentions-legales' },
  ]
  return (
    <nav className="flex flex-col md:flex-row text-center justify-between max-w-full">
      {links.map((link) => (
        <Button
          href={link.href}
          key={link.title}
          className="text-white my-4 md:my-0 underline text-sm font-extralight leading-normal"
        >
          {link.title}
        </Button>
      ))}
    </nav>
  )
}
