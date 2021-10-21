import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/items";
import AsyncStorage from "@react-native-async-storage/async-storage";

let ID = 0;
let SCORE = 0;
// Short notation for Leisure, Self-Care, Productivity and Default
const category = ["L", "SC", "P", "D"];
const categoriesColour = ["#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
const testItems = [
  {
    name: "Finish a book",
    id: ID++,
    category: category[0],
    categoryColour: categoriesColour[0],
    points: 5,
  },
  {
    name: "Zoom call a friend i haven't met in a while",
    id: ID++,
    category: category[0],
    categoryColour: categoriesColour[0],
    points: 10,
  },
  {
    name: "Go to a yoga class",
    id: ID++,
    category: category[0],
    categoryColour: categoriesColour[0],
    points: 5,
  },
  {
    name: "Spend one hour on my favourite hobby",
    id: ID++,
    category: category[0],
    categoryColour: categoriesColour[0],
    points: 15,
  },
  {
    name: "Clean the bathroom",
    id: ID++,
    category: category[1],

    categoryColour: categoriesColour[1],
    points: 5,
  },
  {
    name: "Do one week of grocery shopping",
    id: ID++,
    category: category[1],

    categoryColour: categoriesColour[1],
    points: 7,
  },
  {
    name: "Get a haircut",
    id: ID++,
    category: category[1],

    categoryColour: categoriesColour[1],
    points: 5,
  },
  {
    name: "Submit that large project at work",
    id: ID++,
    category: category[2],

    categoryColour: categoriesColour[2],
    points: 15,
  },
  {
    name: "Ask my boss permission to take a relevant online course",
    id: ID++,
    category: category[2],
    categoryColour: categoriesColour[2],
    points: 15,
  },
];

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      // console.log(jsonValue);
      await AsyncStorage.setItem("storageKey", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storageKey");
      setTaskItems(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  function dynamicSortMultiple() {
    var props = arguments;
    return function (obj1, obj2) {
      var i = 0,
        result = 0,
        numberOfProperties = props.length;
      while (result === 0 && i < numberOfProperties) {
        result = dynamicSort(props[i])(obj1, obj2);
        i++;
      }
      return result;
    };
  }

  const handleAddTask = () => {
    Keyboard.dismiss();
    console.log(task);
    let newItem = taskItems.concat({
      name: task,
      id: ID++,
      category: category[3],
      categoryColour: categoriesColour[3],
      points: 10,
    });
    newItem.sort(dynamicSortMultiple("category", "name"));
    setTaskItems(newItem);
    storeData(newItem);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    SCORE += itemsCopy[index].points;
    itemsCopy.splice(index, 1);
    storeData(itemsCopy);
    setTaskItems(itemsCopy);
  };

  const editTask = (index, text) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].name = "edited";
    storeData(itemsCopy);
    setTaskItems(itemsCopy);
  };

  useEffect(() => {
    storeData(testItems.sort(dynamicSortMultiple("category", "name")));
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ maxHeight: "90%" }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.itemWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>General To-do's ✔️</Text>
              <Text>Score: {SCORE}</Text>
            </View>

            <View style={styles.item}>
              {taskItems.map((item, index) => {
                return (
                  <Task
                    key={index}
                    text={item.name}
                    edit={() => editTask(item.id, item.name)}
                    done={() => completeTask(index)}
                    category={item.category}
                    categoryColour={item.categoryColour}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "heigth"}
        style={styles.writeWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Add new item"}
          value={task}
          onChangeText={(text) => setTask(text)}
          onSubmitEditing={() => handleAddTask()}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  itemWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  item: {
    marginTop: 20,
  },
  writeWrapper: {
    marginTop: "auto",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
});
