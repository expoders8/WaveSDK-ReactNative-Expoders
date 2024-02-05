/* eslint-disable prettier/prettier */
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet,Dimensions} from 'react-native';
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    engine: {position: 'absolute',right: 0},
    body: {flex: 1,backgroundColor: '#cccccc'},
    header:{flexDirection: 'row', justifyContent: 'space-between', padding:10},
    headerLeft:{width: 80, height: 30},
    headerRight:{width: 20, height: 20},
    contentarea:{padding:10},
    text:{fontSize:16,paddingBottom:15},
    input: {height: 32,margin: 8,borderWidth: 0,alignItems: 'center',padding:0, justifyContent: 'center',color:'black'},
    debugBg:{backgroundColor: '#fff',padding:10},
    itemName: {fontSize: 12, color: '#000',padding: 2,fontWeight: 'bold'},
    itemRssi: {fontSize: 12, color: '#000',padding: 2,fontWeight: 'bold'},
    icon: {width: 200,height: 40,marginVertical: 50,marginBottom:15,marginTop:0},
    BLEButton: {backgroundColor: '#ffffff',borderRadius: 5,padding:0,borderBottomColor:'red',elevation: 10,shadowColor: '#52006A'},
    BLEButtonSend:{backgroundColor: '#343434',padding: 18},
    blebtnText: {color: '#fff', fontSize:18,textAlign:'center',fontWeight:'bold'},
    settingbody:{backgroundColor:'#ffffff', width:'100%', maxHeight:deviceHeight * 0.4},
    settinghead:{textAlign: 'center',paddingTop:10,paddingBottom:18,fontWeight:'bold',borderBottomWidth :1,
    borderBottomColor: '#ccc'},
    SettingRSSI:{flexDirection: 'row', justifyContent: 'space-between',padding:18,borderBottomWidth :1,
    borderBottomColor: '#ccc'},
    settingAbout:{flexDirection: 'row',justifyContent: 'space-between',padding:18,borderBottomWidth :1,
    borderBottomColor: '#ccc', marginBottom:200},
    settingAboutIcon:{width: 15, height: 15,marginRight:10},

    centeredView: {flex: 1,justifyContent: 'center', marginTop: 22},
      modalView: {margin: 50,backgroundColor: 'white',borderRadius: 5,padding: 20,
      shadowColor: '#000',
       shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      RssiInputBtn: {padding:0},
      Rssiinput: {height: 32,fontSize:16,marginBottom: 30,padding:0,color:'#000',borderBottomWidth: 2,borderBottomColor: '#cccccc',},
      RSSIBtn:{flexDirection: 'row',justifyContent: 'space-between',paddingLeft:50,paddingRight:50},
      RSSIBtnBg:{paddingTop:5,paddingBottom:5,paddingLeft:20,paddingRight:20},
      textStyle1: {color: '#0095ff',fontWeight: 'bold'},
      textStyle2: {color: '#000',fontWeight: 'bold'},
      modalhead: { fontSize:20, textAlign:'left',fontWeight:'bold'},



    footer: {color: Colors.dark,fontSize: 12,fontWeight: '600',padding: 4,paddingRight: 12,textAlign: 'right'},
});
