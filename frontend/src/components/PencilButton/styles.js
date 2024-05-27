import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    top: 580, // Độ cao từ đỉnh
    left: 320, // Khoảng cách từ bên trái
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 10,
    zIndex: 9999,
    borderWidth: 2,
    borderColor: "#03C0FC",
    borderRadius: 50,
    backgroundColor: "white",
  },
  btnIcon: {
    height: 40,
    width: 40,
  },
});

export default styles;
