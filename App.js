import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import {
	ImageBackground,
	KeyboardAvoidingView,
	TouchableOpacity,
	Platform,
	StyleSheet,
	Text,
	View,
	TextInput,
	Keyboard,
	ScrollView,
	AsyncStorage,
} from 'react-native';
import NationalPark from './components/NationalPark';
import mountain from './images/mountain.jpg';
import * as Font from 'expo-font';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';

const image = mountain;

// const getFonts = () =>
// 	Font.loadAsync({
// 		'oswald-regular': require('./assets/fonts/Oswald-Regular.ttf'),
// 	});

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);
	const [parkItems, setParkItems] = useState([]);
	const [park, setPark] = useState();

	const save = async () => {
		try {
			await AsyncStorage.setItem('myNationalPark', park);
		} catch (err) {
			alert(err);
		}
	};

	const load = async () => {
		try {
			let park = await AsyncStorage.getItem('myNationalPark');

			if (park != null) {
				setPark(park);
			}
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		load();
	}, []);

	// if (fontsLoaded) {
	// 	return <App />;
	// } else {
	// 	return (
	// 		<AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
	// 	);
	// }

	const handleAddPark = () => {
		Keyboard.dismiss();
		setParkItems([...parkItems, park]);
		setPark(null);
	};

	const completeTask = (index) => {
		let parkItemsCopy = [...parkItems];
		parkItemsCopy.splice(index, 1);
		setParkItems(parkItemsCopy);
		// console.log('hi');
	};

	return (
		<ImageBackground source={image} resizeMode='cover' style={styles.container}>
			<ScrollView>
				<Text style={styles.sectionTitle}>
					Becky's U.S National Parks Adventures
				</Text>
				<View style={styles.tasksWrapper}>
					<View style={styles.items}>
						{parkItems.map((item, index) => {
							return (
								<TouchableOpacity
									key={index}
									onPress={() => completeTask(index)}>
									<NationalPark text={item} />
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.writeTaskWrapper}>
				<TextInput
					style={styles.input}
					placeholder={'Write a task'}
					value={park}
					onChangeText={(text) => setPark(text)}
				/>
				<TouchableOpacity onPress={() => handleAddPark()}>
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tasksWrapper: {
		paddingTop: 5,
		paddingHorizontal: 20,
		backgroundColor: 'white',
		opacity: 0.8,
		borderRadius: 10,
		width: '100%',
	},
	sectionTitle: {
		paddingTop: 80,
		paddingBottom: 20,
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
		// fontFamily: 'oswald-regular',
	},
	items: {
		marginTop: 20,
	},
	writeTaskWrapper: {
		position: 'absolute',
		bottom: 60,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		width: 250,
		backgroundColor: 'white',
		borderRadius: 60,
		borderColor: '#085e72',
		borderWidth: 1,
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: 'white',
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#085e72',
	},
	addText: {},
});
