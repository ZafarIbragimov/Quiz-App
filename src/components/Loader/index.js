import React from 'react';
import { Container, Message, Icon } from 'semantic-ui-react';

const Loader = ({ title, message }) => (
  <Container>
    <Message icon size="big">
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header>{title ? title : 'Bir soniya kuting'}</Message.Header>
        {message ? message : 'Biz siz uchun maʼlumotlarni olib kelmoqdamiz.'}
      </Message.Content>
    </Message>
  </Container>
);

export default Loader;
