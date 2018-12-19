import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import PeoplePage from '../people-page';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import Row from '../row/';

import { SwapiServiceProvider } from '../swapi-service-context/';

import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components/';

import './app.css';
import ErrorBoundry from '../error-boundry';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      console.log('Service switched to', Service.name);

      return {
        swapiService: new Service()
      };
    });
  };

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={ this.state.swapiService }>
          <div className="stardb-app">
            <Header onServiceChange={ this.onServiceChange }/>
            {/* <RandomPlanet /> */}
            {/* <PeoplePage /> */}
            <PersonDetails itemId={ 4 } />
            <PlanetDetails itemId={ 4 } />
            <StarshipDetails itemId={ 9 } />
            <PersonList>
              { ({ name }) => <span>{ name }</span> }
            </PersonList>
            <PlanetList>
              { ({ name }) => <span>{ name }</span> }
            </PlanetList>
            <StarshipList>
              { ({ name }) => <span>{ name }</span> }
            </StarshipList>
            {/* <Row 
              left={ personDetails }
              right={ starshipDetails } /> */}
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}