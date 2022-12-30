"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKnownError = exports.Errors = exports.ErrorType = exports.ServerError = exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCode[HttpStatusCode["NOT_FOUNT"] = 404] = "NOT_FOUNT";
    HttpStatusCode[HttpStatusCode["TIMEOUT"] = 408] = "TIMEOUT";
    HttpStatusCode[HttpStatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
class ServerError extends Error {
    constructor(name, description = "", data = {}, statusCode = HttpStatusCode.BAD_REQUEST) {
        super(description);
        this.name = name;
        this.description = description;
        this.data = data;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ServerError = ServerError;
var ErrorType;
(function (ErrorType) {
    ErrorType["notImplemented"] = "NOT_IMPLEMENTED";
    ErrorType["invalidCountry"] = "INVALID_COUNTRY";
    ErrorType["invalidService"] = "SERVICE_NOT_ALLOW";
    ErrorType["userNotFound"] = "USER_NOT_FOUND";
    ErrorType["invalidSameUser"] = "INVALID_SAME_USER";
    ErrorType["invalidCard"] = "INVALID_CARD";
    ErrorType["cardNotFound"] = "CARD_NOT_FOUND";
    ErrorType["invalidShipment"] = "INVALID_SHIPMENT";
    ErrorType["invalidMaxVirtualCard"] = "INVALID_MAX_VIRTUAL_CARDS";
    ErrorType["invalidPinCard"] = "INVALID_PIN_CARD";
    ErrorType["invalidSamePinCard"] = "INVALID_SAME_PIN_CARD";
    ErrorType["invalidCardType"] = "INVALID_CARD_TYPE";
    ErrorType["invalidPaymentCreateCard"] = "INVALID_PAYMENT_CREATE_CARD";
    ErrorType["invalidAlreadyHasCard"] = "INVALID_ALREADY_HAS_CARD";
    ErrorType["invalidCardAddress"] = "INVALID_CARD_ADDRESS";
    ErrorType["invalidCardUserData"] = "INVALID_CARD_USER_DATA";
    ErrorType["duplicateCardUser"] = "INVALID_DUPLICATE_USER";
    ErrorType["invalidCardRequest"] = "INVALID_CARD_REQUEST";
    ErrorType["unauthorized"] = "UNAUTHORIZED";
    ErrorType["invalidParameter"] = "INVALID_PARAMETER";
    ErrorType["invalidEmail"] = "INVALID_EMAIL";
    ErrorType["invalidTotp"] = "INVALID_TOTP";
    ErrorType["totpAlreadyExists"] = "TOTP_ALREADY_EXISTS";
    ErrorType["invalidBelotag"] = "INVALID_BELOTAG";
    ErrorType["invalidOwner"] = "INVALID_OWNER";
    ErrorType["invalidCurrency"] = "INVALID_CURRENCY";
    ErrorType["invalidAddressType"] = "INVALID_ADDRESS_TYPE";
    ErrorType["invalidAddress"] = "INVALID_ADDRESS";
    ErrorType["invalidTransaction"] = "INVALID_TRANSACTION";
    ErrorType["invalidAmount"] = "INVALID_AMOUNT";
    ErrorType["walletLimitSurpassed"] = "WALLET_LIMIT_SURPASSED";
    ErrorType["swapDailyLimitSurpassed"] = "SWAP_DAILY_LIMIT_SURPASSED";
    ErrorType["swapMonthlyLimitSurpassed"] = "SWAP_MONTHLY_LIMIT_SURPASSED";
    ErrorType["swapYearlyLimitSurpassed"] = "SWAP_YEARLY_LIMIT_SURPASSED";
    ErrorType["withdrawalDailyLimitSurpassed"] = "WITHDRAWAL_DAILY_LIMIT_SURPASSED";
    ErrorType["withdrawalMonthlyLimitSurpassed"] = "WITHDRAWAL_MONTHLY_LIMIT_SURPASSED";
    ErrorType["withdrawalYearlyLimitSurpassed"] = "WITHDRAWAL_YEARLY_LIMIT_SURPASSED";
    ErrorType["cardDailyLimitSurpassed"] = "CARD_DAILY_LIMIT_SURPASSED";
    ErrorType["cardMonthlyLimitSurpassed"] = "CARD_MONTHLY_LIMIT_SURPASSED";
    ErrorType["cardYearlyLimitSurpassed"] = "CARD_YEARLY_LIMIT_SURPASSED";
    ErrorType["invalidQuote"] = "INVALID_QUOTE";
    ErrorType["invalidPair"] = "INVALID_PAIR";
    ErrorType["invalidUser"] = "INVALID_USER";
    ErrorType["invalidUserData"] = "INVALID_USER_DATA";
    ErrorType["invalidWallet"] = "INVALID_WALLET";
    ErrorType["invalidQuantiaPair"] = "INVALID_QUANTIA_PAIR";
    ErrorType["invalidQuantiaCurrency"] = "INVALID_QUANTIA_CURRENCY";
    ErrorType["invalidQuantiaFunds"] = "INVALID_QUANTIA_FUNDS";
    ErrorType["invalidOkexCurrency"] = "INVALID_OKEX_CURRENCY";
    ErrorType["invalidOkexFee"] = "INVALID_OKEX_FEE";
    ErrorType["invalidWithdrawal"] = "INVALID_WITHDRAWAL";
    ErrorType["invalidContact"] = "INVALID_CONTACT";
    ErrorType["okexError"] = "OKEX_ERROR";
    ErrorType["noOtcLiquidity"] = "NO_OTC_LIQUIDITY";
    ErrorType["invalidPayment"] = "INVALID_PAYMENT";
    ErrorType["invalidOperation"] = "INVALID_OPERATION";
    ErrorType["incompleteUser"] = "INCOMPLETE_USER";
    ErrorType["invalidIdentityDocumentBadText"] = "INVALID_IDENTITY_DOCUMENT_BAD_TEXT";
    ErrorType["invalidIdentityDocumentBlurryText"] = "INVALID_IDENTITY_DOCUMENT_BLURRY_TEXT";
    ErrorType["invalidIdentityDocumentSmallImageSize"] = "INVALID_IDENTITY_DOCUMENT_SMALL_IMAGE_SIZE";
    ErrorType["invalidIdentityDocumentUnexpectedData"] = "INVALID_IDENTITY_DOCUMENT_UNEXPECTED_DATA";
    ErrorType["invalidIdentityDocumentNoText"] = "INVALID_IDENTITY_DOCUMENT_NO_TEXT";
    ErrorType["invalidIdentityDocumentNoFace"] = "INVALID_IDENTITY_DOCUMENT_NO_FACE";
    ErrorType["invalidIdentityDocumentIdenticalImage"] = "INVALID_IDENTITY_DOCUMENT_IDENTICAL_IMAGE";
    ErrorType["invalidIdentityDocumentSimilarImage"] = "INVALID_IDENTITY_DOCUMENT_SIMILAR_IMAGE";
    ErrorType["invalidIdentityDocumentGrayscaleImage"] = "INVALID_IDENTITY_DOCUMENT_GRAYSCALE_IMAGE";
    ErrorType["invalidIdentityDocumentScreenPhoto"] = "INVALID_IDENTITY_DOCUMENT_SCREEN_PHOTO";
    ErrorType["invalidIdentityDocumentNoDocument"] = "INVALID_IDENTITY_DOCUMENT_NO_DOCUMENT";
    ErrorType["invalidIdentityDocumentMissingFields"] = "INVALID_IDENTITY_DOCUMENT_MISSING_FIELDS";
    ErrorType["invalidIdentityDocumentWrongFormat"] = "INVALID_IDENTITY_DOCUMENT_WRONG_FORMAT";
    ErrorType["invalidIdentityDocumentNoMrz"] = "INVALID_IDENTITY_DOCUMENT_NO_MRZ";
    ErrorType["invalidIdentityDocumentBadMrz"] = "INVALID_IDENTITY_DOCUMENT_BAD_MRZ";
    ErrorType["invalidIdentityDocumentNoPdf417"] = "INVALID_IDENTITY_DOCUMENT_NO_PDF_417";
    ErrorType["invalidIdentityDocumentBadPdf417"] = "INVALID_IDENTITY_DOCUMENT_BAD_PDF_417";
    ErrorType["invalidIdentityDocumentTypeMismatch"] = "INVALID_IDENTITY_DOCUMENT_TYPE_MISMATCH";
    ErrorType["invalidIdentityDocumentCountryMismatch"] = "INVALID_IDENTITY_DOCUMENT_COUNTRY_MISMATCH";
    ErrorType["invalidIdentityVideoConversionFailed"] = "INVALID_IDENTITY_VIDEO_CONVERSION_FAILED";
    ErrorType["invalidIdentityVideoMultipleFaces"] = "INVALID_IDENTITY_VIDEO_MULTIPLE_FACES";
    ErrorType["invalidIdentityVideoNoFace"] = "INVALID_IDENTITY_VIDEO_MULTIPLE_FACES";
    ErrorType["invalidIdentityInput"] = "INVALID_IDENTITY_INPUT";
    ErrorType["invalidIdentityDocumentType"] = "INVALID_IDENTITY_DOCUMENT_TYPE";
    ErrorType["invalidWebhook"] = "INVALID_WEBHOOK";
    ErrorType["invalidAliasFormat"] = "INVALID_ALIAS_FORMAT";
    ErrorType["aliasNotAvailable"] = "ALIAS_NOT_AVAILABLE";
    ErrorType["hasNotMainAddress"] = "HAS_NOT_MAIN_ADDRESS";
    ErrorType["invalidProvider"] = "INVALID_PROVIDER";
    ErrorType["invalidPayload"] = "INVALID_PAYLOAD";
    ErrorType["invalidCustomer"] = "INVALID_CUSTOMER";
    ErrorType["inactiveCard"] = "CARD_INACTIVE";
    ErrorType["serviceNotAvailable"] = "SERVICE_NOT_AVAILABLE";
    ErrorType["rechargeNotAvailable"] = "RECHARGE_NOT_AVAILABLE";
    ErrorType["invalidCampaign"] = "INVALID_CAMPAIGN";
    ErrorType["duplicatedDcaConfig"] = "DUPLICATED_DCA_CONFIG";
    ErrorType["invalidQrNotAvailable"] = "INVALID_QR_NOT_AVAILABLE";
    ErrorType["invalidQrUnsupported"] = "INVALID_QR_UNSUPPORTED";
    ErrorType["invalidQrMerchant"] = "INVALID_QR_MERCHANT";
    ErrorType["invalidQrError"] = "INVALID_QR_ERROR";
    ErrorType["unableRedactUser"] = "UNABLE_REDACT_USER";
    ErrorType["invalidCardAuthorization"] = "INVALID_CARD_AUTHORIZATION";
    ErrorType["invalidClient"] = "INVALID_CLIENT";
    ErrorType["invalidCredentials"] = "INVALID_CREDENTIALS";
    ErrorType["invalidUUID"] = "INVALID_UUID";
    ErrorType["invalidRegistration"] = "INVALID_REGISTRATION";
    ErrorType["invalidEntityType"] = "INVALID_ENTITY_TYPE";
    ErrorType["invalidEntity"] = "INVALID_ENTITY";
    ErrorType["tooManyRequests"] = "TOO_MANY_REQUESTS";
    ErrorType["expired"] = "EXPIRED";
    ErrorType["forbidden"] = "FORBIDDEN";
    ErrorType["notAuthorized"] = "NOT_AUTHORIZED";
    ErrorType["invalidMFAValidationCode"] = "INVALID_MFA_VALIDATION_CODE";
    ErrorType["invalidMFACode"] = "INVALID_MFA_CODE";
    ErrorType["mfaMethodAlreadyActivate"] = "MFA_METHOD_ALREADY_ACTIVATE";
    ErrorType["invalidMFAMethod"] = "INVALID_MFA_METHOD";
    ErrorType["invalidMFAVerification"] = "INVALID_MFA_VERIFICATION";
    ErrorType["backoffFailed"] = "BACKOFF_FAILED";
    ErrorType["badRequest"] = "BAD_REQUEST";
    ErrorType["invalidPrice"] = "INVALID_PRICE";
    ErrorType["invalidApplication"] = "INVALID_APPLICATION";
    ErrorType["invalidEmployee"] = "INVALID_EMPLOYEE";
    ErrorType["accountDeleted"] = "ACCOUNT_DELETED";
    ErrorType["invalidPermission"] = "INVALID_PERMISSION";
    ErrorType["invalidPermissionGroup"] = "INVALID_PERMISSION_GROUP";
    ErrorType["mfaRequired"] = "MFA_REQUIRED";
    ErrorType["mfaFactorIdExpired"] = "MFA_FACTOR_ID_EXPIRED";
    ErrorType["userLocked"] = "USER_LOCKED";
    ErrorType["invalidBulkOperation"] = "INVALID_BULK_OPERATION";
    ErrorType["notFound"] = "NOT_FOUND";
    ErrorType["missingParameter"] = "MISSING_PARAMETER";
    ErrorType["unknownError"] = "UNKNOWN_ERROR";
    ErrorType["invalidMerchant"] = "INVALID_MERCHANT";
    ErrorType["remainingBalance"] = "REMAINING_BALANCE";
    ErrorType["paymentAlreadyProcessed"] = "PAYMENT_ALREADY_PROCESSED";
    ErrorType["paymentFailed"] = "PAYMENT_FAILED";
    ErrorType["tooEarly"] = "TOO_EARLY";
    ErrorType["lockCouldNotAcquireKeys"] = "LOCK_COULD_NOT_ACQUIRE_KEYS";
    ErrorType["companyNotFound"] = "COMPANY_NOT_FOUND";
    ErrorType["paymentNotFound"] = "PAYMENT_NOT_FOUND";
    ErrorType["invalidVersionHeader"] = "INVALID_VERSION_HEADER";
    ErrorType["updateRequired"] = "UPDATE_REQUIRED";
    ErrorType["invalidRateInvestment"] = "INVALID_RATE_INVESTMENT";
    ErrorType["invalidPhoneNumber"] = "INVALID_PHONE_NUMBER";
    ErrorType["invalidBillAmount"] = "INVALID_BILL_AMOUNT";
    ErrorType["invalidBillCompany"] = "INVALID_BILL_COMPANY";
    ErrorType["invalidBillExpired"] = "INVALID_BILL_EXPIRED";
    ErrorType["productNotFound"] = "PRODUCT_NOT_FOUND";
    ErrorType["invalidBillIdentifier"] = "INVALID_BILL_IDENTIFIER";
    ErrorType["debtIdExpired"] = "DEBT_ID_EXPIRED";
    ErrorType["invalidUserType"] = "INVALID_USER_TYPE";
    ErrorType["invalidCronTime"] = "INVALID_CRON_TIME";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
const errorCodeMap = {
    [ErrorType.tooManyRequests]: HttpStatusCode.TOO_MANY_REQUESTS,
    [ErrorType.forbidden]: HttpStatusCode.FORBIDDEN,
    [ErrorType.unauthorized]: HttpStatusCode.UNAUTHORIZED,
    [ErrorType.mfaFactorIdExpired]: HttpStatusCode.UNAUTHORIZED,
    [ErrorType.invalidMFAValidationCode]: HttpStatusCode.FORBIDDEN,
    [ErrorType.invalidMFACode]: HttpStatusCode.FORBIDDEN,
    [ErrorType.mfaRequired]: HttpStatusCode.FORBIDDEN,
    [ErrorType.invalidWebhook]: HttpStatusCode.INTERNAL_SERVER_ERROR,
};
exports.Errors = Object.keys(ErrorType).reduce((previous, name) => ({
    ...previous,
    [name]: (description, data) => new ServerError(ErrorType[name], description, data, errorCodeMap[ErrorType[name]]),
}), {});
const isKnownError = (name) => {
    return Object.values(ErrorType).includes(name);
};
exports.isKnownError = isKnownError;
