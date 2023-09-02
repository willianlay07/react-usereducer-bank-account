import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isActive: true,
        balance: 500
      };

    case "depositAmount":
      return {
        ...state,
        balance: state.balance + action.payload
      };

    case "withdrawAmount":
      return {
        ...state,
        balance: state.balance - action.payload
      };

    case "requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload
      };

    case "payloan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan
      };

    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0) return state;

      return initialState;

    default:
      throw new Error("I do not know");
  }
}

const App = () => {
  const [state, dispatch]   = useReducer(reducer, initialState);

  const { balance, loan, isActive } = state;
  return (
    <div className="App">
      <h1>useReducer - Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "depositAmount", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdrawAmount", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payloan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  )
}

export default App