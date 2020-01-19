import * as React from 'react';
import { Text, View, StyleSheet, Animated, Easing, Button } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-elements';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textScaleAnimValue: new Animated.Value(0),
      viewColorAnimValue: new Animated.Value(0),
      viewPosYAnimValue: new Animated.Value(0),
      fadeValue: new Animated.Value(0)
    };     
  }

  animateTextScale() {
    this.state.textScaleAnimValue.resetAnimation();
    Animated.timing(
      this.state.textScaleAnimValue,
      {
          toValue: 30,
          duration: 2000,
      }
    ).start();
  }

  animateViewColor() {
    this.state.viewColorAnimValue.resetAnimation();
    Animated.timing(
      this.state.viewColorAnimValue,
      {
        toValue: 1,
        duration: 5000
      }
    ).start();
  }

  animateViewPosY() {
    this.state.viewPosYAnimValue.resetAnimation();
    Animated.timing(
      this.state.viewPosYAnimValue,
      {
        toValue: 1,
        duration: 2000,
        // Code Challenge 1
        easing: Easing.bounce
        //easing: Easing.back
        //easing: Easing.quad
        // Challenge Question 1: I was hoping for a basic spring interaction effect similar to bounce, but for some reason it does not seem to do it. But I have to add something below:
        //easing: Easing.elastic
      }
    ).start();
  }

  animateFade() {
    this.state.fadeValue.resetAnimation();
    Animated.timing(
      this.state.fadeValue,
      {
        toValue: 1,
        duration: 5000
      }
    ).start();
  }

  render() {
    const bgColor = this.state.viewColorAnimValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['blue', 'yellow', 'red']
    });

    const posY = this.state.viewPosYAnimValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -100, -300]
    })

    let { fadeValue } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Play around with the Animated code in the editor to learn more about how it works.
        </Text>
        <Button
          title="Click To Animate Text Scale"
          onPress={() => this.animateTextScale()}
        />
        <Button
          title="Click To Animate View Color"
          onPress={() => this.animateViewColor()}
        />
        <Button
          title="Clck To Animate View Position Y"
          onPress={() => this.animateViewPosY()}
        />
        <Button
          title="Code Challenge #2 & #3: Fade In"
          color="red"
          onPress={() => this.animateFade()}
        />
        <Card>          
          <Animated.View style={{opacity: fadeValue, flex: 1, padding: 20, backgroundColor: bgColor, transform: [{translateY: posY}]}}>
            <Animated.Text style={{fontSize: this.state.textScaleAnimValue, textAlign: 'center'}}>
              Animate Me 
            </Animated.Text>
          </Animated.View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Challenge Question 2:
// 1. Created a separate button
// 2. Added on onPress event to trigger the function animateFade();
// 3. In the function animateFade, resetAnimation method is called to reset value to it's original value 0
// 4. Then Animated.timing is executed to reach it's final value of 1 with a duration 5000 for a noticeable effect.