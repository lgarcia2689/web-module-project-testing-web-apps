import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput =screen.getByLabelText(/first name/i);
    //get first name and assign to firstNameInput

    userEvent.type(firstNameInput,"llll");
    //enter name less than 5

    const resultText = screen.queryByText(/error/i);
    //get error and assign to resultText

    expect(resultText).toBeInTheDocument();
    //check to see if error was rendered
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const firstName =screen.getByLabelText(/first name/i);
    const lastName =screen.getByLabelText(/last name/i);
    const emailName =screen.getByLabelText(/email/i);
    const button = screen.getByRole("button");

    userEvent.type(firstName, '');
    userEvent.type(lastName, '');
    userEvent.type(emailName, '');
    userEvent.click(button);
    const error = await screen.findAllByText(/error/i);

    expect(error.length).toEqual(3)
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstName =screen.getByLabelText(/first name/i);
    const lastName =screen.getByLabelText(/last name/i);
    const emailName =screen.getByLabelText(/email/i);
    const button = screen.getByRole("button");

    userEvent.type(firstName, 'llllll');
    userEvent.type(lastName, 'gggggg');
    userEvent.type(emailName, '');
    userEvent.click(button);
    const error = await screen.findAllByText(/error/i);

    expect(error.length).toEqual(1)
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    
    const emailName =screen.getByLabelText(/email/i);
    
    userEvent.type(emailName, '1234@email');
    
    const error = await screen.findAllByText(/email must be a valid email address/i);

    expect(error.length).toEqual(1)
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const firstName =screen.getByLabelText(/first name/i);
    const lastName =screen.getByLabelText(/last name/i);
    const emailName =screen.getByLabelText(/email/i);
    const button = screen.getByRole("button");

    userEvent.type(firstName, 'llllll');
    userEvent.type(lastName, '');
    userEvent.type(emailName, '1234@email.com');
    userEvent.click(button);
    const error = await screen.findAllByText(/error/i);

    expect(error.length).toEqual(1)
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstName =screen.getByLabelText(/first name/i);
    const lastName =screen.getByLabelText(/last name/i);
    const emailName =screen.getByLabelText(/email/i);
    const button = screen.getByRole("button");

    userEvent.type(firstName, 'llllll');
    userEvent.type(lastName, 'ggggg');
    userEvent.type(emailName, '1234@email.com');
    userEvent.click(button);


    
    // expect('llllll'.length).toEqual(2);
    // expect('ggggg').toBeInTheDocument();
    // expect('1234@email.com').toBeInTheDocument();
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const theMessage = "Ratione ratione or fugit but voluptate yet in but commodo, or ipsum. Adipisicing. Officia. Et error commodo. Exercitationem nihil or consequat, but enim doloremque. Commodo natus, explicabo adipisci, or occaecat and tempora so iure. Odit nostrum, but quis, quis. Aliquid ab or architecto or sequi commodo so aute. Do aliquid but consequat culpa. Aliquip et for esse iure amet yet quo so suscipit. Error odit or nesciunt inventore. Quisquam. Duis nostrud so ipsam. Ipsum quia for culpa or et. Ab. Modi. Culpa si enim. Quae natus for si, so eu so qui laboris. Vel. Ratione.";

    const firstName =screen.getByLabelText(/first name/i);
    const lastName =screen.getByLabelText(/last name/i);
    const emailName =screen.getByLabelText(/email/i);
    const message =screen.getByLabelText(/message/i);
    const button = screen.getByRole("button");

    userEvent.type(firstName, 'llllll');
    userEvent.type(lastName, 'ggggg');
    userEvent.type(emailName, '1234@email.com');
    userEvent.type(message, theMessage);
    userEvent.click(button);
    
});