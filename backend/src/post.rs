use diesel;
use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use diesel::result::Error;

use crate::schema::posts;

#[table_name = "posts"]
#[derive(AsChangeset, Serialize, Deserialize, Queryable, Insertable)]
pub struct Post {
    pub id: Option<i32>,
    pub content: String,
    pub date: String,
    pub blog: String,
}

#[derive(Serialize, Deserialize)]
pub struct PostRequest {
    pub id: Option<i32>,
    pub content: String,
    pub date: String,
    pub blog: String,
    pub password: String,
}


impl Post {
    pub fn create(post: Post, connection: &MysqlConnection) -> Result<Post, Error> {
        diesel::insert_into(posts::table)
            .values(&Post { id: None, ..post })
            .execute(connection)
            .expect("Error creating new post");

        posts::table.order(posts::id.desc()).first(connection)
    }
    pub fn read(blog_name: String, connection: &MysqlConnection) -> Result<Vec<Post>, Error> {
        posts::table.filter(posts::blog.eq(blog_name)).order(posts::id.desc()).load::<Post>(connection)
    }
    pub fn get(id: Option<i32>, connection: &MysqlConnection) -> Result<Post, Error> {
        posts::table.find(id).first(connection)
    }
}
