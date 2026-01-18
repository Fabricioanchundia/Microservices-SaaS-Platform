"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalGuard = void 0;
const common_1 = require("@nestjs/common");
class InternalGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const internalKey = request.headers['x-internal-key'];
        if (internalKey !== process.env.INTERNAL_API_KEY) {
            throw new common_1.ForbiddenException('Internal access only');
        }
        return true;
    }
}
exports.InternalGuard = InternalGuard;
//# sourceMappingURL=internal.guard.js.map