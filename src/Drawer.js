import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';

class Drawer extends Component {
	mainWindow = null

	componentDidMount() {
		const mainWindowSelector = document.querySelectorAll(this.props.mainWindowClass)[0];
		this.mainWindow = mainWindowSelector;

		if (typeof(this.mainWindow) !== 'undefined') {
			this.mainWindow.style.transition = this.props.transition;
		}
	}

	componentWillReceiveProps(nextProps) {
		const { isDrawerOpen, position, width } = this.props;

		if (isDrawerOpen !== nextProps.isDrawerOpen) {
			if (typeof this.mainWindow !== 'undefined') {
				let transformStyle;
				if (nextProps.isDrawerOpen === true) {
					if (position === 'left') {
						transformStyle = `translateX(${width}px)`
					} else if (position === 'right') {
						transformStyle = `translateX(-${width}px)`
					}
				} else {
					transformStyle = 'translateX(0px)';
				}

				this.mainWindow.style.transform = transformStyle;
			}
		}
	}

	render() {
		const { isDrawerOpen, position, width } = this.props;
		let drawerClasses = "drawer";
		let drawerStyles = {
			width: width,
			[position]: -width
		};
		if (isDrawerOpen) {
			drawerClasses += " drawer-open";

			let transformStyle = '';
			// we may have more positions in the future like 'top' and 'bottom'
			if (position === 'left') {
				transformStyle = `translateX(${width}px)`
			} else if (position === 'right') {
				transformStyle = `translateX(-${width}px)`
			}

			drawerStyles = {
				...drawerStyles,
				transform: transformStyle
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
	position: 'left',
	transition: 'transform .2s ease-in-out, -webkit-transform .2s ease-in-out, -moz-transform .2s ease-in-out',
	width: 240
}

Drawer.propTypes = {
	isDrawerOpen: PropTypes.bool,
	mainWindow: PropTypes.string,
	// we may have more positions in the future like 'top' and 'bottom'
	position: PropTypes.oneOf('left', 'right'),
	transition: PropTypes.string,
	width: PropTypes.number
}

export default Drawer;
