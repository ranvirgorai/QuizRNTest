import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import _ from "lodash";

import Card from "./Card";

const LABEL_COLOR = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
];
const cardHeight = 60;
const deviceHeight = Dimensions.get("window").height;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsTodo: [],
      cardDone: [],

      dashBoard: [[], []],
    };
    this.addCard = this.addCard.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
    this.addColumn = this.addColumn.bind(this);
  }

  addCard(columnIndex) {
    let { dashBoard } = this.state;
    let currentColumn = dashBoard[columnIndex];
    currentColumn.push({ labelColorIndex: 0 });
    dashBoard[columnIndex] = currentColumn;
    this.setState(dashBoard);
  }

  handleLabel(columnIndex, index) {
    let { dashBoard } = this.state;
    let currentColumn = dashBoard[columnIndex];
    let currentCardData = currentColumn[index];
    currentCardData.labelColorIndex =
      currentCardData.labelColorIndex === LABEL_COLOR.length - 1
        ? 0
        : currentCardData.labelColorIndex + 1;
    dashBoard[columnIndex][index] = currentCardData;
    this.setState(dashBoard);
  }

  addColumn() {
    let { dashBoard } = this.state;
    dashBoard.push([]);
    this.setState({ dashBoard });
  }

  render() {
    let maxCardCanAdd = Math.round((deviceHeight - 160) / cardHeight);
    let { dashBoard } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.addColumnBtn]}
            onPress={this.addColumn}
            disabled={false}
          >
            <Text style={styles.addBtnText}> + </Text>
          </TouchableOpacity>

          {dashBoard.map((data, columnIndex) => {
            return (
              <View style={styles.column}>
                <View style={styles.columnContent}>
                  {data.map((item, index) => {
                    return (
                      <Card
                        num={index + 1}
                        labelColor={LABEL_COLOR[item.labelColorIndex]}
                        handleLabel={() => this.handleLabel(columnIndex, index)}
                      />
                    );
                  })}
                </View>

                <TouchableOpacity
                  style={[
                    styles.addBtn,
                    data.length === maxCardCanAdd
                      ? { backgroundColor: "#c9c9c9" }
                      : {},
                  ]}
                  onPress={() => this.addCard(columnIndex)}
                  disabled={data.length === maxCardCanAdd}
                >
                  <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>
              </View>
            );
          })}
     
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f2f2f2",
    padding: 8,
    paddingTop: 20,
    flexDirection: "row",
  },

  column: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#FFF",
    padding: 8,
    margin: 8,
  },
  columnContent: {
    flex: 1,
  },
  addBtn: {
    height: 50,
    backgroundColor: "#412243",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  addColumnBtn: {
    height: 50,
    backgroundColor: "#412243",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    position: "absolute",
    zIndex: 100,
    right: 10,
    top: 10,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
