import { defaultClasses, pre, prop } from "@typegoose/typegoose";
import dayjs from "dayjs";
import { Types } from "mongoose";

@pre<MongoBase>("save", function (next) {
  this.set({ createdAt: dayjs().toDate() });
  next();
})
@pre<MongoBase>(["updateOne", "findOneAndUpdate"], function (next) {
  this.set({ updatedAt: dayjs().toDate() });
  next();
})
export class MongoBase
  extends defaultClasses.TimeStamps
  implements defaultClasses.Base
{
  _id!: Types.ObjectId;

  id!: string;

  @prop()
  deletedAt?: Date;
}
