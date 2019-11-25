use bcrypt::{DEFAULT_COST, hash, verify};

pub struct Security;

pub trait Hashing {
    fn hash_token(input: &String) -> String;
    fn verify_token(input: &String, hashed: &String) -> bool;
}

 impl Hashing for Security {
    fn hash_token(input: &String) -> String {
        hash(input, DEFAULT_COST).unwrap()
    }

    fn verify_token(input: &String, hashed: &String) -> bool {
        verify(input, hashed).unwrap()
    }
}

