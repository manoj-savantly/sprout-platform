// Libraries
import { NavModel } from '@savantly/sprout-api';
import { CustomScrollbar } from '@savantly/sprout-ui';
// Components
import { PageHeader } from '@sprout-platform/ui';
import { isEqual } from 'lodash';
import React, { Component } from 'react';
import { getTitleFromNavModel } from '../../selectors/navModel';
import { Branding } from '../Branding/Branding';
import ErrorBoundary from '../error/error-boundary';
import { Footer } from '../Footer/Footer';
import PageContents from './PageContents';

interface Props {
  children: React.ReactNode;
  navModel: NavModel;
}

class Page extends Component<Props> {
  static Header = PageHeader;
  static Contents = PageContents;

  componentDidMount() {
    this.updateTitle();
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps.navModel, this.props.navModel)) {
      this.updateTitle();
    }
  }

  updateTitle = () => {
    const title = this.getPageTitle;
    document.title = title ? title + ' - ' + Branding.AppTitle : Branding.AppTitle;
  };

  get getPageTitle() {
    const { navModel } = this.props;
    if (navModel) {
      return getTitleFromNavModel(navModel) || undefined;
    }
    return undefined;
  }

  render() {
    const { navModel } = this.props;
    return (
      <div className="page-scrollbar-wrapper">
        <CustomScrollbar autoHeightMin={'100%'} className="custom-scrollbar--page">
          <div className="page-scrollbar-content">
            <ErrorBoundary>
              <PageHeader model={navModel} />
            </ErrorBoundary>
            {this.props.children}
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </div>
        </CustomScrollbar>
      </div>
    );
  }
}

export default Page;
