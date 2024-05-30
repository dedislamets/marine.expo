import React, {Component, useEffect,useState} from 'react'
import { StyleSheet, Text, View,SafeAreaView, FlatList, SectionList, TouchableOpacity, Image,useWindowDimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
    useFonts,
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular ,
    NunitoSans_700Bold
  } from '@expo-google-fonts/nunito-sans';
import { API_URL, PUTIH } from '../../utils/constans';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
// import SkeletonContent from "react-native-skeleton-content";

const RenderProduct = ({ item,index }) => {
    const { width } = useWindowDimensions();
    const minHeight = (width - 30 - 12) / 2;
    return (
        <View>
          <View style={styles.productCardThumb}>
            <Image source={{ uri: 'https://marinebusiness.co.id/uploads/iklan/' + item.nama_foto }} style={[styles.productCardImage, { minHeight }]} />  
          </View>
          <View
              style={{
                position: 'absolute',
                top: 10, 
                height: 30,
                width: 30,
                right:10,
                borderRadius: 20,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#40d5f0',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 2
              }}>
              <Ionicons name="heart" color={'#40d5f0'} size={19} />
            </View>
            <View style={styles.productCardContent}>
                <Text numberOfLines={1} style={styles.itemText}>{item.title}</Text>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="calendar" color={'#a6a6a6'} size={12} style={{ paddingRight: 5, paddingTop: 2}} />
                    <Text style={styles.itemTahun}>Tahun {item.year_build}</Text>
                </View>
                <Text style={styles.itemTahun}>Area: {item.area}</Text>
                <Text style={styles.itemTahun}>Duration: {item.duration}  {item.duration_uom}</Text>
                {/* <View style={{flexDirection:'row', marginBottom: 5}}>
                    <Icon name="place" color={'#a6a6a6'} size={12} style={{ paddingRight: 5, paddingTop: 2}} />
                    <Text style={styles.itemTahun}>{item.lokasi}</Text>
                </View> */}
                <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row', width:'100%' }}>
                <NumberFormat
                  value={item.price_charter}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp'}
                  renderText={(value, props) => <Text style={styles.itemPrice} {...props}>{value}</Text>}
                />
                {/* <Text style={{color: '#8d8d8d', paddingTop: 2}}>/{item.satuan}</Text> */}
                </View>
          </View>
      </View>
    );
  };
const ListChartering = ({navigation}) => {
    let [fontsLoaded, error] = useFonts({ 
        NunitoSans_200ExtraLight,
        NunitoSans_400Regular,
        NunitoSans_700Bold
      })

    const [dataKapal, setDataKapal] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // setTimeout(() => {
      //   setLoading(false);
      // },2000)
      fetchData()
      
  
    },[dataKapal]);

    const fetchData = ()=> {
      fetch(`${API_URL}/api/chartering`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(async res => { 
          try {
            const jsonRes = await res.json();
            if (res.status == 200) {
              var data_get = [];
              if(jsonRes.status){
                data_get.push({
                  horizontal: true,
                  title: jsonRes.title,
                  data: []
                })
              }
  
              for (const key in jsonRes.data) {
                if (jsonRes.data.hasOwnProperty(key)) {
                  data_get[0].data.push(jsonRes.data[key]);
                }
  
              }
              setDataKapal(data_get);
              setLoading(false);
            } else {
              
            }
          } catch (err) {
              // console.log(err);
          };
      })
      .catch(err => {
          console.log(err);
      });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <SectionList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            stickySectionHeadersEnabled={false}
            sections={dataKapal}
            renderSectionHeader={({ section }) => (
              // <SkeletonContent
              //   containerStyle={{flex: 1, width: '100%'}}
              //   isLoading={loading}
              //   layout={[
              //     {
              //       flexDirection: 'row',
              //       children: [
              //         {
              //           flexDirection: 'column',
              //           children: [
              //             {
              //               width: '100%',
              //               height: 200,
              //               marginBottom: 10,
              //               marginTop: 10,
              //             },
              //             {
              //               width: 160,
              //               height: 20,
              //               marginBottom: 5,
              //             },
              //             {
              //               width: 160,
              //               height: 10,
              //             }
              //           ]
              //         },
              //         {
              //           flexDirection: 'column',
              //           marginLeft: 25,
              //           children: [
              //             {
              //               width: '100%',
              //               height: 200,
              //               marginBottom: 10,
              //               marginTop: 10,
              //             },
              //             {
              //               width: 160,
              //               height: 20,
              //               marginBottom: 5,
              //             },
              //             {
              //               width: 160,
              //               height: 10,
              //             }
              //           ]
              //         },
                      
              //       ]
              //     },
                  
              //   ]}
              //   >
                <FlatList style={styles.flatlist}
                  nestedScrollEnabled={true}
                  numColumns={2}                
                  columnWrapperStyle={styles.row}
                  data={section.data}
                  keyExtractor={(item, index) => item.id }
                  renderItem={({ item,index }) =>
                    <View key={index} style={styles.colItem}>
                      <TouchableOpacity  
                        containerStyle={styles.productCardContainer}
                        style={styles.productCard}
                        onPress={() => navigation.navigate("Details",item)} >
                          <RenderProduct item={item} />
                      </TouchableOpacity>
                    </View>
                    }
                  showsHorizontalScrollIndicator={false}
                />
              // {/* </SkeletonContent> */}
            )}
            renderItem={({ item, section }) => {
              return null;
            }}
          />
        </SafeAreaView>
    )
}

export default ListChartering

const SECTIONS_PRODUK = [
    {
      title: 'Sewa Kapal',
      data: [
        {
          key: '1',
          text: 'Kapal Bulk Carrier',
          uri: 'https://images.pexels.com/photos/799871/pexels-photo-799871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          tahun: '1994',
          price: 'Rp 25.000.000',
          satuan: 'Hari',
          lokasi: 'Banten, Jawa Barat'
        },
        {
          key: '2',
          text: 'Kapal Floating Production',
          uri: 'https://images.pexels.com/photos/7306966/pexels-photo-7306966.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          tahun: '1994',
          price: 'Rp 25.000.000',
          satuan: 'Hari',
          lokasi: 'Banten, Jawa Barat'
        },
  
        {
          key: '3',
          text: 'Item text 3',
          uri: 'https://images.pexels.com/photos/8417259/pexels-photo-8417259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          tahun: '1994',
          price: 'Rp 25.000.000',
          satuan: 'Hari',
          lokasi: 'Banten, Jawa Barat'
        },
        
      ],
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:10,
      backgroundColor: '#fff',
      fontFamily: 'NunitoSans_400Regular'
    },
    sectionHeader: {
      fontWeight: '800',
      fontSize: 18,
      color: '#000',
      marginTop: 20,
      marginBottom: 5,
      textAlign: 'left',
      fontFamily: 'NunitoSans_400Regular'
    },
    lihatsemua: {
      fontWeight: '800',
      fontSize: 16,
      color: '#40d5f0',
      marginBottom: 5,
      textAlign: 'right',
      marginTop: 22,
      fontFamily: 'NunitoSans_400Regular'
    },
    signupText1: {
      fontSize:18,
      fontFamily: 'NunitoSans_400Regular'
    },
    signupText2: {
      fontSize:18,
      paddingBottom:10,
      fontFamily: 'NunitoSans_400Regular'
    },
    slide: {
      borderRadius:10
    },
    inputView: {
      // flex: 1,
      flexDirection: 'row',
      backgroundColor: "#fff",
      borderRadius: 30,
      height: 45,
      marginBottom: 20,
      alignItems: "flex-start",
      borderColor: '#40d5f0',
      borderWidth:2,
      fontFamily: 'NunitoSans_400Regular'
    },
   
    TextInput: {
      height: 50,
      width: "100%",
      flex: 1,
      padding: 10,
      paddingTop: 0,
      // marginLeft: 20,
      color: '#424242',
      fontFamily: 'NunitoSans_400Regular'
    },
    searchIcon: {
      padding: 10,
    },
    kontainer: {
      // flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginBottom: 10
    },
    itemss: {
      width: '25%',
      // padding:5,
      alignItems: 'center'
    },
    item: {
      margin: 10,
    },
    itemPhoto: {
      width: 160,
      height: 140,
    },
    itemText: {
      color: '#5a5a5a',
      marginTop: 5,
      fontSize: 14,
      fontFamily: 'NunitoSans_400Regular'
    },
    itemTahun: {
      color: '#8d8d8d',
      fontSize: 10,
      fontFamily: 'NunitoSans_400Regular'
    },
    itemPrice: {
      color: '#000',
      fontSize: 16,
      fontFamily: 'NunitoSans_400Regular'
    },
    tinyLogo: {
      width:90,
      height:90
    },
    row: {
      // flex: 1,
      justifyContent: "space-between",
    },
    flatlist: {
      padding:0,
      margin:0,
      marginTop: 10
    },
    categoryImage: {
      width: 48,
      height: 48,
      resizeMode: 'contain',
    },
    colItem: {
      flexBasis: '50%',
      overflow: 'hidden',
      borderRadius: 10,
      marginHorizontal: -6,
    },
    productCardContainer: {
      marginHorizontal: 6,
      borderRadius: 20,
      marginBottom: 12,
      backgroundColor: '#000',
      // ...shadows[3],
    },
    productCard: {
      flexDirection: 'column',
      paddingHorizontal: 0,
    },
    productCardThumb: {
      position: 'relative',
    },
    productCardImage: {
      width: '100%',
      // height: 144,
      resizeMode: 'cover',
      backgroundColor: '#000',
    },
    productCardContent: {
      paddingTop: 5,
      paddingBottom: 15,
      paddingHorizontal: 12,
      backgroundColor: '#fff',
      borderColor: '#a6a6a6',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderWidth: 0.5,
      marginBottom: 10
    },
  
  });
