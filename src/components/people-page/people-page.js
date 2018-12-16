import React, { Component } from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './people-page.css';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

	state = {
		selectedPerson: 5,
		hasError: false
	};

	componentDidCatch() {
		this.setState({
			hasError: true
		});
	}

	onPersonSelected = (id) => {
		this.setState({
			selectedPerson: id
		});
	};
	
	render() {
		
		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		return (
			<div className="row mb2">
				<div className="col-md-6">
					<ItemList
						onItemSelected={ this.onPersonSelected }
						getData={ this.swapiService.getAllPeople }
						renderItem={ (item) => `${ item.name } (${ item.gender }, ${ item.birthYear })` } />
				</div>
				<div className="col-md-6">
					<PersonDetails personId={ this.state.selectedPerson }/>
				</div>
			</div>
		);
	}
}