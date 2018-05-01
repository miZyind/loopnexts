// Node module
import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Transition, Dimmer, Loader, Header, Image, Step } from 'semantic-ui-react';
// Component
import FullGrid from '@components/full-grid';
// Action
import { Actions } from '@actions/main';
// Model
import { IStore } from '../models';
import { IMain } from '../models/main';

type StateProps = IMain;
type DispatchProps = typeof Actions;
type OwnProps = {
  name: string;
  version: string;
  className?: string;
};

class App extends React.Component<StateProps & DispatchProps & OwnProps> {
  public componentDidMount() {
    setTimeout(this.props.toggleLoadingStatus, 1500);
  }

  public render() {
    const {
      // StateProps
      isLoading, isCompleted,
      // DispatchProps
      toggleStepStatue,
      // OwnProps
      name, version, className
    } = this.props;

    return (
      <Container className={className}>
        <FullGrid>
          <Grid.Row>
            <Grid.Column>
              <Transition visible={isLoading} duration={500} unmountOnHide>
                <Dimmer page active>
                  <Loader size='large' content='Loading...' active />
                </Dimmer>
              </Transition>
              <Header as='h1' icon textAlign='center'>
                <Image centered size='large' src='/favicon.ico' />
                <Header.Content>{`${name} v${version}`}</Header.Content>
              </Header>
              <Step.Group ordered>
                <Step completed={isCompleted} onClick={toggleStepStatue}>
                  <Step.Content>
                    <Step.Title>Getting Started</Step.Title>
                  </Step.Content>
                </Step>
              </Step.Group>
            </Grid.Column>
          </Grid.Row>
        </FullGrid>
      </Container>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, IStore>(
  (state) => state.main,
  Actions
)(App);
