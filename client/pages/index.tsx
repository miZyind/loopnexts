// Node module
import React from 'react';
import { compose } from 'redux';
import getConfig from 'next/config';
import { connect } from 'react-redux';
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
// Redux
import { Actions } from '../redux/actions/main';
import { IStore, IMain } from '../redux/models';
// Component
import LanguageSwitcher from '../components/language-switcher';

const { appName, appVersion } = getConfig().publicRuntimeConfig;

type Props = IMain & typeof Actions & WithTranslation & StyledProps;

class Index extends React.Component<Props> {
  public componentDidMount() {
    setTimeout(this.props.toggleLoadingStatus, 1500);
  }

  public render() {
    const {
      isLoading,
      isCompleted,
      toggleStepStatus,
      className,
      t,
    } = this.props;
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
            </Header>
            <Step.Group ordered>
              <Step completed={isCompleted} onClick={toggleStepStatus}>
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
  }
}

const StyledIndex = styled(Index)`
  height: 100vh;
`;

export default compose(
  connect(
    ({ main }: IStore) => main,
    Actions,
  ),
  withTranslation(),
)(StyledIndex);
