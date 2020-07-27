import React, { ReactElement } from 'react'
import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Start } from '.';
import { store } from '../../../app/store';
import { MaxPlayers } from '../constants';
// import {expect} from '@testing-library/jest-dom';

const renderWithRedux = (
    component: ReactElement,
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    }
}
afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithRedux(<Start />)
    expect(asFragment(<Start />)).toMatchSnapshot()
});

it('should have name input for all players', () => {
    const { getAllByTestId } = renderWithRedux(<Start />)
    const result = getAllByTestId(/^player-detail$/i);
    expect(result.length === MaxPlayers).toBeTruthy();
    
});

it('should dispatch on store and check name input', () => {
    const testName = 'First';
    store.dispatch({type: 'game/updatePlayer', payload: { player:0, property:'name', value: testName }, })

    setTimeout( ()=> {
    const { getAllByTestId } = renderWithRedux(<Start />)
    const result = getAllByTestId(/^player-detail-name$/i) as HTMLInputElement[];
    
    const isNameCorrect = result[0].value === testName;
    expect(isNameCorrect).toBeTruthy();
    }, 1000);
});