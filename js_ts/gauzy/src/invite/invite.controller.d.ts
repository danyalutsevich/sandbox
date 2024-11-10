import { ICreateEmailInvitesOutput, IInviteAcceptInput, LanguagesEnum, IOrganizationContactAcceptInviteInput, IOrganizationContact, IPagination, IInvite, InviteActionEnum } from '../../plugins/contracts/dist/index';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Request } from 'express';
import { Invite } from './invite.entity';
import { InviteService } from './invite.service';
import { PaginationParams } from './../core/crud';
import { CreateInviteDTO, ResendInviteDTO, ValidateInviteByCodeQueryDTO, ValidateInviteQueryDTO } from './dto';
export declare class InviteController {
    private readonly inviteService;
    private readonly commandBus;
    private readonly queryBus;
    constructor(inviteService: InviteService, commandBus: CommandBus, queryBus: QueryBus);
    /**
     * This method handles the creation of multiple email invites.
     * It receives the invite details and language code from the request body,
     * validates the input, and uses a command bus to execute the invite creation command.
     *
     * @param entity - The data transfer object containing invite details.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to the output of the email invite creation process.
     */
    createManyWithEmailsId(entity: CreateInviteDTO, languageCode: LanguagesEnum): Promise<ICreateEmailInvitesOutput>;
    /**
     * This method handles resending an invite.
     * It receives the invite details and language code from the request body,
     * validates the input, and uses a command bus to execute the invite resend command.
     *
     * @param entity - The data transfer object containing invite details to be resent.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to either the update result or the invite entity.
     */
    resendInvite(entity: ResendInviteDTO, languageCode: LanguagesEnum): Promise<UpdateResult | Invite>;
    /**
     * Validate invite by token and email
     *
     * @param options - The query parameters containing email and token.
     * @returns A promise that resolves to the invite if found.
     */
    validateInviteByToken(options: ValidateInviteQueryDTO): Promise<any>;
    /**
     * Validate invite by code and email
     *
     * @param body - The body containing email and code.
     * @returns A promise that resolves to the invite if found.
     */
    validateInviteByCode(body: ValidateInviteByCodeQueryDTO): Promise<any>;
    /**
     * Accept employee/user/candidate invite.
     *
     * @param entity - The data transfer object containing invite acceptance details.
     * @param origin - The origin header from the request.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to the result of the invite acceptance process.
     */
    acceptInvitation(entity: IInviteAcceptInput, origin: string, languageCode: LanguagesEnum): Promise<any>;
    /**
     * Accept organization contact invite.
     *
     * @param input - The data transfer object containing invite acceptance details.
     * @param request - The incoming HTTP request, used to extract the origin header.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to the result of the invite acceptance process.
     */
    acceptOrganizationContactInvite(input: IOrganizationContactAcceptInviteInput, request: Request, languageCode: LanguagesEnum): Promise<any>;
    /**
     * Update an existing record
     *
     * @param id - The ID of the organization contact to update.
     * @param request - The incoming HTTP request, used to extract the origin header and the inviter user.
     * @param languageCode - The language code for localization purposes.
     * @returns A promise that resolves to the updated organization contact.
     */
    inviteOrganizationContact(id: string, request: Request, languageCode: LanguagesEnum): Promise<IOrganizationContact>;
    /**
     * Find all invites of the current user.
     *
     * @returns Promise<IPagination<IInvite>> Invite object or NotFoundException
     */
    getCurrentUserInvites(): Promise<IPagination<IInvite>>;
    /**
     * Find all invites.
     *
     * @param options - The query parameters for pagination and filtering.
     * @returns A promise that resolves to a paginated list of invites.
     */
    findAll(options: PaginationParams<Invite>): Promise<IPagination<IInvite>>;
    /**
     * Delete record.
     *
     * @param id - The ID of the record to delete.
     * @returns A promise that resolves to the delete result.
     */
    delete(id: IInvite['id']): Promise<DeleteResult>;
    /**
     * Handle invitation response by accepting or rejecting it.
     *
     * @param id The ID of the invitation.
     * @param action The action to perform (Accept or Reject).
     * @param request The request object.
     * @param languageCode The language code for internationalization.
     * @returns Promise<any>
     */
    handleInvitationResponse(id: IInvite['id'], action: InviteActionEnum, request: Request, languageCode: LanguagesEnum): Promise<any>;
}
