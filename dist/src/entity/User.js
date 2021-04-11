var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var typeorm_1 = require("typeorm");
var Wallet_1 = require("./Wallet");
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(), 
        __metadata('design:type', Number)
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({
            nullable: true
        }), 
        __metadata('design:type', String)
    ], User.prototype, "firstName");
    __decorate([
        typeorm_1.Column({
            nullable: false,
            unique: true
        }), 
        __metadata('design:type', String)
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({
            nullable: false
        }), 
        __metadata('design:type', String)
    ], User.prototype, "passwordHash");
    __decorate([
        typeorm_1.Column({
            nullable: true
        }), 
        __metadata('design:type', String)
    ], User.prototype, "lastName");
    __decorate([
        typeorm_1.Column({
            nullable: true
        }), 
        __metadata('design:type', Date)
    ], User.prototype, "dob");
    __decorate([
        typeorm_1.OneToMany(function (type) { return Wallet_1.Wallet; }, function (wallet) { return wallet.owner; }),
        typeorm_1.JoinColumn(), 
        __metadata('design:type', Array)
    ], User.prototype, "wallets");
    User = __decorate([
        typeorm_1.Entity(), 
        __metadata('design:paramtypes', [])
    ], User);
    return User;
})(typeorm_1.BaseEntity);
exports.User = User;
//# sourceMappingURL=User.js.map