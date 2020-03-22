/* setup file */
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


/* test file */
import { shallow, mount, render } from 'enzyme';
import Login from '../components/Login.js';
import auth from '../reducers/auth';
import ReactDOM from 'react-dom';
import AdminTable from '../components/AdminTable';


/* 1. test running tests */
describe('TEST RUNNING TESTS', () => {
    it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });
});

/* 2. test rendering reducers */
describe('TEST RENDERING REDUCERS: auth.js', () => {
    it('auth : renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<auth/>, div);
    });
});


describe('TEST RENDERING REDUCERS: admin.js', () => {
    it('admin : renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<admin/>, div);
    });
});

