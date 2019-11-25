import {Component, Vue} from 'vue-property-decorator';
import WithRender from './showPost.html';


@WithRender
@Component
export default class ShowPost extends Vue {
    public blogName: String = location.hostname.split('.')[0];

}
