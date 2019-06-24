// Node module
import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Transition,
  Dimmer,
  Loader,
  Header,
  Image,
  Step,
} from 'semantic-ui-react';
import { withTranslation, WithTranslation } from 'react-i18next';
// Component
import LanguageSwitcher from '../components/language-switcher';
// Context
import { useUIContext } from '../contexts/ui';

const { appName, appVersion } = getConfig().publicRuntimeConfig;

function useDisplayType() {
  const {
    state: { displayType },
    actions: { windowResize },
  } = useUIContext();

  useEffect(() => {
    const handleResize = () => windowResize(innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return displayType;
}

function useIsLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(!isLoading), 1500);
    return () => clearTimeout(timer);
  }, []);

  return isLoading;
}

function useIsCompleted() {
  const [isCompleted, setIsCompleted] = useState(false);
  const toggleIsCompleted = () => setIsCompleted(!isCompleted);
  return [isCompleted, toggleIsCompleted] as const;
}

const Index: React.FC<StyledProps & WithTranslation> = ({ className, t }) => {
  const displayType = useDisplayType();
  const isLoading = useIsLoading();
  const [isCompleted, toggleIsCompleted] = useIsCompleted();

  return (
    <Container>
      <Transition visible={isLoading} duration={500} unmountOnHide>
        <Dimmer active>
          <Loader size='large' content='Loading...' active />
        </Dimmer>
      </Transition>
      <Grid
        padded
        centered
        stretched
        columns={1}
        textAlign='center'
        verticalAlign='middle'
        className={className}
      >
        <Grid.Column>
          <Header as='h1' icon textAlign='center'>
            <Image centered size='large' src='static/favicon.ico' />
            <Header.Content>{`${appName} v${appVersion}`}</Header.Content>
            <Header.Content>{`Display type: ${displayType}`}</Header.Content>
          </Header>
          <Step.Group ordered>
            <Step completed={isCompleted} onClick={toggleIsCompleted}>
              <Step.Content>
                <Step.Title>{t('getting-started')}</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Grid.Column>
        <Grid.Column>
          <LanguageSwitcher />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

const StyledIndex = styled(Index)`
  height: 100vh;
`;

export default withTranslation()(StyledIndex);
