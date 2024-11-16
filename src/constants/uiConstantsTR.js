const USER_MESSAGES = {
    ERROR_MESSAGE: "Bir hata oluştu.",
    LOGIN_SUCCESSFUL_MESSAGE: "Kullanıcı girişi başarılı.",
    LOGIN_ERROR_MESSAGE: "Kullanıcı girişi sırasında hata oluştu.",
    LOGOUT_SUCCESSFUL_MESSAGE: "Kullanıcı çıkışı başarılı.",
    REGISTER_SUCCESSFUL_MESSAGE: "Hesap oluşturma başarılı.",
    REGISTER_ERROR_MESSAGE: "Hesap oluşturma sırasında hata oluştu.",
    ADD_FRIEND_SUCCESSFUL_MESSAGE: "Arkadaş ekleme başarılı.",
    RATE_SUCCESSFUL_MESSAGE: "Film oylama başarılı.",
    NO_QUILLS: "Quill bulunamadı.",
    QUILL_ADDED: "Quill eklendi.",
    QUILL_CANNOT_ADDED: "Quill eklenemedi.",
    UPDATE_SUCCESSFUL_MESSAGE: "Güncelleme başarılı.",
    NO_USER: "Kullanıcı bulunamadı.",
    NO_MOVIES: "Film bulunamadı.",
    NO_BOOKS: "Kitap bulunamadı.",
    NO_SONGS: "Müzik bulunamadı.",
}

const TAB_LABELS = {
    TRENDS: "Trendler",
    FRIENDS: "Arkadaşlar",
    MOVIES: "Filmler",
    BOOKS: "Kitaplar",
    SONGS: "Müzikler"
}

const LOGIN_PAGE = {
    MAIL_ADDRESS_LABEL: "E-mail Adresi",
    PASSWORD_LABEL: "Şifre",
    LOGIN_LABEL: "Giriş Yap",
    REGISTER_LABEL: "Hesap Aç",
}

const REGISTER_PAGE = {
    USERNAME_LABEL: "Kullanıcı Adı",
    MAIL_ADDRESS_LABEL: "E-mail Adresi",
    PASSWORD_LABEL: "Şifre",
    LOGIN_LABEL: "Giriş Yap",
    REGISTER_LABEL: "Hesap Aç",
}

const HOME_PAGE = {
    REELQUILL_LABEL: "ReelQuill",
    ADD_QUILL: "Quill Ekle",
    QUILL_LABEL: "Quill",
    ADD_LABEL: "Ekle",
    CANCEL_LABEL: "Vazgeç",
    CRYPTOCURRENCY_PRICES: "Kripto Para Fiyatları",
    BITCOIN_LABEL: "Bitcoin (USD): ",
    ETHEREUM_LABEL: "Ethereum (USD): "
}

const MESSAGE_DRAWER = {
    INBOX_TITLE: "Mesajlar",
    TODAY_LABEL: "Bugün",
    PREV_LABEL: "Daha Önce",
    MESSAGING_TITLE: "Mesajlaşma",
    NO_MESSAGES_TEXT: "Henüz kimseyle mesajlaşmadınız.",
    ENTER_MESSAGE: "Mesaj yazın..."
}

const MOVIE_DETAIL_PAGE = {
    DESCRIPTION_LABEL: "Açıklama: ",
    ACTORS_LABEL: "Oyuncular: ",
    DIRECTOR_LABEL: "Yönetmen: ",
    GENRE_LABEL: "Tür: ",
    REVENUE_LABEL: "Hasılat: ",
    MILLION_LABEL: " milyon",
    RUNTIME_LABEL: "Süre: ",
    MINUTE_LABEL: " dakika",
    COMMENT_MOVIE_LABEL: "Yorum ekleyin...",
    VOTES_LABEL: " kez oylandı."
}

const PROFILE_PAGE = {
    PROFILE: "Hesap Bilgileri",
    CREATION_DATE: "Hesap Oluşturulma Tarihi: ",
    UPDATED_DATE: "Son Güncelleme Tarihi: ",
    USERNAME: "Kullanıcı Adı: ",
    MAIL_ADDRESS: "E-mail Adresi: ",
    NEW_PASSWORD: "Yeni Şifre: ",
    SAVE_BUTTON: "Kaydet",
    CANCEL_BUTTON: "İptal",
    EDIT_PROFILE_BUTTON: "Hesap Bilgilerini Düzenle"
}

const NOTIFICATION_DRAWER = {
    NOTIFICATION_TITLE: "Bildirimler",
    ADDED_FRIEND: " seni arkadaş olarak ekledi!",
    ADD_BUTTON: "Arkadaş Olarak Ekle",
    TODAY_LABEL: "Bugün",
    PREV_LABEL: "Daha Önce",
}

const NOTIFICATION_TYPE_ENUM = {
    0: "Arkadaşlık İsteği",
    1: "Mesaj",
    2: "Yorum"
}

export default {
    USER_MESSAGES,
    TAB_LABELS,
    LOGIN_PAGE,
    REGISTER_PAGE,
    HOME_PAGE,
    MESSAGE_DRAWER,
    MOVIE_DETAIL_PAGE,
    PROFILE_PAGE,
    NOTIFICATION_DRAWER,
    NOTIFICATION_TYPE_ENUM
};