import { model } from "mongoose";
import currencySchema from "../schemas/Currency";

export default model("currency", currencySchema);