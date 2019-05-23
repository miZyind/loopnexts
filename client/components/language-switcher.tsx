// Node module
import React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { withTranslation, WithTranslation } from 'react-i18next';

class LanguageSwitcher extends React.Component<WithTranslation> {
  private options = [
    { key: 'Chinese', text: 'Chinese', value: 'zh' },
    { key: 'English', text: 'English', value: 'en' },
    { key: 'Vietnamese', text: 'Vietnamese', value: 'vn' },
  ];
  // private options = this.props.i18n.languages.map((language) => ({
  //   text: language,
  //   value: language,
  // }));

  public render() {
    return (
      <Dropdown
        button
        className='icon'
        floating
        labeled
        icon='world'
        options={this.options}
        text='Select Language'
        onChange={this.onChangeLanguage}
      />
    );
  }

  private onChangeLanguage: DropdownProps['onChange'] = (_, data) => {
    this.props.i18n.changeLanguage(data.value!.toString());
  };
}

// const languageOptions = [
//   { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
//   { key: 'English', text: 'English', value: 'English' },
//   { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
// ];

export default withTranslation()(LanguageSwitcher);
