import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pomodoro } from "./Pomodoro";
import Config from "./Config";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      timeTravail: 1,
      timePause: 1,
      repetitions: 4,
    };
  }

  updateTimeTravail(time) {
    this.setState({ timeTravail: time });
  }

  updateTimePause(time) {
    this.setState({ timePause: time });
  }

  updateConfig(travail, pause, repet) {
    this.setState({
      timeTravail: travail,
      timePause: pause,
      repetitions: repet,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Pomodoro
          name="Ayoub"
          travail={this.state.timeTravail}
          pause={this.state.timePause}
          repetitions={this.state.repetitions}
        />

        <Text>Temps de travail : {this.state.timeTravail}</Text>
        <Text>Temps de pause : {this.state.timePause}</Text>
        <Text>Nb de répétitions : {this.state.repetitions}</Text>

        <Config updateConfig={(x, y, z) => this.updateConfig(x, y, z)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});
