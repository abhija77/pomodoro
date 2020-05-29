import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";

export class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      secondes: 0,
      minutes: 0,
      interval: null,
      launchDisabled: false,
      travail: 0,
      color: "#000",
      done: 0,
      isWorking: true,
    };
  }

  pause() {
    return new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if (this.state.secondes == 1 && this.state.minutes == 0) {
          resolve();
        } else {
          this.update();
        }
      }, 1000);

      this.setState({
        minutes: this.props.pause,
        secondes: 0,
        isWorking: false,
        interval: interval,
      });
    });
  }

  update() {
    if (this.state.secondes == 20 && this.state.minutes == 0) {
      this.state.color = "#ff3e13";
    }
    if (this.state.secondes > 1) {
      this.setState({
        secondes: this.state.secondes - 1,
      });
    } else if (
      (this.state.secondes == 1 || this.state.secondes == 0) &&
      this.state.minutes > 0
    ) {
      this.setState({
        minutes: this.state.minutes - 1,
        secondes: 59,
      });
    }
  }

  travail() {
    return new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if (this.state.secondes == 1 && this.state.minutes == 0) {
          resolve();
        } else {
          this.update();
        }
      }, 1000);

      this.setState({
        interval: interval,
        launchDisabled: true,
      });
    });
  }

  async doCycle() {
    let prom = await this.travail().then(() => {
      this.setState({
        color: "#000",
      });
      clearInterval(this.state.interval);
    });

    let prom2 = await this.pause().then(() => {
      this.setState({
        color: "#000",
      });
      clearInterval(this.state.interval);
      this.setState({
        isWorking: true,
      });
    });
  }

  async updateTimer() {
    for (let i = 0; i < this.props.repetitions; i++) {
      await this.doCycle();
    }
    this.setState({ launchDisabled: false });
  }

  launchTimer() {
    this.setState({
      minutes: this.props.travail,
      secondes: 0,
    });
    this.updateTimer();
  }

  resetInterval() {
    clearInterval(this.state.interval);
    this.setState({
      secondes: 0,
      minutes: this.props.travail,
      launchDisabled: false,
    });
    this.state.color = "#000";
  }

  displayTimer(secondes, minutes) {
    const secondesDisplay = secondes < 10 ? `0${secondes}` : secondes;
    const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;

    return `${minutesDisplay} : ${secondesDisplay}`;
  }

  render() {
    return (
      <View style={{ marginBottom: 50 }}>
        <Title>{this.state.isWorking ? "Travail" : "Pause"}</Title>

        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 100,
            color: this.state.color,
          }}
        >
          {this.displayTimer(this.state.secondes, this.state.minutes)}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={this.state.launchDisabled ? styles.disabled : styles.start}
            onPress={() => this.launchTimer()}
            disabled={this.state.launchDisabled}
          >
            <Text>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reset}
            onPress={() => this.resetInterval()}
          >
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  start: {
    alignItems: "center",
    backgroundColor: "#37b400",
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: "#fff",
  },
  disabled: {
    alignItems: "center",
    backgroundColor: "#ced0d1",
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: "#fff",
  },
  stop: {
    alignItems: "center",
    backgroundColor: "#ff5d00",
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: "#fff",
  },
  reset: {
    alignItems: "center",
    backgroundColor: "#008bff",
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: "#fff",
  },
});
