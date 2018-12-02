import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Avoid Jest warning due to loading jspdf
HTMLCanvasElement.prototype.getContext = () => {};
