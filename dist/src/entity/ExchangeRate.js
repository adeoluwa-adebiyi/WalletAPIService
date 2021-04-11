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
var ExchangeRate = (function () {
    function ExchangeRate() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(), 
        __metadata('design:type', Number)
    ], ExchangeRate.prototype, "id");
    __decorate([
        typeorm_1.Column(), 
        __metadata('design:type', Number)
    ], ExchangeRate.prototype, "from");
    __decorate([
        typeorm_1.Column(), 
        __metadata('design:type', Number)
    ], ExchangeRate.prototype, "to");
    ExchangeRate = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(["from", "to"]), 
        __metadata('design:paramtypes', [])
    ], ExchangeRate);
    return ExchangeRate;
})();
exports.ExchangeRate = ExchangeRate;
//# sourceMappingURL=ExchangeRate.js.map