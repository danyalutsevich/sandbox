import { IPayment, IOrganization, IOrganizationContact, IInvoice } from '../../plugins/contracts/dist/index';
export declare function generateInvoicePaymentPdfDefinition(invoice: IInvoice, payments: IPayment[], organization: IOrganization, organizationContact: IOrganizationContact, totalPaid: number, translatedText?: any): Promise<{
    watermark: {
        text: string;
        color: string;
        opacity: number;
        bold: boolean;
        fontSize: number;
        italics: boolean;
    };
    content: (string | {
        columns: {
            fontSize: number;
            bold: boolean;
            width: string;
            alignment: string;
            text: string;
        }[];
        text?: undefined;
        table?: undefined;
        layout?: undefined;
    } | {
        columns: {
            width: string;
            text: (string | {
                bold: boolean;
                text: string;
            })[];
        }[];
        text?: undefined;
        table?: undefined;
        layout?: undefined;
    } | {
        columns: {
            alignment: string;
            text: (string | {
                bold: boolean;
                text: string;
            })[];
        }[];
        text?: undefined;
        table?: undefined;
        layout?: undefined;
    } | {
        text: (string | {
            bold: boolean;
            text: string;
        })[];
        columns?: undefined;
        table?: undefined;
        layout?: undefined;
    } | {
        table: {
            widths: string[];
            body: any[];
        };
        layout: {
            fillColor: (rowIndex: any, node: any, columnIndex: any) => string;
            defaultBorder: boolean;
            border: boolean[];
        };
        columns?: undefined;
        text?: undefined;
    })[];
}>;
