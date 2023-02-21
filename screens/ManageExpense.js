import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({route, navigation}) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler () {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler () {
    navigation.goBack();
  }

  function confirmHander() {
    if (isEditing) {
      expensesCtx.updateExpense(
        editedExpenseId,  
        {
          description: 'Test 2', 
          amount: 25.54, 
          date: new Date('2023-02-19'),
        }
      );
    } else {
      expensesCtx.addExpense({
        description: 'Test', 
        amount: 19.99, 
        date: new Date('2023-02-20'),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>Cancel</Button>
        <Button onPress={confirmHander} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton 
            icon="trash" 
            color={GlobalStyles.colors.error50} 
            size={36} 
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View> 
  )
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button:{
    minWidth: 120, 
    marginHorizontal: 8,
  },
  deleteContainer:{
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
})