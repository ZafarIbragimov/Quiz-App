import CountdownComponent from './index';

export default {
  title: 'Komponentlar/Countdown',
  component: CountdownComponent,
};

const Template = args => <CountdownComponent {...args} />;
export const Countdown = Template.bind({});

Countdown.args = {
  countdownTime: 120,
  timeOver: () => {},
  setTimeTaken: () => {},
};
