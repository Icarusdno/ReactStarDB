import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import PeoplePage from '../people-page';
import SwapiService from '../../services/swapi-service';
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
    selectedPerson: null,
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const { getPerson, getStarship, getPersonImage, getStarshipImage, getAllPeople } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={ 11 }
        getData={ getPerson }
        getImageUrl={ getPersonImage }>

        <Record field="gender" label="Gender" />
        <Record field="birthYear" label="Birth Year" />
        <Record field="eyeColor" label="Eye Color" />
        
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={ 5 }
        getData={ getStarship }
        getImageUrl={ getStarshipImage }>
      
        <Record field="model" label="Model" />
        <Record field="manufacturer" label="Manufacturer" />
        <Record field="costInCredits" label="Cost" />
        <Record field="length" label="Length" />
        <Record field="crew" label="Crew" />
        <Record field="passengers" label="Passengers" />
        <Record field="cargoCapacity" label="Cargo" />

      </ItemDetails>
    );
    
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={ this.swapiService }>
          <div class="stardb-app">
            <Header />
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