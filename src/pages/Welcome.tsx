import React from 'react'
import { View, Text, Image, SafeAreaView, Platform, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import walteringImg from '../assets/watering.png'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

export function Welcome() {
  const navigation = useNavigation()

  function handlStart() {
    navigation.navigate('UserIdentification')

  }
  return (
    <SafeAreaView style={styles.contaiber}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie
       {'\n'} suas plantas de
       {'\n'} forma fácil</Text>
        <Image
          source={walteringImg}
          style={styles.image}
          resizeMode='contain' />
        <Text style={styles.subTitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => handlStart()}>
          <Entypo style={styles.buttonIcon} name="chevron-thin-right" /></TouchableOpacity>
      </View>
    </SafeAreaView>)
}

const styles = StyleSheet.create({

  contaiber: {
    flex: 1,

  }, title: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.heading,
    marginTop: Platform.OS === 'android' ? '12%' : '15%',
    fontFamily: fonts.heading,
    lineHeight: 34


  }, subTitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text

  }, button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56

  }, image: {
    height: Dimensions.get('window').width * 0.7,
  }, buttonIcon: {
    color: colors.white,
    fontSize: 24

  }, wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    padding: 10


  }
})