"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/error.ts
var HttpStatusCode;
(function(HttpStatusCode2) {
  HttpStatusCode2[HttpStatusCode2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HttpStatusCode2[HttpStatusCode2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpStatusCode2[HttpStatusCode2["FORBIDDEN"] = 403] = "FORBIDDEN";
  HttpStatusCode2[HttpStatusCode2["NOT_FOUNT"] = 404] = "NOT_FOUNT";
  HttpStatusCode2[HttpStatusCode2["TIMEOUT"] = 408] = "TIMEOUT";
  HttpStatusCode2[HttpStatusCode2["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
  HttpStatusCode2[HttpStatusCode2["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatusCode || (HttpStatusCode = exports.HttpStatusCode = {}));
var ServerError = class extends Error {
  constructor(name, description = "", data = {}, statusCode = HttpStatusCode.BAD_REQUEST) {
    super(description);
    this.name = name;
    this.description = description;
    this.data = data;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
_chunkTUYBEZEZjs.__name.call(void 0, ServerError, "ServerError");
var ErrorType;
(function(ErrorType2) {
  ErrorType2["notImplemented"] = "NOT_IMPLEMENTED";
  ErrorType2["invalidCountry"] = "INVALID_COUNTRY";
  ErrorType2["invalidService"] = "SERVICE_NOT_ALLOW";
  ErrorType2["userNotFound"] = "USER_NOT_FOUND";
  ErrorType2["invalidSameUser"] = "INVALID_SAME_USER";
  ErrorType2["invalidCard"] = "INVALID_CARD";
  ErrorType2["cardNotFound"] = "CARD_NOT_FOUND";
  ErrorType2["invalidShipment"] = "INVALID_SHIPMENT";
  ErrorType2["invalidMaxVirtualCard"] = "INVALID_MAX_VIRTUAL_CARDS";
  ErrorType2["invalidPinCard"] = "INVALID_PIN_CARD";
  ErrorType2["invalidSamePinCard"] = "INVALID_SAME_PIN_CARD";
  ErrorType2["invalidCardType"] = "INVALID_CARD_TYPE";
  ErrorType2["invalidPaymentCreateCard"] = "INVALID_PAYMENT_CREATE_CARD";
  ErrorType2["invalidAlreadyHasCard"] = "INVALID_ALREADY_HAS_CARD";
  ErrorType2["invalidCardAddress"] = "INVALID_CARD_ADDRESS";
  ErrorType2["invalidCardUserData"] = "INVALID_CARD_USER_DATA";
  ErrorType2["duplicateCardUser"] = "INVALID_DUPLICATE_USER";
  ErrorType2["invalidCardRequest"] = "INVALID_CARD_REQUEST";
  ErrorType2["unauthorized"] = "UNAUTHORIZED";
  ErrorType2["invalidParameter"] = "INVALID_PARAMETER";
  ErrorType2["invalidEmail"] = "INVALID_EMAIL";
  ErrorType2["invalidTotp"] = "INVALID_TOTP";
  ErrorType2["totpAlreadyExists"] = "TOTP_ALREADY_EXISTS";
  ErrorType2["invalidBelotag"] = "INVALID_BELOTAG";
  ErrorType2["invalidOwner"] = "INVALID_OWNER";
  ErrorType2["invalidCurrency"] = "INVALID_CURRENCY";
  ErrorType2["invalidAddressType"] = "INVALID_ADDRESS_TYPE";
  ErrorType2["invalidAddress"] = "INVALID_ADDRESS";
  ErrorType2["invalidTransaction"] = "INVALID_TRANSACTION";
  ErrorType2["invalidAmount"] = "INVALID_AMOUNT";
  ErrorType2["walletLimitSurpassed"] = "WALLET_LIMIT_SURPASSED";
  ErrorType2["swapDailyLimitSurpassed"] = "SWAP_DAILY_LIMIT_SURPASSED";
  ErrorType2["swapMonthlyLimitSurpassed"] = "SWAP_MONTHLY_LIMIT_SURPASSED";
  ErrorType2["swapYearlyLimitSurpassed"] = "SWAP_YEARLY_LIMIT_SURPASSED";
  ErrorType2["withdrawalDailyLimitSurpassed"] = "WITHDRAWAL_DAILY_LIMIT_SURPASSED";
  ErrorType2["withdrawalMonthlyLimitSurpassed"] = "WITHDRAWAL_MONTHLY_LIMIT_SURPASSED";
  ErrorType2["withdrawalYearlyLimitSurpassed"] = "WITHDRAWAL_YEARLY_LIMIT_SURPASSED";
  ErrorType2["cardDailyLimitSurpassed"] = "CARD_DAILY_LIMIT_SURPASSED";
  ErrorType2["cardMonthlyLimitSurpassed"] = "CARD_MONTHLY_LIMIT_SURPASSED";
  ErrorType2["cardYearlyLimitSurpassed"] = "CARD_YEARLY_LIMIT_SURPASSED";
  ErrorType2["invalidQuote"] = "INVALID_QUOTE";
  ErrorType2["invalidPair"] = "INVALID_PAIR";
  ErrorType2["invalidUser"] = "INVALID_USER";
  ErrorType2["invalidUserData"] = "INVALID_USER_DATA";
  ErrorType2["invalidWallet"] = "INVALID_WALLET";
  ErrorType2["invalidQuantiaPair"] = "INVALID_QUANTIA_PAIR";
  ErrorType2["invalidQuantiaCurrency"] = "INVALID_QUANTIA_CURRENCY";
  ErrorType2["invalidQuantiaFunds"] = "INVALID_QUANTIA_FUNDS";
  ErrorType2["invalidOkexCurrency"] = "INVALID_OKEX_CURRENCY";
  ErrorType2["invalidOkexFee"] = "INVALID_OKEX_FEE";
  ErrorType2["invalidWithdrawal"] = "INVALID_WITHDRAWAL";
  ErrorType2["invalidContact"] = "INVALID_CONTACT";
  ErrorType2["okexError"] = "OKEX_ERROR";
  ErrorType2["noOtcLiquidity"] = "NO_OTC_LIQUIDITY";
  ErrorType2["invalidPayment"] = "INVALID_PAYMENT";
  ErrorType2["invalidOperation"] = "INVALID_OPERATION";
  ErrorType2["incompleteUser"] = "INCOMPLETE_USER";
  ErrorType2["invalidIdentityDocumentBadText"] = "INVALID_IDENTITY_DOCUMENT_BAD_TEXT";
  ErrorType2["invalidIdentityDocumentBlurryText"] = "INVALID_IDENTITY_DOCUMENT_BLURRY_TEXT";
  ErrorType2["invalidIdentityDocumentSmallImageSize"] = "INVALID_IDENTITY_DOCUMENT_SMALL_IMAGE_SIZE";
  ErrorType2["invalidIdentityDocumentUnexpectedData"] = "INVALID_IDENTITY_DOCUMENT_UNEXPECTED_DATA";
  ErrorType2["invalidIdentityDocumentNoText"] = "INVALID_IDENTITY_DOCUMENT_NO_TEXT";
  ErrorType2["invalidIdentityDocumentNoFace"] = "INVALID_IDENTITY_DOCUMENT_NO_FACE";
  ErrorType2["invalidIdentityDocumentIdenticalImage"] = "INVALID_IDENTITY_DOCUMENT_IDENTICAL_IMAGE";
  ErrorType2["invalidIdentityDocumentSimilarImage"] = "INVALID_IDENTITY_DOCUMENT_SIMILAR_IMAGE";
  ErrorType2["invalidIdentityDocumentGrayscaleImage"] = "INVALID_IDENTITY_DOCUMENT_GRAYSCALE_IMAGE";
  ErrorType2["invalidIdentityDocumentScreenPhoto"] = "INVALID_IDENTITY_DOCUMENT_SCREEN_PHOTO";
  ErrorType2["invalidIdentityDocumentNoDocument"] = "INVALID_IDENTITY_DOCUMENT_NO_DOCUMENT";
  ErrorType2["invalidIdentityDocumentMissingFields"] = "INVALID_IDENTITY_DOCUMENT_MISSING_FIELDS";
  ErrorType2["invalidIdentityDocumentWrongFormat"] = "INVALID_IDENTITY_DOCUMENT_WRONG_FORMAT";
  ErrorType2["invalidIdentityDocumentNoMrz"] = "INVALID_IDENTITY_DOCUMENT_NO_MRZ";
  ErrorType2["invalidIdentityDocumentBadMrz"] = "INVALID_IDENTITY_DOCUMENT_BAD_MRZ";
  ErrorType2["invalidIdentityDocumentNoPdf417"] = "INVALID_IDENTITY_DOCUMENT_NO_PDF_417";
  ErrorType2["invalidIdentityDocumentBadPdf417"] = "INVALID_IDENTITY_DOCUMENT_BAD_PDF_417";
  ErrorType2["invalidIdentityDocumentTypeMismatch"] = "INVALID_IDENTITY_DOCUMENT_TYPE_MISMATCH";
  ErrorType2["invalidIdentityDocumentCountryMismatch"] = "INVALID_IDENTITY_DOCUMENT_COUNTRY_MISMATCH";
  ErrorType2["invalidIdentityVideoConversionFailed"] = "INVALID_IDENTITY_VIDEO_CONVERSION_FAILED";
  ErrorType2["invalidIdentityVideoMultipleFaces"] = "INVALID_IDENTITY_VIDEO_MULTIPLE_FACES";
  ErrorType2["invalidIdentityVideoNoFace"] = "INVALID_IDENTITY_VIDEO_MULTIPLE_FACES";
  ErrorType2["invalidIdentityInput"] = "INVALID_IDENTITY_INPUT";
  ErrorType2["invalidIdentityDocumentType"] = "INVALID_IDENTITY_DOCUMENT_TYPE";
  ErrorType2["invalidWebhook"] = "INVALID_WEBHOOK";
  ErrorType2["invalidAliasFormat"] = "INVALID_ALIAS_FORMAT";
  ErrorType2["aliasNotAvailable"] = "ALIAS_NOT_AVAILABLE";
  ErrorType2["hasNotMainAddress"] = "HAS_NOT_MAIN_ADDRESS";
  ErrorType2["invalidProvider"] = "INVALID_PROVIDER";
  ErrorType2["invalidPayload"] = "INVALID_PAYLOAD";
  ErrorType2["invalidCustomer"] = "INVALID_CUSTOMER";
  ErrorType2["inactiveCard"] = "CARD_INACTIVE";
  ErrorType2["serviceNotAvailable"] = "SERVICE_NOT_AVAILABLE";
  ErrorType2["rechargeNotAvailable"] = "RECHARGE_NOT_AVAILABLE";
  ErrorType2["invalidCampaign"] = "INVALID_CAMPAIGN";
  ErrorType2["duplicatedDcaConfig"] = "DUPLICATED_DCA_CONFIG";
  ErrorType2["invalidQrNotAvailable"] = "INVALID_QR_NOT_AVAILABLE";
  ErrorType2["invalidQrUnsupported"] = "INVALID_QR_UNSUPPORTED";
  ErrorType2["invalidQrMerchant"] = "INVALID_QR_MERCHANT";
  ErrorType2["invalidQrError"] = "INVALID_QR_ERROR";
  ErrorType2["unableRedactUser"] = "UNABLE_REDACT_USER";
  ErrorType2["invalidCardAuthorization"] = "INVALID_CARD_AUTHORIZATION";
  ErrorType2["invalidClient"] = "INVALID_CLIENT";
  ErrorType2["invalidCredentials"] = "INVALID_CREDENTIALS";
  ErrorType2["invalidUUID"] = "INVALID_UUID";
  ErrorType2["invalidRegistration"] = "INVALID_REGISTRATION";
  ErrorType2["invalidEntityType"] = "INVALID_ENTITY_TYPE";
  ErrorType2["invalidEntity"] = "INVALID_ENTITY";
  ErrorType2["tooManyRequests"] = "TOO_MANY_REQUESTS";
  ErrorType2["expired"] = "EXPIRED";
  ErrorType2["forbidden"] = "FORBIDDEN";
  ErrorType2["notAuthorized"] = "NOT_AUTHORIZED";
  ErrorType2["invalidMFAValidationCode"] = "INVALID_MFA_VALIDATION_CODE";
  ErrorType2["invalidMFACode"] = "INVALID_MFA_CODE";
  ErrorType2["mfaMethodAlreadyActivate"] = "MFA_METHOD_ALREADY_ACTIVATE";
  ErrorType2["invalidMFAMethod"] = "INVALID_MFA_METHOD";
  ErrorType2["invalidMFAVerification"] = "INVALID_MFA_VERIFICATION";
  ErrorType2["backoffFailed"] = "BACKOFF_FAILED";
  ErrorType2["badRequest"] = "BAD_REQUEST";
  ErrorType2["invalidPrice"] = "INVALID_PRICE";
  ErrorType2["invalidApplication"] = "INVALID_APPLICATION";
  ErrorType2["invalidEmployee"] = "INVALID_EMPLOYEE";
  ErrorType2["accountDeleted"] = "ACCOUNT_DELETED";
  ErrorType2["invalidPermission"] = "INVALID_PERMISSION";
  ErrorType2["invalidPermissionGroup"] = "INVALID_PERMISSION_GROUP";
  ErrorType2["mfaRequired"] = "MFA_REQUIRED";
  ErrorType2["mfaFactorIdExpired"] = "MFA_FACTOR_ID_EXPIRED";
  ErrorType2["userLocked"] = "USER_LOCKED";
  ErrorType2["invalidBulkOperation"] = "INVALID_BULK_OPERATION";
  ErrorType2["notFound"] = "NOT_FOUND";
  ErrorType2["missingParameter"] = "MISSING_PARAMETER";
  ErrorType2["unknownError"] = "UNKNOWN_ERROR";
  ErrorType2["invalidMerchant"] = "INVALID_MERCHANT";
  ErrorType2["remainingBalance"] = "REMAINING_BALANCE";
  ErrorType2["paymentAlreadyProcessed"] = "PAYMENT_ALREADY_PROCESSED";
  ErrorType2["paymentFailed"] = "PAYMENT_FAILED";
  ErrorType2["tooEarly"] = "TOO_EARLY";
  ErrorType2["lockCouldNotAcquireKeys"] = "LOCK_COULD_NOT_ACQUIRE_KEYS";
  ErrorType2["companyNotFound"] = "COMPANY_NOT_FOUND";
  ErrorType2["paymentNotFound"] = "PAYMENT_NOT_FOUND";
  ErrorType2["invalidVersionHeader"] = "INVALID_VERSION_HEADER";
  ErrorType2["updateRequired"] = "UPDATE_REQUIRED";
  ErrorType2["invalidRateInvestment"] = "INVALID_RATE_INVESTMENT";
  ErrorType2["invalidPhoneNumber"] = "INVALID_PHONE_NUMBER";
  ErrorType2["invalidBillAmount"] = "INVALID_BILL_AMOUNT";
  ErrorType2["invalidBillCompany"] = "INVALID_BILL_COMPANY";
  ErrorType2["invalidBillExpired"] = "INVALID_BILL_EXPIRED";
  ErrorType2["productNotFound"] = "PRODUCT_NOT_FOUND";
  ErrorType2["invalidBillIdentifier"] = "INVALID_BILL_IDENTIFIER";
  ErrorType2["debtIdExpired"] = "DEBT_ID_EXPIRED";
  ErrorType2["invalidUserType"] = "INVALID_USER_TYPE";
  ErrorType2["invalidCronTime"] = "INVALID_CRON_TIME";
})(ErrorType || (ErrorType = exports.ErrorType = {}));
var errorCodeMap = {
  [ErrorType.tooManyRequests]: HttpStatusCode.TOO_MANY_REQUESTS,
  [ErrorType.forbidden]: HttpStatusCode.FORBIDDEN,
  [ErrorType.unauthorized]: HttpStatusCode.UNAUTHORIZED,
  [ErrorType.mfaFactorIdExpired]: HttpStatusCode.UNAUTHORIZED,
  [ErrorType.invalidMFAValidationCode]: HttpStatusCode.FORBIDDEN,
  [ErrorType.invalidMFACode]: HttpStatusCode.FORBIDDEN,
  [ErrorType.mfaRequired]: HttpStatusCode.FORBIDDEN,
  [ErrorType.invalidWebhook]: HttpStatusCode.INTERNAL_SERVER_ERROR
};
var Errors = Object.keys(ErrorType).reduce((previous, name) => ({
  ...previous,
  [name]: (description, data) => new ServerError(ErrorType[name], description, data, errorCodeMap[ErrorType[name]])
}), {});
var isKnownError = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (name) => {
  return Object.values(ErrorType).includes(name);
}, "isKnownError");







exports.HttpStatusCode = HttpStatusCode; exports.ServerError = ServerError; exports.ErrorType = ErrorType; exports.Errors = Errors; exports.isKnownError = isKnownError;
//# sourceMappingURL=chunk-JHDA7UZF.js.map