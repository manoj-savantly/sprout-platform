import { sproutApiSvc } from '../../../core/services/sproutApiSvc';
import { DashboardDTO } from '../../../types';

export const dashboardService = {
    getDashboardsByFolderId: (folder: string | null) => {
        return sproutApiSvc.get<DashboardDTO[]>(`/api/dashboards/folder/${folder || ''}`);
    }
}