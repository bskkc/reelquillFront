import { toast } from 'react-toastify';
import uiConstantsTR from '../constants/uiConstantsTR';
import { QuillService } from '../services/QuillService';
import { QuillResponse } from '../models/quillResponse';
import { GetQuillRequest } from '../models/getQuillRequest';
import quillActions from '../actions/quillActions';
import { AddQuillRequest } from '../models/addQuillRequest';
import uiActions from '../actions/uiActions';
import { Quill } from '../models/quill';

export class QuillController {

    static getAllQuills(dispatch: React.Dispatch<any>): Promise<QuillResponse> {
        return new Promise((resolve, reject) => {
            dispatch(uiActions.mainContentStatusChanged(true));
            QuillService.getAllQuills((response) => {
                if (response) {
                    let quillData = response.content;
                    dispatch(quillActions.trendQuillDataChanged(quillData));
                    dispatch(uiActions.mainContentStatusChanged(false));
                    resolve(response);
                } else {
                    dispatch(uiActions.mainContentStatusChanged(false));
                    toast.error(uiConstantsTR.USER_MESSAGES.ERROR_MESSAGE);
                    reject();
                }
            });
        });
    }

    static getFriendsQuills(getQuillRequest: GetQuillRequest, dispatch: React.Dispatch<any>): Promise<QuillResponse> {
        return new Promise((resolve, reject) => {
            dispatch(uiActions.mainContentStatusChanged(true));
            QuillService.getFriendsQuills(getQuillRequest.userId, (response) => {
                if (response) {
                    let quillData = response.content;
                    dispatch(quillActions.friendsQuillDataChanged(quillData));
                    dispatch(uiActions.mainContentStatusChanged(false));
                    resolve(response);
                } else {
                    dispatch(uiActions.mainContentStatusChanged(false));
                    toast.error(uiConstantsTR.USER_MESSAGES.ERROR_MESSAGE);
                    reject();
                }
            });
        });
    }

    static addNewQuill(addQuillRequest: AddQuillRequest, dispatch: React.Dispatch<any>): Promise<QuillResponse> {
        return new Promise((resolve, reject) => {
            dispatch(uiActions.mainContentStatusChanged(true));
            QuillService.addNewQuill(addQuillRequest, (response) => {
                if (response) {
                    let quillData = response.content;
                    dispatch(quillActions.trendQuillDataChanged(quillData));
                    dispatch(uiActions.addQuillModalStatusChanged(false));
                    dispatch(uiActions.mainContentStatusChanged(false));
                    toast.success(uiConstantsTR.USER_MESSAGES.QUILL_ADDED);
                    resolve(response);
                } else {
                    dispatch(uiActions.mainContentStatusChanged(false));
                    toast.error(uiConstantsTR.USER_MESSAGES.QUILL_CANNOT_ADDED);
                    reject();
                }
            });
        });
    }

    static getGeneralInfoQuills(generalInfoId: number, callback: (response: Quill[] | null) => void) {
        QuillService.getGeneralInfoQuills(generalInfoId, (response) => {
            if (response) {
                callback(response);
            } else {
                callback(null);
            }
        });
    }

    static getUserQuills(userId: number, callback: (response: Quill[] | null) => void) {
        QuillService.getUserQuills(userId, (response) => {
            if (response) {
                callback(response);
            } else {
                callback(null);
            }
        });
    }
}
