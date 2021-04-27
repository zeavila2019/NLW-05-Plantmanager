import React, { useState } from 'react'
import {
  View, Text,
  Image, SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { Button } from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'


export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  const navigation = useNavigation()

  async function handlSubmit() {
    if (!name)
      return Alert.alert('Me diz com chamar você 😥')
    try {
      await AsyncStorage.setItem('@plantmanager:user', name)
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subTitle: 'Agora vamos começar a cuidar das suas plantas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      })
    } catch {
      Alert.alert('Não foi possivel salvar 😥')
    }

  }
  function handleOnblur() {
    setIsFocused(false)
    setIsFilled(!!name)

  }
  function handleFocused() {
    setIsFocused(true)
  }
  function handleChangeInput(value: string) {
    setIsFilled(!value)
    setName(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.emoji}>
                  {isFilled ? '😃' : '😊'}
                </Text>
                <Text style={styles.title}>Como podemos {'\n'}chamar você ?</Text>
              </View>
              <TextInput
                style={[styles.input, (isFocused || isFilled) && { borderColor: colors.green }]}
                placeholder={'Digite o nome '}
                onBlur={handleOnblur}
                onFocus={handleFocused}
                onChangeText={handleChangeInput} />
              <View style={styles.footer}>
                <Button title={'Confirmar'} onPress={handlSubmit} />
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  }, content: {
    flex: 1,
    width: '100%'

  }, form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 54

  }, emoji: {
    fontSize: 40

  }, input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'

  }, title: {
    fontSize: 25,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20
  }, footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  }

})