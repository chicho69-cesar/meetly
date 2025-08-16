import type { Meta } from '@storybook/react-vite'
import MeetlyApp from './app'

const propsToSend = {}

export const Default = (props: typeof propsToSend) => (
  <MeetlyApp {...props} />
)

const meta: Meta = {
  title: 'MeetlyApp',
  component: MeetlyApp,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: ''
      },
    }
  },
  argTypes: {},
  args: propsToSend,
} satisfies Meta<typeof MeetlyApp>

export default meta
