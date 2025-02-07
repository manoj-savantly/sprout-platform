// Libaries
import React, { PureComponent } from 'react';

// Types
import { DashboardModel } from '../../state/DashboardModel';
import { BackButton } from '../../../../core/components/BackButton/BackButton';
import { CustomScrollbar } from '@savantly/sprout-ui';
import { LocationUpdateService } from '../../../../core/services/locationSvc';

export interface Props {
  dashboard: DashboardModel;
  locationService: LocationUpdateService;
}

export class DashboardSettings extends PureComponent<Props> {

  onClose = () => {
    this.props.locationService.update({
      query: { editview: null },
      partial: true,
    });
  };

  render() {
    const { dashboard } = this.props;
    const folderTitle = dashboard.meta.folderTitle;
    const haveFolder = (dashboard.meta.folderId ?? 0) > 0;

    return (
      <div className="dashboard-settings">
        <div className="navbar navbar--edit">
          <div className="navbar-edit">
            <BackButton surface="panel" onClick={this.onClose} />
          </div>
          <div className="navbar-page-btn">
            {haveFolder && <div className="navbar-page-btn__folder">{folderTitle} / </div>}
            <span>{dashboard.title} / Settings</span>
          </div>
        </div>
        <CustomScrollbar>
          <div className="dashboard-settings__body1">TODO: implement other settings</div>
        </CustomScrollbar>
      </div>
    );
  }
}
