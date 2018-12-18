import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import SwapiService from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

	state = {
		selectedPerson: 11
	};

	onPersonSelected = (id) => {
		this.setState({
			selectedPerson: id
		});
	};
	
	render() {
		
		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		const itemList = (
			<ItemList
				onItemSelected={ this.onPersonSelected }
				getData={ this.swapiService.getAllPeople }>

				{ (item) => (
					`${ item.name } (${ item.gender }, ${ item.birthYear })`
				) }
			</ItemList>
		);
		const itemDetails = (
			<ErrorBoundry>
				<ItemDetails itemId={ this.state.selectedPerson } />
			</ErrorBoundry>
		);

		return (
				<Row
					left={ itemList }
					right={ itemDetails } />
		);
	}
}