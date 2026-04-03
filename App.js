import React, { useState, useEffect } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WebView } from "react-native-webview";

const Tab = createBottomTabNavigator();

function LoyaltyScreen() {
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    loadOrderCount();
  }, []);

  const loadOrderCount = async () => {
    try {
      const savedCount = await AsyncStorage.getItem("orderCount");
      if (savedCount !== null) {
        setOrderCount(parseInt(savedCount));
      }
    } catch (error) {
      console.log("Error loading order count:", error);
    }
  };

  const saveOrderCount = async (count) => {
    try {
      await AsyncStorage.setItem("orderCount", count.toString());
    } catch (error) {
      console.log("Error saving order count:", error);
    }
  };

  const handleNewOrder = () => {
    if (orderCount < 10) {
      const newCount = orderCount + 1;
      setOrderCount(newCount);
      saveOrderCount(newCount);
    } else {
      Alert.alert("Reward Ready!", "You already have a free order to redeem.");
    }
  };

  const handleRedeemReward = () => {
    if (orderCount >= 10) {
      Alert.alert("Reward Redeemed!", "Your 10th order is free!");
      setOrderCount(0);
      saveOrderCount(0);
    } else {
      Alert.alert("Not Yet!", `You need ${10 - orderCount} more orders.`);
    }
  };

  const progressPercent = (orderCount / 10) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍔 Tasty Bites Loyalty</Text>
      <Text style={styles.subtitle}>Earn your 10th order free!</Text>

      <View style={styles.card}>
        <Text style={styles.orderText}>{orderCount} / 10 Orders</Text>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>

        {orderCount < 10 ? (
          <Text style={styles.statusText}>
            {10 - orderCount} more order(s) until your free meal!
          </Text>
        ) : (
          <Text style={styles.rewardText}>🎉 Free Reward Unlocked!</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNewOrder}>
        <Text style={styles.buttonText}>Simulate New Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.redeemButton} onPress={handleRedeemReward}>
        <Text style={styles.buttonText}>Redeem Free Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function ChatbotScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: "https://joshds595.github.io/UX308-Assignment2" }} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Loyalty" component={LoyaltyScreen} />
        <Tab.Screen name="Order Chat" component={ChatbotScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#d35400",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#555",
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 30,
    alignItems: "center",
  },
  orderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  progressBarBackground: {
    width: "100%",
    height: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#27ae60",
  },
  statusText: {
    fontSize: 16,
    color: "#555",
  },
  rewardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27ae60",
  },
  button: {
    backgroundColor: "#e67e22",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  redeemButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});