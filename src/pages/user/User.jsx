import axios from "axios";
import styles from './User.module.scss'
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'

const User = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [accBalance,setAccBalance]=useState("")
  const [type, setType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [userId,setUserId]=useState("")
  const [transactions,setTransactions]=useState([])
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        // navigate("/");
        console.log("no cookie");
      }
      const { data } = await axios.post(
        "http://localhost:4000/user",
        {},
        { withCredentials: true }
      );
      const { status, user,userID ,account} = data;
      console.log(userID);
      setUserId(userID)
      setAccBalance(account)
      setUsername(user);
      return status
        ? null
        : (removeCookie("token"), navigate("/"));
    };
    verifyCookie();
  },[cookies,navigate,removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/transaction/create', { type, amount: parseFloat(amount),userId })
    .then(result=>{
      const {data}=result
      if(data.message==="Insufficient balance"){
        alert("Insufficient balance")
      }
    })
    setAmount('');
    window.location.reload()
  };
  const handleHistory=()=>{
    axios.get('http://localhost:4000/transaction/list/'+userId)
.then(result=>{
  setTransactions(result.data)
  console.log(result.data);
})
  }
  return <div className={styles.container}>
    <div className={styles.user}>
      <h1>hello {username}</h1>
      <button onClick={Logout}>Logout</button>
    </div>
    <div className={styles.account}>
      <h4>Account Balance</h4>
      <h1>{accBalance}</h1>
    </div>
    <div className={styles.history}>
  <button onClick={handleHistory}>Transaction History</button>
  {transactions && transactions.length > 0 ? (
    transactions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((transaction) => (
        <div key={transaction._id}>
          <h5>Amount : {transaction.amount}</h5>
          <h5>Payment type : {transaction.type}</h5>
          <h5>Date : {new Date(transaction.createdAt).toLocaleString()}</h5>
        </div>
      ))
  ) : (
    <div>No transactions</div>
  )}
</div>
    <div className={styles.actions}>
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="deposit">Deposit</option>
        <option value="withdrawal">Withdrawal</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button type="submit">Submit</button>
    </form>
    </div>
  </div>;
};

export default User;
