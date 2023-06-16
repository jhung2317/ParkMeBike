import { Text, View, StyleSheet, ImageBackground, Button } from "react-native";
import { useState } from "react";
import Pressable from "./Pressable";
const Home = (props, props2) => {
  const [shouldShowText, setShouldShowText] = useState(false);
  const [shouldShowText2, setShouldShowText2] = useState(false);

  const handleButtonClick = () => {
    setShouldShowText(!shouldShowText);
  };
  const handleButtonClick2 = () => {
    setShouldShowText2(!shouldShowText2);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/colour.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.h1}>Welcome To Park Me Bike</Text>
        <Text style={styles.p}>
          Hello there! Thank you for using our App, we want to give you a little
          more information before you get started! We are a group of Northcoders
          students who are working together to develop a functional mobile
          Application using new tech stacks.
        </Text>
        <Pressable
          style={styles.pressableButton}
          title={shouldShowText2 ? "Hide More" : "Show More"}
          onPress={handleButtonClick}
        >
          <Text style={styles.buttonText}>Click to see more</Text>
        </Pressable>
        {shouldShowText && (
          <Text style={styles.p}>
            {" "}
            This App is designed to help cyclists find the perfect location to
            park their bikes. You can view locations within your area to take a
            break and save your bikes location. {props.text}{" "}
          </Text>
        )}
        <Pressable
          style={styles.pressableButton}
          title={shouldShowText2 ? "Hide More" : "Show More"}
          onPress={handleButtonClick2}
        >
          <Text style={styles.buttonText}>Click to see more</Text>
        </Pressable>
        {shouldShowText2 && (
          <Text style={styles.p}> random message {props2.text} </Text>
        )}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    image: "cover",
    borderRadius: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  h1: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    borderRadius: 10,
  },
  p: {
    marginTop: 20,
    padding: 8,
    textAlign: "center",
    color: "white",
    backgroundColor: "#000000c0",
    borderRadius: 20,
  },
  pressableButton: {
    borderRadius: 10,
    backgroundColor: "#000000c0",
    marginTop: 20,
    padding: 8,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
});
export default Home;
