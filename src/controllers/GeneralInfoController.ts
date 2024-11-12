import { toast } from 'react-toastify';
import { GeneralInfoResponse } from '../models/generalInfoResponse';
import generalInfoActions, { detailedGeneralInfoChanged } from '../actions/generalInfoActions';
import { GeneralInfoService } from '../services/GeneralInfoService';
import { RateGeneralInfoRequest } from '../models/rateGeneralInfoRequest';

export class GeneralInfoController {
    static getAllGeneralInfo(dispatch: React.Dispatch<any>): Promise<GeneralInfoResponse> {
        return new Promise((resolve, reject) => {
            GeneralInfoService.getAllGeneralInfo((response) => {
                if (response) {
                    dispatch(generalInfoActions.generalInfoDataChanged(response))
                    resolve(response);
                } else {
                    toast.error('Failed to fetch general info.');
                    reject('No response from the server.');
                }
            });
        });
    }

    static rateGeneralInfo(rateGeneralInfoRequest: RateGeneralInfoRequest, dispatch: React.Dispatch<any>): Promise<GeneralInfoResponse> {
        return new Promise((resolve, reject) => {
            GeneralInfoService.rateGeneralInfo(rateGeneralInfoRequest, (response) => {
                if (response) {
                    dispatch(generalInfoActions.detailedGeneralInfoChanged(response))
                    resolve(response);
                } else {
                    toast.error('Failed to fetch general info.');
                    reject('No response from the server.');
                }
            });
        });
    }
}