/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';


var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  WebView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ToolbarAndroid,
  Alert,
  BackAndroid,
} = React;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});
var _navigator ;
var showScreen = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    return {
        dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },

  fetchData : function(){
    fetch('http://10.10.0.68:81/demo/sql.php?id=2' )
    .then((response) => response.json()) //response.text())
    .then((responseData) => {
      this.setState({
           dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
           loaded: true,
         });
    })
    .catch((error) => {
      console.warn(error);
    }).done();
    console.warn('请求是异步的:'+new Date().getMilliseconds());
  },
  renderLoadingView: function() {
      return (
        <View style={styles.container}>
         <Text>
           Loading movies...
          </Text>
        </View>
      );
  },

  renderMovie: function(movie) {
     return (
        <View style={styles.container2}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.content}>{movie.content}</Text>
       </View>
    );
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
            style={styles.toolbar}
            titleColor="white"
            title="demo"
        />
        <ListView
           dataSource={this.state.dataSource}
           renderRow={this.renderMovie}
           style={styles.listView}
         />
        </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    },

    container2: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
  button: {
    width : 180,
    height: 50,
    justifyContent:'center',
    backgroundColor: '#e2e2e2',
    alignItems:'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  title: {
      height:20,
      fontSize: 18,
      marginBottom: 8,
      textAlign: 'left',
  },
  content: {
      fontSize: 14,
      textAlign: 'left',
  },

  listView: {
      paddingTop: 0,
      backgroundColor: '#F5FCFF',
  },
});

module.exports = showScreen;
