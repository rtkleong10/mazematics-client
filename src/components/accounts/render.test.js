/* setup file */
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


/* test file */
import { shallow, mount, render } from 'enzyme';
import Login from '../components/Login.js';
import authReducer from '../reducers/authReducer';
import ReactDOM from 'react-dom';
import AdminTable from '../components/AdminTable';


/* 1. test running tests */
describe('TEST RUNNING TESTS', () => {
    it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });
});

/* 2. test rendering reducers */
describe('TEST RENDERING REDUCERS: authReducer.js', () => {
    it('authReducer : renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<authReducer/>, div);
    });
});


describe('TEST RENDERING REDUCERS: adminReducer.js', () => {
    it('adminReducer : renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<adminReducer/>, div);
    });
});

