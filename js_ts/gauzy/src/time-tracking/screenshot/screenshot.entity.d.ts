import { FileStorageProvider, IScreenshot, ITimeSlot, IUser } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class Screenshot extends TenantOrganizationBaseEntity implements IScreenshot {
    file: string;
    thumb?: string;
    recordedAt?: Date;
    storageProvider?: FileStorageProvider;
    /**
     * Indicates whether the image or screenshot is work-related.
     */
    isWorkRelated?: boolean;
    /**
     * Description of the image or screenshot.
     */
    description?: string;
    /**
     * Applications associated with the image or screenshot.
     */
    apps?: string | string[];
    /** Additional virtual columns */
    fullUrl?: string;
    thumbUrl?: string;
    /**
     * TimeSlot
     */
    timeSlot?: ITimeSlot;
    timeSlotId?: ITimeSlot['id'];
    /**
     * User
     */
    user?: IUser;
    userId?: IUser['id'];
}
