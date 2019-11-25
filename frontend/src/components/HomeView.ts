import {Component, Vue} from 'vue-property-decorator';
import WithRender from './home.html';

@WithRender
@Component
export default class HomeView extends Vue {
}
