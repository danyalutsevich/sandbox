import { SetMetadata } from '@nestjs/common';
import { FeatureEnum } from '../../../contracts/dist/index'
import { FEATURE_METADATA } from './../constants';

export const FeatureFlag = (feature: FeatureEnum) => SetMetadata(FEATURE_METADATA, feature);
