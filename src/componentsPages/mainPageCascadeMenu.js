// set listener for cascade menu in main page
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import config from "../services/config.json";
import UserImage from "../images/user.png";

/**
 * Component that alerts if you click outside of it
 */
export default class MainPageCascadeMenu extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.onclickButtonCloseMenu()
        }
    }

    render() {
        return <a ref={this.setWrapperRef}>
            <a className={localStorage.getItem("token") ? "fv-userInfoButtonCascade" : "fv-hideButtonRegister"}
               onClick={() => { // agar login bod ba click roie dokme in karo kon
                   this.props.onclickButtonHandleMenu()
               }}><h6><img
                src={this.props.avatar ? `${config.webapi}/images/user/${this.props.avatar}` : UserImage}/>{this.props.nameAndFamily}
            </h6></a>

            {this.props.children}</a>;
    }
}

MainPageCascadeMenu.propTypes = {
    children: PropTypes.element.isRequired,
};
