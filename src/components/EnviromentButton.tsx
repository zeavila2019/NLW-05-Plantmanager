import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, Image } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentButtonProps extends RectButtonProps {
  title: string,
  active?: boolean,

}

export function EnviromentButton({ title, active = false, ...rest }: EnviromentButtonProps) {

  return (

    <RectButton style={[styles.container, active && styles.containerAtive]} {...rest}>

      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>

    </RectButton>

  )

}

const styles = StyleSheet.create({

  container: {
    height: 40,
    width: 76,
    backgroundColor: colors.shape,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    marginHorizontal: 5
  }, text: {
    fontSize: 12,
    fontFamily: fonts.text,
    color: colors.heading
  }, containerAtive: {
    backgroundColor: colors.green_light
  }, textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  }
})