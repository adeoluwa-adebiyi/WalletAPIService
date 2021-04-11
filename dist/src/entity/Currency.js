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
(function (CurrencySymbols) {
    CurrencySymbols[CurrencySymbols["NGN"] = "NGN"] = "NGN";
    CurrencySymbols[CurrencySymbols["USD"] = "USD"] = "USD";
})(exports.CurrencySymbols || (exports.CurrencySymbols = {}));
var CurrencySymbols = exports.CurrencySymbols;
var Currency = (function () {
    function Currency() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(), 
        __metadata('design:type', Number)
    ], Currency.prototype, "id");
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: CurrencySymbols,
            nullable: false
        }), 
        __metadata('design:type', String)
    ], Currency.prototype, "symbol");
    __decorate([
        typeorm_1.Column({
            nullable: true
        }), 
        __metadata('design:type', String)
    ], Currency.prototype, "description");
    Currency = __decorate([
        typeorm_1.Entity(), 
        __metadata('design:paramtypes', [])
    ], Currency);
    return Currency;
})();
exports.Currency = Currency;
//# sourceMappingURL=Currency.js.map