import { Image } from "expo-image";
import { useState } from "react";
import { Asset } from "expo-asset";
import {
  FlipType,
  SaveFormat,
  useImageManipulator,
} from "expo-image-manipulator";
import { Button, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const IMAGE = Asset.fromModule(require("@/assets/images/react-logo.png"));

export default function HomeScreen() {
  const [image, setImage] = useState<any>(IMAGE);
  const context = useImageManipulator(image.uri);

  const rotate90andFlip = async () => {
    context.rotate(90);
    const image = await context.renderAsync();
    const result = await image.saveAsync({
      format: SaveFormat.PNG,
    });

    console.log(result.uri);

    setImage(result);
  };

  const crop = async () => {
    context.crop({
      originX: 0,
      originY: 0,
      width: 100,
      height: 100,
    });

    const image = await context.renderAsync();
    const result = await image.saveAsync({
      format: SaveFormat.PNG,
    });

    console.log(result.uri);
    setImage(result);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image.localUri || image.uri }}
          style={styles.image}
        />
      </View>
      <Button title="Rotate and Flip" onPress={rotate90andFlip} />
      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Crop" onPress={crop} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
