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
var Currency_1 = require("./Currency");
var User_1 = require("./User");
var Wallet = (function (_super) {
    __extends(Wallet, _super);
    function Wallet() {
        _super.apply(this, arguments);
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(), 
        __metadata('design:type', Number)
    ], Wallet.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.wallets; }), 
        __metadata('design:type', User)
    ], Wallet.prototype, "owner");
    __decorate([
        typeorm_1.Column({
            type: "numeric",
            default: 0.0,
            nullable: false
        }), 
        __metadata('design:type', Number)
    ], Wallet.prototype, "balance");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Currency_1.Currency; }), 
        __metadata('design:type', Currency)
    ], Wallet.prototype, "currency");
    Wallet = __decorate([
        typeorm_1.Entity(), 
        __metadata('design:paramtypes', [])
    ], Wallet);
    return Wallet;
})(typeorm_1.BaseEntity);
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map