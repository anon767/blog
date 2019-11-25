import Axios from 'axios';
import IBlog from '@/types/IBlog';

export class BlogService {

    public static create(blog: IBlog, callback: (status: boolean) => void) {
        Axios.post(this.API_ENDPOINT, blog)
            .then((response) => {
                console.log(response);
                callback(true);
            })
            .catch((error) => {
                console.log(error);
                callback(false);
            });
    }

    public static get(blog: IBlog, callback: (blog: IBlog | null) => void) {
        Axios.get(`${this.API_ENDPOINT}/${blog.id}`)
            .then((response) => {
                console.log(response);
                callback(response.data as IBlog);
            })
            .catch((error) => {
                console.log(error);
                callback(null);
            });
    }

    public static getAll(callback: (blog: [IBlog]) => void) {
        Axios.get(this.API_ENDPOINT)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    private static API_ENDPOINT: string = `${process.env.VUE_APP_SERVER_URL}/blog`;

}
