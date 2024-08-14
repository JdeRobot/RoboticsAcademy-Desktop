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
    link: 'https://jderobot.github.io/'
  },
  {
    id: 'forum',
    icon: ForumIcon,
    link: 'https://unibotics.org/'
  },
  {
    id: 'x',
    icon: XIcon,
    link: 'https://twitter.com/jderobot'
  },
  {
    id: 'github',
    icon: GithubIcon,
    link: 'https://github.com/JdeRobot'
  },
  {
    id: 'youtube',
    icon: YoutubeIcon,
    link: 'https://www.youtube.com/channel/UCgmUgpircYAv_QhLQziHJOQ/videos'
  }
]
