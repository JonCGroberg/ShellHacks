import type { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

interface AstroLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

const AstroLink: FunctionComponent<AstroLinkProps> = ({ href, className = '', children }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const checkIfActive = () => {
      setIsActive(window.location.pathname === href)
    }

    checkIfActive()

    window.addEventListener('astro:after-navigation', checkIfActive)

    return () => {
      window.removeEventListener('astro:after-navigation', checkIfActive)
    }
  }, [href])

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const astroInstance = (window as any).Astro
    if (astroInstance && typeof astroInstance.navigate === 'function') {
      astroInstance.navigate(href)
    } else {
      window.location.href = href
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`text-gray-600 hover:text-orange-500 transition-colors duration-200 ${
        isActive ? 'font-bold text-orange-500' : ''
      } ${className}`}
    >
      {children}
    </a>
  )
}

export default AstroLink

// Usage example
export const Navigation: FunctionComponent = () => {
  return (
    <nav className="flex space-x-4">
      <AstroLink href="/">Home</AstroLink>
      <AstroLink href="/about">About</AstroLink>
      <AstroLink href="/contact">Contact</AstroLink>
    </nav>
  )
}