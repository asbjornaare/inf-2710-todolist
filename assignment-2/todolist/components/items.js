import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onLongPress={props.edit}>
        <View style={styles.leftItem}>
          <View
            style={[styles.square, { backgroundColor: props.categoryColour }]}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {props.category}
            </Text>
          </View>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.done}>
        <View style={styles.circle}></View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  leftItem: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    height: 25,
    width: 25,
    backgroundColor: "#55BCF6",
    borderRadius: 7,
    opacity: 0.6,
    marginRight: 10,
    alignContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#35A7FF",
  },
  itemText: {
    maxWidth: "80%",
  },
});

export default Task;
