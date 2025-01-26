export interface VoterInterface {
    fullName : string;
    authorised : boolean;
    votereceipt : string;
}

export interface VoteInterface {
    encryptedVote : string;
    createdAt : Date;
}