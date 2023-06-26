import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';

import Braze from '@braze/react-native-sdk';

function Section({
  cardDescription,
  clicked,
  created,
  dismissed,
  dismissible,
  domain,
  id,
  pinned,
  title,
  type,
  url,
}: Braze.ContentCard): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.point}>
        <Text style={styles.pointName}>Title:</Text>
        {title}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>CardDescription:</Text>
        {cardDescription}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>ID:</Text> {id}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>Domain:</Text>
        {domain}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>Clicked:</Text>
        {`${clicked}`}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>Created:</Text> {`${created}`}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>Dismissed:</Text> {`${dismissed}`}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>Dismissible:</Text> {`${dismissible}`}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>Pinned:</Text> {`${pinned}`}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>Type:</Text> {type}
      </Text>
      <Text style={styles.point}>
        <Text style={styles.pointName}>URL:</Text> {url}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const [cards, setCards] = React.useState<Braze.ContentCard[]>([]);

  Braze.addListener(Braze.Events.CONTENT_CARDS_UPDATED, async update => {
    setCards(update.cards);
  });

  console.log(cards);

  React.useEffect(() => {
    Braze.changeUser('209130273');
  }, []);

  const openContentCards = () => {
    Braze.launchContentCards();
    Braze.requestContentCardsRefresh();
  };

  Braze.subscribeToInAppMessage(true, () => {});

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <ScrollView style={{flex: 1}}>
        {cards.map(card => {
          return <Section {...card} key={card.expiresAt} />;
        })}
        <Button onPress={openContentCards} title="OPEN CONTENT CARDS" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  pointName: {fontWeight: '600', fontSize: 12},
  point: {fontSize: 10},
});

export default App;
