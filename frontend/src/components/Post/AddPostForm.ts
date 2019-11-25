import {Component, Vue, Prop} from 'vue-property-decorator';
import WithRender from './add_post_form.html';
import Events from "@/types/Events";
import {EventBus} from "@/services/Eventbus";

@WithRender
@Component
export default class AddPostForm extends Vue {

    @Prop({type: String, default: 'Add Post'})
    public readonly buttonText!: string;

    public post: string = '';

    public emitPost(): void {
        EventBus.$emit(Events.POST_ADDED, this.post);
        this.post = '';
    }
}
