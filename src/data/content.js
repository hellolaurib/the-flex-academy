import avatar1 from '../assets/figma/avatar-1.jpg'
import avatar2 from '../assets/figma/avatar-2.jpg'
import avatar3 from '../assets/figma/avatar-3.jpg'
import avatar4 from '../assets/figma/avatar-4.jpg'
import avatar5 from '../assets/figma/avatar-5.jpg'
import iconArrowSquareIn from '../assets/figma/icon-arrow-square-in.svg'
import iconBook from '../assets/figma/icon-book.svg'
import iconChartLineUp from '../assets/figma/icon-chart-line-up.svg'
import iconListChecks from '../assets/figma/icon-list-checks.svg'
import iconCoin from '../assets/figma/icon-coin.svg'
import iconChartPie from '../assets/figma/icon-chart-pie.svg'
import mentorRaouf from '../assets/figma/mentor-raouf.jpg'
import mentorMichael from '../assets/figma/mentor-michael.jpg'
import testiEmma from '../assets/figma/testi-emma.jpg'
import testiSam from '../assets/figma/testi-sam.jpg'
import testiLiam from '../assets/figma/testi-liam.jpg'
import iconCalendar from '../assets/figma/icon-calendar.svg'
import iconTimer from '../assets/figma/icon-timer.svg'
import iconMonitor from '../assets/figma/icon-monitor.svg'
import iconSmiley from '../assets/figma/icon-smiley.svg'

const logos = import.meta.glob('../assets/figma/logo-*.png', { eager: true, import: 'default' })

export const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: "What you'll learn", href: '#learn' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Team', href: '#team' },
  { label: 'FAQS', href: '#faqs' },
]

export const COHORT_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5]

export const STATS = [
  { value: '7', label: 'cities where The Flex runs apartments today' },
  { value: '150+', label: 'companies that house their teams with The Flex' },
  { value: '130+', label: 'booking channels connected through Base360' },
  { value: '12', label: 'weeks to turn your rentals into a real company' },
]

export const STEPS = [
  { icon: iconArrowSquareIn, title: 'Start free', text: 'Join the webinar or book a strategy call.', width: 'lg:w-[159px]' },
  { icon: iconBook, title: 'Learn the playbook', text: 'Our real systems, templates and live sessions.', width: 'lg:w-[229px]' },
  { icon: iconChartLineUp, title: 'Launch or grow', text: 'Open your first unit, or scale into a real company.', width: 'lg:w-[229px]' },
]

export const SMALL_LEARN_CARDS = [
  { icon: iconListChecks, iconLeft: 'left-[6.5px]', title: 'Templates & SOPs', titleRight: 'pr-[81.58px]', text: 'Checklists, contracts and processes from a real operation.' },
  { icon: iconCoin, iconLeft: 'left-[7.17px]', title: 'Smarter pricing, fuller calendars', titleRight: 'pr-[30.66px]', text: 'Set prices that fill your calendar without guessing.' },
  { icon: iconChartPie, iconLeft: 'left-[6.84px]', title: 'Know your real margins', titleRight: 'pr-[81.58px]', text: 'See what each unit actually earns after costs.' },
]

export const TEAM = [
  { name: 'Raouf Yousfi', role: 'Co-founder, The Flex & Base360', photo: mentorRaouf },
  { name: 'Michael Buggy', role: 'Co-founder, The Flex & Base360', photo: mentorMichael },
]

// Company logos (white masks) in Figma order; the 4th (PwC) is taller.
export const COMPANY_LOGOS = Object.keys(logos)
  .sort()
  .map((k, i) => ({ src: logos[k], tall: i === 3 }))

export const TESTIMONIALS = [
  {
    title: 'I opened my first unit without risking my savings',
    text: "Before the course, I had watched hundreds of videos and still didn't know where to start. The playbook gave me one clear plan, and three months later my first apartment was live.",
    name: 'Emma Clarke',
    role: 'First-time host, Manchester',
    photo: testiEmma,
  },
  {
    title: '"I stopped being the bottleneck."',
    text: "Every decision went through me, from cleanings to late check-ins. The 12 weeks gave me the systems to delegate, and now my business runs even when I'm not there.",
    name: 'Sam Carter',
    role: 'Operator, 6 units, Austin',
    photo: testiSam,
    // In Figma this card's name is Regular and its role is 70% white (the others: Medium / 50%)
    variant: 'b',
  },
  {
    title: '"Pricing finally makes sense."',
    text: 'I used to guess my nightly rates. After the 1:1 with a founder, I changed my pricing strategy and my calendar started filling up on its own.',
    name: 'Liam Walsh',
    role: 'Operator, 4 units, Sydney',
    photo: testiLiam,
  },
]

export const EVENT_DETAILS = [
  { icon: iconCalendar, iconTop: 'top-[15px]', text: 'Date: Thursday, 12 November 2026' },
  { icon: iconTimer, iconTop: 'top-[13px]', text: 'Time: 7:00 PM – 8:00 PM' },
  { icon: iconMonitor, iconTop: 'top-[13px]', text: 'Format: Online' },
  { icon: iconSmiley, iconTop: 'top-[13px]', text: 'Price: Free' },
]

export const COUNTRIES = [
  'United Kingdom', 'United States', 'Ireland', 'Australia', 'Canada', 'France', 'Germany',
  'Spain', 'Portugal', 'Italy', 'Netherlands', 'United Arab Emirates', 'Colombia', 'Mexico', 'Other',
]

// Questions come from Figma; the answers are not designed yet, so they are
// written from what the page itself already says.
export const FAQS = [
  {
    q: 'Do I need to own property to start?',
    a: "No. The Learn how to launch programme shows you how to pick the right market, run the numbers and pitch landlords, so you can open your first unit without buying property.",
  },
  {
    q: 'Is this another get-rich-quick course?',
    a: "No. Everything we teach, we use every day to run The Flex: real systems, templates and SOPs from a working operation in 7 cities. It's a playbook, not a shortcut.",
  },
  {
    q: "What's the difference between the two programmes?",
    a: 'Learn how to launch is a self-paced course with live group sessions, for opening your first units. Learn how to scale is a 12-week programme with weekly sessions, a monthly 1:1 with a founder, the operator community and access to Base360.',
  },
  {
    q: "Can't make the webinar live?",
    a: "Register anyway and we'll send you the recording.",
  },
]
