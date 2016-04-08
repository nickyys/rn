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
  View,
  WebView,
  ToolbarAndroid,
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
var _url;

var showScreen = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    _url = 'http://10.10.0.68:81/demo/sql.php?id='+this.props.sid;
    //console.warn(_url);
    return {
      loading: true,
    };
  },

  render: function() {

    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
            style={styles.toolbar}
            titleColor="white"
            title="详细内容"
        />
        <WebView
        style={styles.webView}
        ref={'webview'}
        html={this.state.topicContent}
        automaticallyAdjustContentInsets={false}
        url={_url} />
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
