import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
  },

  switchSmall: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    marginLeft: 5,
  },
  switchDefault: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    marginLeft: 10,
  },
  switchLarge: {
    transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
    marginLeft: 30,
  },
});

export default styles;
