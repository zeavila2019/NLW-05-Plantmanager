import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, Image } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { SvgFromUri } from 'react-native-svg'

interface PlantProps extends RectButtonProps {
  data: {
    name: string,
    photo: string
  }

}

export const PlantCardPrimary = ({ data, ...rest }: PlantProps) => {

  return (

    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />

      <Text style={styles.text}>{data.name}</Text>

    </RectButton>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    maxWidth: '45%',
    alignItems: 'center',
    margin: 10
  }, text: {
    fontSize: 12,
    fontFamily: fonts.text,
    color: colors.green_dark,
    marginVertical: 16

  }
})