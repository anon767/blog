use diesel;
use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use diesel::result::Error;

use crate::schema::blogs;
use crate::security::{Hashing, Security};

#[table_name = "blogs"]
#[derive(AsChangeset, Serialize, Deserialize, Queryable, Insertable)]
pub struct Blog {
    pub id: String,
    pub token: String,
}


impl Blog {
    pub fn create(blog: Blog, connection: &MysqlConnection) -> Result<Blog, Error> {
        let hashed_token: String = Security::hash_token(&blog.token);
        diesel::insert_into(blogs::table)
            .values(Blog { id: blog.id, token: hashed_token })
            .execute(connection)
            .expect("Error creating new blog");

        blogs::table.order(blogs::id.desc()).first(connection)
    }

    pub fn read(connection: &MysqlConnection) -> Result<Vec<Blog>, Error> {
        blogs::table.order(blogs::id).load::<Blog>(connection)
    }
    pub fn get(id: String, connection: &MysqlConnection) -> Result<Blog, Error> {
        blogs::table.find(id).first(connection)
    }

    pub fn update(id: String, blog: Blog, connection: &MysqlConnection) -> bool {
        diesel::update(blogs::table.find(id)).set(&blog).execute(connection).is_ok()
    }

    pub fn delete(id: String, connection: &MysqlConnection) -> bool {
        diesel::delete(blogs::table.find(id)).execute(connection).is_ok()
    }
}
