import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import colors from '../styles/colors'
import waterDrop from '../assets/waterdrop.png'
import { Button } from '../components/Button'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import fonts from '../styles/fonts'
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { PlantProps, savePlant } from '../libs/storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const route = useRoute();
  const { plant } = route.params as Params;
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')
  const navigation = useNavigation()

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState)
    }
    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert('Escolha uma data no futuro ! 🧭')
    }
    if (dateTime)
      setSelectedDateTime(dateTime)

  }
  function handleShowDatePicker() {
    setShowDatePicker(oldState => !oldState)

  }
  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      })
      navigation.navigate('Confirmation', {
        title: 'Tudo Certo',
        subTitle: 'Fique Tranquilo sempre vamos lembrar você de cuidar sua planta com muito cuidado',
        buttonTitle: 'Muito Obrigado',
        icon: 'hug',
        nextScreen: 'MyPlants'
      })
    } catch {
      return Alert.alert('Não foi possivel salvar !😥')
    }

  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            height={150}
            width={150}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>

          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>

            <Image source={waterDrop}
              style={styles.tipImagem}
            />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>
          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
        </Text>
          {showDatePicker && <DateTimePicker
            value={selectedDateTime}
            mode='time'
            display='spinner'
            onChange={handleChangeTime}
          />}
          {Platform.OS === 'android' &&
            <TouchableOpacity style={styles.btnPicker} onPress={handleShowDatePicker}>
              <Text style={styles.datetimer}>{`Mudar ${format(selectedDateTime, 'HH:mm')}`}</Text>
            </TouchableOpacity>}
          <Button
            title='Cadastrar Planta'
            onPress={handleSave} />
        </View>

      </View>
    </ScrollView>
  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.shape,
    justifyContent: 'space-between'

  }, plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shape,


  }, plantAbout: {
    textAlign: 'center',
    color: colors.heading,
    fontSize: 17,
    fontFamily: fonts.text,
    marginTop: 10

  }, controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  }, plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,

  }, tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  }, tipImagem: {
    height: 56,
    width: 56
  }, tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'justify'
  }, alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    margin: 5

  }, datetimer: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }, btnPicker: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 40,
  }
})