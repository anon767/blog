import {Component, Vue} from 'vue-property-decorator';
import WithRender from './blog.html';
import AddPostForm from '@/components/Post/AddPostForm';
import IPost from '@/types/IPost';
import {EventBus} from '@/services/Eventbus';
import Events from '@/types/Events';
import marked from 'marked';
import IBlog from '@/types/IBlog';
import {BlogService} from '@/services/BlogService';
import moment from 'moment';
import StatusMessage from '@/types/StatusMessage';
import {PostService} from '@/services/PostService';
import {LoginService} from '@/services/LoginService';


@WithRender
@Component({
    components: {
        addPostForm: AddPostForm,
    },
})
export default class BlogView extends Vue {
    public blog: IBlog = {id: location.hostname.split('.')[0], token: ''};
    public statusMessage: StatusMessage = {error: '', warning: '', success: ''};
    public error: String = '';
    public isNew: boolean = false;
    public noClaimIntended: boolean = false;
    public posts: IPost[] = [];

    public created() {
        EventBus.$on(Events.POST_ADDED, this.addPost);
        BlogService.get(this.blog, this.onBlogInfoGathered);
        PostService.getAll(this.blog, this.onPostsGathered);
    }

    public compile(input: string): string {
        return marked(input, {});
    }

    public register(): void {
        console.log(this.blog.token);
        BlogService.create(this.blog, this.blogClaimCallback);
    }

    public onBlogInfoGathered(blog: IBlog | null): void {
        if (blog === null) {
            this.isNew = true;
        }
    }

    public addPost(content: string): void {
        const post: IPost = {id: -1, content, date: moment(new Date()).format('MMM Do ha'), blog: this.blog.id};
        this.posts.unshift(post);
        PostService.create({
            id: -1,
            content: post.content,
            date: post.date,
            blog: post.blog,
            password: this.$store.state.authorized
                .get(this.blog.id) ? this.$store.state.authorized.get(this.blog.id).token : '',
        }, this.postPublishCallback);
    }

    public authorized(): boolean {
        return this.$store.state.authorized.get(this.blog.id) || this.isNew;
    }

    public loginCallback(success: boolean) {
        if (success) {
            this.$store.commit('setAuthorizedBlog', this.blog);
            this.$forceUpdate();
        } else {
            this.statusMessage.error = `wrong password for blog: ${this.blog.id}`;
        }
    }

    public login(): void {
        LoginService.login(this.blog, this.blog.token, this.loginCallback);

    }

    private postPublishCallback(status: boolean) {
        if (!status) {
            this.statusMessage.error = `An error occured while posting`;
        }
    }

    private blogClaimCallback(status: boolean): void {
        if (status) {
            this.statusMessage.success = `Successfully claimed Blog: ${this.blog.id}`;
            this.$store.commit('setAuthorizedBlog', this.blog);
        } else {
            this.statusMessage.error = `couldn't claim Blog: ${this.blog.id}`;
            this.blog.token = '';
        }
        this.noClaimIntended = true;
    }

    private onPostsGathered(posts: IPost[]) {
        this.posts = posts;
        if (posts.length <= 0) {
            this.statusMessage.warning = 'This Blog has no Posts so far :(';
        }
    }


}
