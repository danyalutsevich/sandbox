import { IInvoice, IOrganization, IOrganizationContact } from '../../plugins/contracts/dist/index';
export declare function generateInvoicePdfDefinition(invoice: IInvoice, organization: IOrganization, organizationContact: IOrganizationContact, translatedText?: any, language?: string): Promise<{
    watermark: {
        text: string;
        color: string;
        opacity: number;
        bold: boolean;
        fontSize: number;
        italics: boolean;
    };
    content: (string | {
        columns: ({
            width: string;
            text: (string | {
                bold: boolean;
                text: string;
            })[];
            fontSize?: undefined;
            bold?: undefined;
            alignment?: undefined;
        } | {
            fontSize: number;
            bold: boolean;
            width: string;
            alignment: string;
            text: string;
        })[];
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
            widths: any;
            body: any[];
        };
        layout: {
            fillColor: (rowIndex: any, node: any, columnIndex: any) => string;
            defaultBorder: boolean;
            border: boolean[];
        };
        columns?: undefined;
        text?: undefined;
    } | {
        columns: ({
            width: string;
            text: string;
            bold?: undefined;
            alignment?: undefined;
        } | {
            bold: boolean;
            alignment: string;
            width: string;
            text: string;
        } | {
            alignment: string;
            width: string;
            text: string;
            bold?: undefined;
        })[];
        text?: undefined;
        table?: undefined;
        layout?: undefined;
    } | {
        columns: {
            bold: boolean;
            alignment: string;
            text: string;
        }[];
        text?: undefined;
        table?: undefined;
        layout?: undefined;
    })[];
}>;
