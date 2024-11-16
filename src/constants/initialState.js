import { applicationEnum } from "./applicationEnum";

export const initialState = {
    ui: {
        isAddQuillModalOpen: false,
        isMessageDrawerOpen: false,
        isMessageDetailDrawerOpen: false,
        isNotificationDrawerOpen: false,
        isMainContentInProgress: false,
        theme: applicationEnum.THEME_ENUM.DARK
    },
    userInfo: {
        isAuthenticated: false,
        token: "",
        data: {}
    },
    quills: {
        friendsQuills: [],
        trendQuills: []
    },
    message: {
        data: [],
        selectedMessage: {}
    },
    generalInfo: {
        data: {},
        detailedGeneralInfo: {}
    },
    book: {
        data: {},
    },
    song: {
        data: {},
    },
    notification: {
        data: {},
    },
};
