import * as React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

export namespace App {
	export interface Props extends RouteComponentProps<void> {
	}

	export interface State {
	}
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}
