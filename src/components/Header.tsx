import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, Image } from 'react-native'
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userjose from '../assets/jon.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'


export function Header() {
  const [name, setName] = useState<string>()


  useEffect(() => {
    async function getName() {
      const value = await AsyncStorage.getItem('@plantmanager:user')
      if (value != null)
        setName(value)
    }
    getName()
  }, [])
  return (

    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Ola</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>
      <Image style={styles.img} source={userjose} />
    </View>

  )

}


const styles = StyleSheet.create({

  container: {
    width: '100%',
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    marginTop: getStatusBarHeight(),

  }, buttonText: {
    color: colors.white,
    fontSize: 24,
    fontFamily: fonts.text

  }, img: {
    width: 70,
    height: 70,
    borderRadius: 35
  }, greeting: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading
  }, userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading
  }
})