import { Language } from './language.entity';
import { CrudService } from '../core';
import { MikroOrmLanguageRepository, TypeOrmLanguageRepository } from './repository';
export declare class LanguageService extends CrudService<Language> {
    constructor(typeOrmLanguageRepository: TypeOrmLanguageRepository, mikroOrmLanguageRepository: MikroOrmLanguageRepository);
    /**
     * Finds a single Language entity by its name.
     *
     * @param name The name of the Language entity to be found.
     * @returns A promise that resolves to the Language entity if found, or null if not found.
     */
    findOneByName(name: string): Promise<Language>;
}
