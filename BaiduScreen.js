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
var baiduScreen = React.createClass({

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
    fetch('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz&PAGE_SIZE=2' )
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
    //console.warn('请求是异步的:'+new Date().getMilliseconds());
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
        <View style={styles.container}>
        <Text style={styles.title}>{movie.title}</Text>
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
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
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
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

module.exports = baiduScreen;
