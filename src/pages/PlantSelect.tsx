import React, { useEffect, useState } from 'react'
import { View, Text, Image, ActivityIndicator, FlatList, Platform, Dimensions, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { Header } from '../components/Header'

import { EnviromentButton } from '../components/EnviromentButton'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'

import api from '../services/api'
import { useNavigation } from '@react-navigation/core'
import { PlantProps } from '../libs/storage'
import { SafeAreaView } from 'react-native-safe-area-context'


interface EnviromentProps {
  key: string;
  title: string;
}



export function PlantSelect() {

  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [enviromentSelected, setEnviromentSelected] = useState('all')
  const [fillter, setFillter] = useState<PlantProps[]>([])
  const [load, setLoad] = useState(true)
  const [page, setpage] = useState(1)
  const [loadMore, setLoadMore] = useState(false)
  const [loadAll, seLoadAll] = useState(false)
  const naigation = useNavigation()
  function handlefetchMore(distance: number) {
    if (distance < 1)
      return;
    setLoadMore(true)
    setpage(oldValue => oldValue + 1)
    fetchPlants();

  }
  function handleEnviromentSelect(environment: string) {

    setEnviromentSelected(environment)
    if (environment === 'all')
      return setFillter(plants)
    const filtered = plants.filter(plant =>
      plant.environments.includes(environment)

    );
    setFillter(filtered)
  }
  function handleSeelctItem(plant: PlantProps) {
    naigation.navigate('PlantSave', { plant })


  }
  async function fetchPlants() {

    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
    if (!data)
      return setLoad(true)
    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFillter(oldValue => [...oldValue, ...data])
    } else {

      setPlants(data)
      setFillter(data)

    }
    setLoad(false)
    setLoadMore(false)

  }
  useEffect(() => {

    async function fetchEnviroment() {

      const { data } = await api.get('plants_environments?_sort=title&_order=asc')
      setEnviroments([{
        key: 'all',
        title: 'Todos'

      }, ...data])
    }
    fetchEnviroment()
  }, [])
  useEffect(() => {
    fetchPlants()
  }, [])


  if (load)
    return <Load />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual Ambiente</Text>
        <Text style={styles.subTitle}>você quer colocar sua planta?</Text>

      </View>
      <View>

        <FlatList
          data={enviroments}
          keyExtractor={item => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelect(item.key)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />

      </View>
      <View style={styles.plants}>
        <FlatList
          data={fillter}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} onPress={() => handleSeelctItem(item)} />
          )}
          contentContainerStyle={styles.contentplant}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.2}
          onEndReached={({ distanceFromEnd }) =>
            handlefetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadMore ? <ActivityIndicator color={colors.green} /> : <></>}
        />

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background

  }, content: {
    flex: 1,
    width: '100%',
    padding: 30,
    alignItems: 'center',

  }, header: {
    paddingHorizontal: 30
  }, title: {
    fontSize: 17,
    lineHeight: 20,

    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 15
  },
  subTitle: {
    fontSize: 17,
    paddingVertical: 10,
    lineHeight: 20,
    color: colors.heading,
    fontFamily: fonts.text,

  }, footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 50
  }, enviromentList: {

    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  }, plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  }, contentplant: {
    justifyContent: 'center'
  }
})