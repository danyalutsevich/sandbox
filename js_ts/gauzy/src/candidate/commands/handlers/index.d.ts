import { CandidateBulkCreateHandler } from './candidate.bulk.create.handler';
import { CandidateCreateHandler } from './candidate.create.handler';
import { CandidateHiredHandler } from './candidate.hired.handler';
import { CandidateRejectedHandler } from './candidate.rejected.handler';
import { CandidateUpdateHandler } from './candidate.update.handler';
export declare const CommandHandlers: (typeof CandidateBulkCreateHandler | typeof CandidateCreateHandler | typeof CandidateHiredHandler | typeof CandidateRejectedHandler | typeof CandidateUpdateHandler)[];
