const initalState = {
  incomes: [],
  expenses: [],
  disposableIncome: 0,
  totalExpenses: 0,
  totalIncomes: 0,
  percentage: 0,
};

const calculateDisposableIncomeTotalExpensesTotalIncomesAndPerecentages = (
  state = initalState
) => {
  // 1) Created a state copy(It is not a good practice to mutate function arguments.)
  const stateCopy = state;
  // 2) Reduced expenses value
  stateCopy.totalExpenses = stateCopy.expenses.reduce(
    (acc, curr) => acc + curr.price,
    0
  );
  // 3) Reduced incomes value
  stateCopy.totalIncomes = stateCopy.incomes.reduce(
    (acc, curr) => acc + curr.price,
    0
  );
  // 4) Disposable income calculation
  stateCopy.disposableIncome = stateCopy.totalIncomes - stateCopy.totalExpenses;
  // 5) PercentageCalculation
  if (
    stateCopy.expenses.length === 0 ||
    stateCopy.expenses.length > stateCopy.incomes.length
  )
    state.percentage = 0;
  else
    stateCopy.percentage =
      Math.abs(stateCopy.totalExpenses) / stateCopy.totalIncomes;

  return stateCopy;
};

export const reducer = (state = initalState, action) => {
  let stateToBe;
  if (action.type === "SET_STATE") {
    stateToBe = action.state;
  }
  if (action.type === "ADD_INCOME") {
    const { income } = action;
    stateToBe = { ...state, incomes: [income, ...state.incomes] };
  }
  if (action.type === "ADD_EXPENSE") {
    const { expense } = action;
    stateToBe = { ...state, expenses: [expense, ...state.expenses] };
  }
  if (action.type === "REMOVE_INCOME_ITEM") {
    const { id } = action;
    const newIncomes = state.incomes.filter((income) => income.id !== id);

    stateToBe = { ...state, incomes: newIncomes };
  }
  if (action.type === "REMOVE_EXPENSE_ITEM") {
    const { id } = action;
    const newExpenses = state.expenses.filter((expense) => expense.id !== id);

    stateToBe = { ...state, expenses: newExpenses };
  }
  return calculateDisposableIncomeTotalExpensesTotalIncomesAndPerecentages(
    stateToBe
  );
};
