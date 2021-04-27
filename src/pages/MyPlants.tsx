import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, FlatList, Alert } from 'react-native'
import { Header } from '../components/Header'
import colors from '../styles/colors'
import waterDrop from '../assets/waterdrop.png'
import { PlantProps, loadPlant, removePlant } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'

export function MyPlants() {
  const [myPlants, setMyPlant] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWaterd, setNextWaterd] = useState<string>()
  async function handeleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😥',
        onPress: async () => {
          try {
            await removePlant(plant.id)
            setMyPlant((olData) => (
              olData.filter((item) => item.id !== plant.id)
            ))

          } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel remover 😥')
          }
        }
      }
    ])

  }

  useEffect(() => {
    async function loadStorage() {
      const plantStorage = await loadPlant();
      const nextTime = formatDistance(
        new Date(plantStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }

      )
      setNextWaterd(`Não esqueça de regar a ${plantStorage[0].name} a ${nextTime}`)
      setMyPlant(plantStorage)
      setLoading(false)
    }
    loadStorage()
  }, [])
  if (loading)
    return <Load />
  return (

    <View style={styles.container}>
      <Header />
      <View style={styles.spot}>
        <Image source={waterDrop} style={styles.spotImage} />

        <Text style={styles.spotText}>
          {nextWaterd}
        </Text>

      </View>

      <Text style={styles.plantTitle}>
        Proximas regadas

        </Text>
      <View style={styles.plants}>
        <FlatList
          data={myPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              handeleRemove={() => handeleRemove(item)}
              data={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}

        />
      </View>

    </View>

  )

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,

  }, spot: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 110

  }, spotImage: {
    width: 60,
    height: 60

  }, spotText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,


  }, plants: {
    flex: 1,
    width: '100%'

  }, plantTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
})