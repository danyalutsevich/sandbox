import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  reverseString(input: string): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeSampleModule');
