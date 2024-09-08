const CONSTANTS = Object.freeze({
  TEMPLATE_NAME_ID_MAP: getTemplateNameIDMap(),
  SLACK_ADDRESSES: getSlackAddresses(),
  S3_BUCKET: process.env.S3_BUCKET
});

export default CONSTANTS;

function getTemplateNameIDMap () {
  return Object.freeze({
    paidQuotationInvoice: 'd-f009915146e54064b5d110d875176d88',
    directOrderInvoice: 'd-97c76f43d8be4486bd192f3dff86e97c',
    invalidHoldingCompanyInformations: 'd-97c76f43d8be4486bd192f3dff86e97c',
    validHoldingCompanyInformations: 'd-97c76f43d8be4486bd192f3dff86e97c',
    reviewNewVendorByOperation: 'd-66241231a7934946ae4f7a1aa53cd09c',
    reviewNewVendorByFinance: 'd-3e9ff0c76d794b949bdb18f370ddccdc',
    financeRejectionToOperation: 'd-b12ea5f47ff54925b8a534df930f99ea',
    vendorInventoryNeedsReview: 'd-5d120bd3d8104a5dae1c5b29d4093528',
    newAutoAddedInventory: 'd-972c9fcd73d44e3099ec9ae33a502e66',
    newRegisteredVendor: 'd-66241231a7934946ae4f7a1aa53cd09c',
    newPurchasedParts: 'd-79b6e7132be648e0908a35d7e7579533',
    addStockPartsFromSheet: 'd-947d76c4c01b4366ae10fa12b910641f',
    vendorRejected: 'd-d48f583c697b4f56963dbd29f09ed2ad',
    worksReportGenerated: 'd-f97233be03194902b3b56dd06782bc7b'
  });
}

function getSlackAddresses () {
  return Object.freeze({
    paidRequest: 'https://hooks.slack.com/services/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',
    deliveredRequest: 'https://hooks.slack.com/services/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',
    newRequest: 'https://hooks.slack.com/services/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',
    canceledRequest: 'https://hooks.slack.com/services/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',
    productionErrors: 'https://hooks.slack.com/services/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',
    validationErrors: 'https://hooks.slack.com/services/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',
    frontendErrors: 'https://hooks.slack.com/services/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',
    missingCars: 'https://hooks.slack.com/services/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',
    paytabs: 'https://hooks.slack.com/services/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',
    salesReport: 'https://hooks.slack.com/services/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',
    fulfillingUsed: 'https://hooks.slack.com/services/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',
    autoPricingReport: 'https://hooks.slack.com/services/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',
    techetex: 'https://hooks.slack.com/services/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',
    marketing: 'https://hooks.slack.com/services/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',
    smsNotifications: 'https://hooks.slack.com/services/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',
    sellerLeads: 'https://hooks.slack.com/services/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',
    logistics: 'https://hooks.slack.com/services/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',
    operation: 'https://hooks.slack.com/services/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',
    finance: 'https://hooks.slack.com/services/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',
    paidPremium: 'https://hooks.slack.com/services/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',
    failedRequests: 'https://hooks.slack.com/services/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',
    b2b: 'https://hooks.slack.com/services/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',
    tagdeer: 'https://hooks.slack.com/services/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',
    changedPricesAfterShipped: 'https://hooks.slack.com/services/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',
    hyperpay: 'https://hooks.slack.com/services/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',
    customerVoice: 'https://hooks.slack.com/services/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',
    'debugging-users': 'https://hooks.slack.com/services/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',
    'dev-notifications': 'https://hooks.slack.com/services/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',
    customerService: 'https://hooks.slack.com/services/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'
  });
}