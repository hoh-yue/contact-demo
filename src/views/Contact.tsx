import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../App';
import data from '../assets/data.json';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface ContactDetails {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Contact'>;

const Contact = () => {
  const [contactList, setContactList] = useState(data as ContactDetails[]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity>
          <Icon name="search" size={24} color="#ff8c00" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Icon name="plus" size={24} color="#ff8c00" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const refreshContact = () => {
    setRefreshing(true);
    setContactList(data as ContactDetails[]);
    setRefreshing(false);
  };

  const updateContact = (item: ContactDetails) => {
    const newContactList = contactList.map((contact) => {
      if (contact.id === item.id) {
        return item;
      }
      return contact;
    });
    setContactList(newContactList);
  };

  const renderItem: ListRenderItem<ContactDetails> = ({ item }) => {
    const onPress = () => {
      navigation.navigate('Details', { contactDetails: item, updateContact });
    };

    return (
      <TouchableOpacity style={styles.list} onPress={onPress}>
        <View style={styles.img} />
        <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
      </TouchableOpacity>
    );
  };

  const separator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={contactList}
          renderItem={renderItem}
          ItemSeparatorComponent={separator}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshContact}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#ff8c00',
  },
  name: {
    fontSize: 16,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#00000026',
  },
});

export default Contact;
