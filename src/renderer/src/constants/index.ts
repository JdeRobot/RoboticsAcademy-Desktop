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
  django: {
    name: string
    ports: number[]
  }
  gazebo: {
    name: string
    ports: number[]
  }
  consoles: {
    name: string
    ports: number[]
  }
  other: {
    name: string
    ports: number[]
  }
}
export const AllCommandConfigure: AllCommandConfigureInterface[] = [
  {
    id: 1,
    default: true,
    name: 'Basic Command',
    command: [`docker`, `run`, `--rm`, `-it`],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
  },
  {
    id: 2,
    default: true,
    name: 'GPU Acceleration Intel',
    command: [`docker`, `run`, `--rm`, `-it`, `--device`, `/dev/dri`],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
  },
  {
    id: 3,
    default: true,
    name: 'GPU Acceleration Nvidia',
    command: [`docker`, `run`, `--rm`, `-it`, `--gpus`, `all`, `--device`, `/dev/dri`],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
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
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [7163, 7163]
    }
  },
  {
    id: 5,
    default: true,
    name: 'Only Ports',
    command: [],
    django: {
      name: 'django',
      ports: [7164, 7164]
    },
    gazebo: {
      name: 'gazebo',
      ports: [6080, 6080]
    },
    consoles: {
      name: 'consoles',
      ports: [1108, 1108]
    },
    other: {
      name: 'other',
      ports: [71632, 7163]
    }
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
