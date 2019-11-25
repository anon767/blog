#![feature(proc_macro_hygiene)]
#![feature(decl_macro)]
#[macro_use]
extern crate diesel;
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;

use rocket::http::Status;
use rocket_contrib::json::{Json, JsonValue};

use blog::Blog;

use crate::post::{Post, PostRequest};
use crate::security::{Hashing, Security};

mod security;
mod db;
mod cors;
mod schema;
mod blog;
mod post;

#[post("/", data = "<blog>")]
fn create(blog: Json<Blog>, connection: db::Connection) -> Result<Json<Blog>, Status> {
    let insert = Blog { id: String::from(&blog.id), ..blog.into_inner() };
    match Blog::create(insert, &connection) {
        Ok(blog) => Ok(Json(blog)),
        Err(_) => Err(Status::Forbidden),
    }
}

#[post("/", data = "<post>")]
fn create_post(post: Json<PostRequest>, connection: db::Connection) -> Result<Json<Post>, Status> {
    let saved_token: String = match Blog::get(post.blog.to_string(), &connection) {
        Ok(b) => b.token,
        Err(_) => "".into()
    };
    if saved_token == "" || Security::verify_token(&post.password, &saved_token) {
        match Post::create(Post { id: None, content: post.content.to_string(), date: post.date.to_string(), blog: post.blog.to_string() }, &connection) {
            Ok(post) => Ok(Json(post)),
            Err(_) => Err(Status::Forbidden),
        }
    } else {
        Err(Status::Forbidden)
    }
}

#[get("/")]
fn read(connection: db::Connection) -> Result<Json<Vec<String>>, Status> {
    match Blog::read(&connection) {
        Ok(blogs) => Ok(Json(blogs.iter().map(|b| b.id.to_string()).collect())),
        Err(_) => Err(Status::NoContent),
    }
}

#[get("/<blog>")]
fn read_posts(blog: String, connection: db::Connection) -> Result<Json<Vec<Post>>, Status> {
    match Post::read(blog, &connection) {
        Ok(posts) => Ok(Json(posts)),
        Err(_) => Err(Status::NoContent),
    }
}

#[get("/<id>")]
fn get(id: String, connection: db::Connection) -> Result<Json<String>, Status> {
    match Blog::get(id.to_string(), &connection) {
        Ok(blog) => Ok(Json(blog.id)),
        Err(_) => Err(Status::NotFound),
    }
}


#[put("/<id>", data = "<blog>")]
fn update(id: String, blog: Json<Blog>, connection: db::Connection) -> JsonValue {
    let update = Blog { id: id.to_string(), ..blog.into_inner() };
    json!({
        "success": Blog::update(id.clone(), update, &connection)
    })
}

#[delete("/<id>")]
fn delete(id: String, connection: db::Connection) -> JsonValue {
    json!({
        "success": Blog::delete(id, &connection)
    })
}

#[post("/<id>", data = "<password>")]
fn login(id: String, password: String, connection: db::Connection) -> Status {
    let saved_token: String = match Blog::get(id, &connection) {
        Ok(b) => b.token,
        Err(_) => "".into()
    };
    if saved_token == "" || Security::verify_token(&password, &saved_token) {
       return Status::Ok
    }
    Status::Forbidden
}


#[options("/")]
fn get_options() -> Status {
    Status::NoContent
}

fn main() {
    rocket::ignite()
        .manage(db::connect())
        .mount("/post", routes![create_post, get_options, read_posts])
        .mount("/blog", routes![create, update, delete, read, get, get_options])
        .mount("/login", routes![login])
        .attach(cors::CorsFairing)
        .launch();
}
