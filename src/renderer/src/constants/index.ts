import { WebSiteIcon, YoutubeIcon, ForumIcon, XIcon, GithubIcon } from '@renderer/assets'

// Social Links
interface socialLinksInterface {
  id: string
  icon: string
  link: string
}
export const socialLinks: socialLinksInterface[] = [
  {
    id: 'website',
    icon: WebSiteIcon,
    link: 'https://github.com/pizzusoft/pdify/'
  },
  {
    id: 'forum',
    icon: ForumIcon,
    link: 'https://github.com/pizzusoft/pdify/'
  },
  {
    id: 'x',
    icon: XIcon,
    link: 'https://github.com/pizzusoft/pdify/'
  },
  {
    id: 'github',
    icon: GithubIcon,
    link: 'https://github.com/pizzusoft/pdify/'
  },
  {
    id: 'website',
    icon: YoutubeIcon,
    link: 'https://github.com/pizzusoft/pdify/'
  }
]
