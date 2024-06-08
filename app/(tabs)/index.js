import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Page() {

  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.weekRow}>
        <TouchableOpacity onPress={() => router.push({ pathname: '/weekdays/monday' })} style={styles.button}>
          <Text style={styles.buttonText}>MONDAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: '/weekdays/tuesday' })} style={styles.button}>
          <Text style={styles.buttonText}>TUESDAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: '/weekdays/wednesday' })} style={styles.button}>
          <Text style={styles.buttonText}>WEDNESDAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: '/weekdays/thursday' })} style={styles.button}>
          <Text style={styles.buttonText}>THURSDAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: '/weekdays/friday' })} style={styles.button}>
          <Text style={styles.buttonText}>FRIDAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: '/weekdays/saturday' })} style={styles.button}>
          <Text style={styles.buttonText}>SATURDAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: '/weekdays/sunday' })} style={styles.button}>
          <Text style={styles.buttonText}>SUNDAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',  // Light background color
  },
  weekRow: {
    flexDirection: 'column',  // Arrange items in a column
    justifyContent: 'space-around',  // Space out the items evenly
    width: '100%',  // Take up full width of the container
    paddingHorizontal: 20,  // Horizontal padding for spacing
  },
  button: {
    backgroundColor: '#fff',  // White background color for each button
    borderColor: '#333',  // Dark border color
    borderWidth: 1,  // Border width for button
    borderRadius: 5,  // Rounded corners for the buttons
    paddingVertical: 15,  // Vertical padding for touch area
    paddingHorizontal: 10,  // Horizontal padding for touch area
    marginVertical: 5,  // Vertical margin between buttons
    alignItems: 'center',  // Center align text within button
    shadowColor: '#000',  // Shadow color for button
    shadowOffset: { width: 0, height: 2 },  // Shadow offset
    shadowOpacity: 0.3,  // Shadow opacity
    shadowRadius: 2,  // Shadow radius
    elevation: 3,  // Elevation for Android shadow
  },
  buttonText: {
    fontSize: 18,  // Font size for button text
    fontWeight: 'bold',  // Bold text
    color: '#333',  // Dark text color
  },
});
