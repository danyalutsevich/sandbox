import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { Candidate } from "./candidate.entity";
export declare class CandidateSubscriber extends BaseEntityEventSubscriber<Candidate> {
    /**
    * Indicates that this subscriber only listen to Candidate events.
    */
    listenTo(): typeof Candidate;
    /**
     * Processes a Candidate entity after it's loaded.
     * This function calculates the average rating from the candidate's feedbacks if they are available.
     * It also sets the 'alreadyHired' property based on the candidate's status and the validity of the hiredDate.
     *
     * @param entity The Candidate entity that has been loaded.
     */
    afterEntityLoad(entity: Candidate): Promise<void>;
    /**
     * Performs preprocessing on a Candidate entity before its creation.
     * This function checks if a rejectDate is present and valid for the candidate,
     * and if so, updates the candidate's status to REJECTED.
     *
     * @param entity The Candidate entity that is about to be created.
     */
    beforeEntityCreate(entity: Candidate): Promise<void>;
}
