import React from 'react';
import AdminPage from './index';
import { render, cleanup } from '@testing-library/react'
import { renderWithReduxRouter } from '../../../utils/tests.js';
import axiosMock from 'axios';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithReduxRouter(<AdminPage />);
    expect(asFragment()).toMatchSnapshot();
})

// it('Should load users', () => {
//     const userList =  [
//         {
//             name: "Bob",
//             email: "bob@test.com",
//             role:"ROLE_STUDENT"
//         },
//         {
//             name: "Sam",
//             email: "sam@test.com",
//             role:"ROLE_TEACHER"
//         }
//     ]

//     jest.mock('axios');
//     () => {axiosMock.get.mockResolvedValue({
//         data: {
//             content: userList
//         }
//     })}

//     const expectedProps = {
//         usersLoading: false,
//         users: userList,
//         // listUsers: {},
//         // createUser: {},
//         // deleteUser: {},
//         // updateUser: {},
//     };
//     const adminPage = renderWithReduxRouter(<AdminPage />)
//     // const propsErr = checkPropTypes(AdminPage.propTypes, expectedProps, 'props', AdminPage.name)
//     expect(adminPage.prop()).toEqual(expectedProps);
//     jest.clearAllMocks();
// });