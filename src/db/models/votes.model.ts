import { VoteInterface } from '@/lib/types';
import mongoose, { Schema } from 'mongoose';

const voteSchema = new Schema<VoteInterface>({
    encryptedVote: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Vote = mongoose.models.Vote || mongoose.model('Vote', voteSchema);
