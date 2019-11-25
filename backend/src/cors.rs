use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

pub struct CorsFairing;

impl Fairing for CorsFairing {
    fn info(&self) -> Info {
        Info {
            name: "CORS Fairing",
            kind: Kind::Response,
        }
    }

    fn on_response(&self, _request: &Request, response: &mut Response) {
        response.set_header(rocket::http::Header::new(
            "Access-Control-Allow-Origin",
            "*",
        ));
    }
}
