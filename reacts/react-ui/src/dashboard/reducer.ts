import { Reducer } from "redux";

export interface IDashBoardState {
  open: boolean;
}
const OPEN_DASHBOARD = "@DASHBOARD.OPEN";
export const openDashboard = () => ({ type: OPEN_DASHBOARD });
const CLOSE_DASHBOARD = "@DASHBOARD.CLOSE";
export const closeDashboard = () => ({ type: CLOSE_DASHBOARD });
export const dashboardReducer: Reducer<IDashBoardState> = (
  state = { open: true },
  action,
) => {
  switch (action.type) {
    case OPEN_DASHBOARD: return { open: true };
    case CLOSE_DASHBOARD: return { open: false };
    default: return state;
  }
};
