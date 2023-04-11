import { defaultClasses } from "@typegoose/typegoose";
import { Types } from "mongoose";
export declare class MongoBase extends defaultClasses.TimeStamps implements defaultClasses.Base {
    _id: Types.ObjectId;
    id: string;
    deletedAt?: Date;
}
//# sourceMappingURL=mongo-base.d.ts.map