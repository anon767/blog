import Axios from 'axios';
import IBlog from '@/types/IBlog';

export class LoginService {


    public static login(blog: IBlog, password: string, callback: (success: boolean) => void) {
        Axios.post(`${this.API_ENDPOINT}/${blog.id}`, password)
            .then((response) => {
                callback(true);
            })
            .catch((error) => {
                callback(false);
            });
    }

    private static API_ENDPOINT: string = `${process.env.VUE_APP_SERVER_URL}/login`;

}
