# react-native-wheel-picker-extended
[![npm version](http://img.shields.io/npm/v/react-native-wheel-picker-extended.svg?style=flat-square)](https://npmjs.org/package/react-native-wheel-picker-extended "View this project on npm")
[![npm version](http://img.shields.io/npm/dm/react-native-wheel-picker-extended.svg?style=flat-square)](https://npmjs.org/package/react-native-wheel-picker-extended "View this project on npm")

## Introduction
Cross platform Picker component for React-native.

This repo is a fork of [react-native-wheel-picker](https://github.com/lesliesam/react-native-wheel-picker), I just add lineColor and fontFamily support.

Since picker is originally supported by ios while Android only supports a ugly Spinner component. If you want to have the same user behaviour, you can use this.

The android component is based on https://github.com/AigeStudio/WheelPicker which runs super fast and smoothly. It also supports curved effect which make it exactly the same looking and feel as the ios picker.
![](https://raw.githubusercontent.com/hadimostafapour/react-native-wheel-picker-extended/master/demo.gif)
![](https://raw.githubusercontent.com/hadimostafapour/react-native-wheel-picker-extended/master/demo_android.gif)

## How to use

Run command

For apps using RN 0.40 or higher, please run
```
npm i react-native-wheel-picker-extended --save
```

Add in settings.gradle
```
include ':react-native-wheel-picker-extended'
project(':react-native-wheel-picker-extended').projectDir = new File(settingsDir, '../node_modules/react-native-wheel-picker-extended/android')
```
Add in app/build.gradle
```
compile project(':react-native-wheel-picker-extended')
```
Modify MainApplication
```
    import com.zyu.ReactNativeWheelPickerPackage;
    ......

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(), new ReactNativeWheelPickerPackage()
        );
    }
```

## Example code
```
import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';


import Picker from 'react-native-wheel-picker-extended'
var PickerItem = Picker.Item;

export default class App extends Component<{}> {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem : 2,
			itemList: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
		};
	}

	onPickerSelect (index) {
		this.setState({
			selectedItem: index,
		});
	}

	onAddItem = () => {
		var name = '+ Item (N)';
		if (this.state.itemList.indexOf(name) == -1) {
			this.state.itemList.push(name);
		}
		this.setState({
			selectedItem: this.state.itemList.indexOf(name)
		});
	}

	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to React Wheel Picker!
				</Text>
				<Picker style={{width: 150, height: 180}}
					selectedValue={this.state.selectedItem}
					itemStyle={{color:"white", fontSize:26}}
					onValueChange={(index) => this.onPickerSelect(index)}>
						{this.state.itemList.map((value, i) => (
							<PickerItem label={value} value={i} key={"money"+value}/>
						))}
				</Picker>
				<Text style={{margin: 20, color: '#ffffff'}}>
					Selected Item：{this.state.itemList[this.state.selectedItem]}
				</Text>

				<Text style={{margin: 20, color: '#ffffff'}}
						onPress={this.onAddItem}>
			Add another item
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1962dd',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#ffffff',
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
```
