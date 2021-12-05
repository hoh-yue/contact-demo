import { RouteProp, useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { createRef, useLayoutEffect, useRef, useState } from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../App';
import { ContactDetails } from './Contact';

export type DetailsProps = {
  contactDetails: ContactDetails;
  updateContact: (item: ContactDetails) => void;
};

type DetailsScreenProps = RouteProp<RootStackParamList, 'Details'>;
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Details'>;

const Details = () => {
  const {
    params: { contactDetails, updateContact },
  } = useRoute<DetailsScreenProps>();
  const navigation = useNavigation<NavigationProps>();
  const [firstName, setFirstName] = useState(contactDetails.firstName);
  const [lastName, setLastName] = useState(contactDetails.lastName);
  const [email, setEmail] = useState(contactDetails.email);
  const [phone, setPhone] = useState(contactDetails.phone);

  const lastNameRef = createRef<TextInput>();
  const emailRef = createRef<TextInput>();
  const phoneRef = createRef<TextInput>();

  const goBack = () => navigation.goBack();

  const save = () => {
    updateContact({
      id: contactDetails.id,
      firstName,
      lastName,
      email,
      phone,
    });
    goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => null,
      headerLeft: () => (
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.navText}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={save}>
          <Text style={styles.navText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, save]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.profile}>
              <View style={styles.img} />
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.title}>Main Information</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.textInput}
                value={firstName}
                onChangeText={setFirstName}
                returnKeyType="next"
                onSubmitEditing={() => lastNameRef?.current?.focus()}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                ref={lastNameRef}
                style={styles.textInput}
                value={lastName}
                onChangeText={setLastName}
                returnKeyType="next"
                onSubmitEditing={() => emailRef?.current?.focus()}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.title}>Sub Information</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                ref={emailRef}
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                onSubmitEditing={() => phoneRef?.current?.focus()}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                ref={phoneRef}
                style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  navText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff8c00',
  },
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#ff8c00',
  },
  sectionHeader: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#00000016',
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomColor: '#00000016',
    borderBottomWidth: 1,
  },
  label: {
    flex: 1,
  },
  textInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#00000016',
    borderRadius: 4,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
});

export default Details;
