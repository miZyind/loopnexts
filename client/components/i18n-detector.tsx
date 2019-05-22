// Node module
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

class I18nextDetector extends React.Component<WithTranslation> {
  public render() {
    const { children, tReady } = this.props;
    return tReady ? children : null;
  }
}

export default withTranslation()(I18nextDetector);
