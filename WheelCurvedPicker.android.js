'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, ColorPropType, requireNativeComponent} from 'react-native';

const WheelCurvedPickerNativeInterface = {
    name: 'WheelCurvedPicker',
    propTypes: {
        ...View.propTypes,
        data: PropTypes.array,
        textColor: ColorPropType,
        lineColor: ColorPropType,
        textSize: PropTypes.number,
        itemStyle: PropTypes.object,
        itemSpace: PropTypes.number,
        onValueChange: PropTypes.func,
        selectedValue: PropTypes.any,
        selectedIndex: PropTypes.number,
    }
};

const WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPickerNativeInterface);

/**
 * WheelCurvedPicker
 */
class WheelCurvedPicker extends React.Component {

    /**
     * Picker PropTypes
     */
    propTypes: {
        ...View.propTypes,
        data: PropTypes.array,
        textColor: ColorPropType,
        textSize: PropTypes.number,
        itemStyle: PropTypes.object,
        itemSpace: PropTypes.number,
        lineColor: ColorPropType,
        onValueChange: PropTypes.func,
        selectedValue: PropTypes.any,
        selectedIndex: PropTypes.number,
    };

    /**
     * default props
     * @type {{}}
     */
    static defaultProps = {
        itemStyle: {color: "white", fontSize: 26},
        itemSpace: 20
    };

    constructor(props) {
        super(props);
        this.state = this.stateFromProps(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.stateFromProps(props));
    }

    render() {
        const selectedIndex = parseInt(this.state.selectedIndex);
        return <WheelCurvedPickerNative
            {...this.props}
            onValueChange={this.handleValueChange}
            data={this.state.items}
            textColor={this.state.textColor}
            textSize={this.state.textSize}
            fontFamily={this.state.fontFamily}
            lineColor={this.state.lineColor}
            selectedIndex={selectedIndex}/>;
    }

    stateFromProps(props) {
        let selectedIndex = 0,
            items = [];

        React.Children.forEach(props.children, function (child, index) {
            if (child.props.value === props.selectedValue) {
                selectedIndex = index;
            }
            items.push({value: child.props.value, label: child.props.label});
        });

        const textSize = props.itemStyle.fontSize;
        const textColor = props.itemStyle.color;
        const fontFamily = props.itemStyle.fontFamily;
        const lineColor = props.lineColor;

        return {selectedIndex, items, textSize, textColor, fontFamily, lineColor};
    }

    handleValueChange = (e) => {
        if (this.props.onValueChange) {
            this.props.onValueChange(e.nativeEvent.data);
        }
    }
}

/**
 * WheelCurvedPicker.Item
 */
class Item extends React.Component {
    propTypes: {
        value: PropTypes.any, // string or integer basically
        label: PropTypes.string,
    };

    /**
     * These items don't get rendered directly.
     * @returns {null}
     */
    render() {
        return null;
    }
}

WheelCurvedPicker.Item = Item;

module.exports = WheelCurvedPicker;
