import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from "./BurgerBuilder";
import Aux from '../../hoc/Aux/Aux';

configure({adapter: new Adapter()});

// Test identifier
describe('<BurgerBuilder />',() => {
    let wrapper;

    beforeEach( ()=> {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>); // shallow is Enzyme API
    });

    // Individual test
    it('should render <BuildControls /> when receiving ingredients.',() => {
        wrapper.setProps({ingredients: {salad: 0}});
        expect(wrapper.find(Aux)).toHaveLength(2); // expect is Jest API, Jest is able to do Mock also
    });
});
