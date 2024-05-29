import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {

  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text onPress={()=>router.push({pathname: '/weekdays/monday'})} style={styles.subtitle}>MONDAY</Text>
      <Text onPress={()=>router.push({pathname: '/weekdays/tuesday'})} style={styles.subtitle}>TUESDAY</Text>
      <Text onPress={()=>router.push({pathname: '/weekdays/wednesday'})} style={styles.subtitle}>WEDNESDAY</Text>
      <Text onPress={()=>router.push({pathname: '/weekdays/thursday'})} style={styles.subtitle}>THURSDAY</Text>
      <Text onPress={()=>router.push({pathname: '/weekdays/friday'})} style={styles.subtitle}>FRIDAY</Text>
      <Text onPress={()=>router.push({pathname: '/weekdays/saturday'})} style={styles.subtitle}>SATURDAY</Text>
      <Text onPress={()=>router.push({pathname: '/weekdays/sunday'})} style={styles.subtitle}>SUNDAY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
