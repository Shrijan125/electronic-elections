import { VoterInterface } from '@/lib/types';
import mongoose, { Schema } from 'mongoose';

const voterSchema = new Schema<VoterInterface>({
    fullName: {
        type: String,
        required: true,
        unique: true,
    },
    authorised: {
        type: Boolean,
        default: false,
    },
    votereceipt : {
        type: String,
        default: '',
    }
});

export const Voter = mongoose.models.Voter || mongoose.model('Voter', voterSchema);
