import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const Config = (props) => {
  [travail, setTravail] = useState(0);
  [pause, setPause] = useState(0);
  [repetitions, setRepetitions] = useState(0);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-around",
        marginTop: 150,
      }}
    >
      <TextInput
        selectionColor="#209d92"
        underlineColorAndroid="#209d92"
        placeholder="Temps de travail en minutes (45 max)"
        style={{ padding: 10 }}
        keyboardType="numeric"
        value={travail}
        onChangeText={(val) => setTravail(val)}
      />
      <TextInput
        selectionColor="#209d92"
        underlineColorAndroid="#209d92"
        placeholder="Temps de Pause en minutes (10 max)"
        style={{ padding: 10 }}
        keyboardType="numeric"
        value={pause}
        onChangeText={(val) => setPause(val)}
      />
      <TextInput
        selectionColor="#209d92"
        underlineColorAndroid="#209d92"
        placeholder="Nombre de répétitions"
        style={{ padding: 10 }}
        keyboardType="numeric"
        value={repetitions}
        onChangeText={(val) => setRepetitions(val)}
      />
      <Button
        onPress={() => props.updateConfig(travail, pause, repetitions)}
        title="update"
      />
    </View>
  );
};

export default Config;
