table! {
    blogs (id) {
        id -> Varchar,
        token -> Varchar,
    }
}

table! {
    posts (id) {
        id -> Nullable<Integer>,
        content -> Varchar,
        date -> Varchar,
        blog -> Varchar,
    }
}

allow_tables_to_appear_in_same_query!(
    blogs,
    posts,
);
