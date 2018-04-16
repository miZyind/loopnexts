// Node module
import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import {
  Container,
  Grid,
  Transition,
  Dimmer,
  Loader,
  Header,
  Image,
  Step
} from 'semantic-ui-react';
import { Bind } from 'lodash-decorators';
// Component
import FullGrid from '@components/full-grid';

interface IAppProps {
  name: string;
  version: string;
  className?: string;
}

interface IAppState {
  isLoading: boolean;
  isCompleted: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = { isLoading: true, isCompleted: false };
  }

  public componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1500);
  }

  public render() {
    const { name, version } = this.props;
    const { isLoading, isCompleted } = this.state;

    return (
      <Container>
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
                <Step completed={isCompleted} onClick={this.toggleStepStatus}>
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

  @Bind
  private toggleStepStatus() {
    this.setState({ isCompleted: !this.state.isCompleted });
  }
}

export default hot(module)(App);
