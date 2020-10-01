import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import Filter from './Filters'
import { shallow, configure } from 'enzyme' 

configure({adapter: new Adapter()});

describe('Testing Filter Component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Filter/>
        )

        expect(wrapper )
    });
});

