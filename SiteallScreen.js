
'use strict';

var React = require('react-native');
var {
  PixelRatio,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var cssVar = require('cssVar');

var _navigator ;

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => _navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRandomRoute())}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          三
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        综合查询
      </Text>
    );
  },

};

function newRandomRoute() {
  return {
    title: '#' + Math.ceil(Math.random() * 1000),
  };
}

var SiteallScreen = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    return {};
  },

  render: function() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={newRandomRoute()}
        renderScene={(route, navigator) => (
          <ScrollView style={styles.scene}>
            <View><Text style={styles.messageText}>{route.content}</Text></View>
            <View style={styles.pd5}><Text style={styles.blueText}>中文网站排行榜_alexa排行 - 爱站网站排行榜</Text></View>
            <View style={styles.row}>
              <View style={[styles.pd5, styles.rowitem]}><Text>世界排名 三月平均 2,352</Text></View>
              <View style={[styles.pd5, styles.rowitem]}><Text>ALEXA IP≈ 216,000 PV≈ 820,800</Text></View>
              <View style={[styles.pd5, styles.rowitem]}><Text>域名年龄 7年11个月15天</Text></View>
              <View style={[styles.pd5, styles.rowitem]}><Text>网站速度 电信响应：34.106毫秒</Text></View>
            </View>
          </ScrollView>
        )}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  },

});

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: '#1e8fce',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: cssVar('fbui-accent-blue'),
  },
  blueText: {
    color: '#069',
  },
  scene: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  pd5: {
    padding: 5,
  },
  row: {
    margin: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rowitem: {    
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

module.exports = SiteallScreen;
