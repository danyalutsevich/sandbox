import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JoinColumn, RelationId, JoinTable } from 'typeorm';
import { IsOptional } from 'class-validator';
import {
	ICandidate,
	ICandidateInterview,
	ICandidateSource,
	PayPeriodEnum,
	ICandidateEducation,
	ICandidateExperience,
	ICandidateFeedback,
	ICandidateDocument,
	CandidateStatusEnum,
	ICandidateSkill,
	IOrganizationPosition,
	IOrganizationEmploymentType,
	IOrganizationDepartment,
	IContact,
	ITag,
	IUser,
	IEmployee,
	ID
} from  '../../plugins/contracts/dist/index';
import {
	CandidateDocument,
	CandidateEducation,
	CandidateExperience,
	CandidateFeedback,
	CandidateInterview,
	CandidateSkill,
	CandidateSource,
	Contact,
	Employee,
	OrganizationDepartment,
	OrganizationEmploymentType,
	OrganizationPosition,
	Tag,
	TenantOrganizationBaseEntity,
	User
} from '../core/entities/internal';
import { ColumnNumericTransformerPipe } from './../shared/pipes';
import {
	ColumnIndex,
	MultiORMColumn,
	MultiORMEntity,
	MultiORMManyToMany,
	MultiORMManyToOne,
	MultiORMOneToMany,
	MultiORMOneToOne,
	VirtualMultiOrmColumn
} from './../core/decorators/entity';
import { MikroOrmCandidateRepository } from './repository/mikro-orm-candidate.repository';

@MultiORMEntity('candidate', { mikroOrmRepository: () => MikroOrmCandidateRepository })
export class Candidate extends TenantOrganizationBaseEntity implements ICandidate {
	@ApiPropertyOptional({ type: () => Number })
	@MultiORMColumn({
		nullable: true,
		type: 'numeric',
		transformer: new ColumnNumericTransformerPipe()
	})
	rating?: number;

	@ApiPropertyOptional({ type: () => Date })
	@MultiORMColumn({ nullable: true })
	valueDate?: Date;

	@ApiPropertyOptional({ type: () => Date })
	@MultiORMColumn({ nullable: true })
	appliedDate?: Date;

	@ApiPropertyOptional({ type: () => Date })
	@MultiORMColumn({ nullable: true })
	hiredDate?: Date;

	@ApiProperty({ type: () => String, enum: CandidateStatusEnum })
	@MultiORMColumn({ nullable: true, default: CandidateStatusEnum.APPLIED })
	status?: CandidateStatusEnum;

	@ApiPropertyOptional({ type: () => Date })
	@MultiORMColumn({ nullable: true })
	rejectDate?: Date;

	@ApiPropertyOptional({ type: () => String, maxLength: 500 })
	@MultiORMColumn({ length: 500, nullable: true })
	candidateLevel?: string;

	@ApiPropertyOptional({ type: () => Number })
	@MultiORMColumn({ nullable: true })
	reWeeklyLimit?: number; // Recurring Weekly Limit (hours)

	@ApiPropertyOptional({ type: () => String, maxLength: 255 })
	@MultiORMColumn({ length: 255, nullable: true })
	billRateCurrency?: string;

	@ApiPropertyOptional({ type: () => Number })
	@MultiORMColumn({ nullable: true })
	billRateValue?: number;

	@ApiPropertyOptional({ type: () => Number })
	@MultiORMColumn({ nullable: true })
	minimumBillingRate?: number;

	@ApiProperty({ type: () => String, enum: PayPeriodEnum })
	@MultiORMColumn({ nullable: true })
	payPeriod?: PayPeriodEnum;

	@ApiPropertyOptional({ type: () => String })
	@MultiORMColumn({ nullable: true })
	cvUrl?: string;

	/** Additional virtual columns */
	@VirtualMultiOrmColumn()
	ratings?: number;

	@VirtualMultiOrmColumn()
	alreadyHired?: boolean;

	/*
	|--------------------------------------------------------------------------
	| @OneToOne
	|--------------------------------------------------------------------------
	*/

	/**
	 * Contact
	 */
	@MultiORMOneToOne(() => Contact, (contact) => contact.candidate, {
		/** Indicates if relation column value can be nullable or not. */
		nullable: true,

		/** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
		cascade: true,

		/** Database cascade action on delete. */
		onDelete: 'SET NULL',

		/** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
		owner: true
	})
	@JoinColumn()
	contact?: IContact;

	@ApiPropertyOptional({ type: () => String })
	@IsOptional()
	@RelationId((it: Candidate) => it.contact)
	@ColumnIndex()
	@MultiORMColumn({ nullable: true, relationId: true })
	contactId?: ID;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/
	@MultiORMManyToOne(() => OrganizationPosition, {
		/** Indicates if relation column value can be nullable or not. */
		nullable: true
	})
	@JoinColumn()
	organizationPosition?: IOrganizationPosition;

	@ApiPropertyOptional({ type: () => String })
	@IsOptional()
	@RelationId((it: Candidate) => it.organizationPosition)
	@ColumnIndex()
	@MultiORMColumn({ nullable: true, relationId: true })
	organizationPositionId?: ID;

	/*
	|--------------------------------------------------------------------------
	| @OneToOne
	|--------------------------------------------------------------------------
	*/

	@ApiProperty({ type: () => CandidateSource })
	@MultiORMOneToOne(() => CandidateSource, (candidateSource) => candidateSource.candidate, {
		/** Indicates if relation column value can be nullable or not. */
		nullable: true,

		/** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
		cascade: true,

		/** Database cascade action on delete. */
		onDelete: 'CASCADE',

		/** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
		owner: true
	})
	@JoinColumn()
	source?: ICandidateSource;

	@ApiProperty({ type: () => String })
	@RelationId((it: Candidate) => it.source)
	@ColumnIndex()
	@MultiORMColumn({ nullable: true, relationId: true })
	sourceId?: ID;

	/**
	 * User
	 */
	@ApiProperty({ type: () => User })
	@MultiORMOneToOne(() => User, {
		/** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
		cascade: true,

		/** Database cascade action on delete. */
		onDelete: 'CASCADE',

		/** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
		owner: true
	})
	@JoinColumn()
	user: IUser;

	@ApiProperty({ type: () => String })
	@RelationId((it: Candidate) => it.user)
	@ColumnIndex()
	@MultiORMColumn({ relationId: true })
	userId: ID;

	/**
	 * Employee
	 */
	@ApiProperty({ type: () => Employee })
	@MultiORMOneToOne(() => Employee, (employee) => employee.candidate, {
		/** Indicates if relation column value can be nullable or not. */
		nullable: true,

		/** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
		owner: true
	})
	@JoinColumn()
	employee?: IEmployee;

	@ApiProperty({ type: () => String })
	@RelationId((it: Candidate) => it.employee)
	@ColumnIndex()
	@MultiORMColumn({ nullable: true, relationId: true })
	employeeId?: ID;

	/*
	|--------------------------------------------------------------------------
	| @OneToMany
	|--------------------------------------------------------------------------
	*/
	/**
	 * Represents a one-to-many relationship between the Candidate and CandidateEducation entities.
	 * Each candidate can have multiple educations associated with them.
	 * When a candidate is deleted, the related education entries are set to NULL.
	 */
	@MultiORMOneToMany(() => CandidateEducation, (education) => education.candidate, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	educations?: ICandidateEducation[];

	/**
	 * Represents a one-to-many relationship between the Candidate and CandidateInterview entities.
	 * Each candidate can have multiple interviews associated with them.
	 * When a candidate is deleted, the related interview entries are set to NULL.
	 */
	@MultiORMOneToMany(() => CandidateInterview, (interview) => interview.candidate, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	interview?: ICandidateInterview[];

	/**
	 * Represents a one-to-many relationship between the Candidate and CandidateExperience entities.
	 * Each candidate can have multiple experiences associated with them.
	 * When a candidate is deleted, the related experience entries are set to NULL.
	 */
	@MultiORMOneToMany(() => CandidateExperience, (experience) => experience.candidate, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	experience?: ICandidateExperience[];

	/**
	 * Represents a one-to-many relationship between the Candidate and CandidateSkill entities.
	 * Each candidate can have multiple skills associated with them.
	 * When a candidate is deleted, the related skill entries are set to NULL.
	 */
	@MultiORMOneToMany(() => CandidateSkill, (skill) => skill.candidate, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	skills?: ICandidateSkill[];

	/**
	 * Represents a one-to-many relationship between the Candidate and CandidateDocument entities.
	 * Each candidate can have multiple documents associated with them.
	 * When a candidate is deleted, the related document entries are set to NULL.
	 */
	@MultiORMOneToMany(() => CandidateDocument, (document) => document.candidate, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	documents?: ICandidateDocument[];

	/**
	 * Represents a one-to-many relationship between the Candidate and CandidateFeedback entities.
	 * Each candidate can have multiple feedbacks associated with them.
	 * When a candidate is deleted, the related feedback entries are set to NULL.
	 */
	@MultiORMOneToMany(() => CandidateFeedback, (feedback) => feedback.candidate, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	feedbacks?: ICandidateFeedback[];

	/*
	|--------------------------------------------------------------------------
	| @ManyToMany
	|--------------------------------------------------------------------------
	*/

	@ApiProperty({ type: () => Tag, isArray: true })
	@MultiORMManyToMany(() => Tag, (tag) => tag.candidates, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		pivotTable: 'tag_candidate',
		owner: true,
		joinColumn: 'candidateId',
		inverseJoinColumn: 'tagId'
	})
	@JoinTable({
		name: 'tag_candidate'
	})
	tags: ITag[];

	/**
	 * Organization Departments
	 */
	@MultiORMManyToMany(() => OrganizationDepartment, (department) => department.candidates, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE'
	})
	organizationDepartments?: IOrganizationDepartment[];

	/**
	 * Organization Employment Types
	 */
	@MultiORMManyToMany(() => OrganizationEmploymentType, (employmentType) => employmentType.candidates)
	organizationEmploymentTypes?: IOrganizationEmploymentType[];
}
