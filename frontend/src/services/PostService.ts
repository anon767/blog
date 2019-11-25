import Axios from 'axios';
import IBlog from '@/types/IBlog';
import PostDTO from '@/types/PostDTO';
import IPost from '@/types/IPost';

export class PostService {

    public static create(post: PostDTO, callback: (status: boolean) => void) {
        Axios.post(this.API_ENDPOINT, post)
            .then((response) => {
                console.log(response);
                callback(true);
            })
            .catch((error) => {
                console.log(error);
                callback(false);
            });
    }

    public static get(id: String, callback: (blog: IBlog | null) => void) {
        Axios.get(`${this.API_ENDPOINT}/${id}`)
            .then((response) => {
                console.log(response);
                callback(response.data as IBlog);
            })
            .catch((error) => {
                console.log(error);
                callback(null);
            });
    }

    public static getAll(blog: IBlog, callback: (posts: IPost[]) => void) {
        Axios.get(`${this.API_ENDPOINT}/${blog.id}`)
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                callback([] as IPost[]);
            });
    }

    private static API_ENDPOINT: string = `${process.env.VUE_APP_SERVER_URL}/post`;

}
