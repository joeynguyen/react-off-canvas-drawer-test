import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';

class Drawer extends Component {
	mainWindow = null

	componentDidMount() {
		this.mainWindow = document.querySelectorAll(this.props.mainWindowClass)[0];

		if (typeof(this.mainWindow) !== 'undefined') {
			this.mainWindow.style.transition = this.props.transition;
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isDrawerOpen !== nextProps.isDrawerOpen) {
			if (typeof this.mainWindow !== 'undefined') {
				const translateStyle = (nextProps.isDrawerOpen === true)
					? `translateX(${this.props.width}px)`
					: 'translateX(0px)';

				this.mainWindow.style.transform = translateStyle;
			}
		}
	}

	render() {
		let drawerClasses = "drawer";
		let drawerStyles = {
			width: this.props.width,
			left: -this.props.width
		};
		if (this.props.isDrawerOpen) {
			drawerClasses += " drawer-open";
			drawerStyles = {
				...drawerStyles,
				transform: 'translateX(240px)'
			}
		}
		return (
			<Portal>
				<div className={drawerClasses} style={drawerStyles}>
					<div className="drawer-bg"></div>

					<div className="drawer-content-wrapper">
						<div className="drawer-content">
							{this.props.children}
						</div>
					</div>
				</div>
			</Portal>
		);
	}
}

Drawer.defaultProps = {
	isDrawerOpen: false,
	mainWindowClass: '.ddc-document',
	transition: 'transform .2s ease-in-out, -webkit-transform .2s ease-in-out, -moz-transform .2s ease-in-out',
	width: 240
}

Drawer.propTypes = {
	isDrawerOpen: PropTypes.bool,
	mainWindow: PropTypes.string,
	transition: PropTypes.string,
	width: PropTypes.number
}

export default Drawer;
