// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import AccountIcon from './AccountIcon';
import Card from './Card';
import {
  NETWORK_LIST,
  NETWORK_TITLES,
  NETWORK_COLOR,
  DEFAULT_NETWORK_COLOR
} from '../constants';
import colors from '../colors';

export default class AccountCard extends React.Component<{
  title: string,
  address: string,
  chainId: string,
  onPress: () => any
}> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    chainId: PropTypes.string,
    style: View.propTypes.style,
    onPress: PropTypes.func
  };

  render() {
    const { title, address, chainId, style, onPress } = this.props;

    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
      <Touchable
        accessibilityComponentType="button"
        disabled={false}
        onPress={onPress}
      >
        <View style={[styles.body, style]}>
          <View style={styles.content}>
            <AccountIcon style={styles.icon} seed={'0x' + address} />
            <View style={styles.desc}>
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.secondaryText}>0x{address}</Text>
            </View>
          </View>
          <View
            style={[
              styles.footer,
              {
                backgroundColor:
                  NETWORK_COLOR[chainId] || DEFAULT_NETWORK_COLOR
              }
            ]}
          >
            <Text
              style={[
                styles.footerText,
                {
                  color: NETWORK_COLOR[chainId]
                    ? colors.card_bg
                    : colors.card_text
                }
              ]}
            >
              {NETWORK_TITLES[chainId]}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingBottom: 20
  },
  content: {
    flexDirection: 'row',
    backgroundColor: colors.card_bg,
    padding: 10
  },
  icon: {
    width: 47,
    height: 47
  },
  desc: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    flex: 1
  },
  footer: {
    backgroundColor: '#977CF6',
    flexDirection: 'row-reverse',
    padding: 5
  },
  titleText: {
    fontFamily: 'Roboto',
    fontSize: 20
  },
  secondaryText: {
    fontFamily: 'Roboto',
    color: colors.bg_text_sec,
    fontWeight: '500',
    fontSize: 10
  },
  footerText: {
    fontFamily: 'Roboto',
    color: colors.card_bg,
    fontWeight: 'bold'
  }
});
