/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type CarCustomizer = CollectionCustomizer<Schema, 'car'>;
export type CarRecord = TPartialRow<Schema, 'car'>;
export type CarConditionTree = TConditionTree<Schema, 'car'>;
export type CarFilter = TPaginatedFilter<Schema, 'car'>;
export type CarSortClause = TSortClause<Schema, 'car'>;
export type CarAggregation = TAggregation<Schema, 'car'>;

export type LocationCustomizer = CollectionCustomizer<Schema, 'location'>;
export type LocationRecord = TPartialRow<Schema, 'location'>;
export type LocationConditionTree = TConditionTree<Schema, 'location'>;
export type LocationFilter = TPaginatedFilter<Schema, 'location'>;
export type LocationSortClause = TSortClause<Schema, 'location'>;
export type LocationAggregation = TAggregation<Schema, 'location'>;

export type ServiceCustomizer = CollectionCustomizer<Schema, 'service'>;
export type ServiceRecord = TPartialRow<Schema, 'service'>;
export type ServiceConditionTree = TConditionTree<Schema, 'service'>;
export type ServiceFilter = TPaginatedFilter<Schema, 'service'>;
export type ServiceSortClause = TSortClause<Schema, 'service'>;
export type ServiceAggregation = TAggregation<Schema, 'service'>;

export type UserCustomizer = CollectionCustomizer<Schema, 'user'>;
export type UserRecord = TPartialRow<Schema, 'user'>;
export type UserConditionTree = TConditionTree<Schema, 'user'>;
export type UserFilter = TPaginatedFilter<Schema, 'user'>;
export type UserSortClause = TSortClause<Schema, 'user'>;
export type UserAggregation = TAggregation<Schema, 'user'>;


export type Schema = {
  'car': {
    plain: {
      'id': number;
      'model': string;
      'name': string;
    };
    nested: {};
    flat: {};
  };
  'location': {
    plain: {
      'id': number;
      'latitude': number;
      'longitude': number;
    };
    nested: {};
    flat: {};
  };
  'service': {
    plain: {
      'description': string;
      'id': number;
      'ownerId': number | null;
      'title': string;
    };
    nested: {
      'owner': Schema['user']['plain'] & Schema['user']['nested'];
    };
    flat: {
      'owner:email': string;
      'owner:id': number;
      'owner:name': string;
      'owner:password': string;
    };
  };
  'user': {
    plain: {
      'email': string;
      'id': number;
      'name': string;
      'password': string;
    };
    nested: {};
    flat: {};
  };
};
