import { createAction } from '@reduxjs/toolkit';
import actionEnum from '../constants/actionEnum';
import { GeneralInfoResponse } from '../models/generalInfoResponse';

export const generalInfoDataChanged = createAction<GeneralInfoResponse>(actionEnum.GENERAL_INFO_DATA_CHANGED);
export const detailedGeneralInfoChanged = createAction<GeneralInfoResponse>(actionEnum.DETAILED_GENERAL_INFO_CHANGED);

const generalInfoActions = {
    generalInfoDataChanged,
    detailedGeneralInfoChanged
};

export default generalInfoActions;
