import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-just-checkbox';

const NationalPark = (props) => {
	return (
		<View style={styles.item}>
			<View style={styles.checkboxContainer}>
				<CheckBox
					isChecked={false}
					checkBoxSize={30}
					checkColor='white'
					circleCheckBox={true}
				/>
				<Text style={styles.itemText}>{props.text}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#e97451',
		opacity: 0.7,
		padding: 15,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	itemText: {
		maxWidth: '90%',
		paddingLeft: 15,
	},
	checkboxContainer: {
		flexDirection: 'row',
		marginBottom: 20,
		alignItems: 'center',
		flexWrap: 'wrap',
	},
});

export default NationalPark;
