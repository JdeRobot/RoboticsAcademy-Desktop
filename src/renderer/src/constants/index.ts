import { WebSiteIcon, YoutubeIcon, ForumIcon, XIcon, GithubIcon } from '@renderer/assets'

// Settings
export const AllDockersImages = {
  noDockerImage: 'Run Without Docker Image',
  jderobotRoboticsAcademy: 'jderobot/robotics-academy',
  jderobotRoboticsBackend: 'jderobot/robotics-backend'
}

export interface AllCommandConfigureInterface {
  id: number
  default: boolean
  name: string
  command: string[]
  port1: number
  port1_1: number
  port2: number
  port2_2: number
  port3: number
  port3_3: number
  port4: number
  port4_4: number
  image: string
}
export const AllCommandConfigure: AllCommandConfigureInterface[] = [
  {
    id: 1,
    default: true,
    name: 'Basic Command',
    command: [`docker`, `run`, `--rm`, `-it`],
    port1: 7164,
    port1_1: 7164,
    port2: 6080,
    port2_2: 6080,
    port3: 1108,
    port3_3: 1108,
    port4: 7163,
    port4_4: 7163,
    image: `jderobot/robotics-backend`
  },
  {
    id: 2,
    default: true,
    name: 'GPU Acceleration Intel',
    command: [`docker`, `run`, `--rm`, `-it`, `--device`, `/dev/dri`],
    port1: 7164,
    port1_1: 7164,
    port2: 6080,
    port2_2: 6080,
    port3: 1108,
    port3_3: 1108,
    port4: 7163,
    port4_4: 7163,
    image: `jderobot/robotics-backend`
  },
  {
    id: 3,
    default: true,
    name: 'GPU Acceleration Nvidia',
    command: [`docker`, `run`, `--rm`, `-it`, `--gpus`, `all`, `--device`, `/dev/dri`],
    port1: 7164,
    port1_1: 7164,
    port2: 6080,
    port2_2: 6080,
    port3: 1108,
    port3_3: 1108,
    port4: 7163,
    port4_4: 7163,
    image: `jderobot/robotics-backend`
  },
  {
    id: 4,
    default: true,
    name: 'Multiple Gpus',
    command: [
      `docker`,
      `run`,
      `--rm`,
      `-it`,
      `--gpus`,
      `all`,
      `--device`,
      `/dev/dri`,
      `-e`,
      `DRI_NA  ME=card1`
    ],
    port1: 7164,
    port1_1: 7164,
    port2: 6080,
    port2_2: 6080,
    port3: 1108,
    port3_3: 1108,
    port4: 7163,
    port4_4: 7163,
    image: `jderobot/robotics-backend`
  },
  {
    id: 5,
    default: true,
    name: 'Only Ports',
    command: [],
    port1: 7164,
    port1_1: 7164,
    port2: 6080,
    port2_2: 6080,
    port3: 1108,
    port3_3: 1108,
    port4: 7163,
    port4_4: 7163,
    image: ``
  }
]

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
