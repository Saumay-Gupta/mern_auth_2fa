import mongoose, {Schema} from "mongoose";

const mailVerificationSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    otp:{
        type:String,
        required:true,
    },
    verified:{
        type:Boolean,
        default: false,
    },
    expiresAt:{
        type: Date,
        expires: '5m',
        default: Date.now
    },
})

const mailVerify = mongoose.model('mailVerify', mailVerificationSchema);

export default mailVerify;