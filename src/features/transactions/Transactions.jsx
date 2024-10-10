import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdrawal, transfer, selectBalance } from "./transactionsSlice";
import "./transactions.scss";

export default function Transactions() {
  const dispatch = useDispatch();
  const balance = useSelector(selectBalance);

  const [amountStr, setAmountStr] = useState("0.00");
  const [recipient, setRecipient] = useState("");

  const onTransaction = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    const amount = +amountStr;

    if (action === "deposit") {
      dispatch(deposit({ amount }));
    } else if (action === "withdraw") {
      dispatch(withdrawal({ amount }));
    } else if (action === "transfer") {
      dispatch(transfer({ amount, recipient }));
    }
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button default name="deposit">
              Deposit
            </button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input
              placeholder="Recipient Name"
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}

