"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoicePaymentPdfDefinition = void 0;
const moment_1 = __importDefault(require("moment"));
async function generateInvoicePaymentPdfDefinition(invoice, payments, organization, organizationContact, totalPaid, translatedText) {
    const body = [];
    for (const payment of payments) {
        const currentPayment = [
            `${(0, moment_1.default)(invoice.dueDate).format(organization.dateFormat)}`,
            `${payment.amount}`,
            `${payment.recordedBy.name}`,
            `${payment.note ? payment.note : '-'}`,
            `${payment.overdue ? translatedText.overdue : translatedText.onTime}`
        ];
        body.push(currentPayment);
    }
    const widths = ['30%', '10%', '20%', '20%', '20%'];
    const tableHeader = [
        translatedText.paymentDate,
        translatedText.amount,
        translatedText.recordedBy,
        translatedText.note,
        translatedText.status
    ];
    const docDefinition = {
        watermark: {
            text: `${invoice.paid ? 'PAID' : ''}`,
            color: '#B7D7E8',
            opacity: 0.2,
            bold: true,
            fontSize: 108,
            italics: false
        },
        content: [
            {
                columns: [
                    {
                        fontSize: 16,
                        bold: true,
                        width: '*',
                        alignment: 'left',
                        text: `${translatedText.paymentsForInvoice} ${invoice.invoiceNumber}`,
                    }
                ]
            },
            ' ',
            ' ',
            {
                columns: [
                    {
                        width: '50%',
                        text: [
                            {
                                bold: true,
                                text: `${translatedText.receivedFrom}:\n`
                            },
                            `${organizationContact.name}`
                        ]
                    },
                ]
            },
            ' ',
            {
                columns: [
                    {
                        alignment: 'right',
                        text: [
                            {
                                bold: true,
                                text: `${translatedText.dueDate}: `
                            },
                            `${(0, moment_1.default)(invoice.dueDate).format(organization.dateFormat)}`
                        ]
                    }
                ]
            },
            {
                columns: [
                    {
                        alignment: 'right',
                        text: [
                            {
                                bold: true,
                                text: `${translatedText.totalValue}: `
                            },
                            `${invoice.currency} ${invoice.totalValue}`
                        ]
                    }
                ]
            },
            {
                columns: [
                    {
                        alignment: 'right',
                        text: [
                            {
                                bold: true,
                                text: `${translatedText.totalPaid}: `
                            },
                            ` ${invoice.currency} ${totalPaid}`
                        ]
                    }
                ]
            },
            {
                text: [
                    {
                        bold: true,
                        text: `${translatedText.receiver}:\n`
                    },
                    `${organization.name}`
                ]
            },
            ' ',
            ' ',
            {
                table: {
                    widths: widths,
                    body: [tableHeader, ...body]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return rowIndex % 2 === 0 ? '#E6E6E6' : null;
                    },
                    defaultBorder: false,
                    border: [false, false, false, false]
                }
            }
        ]
    };
    return docDefinition;
}
exports.generateInvoicePaymentPdfDefinition = generateInvoicePaymentPdfDefinition;
//# sourceMappingURL=generate-invoice-payment-pdf.js.map