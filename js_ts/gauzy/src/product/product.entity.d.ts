import { IInvoiceItem, IImageAsset, IProductTranslatable, ITag, IWarehouse } from '../../plugins/contracts/dist/index';
import { ProductCategory, ProductTranslation, ProductType, ProductVariant, TranslatableBase, ProductOptionGroup } from '../core/entities/internal';
export declare class Product extends TranslatableBase implements IProductTranslatable {
    enabled: boolean;
    code: string;
    imageUrl: string;
    /**
     * ImageAsset
     */
    featuredImage?: IImageAsset;
    featuredImageId?: string;
    /**
     * ProductType
     */
    productType?: ProductType;
    productTypeId?: string;
    /**
     * ProductCategory
     */
    productCategory?: ProductCategory;
    productCategoryId?: string;
    /**
     * ProductTranslation
     */
    translations: ProductTranslation[];
    /**
     * ProductVariant
     */
    variants?: ProductVariant[];
    /**
     * ProductOptionGroup
     */
    optionGroups?: ProductOptionGroup[];
    /**
     * InvoiceItem
     */
    invoiceItems?: IInvoiceItem[];
    /**
     * WarehouseProduct
     */
    warehouses?: IWarehouse[];
    /**
     * Tag
     */
    tags?: ITag[];
    /**
     * ImageAsset
     */
    gallery?: IImageAsset[];
}
