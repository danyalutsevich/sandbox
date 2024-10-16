var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { ServiceEntity } from './Service.entity.js';
let UserEntity = class UserEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    OneToMany(() => ServiceEntity, (service) => service.owner),
    __metadata("design:type", Array)
], UserEntity.prototype, "services", void 0);
UserEntity = __decorate([
    Entity({ name: 'user' })
], UserEntity);
export { UserEntity };
//# sourceMappingURL=User.entity.js.map