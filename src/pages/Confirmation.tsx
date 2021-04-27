import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform, Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'


import { Button } from '../components/Button'
import { useNavigation, useRoute } from '@react-navigation/core'

interface Params {

  title: string,
  subTitle: string,
  buttonTitle: string,
  icon: 'smile' | 'hug',
  nextScreen: string,
}
const emojis = {

  hug: '🤗',
  smile: '😃'
}

export function Confirmation() {

  const navigation = useNavigation()
  const routes = useRoute()
  const {
    title,
    subTitle,
    buttonTitle,
    icon,
    nextScreen


  } = routes.params as Params;



  function handleStart() {

    navigation.navigate(nextScreen)
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text >
        <Text style={styles.title}>{title} </Text>
        <Text style={styles.subTitle}>
          {subTitle}
        </Text>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleStart} />
        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',

  }, content: {
    flex: 1,
    marginTop: '30%',
    width: '100%',
    padding: 30,
    alignItems: 'center',

  }, emoji: {
    fontSize: 78
  }, title: {
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 15
  },
  subTitle: {
    fontSize: 17,
    paddingVertical: 10,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text,

  }, footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 50
  }
})